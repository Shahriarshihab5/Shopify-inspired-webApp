import { create } from 'zustand';
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
  role: UserRole;
}

interface AuthStore {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string, role: UserRole) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,

  signup: async (email: string, password: string, role: UserRole) => {
    try {
      set({ error: null, loading: true });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: userCredential.user.uid,
          email,
          role,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to save user data');
      
      set({ 
        user: { uid: userCredential.user.uid, email, role },
        loading: false
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ error: null, loading: true });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const response = await fetch(`/api/auth/user/${userCredential.user.uid}`);
      const userData = await response.json();
      
      set({ 
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          role: userData.role || 'customer',
        },
        loading: false
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, error: null, loading: false });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  checkAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await fetch(`/api/auth/user/${firebaseUser.uid}`);
          const userData = await response.json();
          
          set({ 
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: userData.role || 'customer',
            },
            loading: false
          });
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          set({ loading: false });
        }
      } else {
        set({ user: null, loading: false });
      }
    });
    
    return unsubscribe;
  },

  clearError: () => set({ error: null }),
}));
