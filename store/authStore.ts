import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export type UserRole = 'merchant' | 'customer';

interface AuthUser {
  uid: string;
  email: string | null;
  name?: string;
  role: UserRole;
  createdAt?: Date;
}

interface AuthStore {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      error: null,

      signup: async (email: string, password: string, name: string, role: UserRole) => {
        try {
          set({ error: null, loading: true });
          
          console.log('🚀 Starting signup...');
          
          // Create Firebase user
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('✅ Firebase user created:', userCredential.user.uid);
          
          // Save user data to MongoDB
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: userCredential.user.uid,
              email,
              name,
              role,
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ MongoDB save failed:', errorData);
            throw new Error(errorData.error || 'Failed to save user data');
          }

          const userData = await response.json();
          console.log('✅ MongoDB user saved:', userData);
          
          // Set auth cookie
          await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: userCredential.user.uid }),
          });
          
          set({ 
            user: { 
              uid: userCredential.user.uid, 
              email, 
              name,
              role,
              createdAt: userData.createdAt,
            },
            loading: false,
            error: null,
          });
          
          console.log('🎉 Signup complete!');
        } catch (error: any) {
          console.error('💥 Signup error:', error);
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      login: async (email: string, password: string) => {
        try {
          set({ error: null, loading: true });
          
          console.log('🔐 Attempting login with:', email);
          
          // Sign in with Firebase
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log('✅ Firebase login successful:', userCredential.user.uid);
          
          // Fetch user data from MongoDB to get role
          const apiUrl = `/api/auth/user/${userCredential.user.uid}`;
          console.log('📡 Fetching user data from:', apiUrl);
          
          const response = await fetch(apiUrl);
          console.log('📥 Response status:', response.status);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ API Error:', errorText);
            
            // If user not found in MongoDB, sign them out from Firebase
            await signOut(auth);
            throw new Error('User data not found. Please sign up again.');
          }
          
          const userData = await response.json();
          console.log('👤 User data:', userData);
          
          // Set auth cookie
          await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: userCredential.user.uid }),
          });
          
          set({ 
            user: {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              name: userData.name,
              role: userData.role || 'customer',
              createdAt: userData.createdAt,
            },
            loading: false,
            error: null,
          });
          
          console.log('🎉 Login complete!');
        } catch (error: any) {
          console.error('💥 Login error:', error);
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          console.log('👋 Logging out...');
          await signOut(auth);
          
          // Clear auth cookie
          await fetch('/api/auth/logout', { method: 'POST' });
          
          set({ user: null, error: null, loading: false });
          console.log('✅ Logout complete');
        } catch (error: any) {
          console.error('❌ Logout error:', error);
          set({ error: error.message });
        }
      },

      checkAuth: () => {
        console.log('🔍 Setting up auth state listener...');
        
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            console.log('👤 Firebase user detected:', firebaseUser.uid);
            
            try {
              // Fetch user data from MongoDB
              const response = await fetch(`/api/auth/user/${firebaseUser.uid}`);
              
              if (!response.ok) {
                console.warn('⚠️ User not found in MongoDB, signing out...');
                await signOut(auth);
                set({ user: null, loading: false, error: null });
                return;
              }
              
              const userData = await response.json();
              console.log('✅ User data loaded:', userData);
              
              set({ 
                user: {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  name: userData.name,
                  role: userData.role || 'customer',
                  createdAt: userData.createdAt,
                },
                loading: false,
                error: null,
              });
            } catch (error) {
              console.error('❌ Failed to fetch user data:', error);
              // Sign out if there's an error
              await signOut(auth);
              set({ user: null, loading: false, error: null });
            }
          } else {
            console.log('🚫 No Firebase user');
            set({ user: null, loading: false, error: null });
          }
        });
        
        return unsubscribe;
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }), // Only persist user data
    }
  )
);
