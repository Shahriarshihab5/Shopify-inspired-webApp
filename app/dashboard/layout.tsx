import DashboardSidebar from "../components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-indigo-950 dark:to-violet-950">
      {/* Only ONE Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto transition-all duration-300">
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
