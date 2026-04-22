import { Link, useLocation } from 'react-router-dom';

export function AdminSidebar() {
  const location = useLocation();
  const path = location.pathname;

  const getNavClass = (targetPath: string, exact: boolean = false) => {
    const isActive = exact ? path === targetPath : path.startsWith(targetPath);
    return isActive
      ? "flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 font-medium transition-all scale-105 duration-300"
      : "flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl transition-colors font-medium";
  };

  return (
    <>
      <aside className="h-screen w-64 flex flex-col fixed left-0 top-0 bg-slate-100 dark:bg-slate-900 z-50">
<div className="flex flex-col h-full p-4 space-y-2">
<div className="flex items-center gap-3 px-3 py-6 mb-4">
<div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
<span className="material-symbols-outlined">speed</span>
</div>
<div>
<h1 className="text-xl font-bold text-blue-900 dark:text-blue-100 tracking-tight leading-none">Velocity</h1>
<p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Driving School OS</p>
</div>
</div>
<nav className="flex-1 space-y-1">
<Link className={getNavClass('/admin', true)} to="/admin">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</Link>
<Link className={getNavClass('/admin/users')} to="/admin/users">
<span className="material-symbols-outlined" data-icon="group">group</span>
<span>Users</span>
</Link>
<Link className={getNavClass('/admin/roles')} to="/admin/roles">
<span className="material-symbols-outlined" data-icon="admin_panel_settings">admin_panel_settings</span>
<span>Permissions</span>
</Link>
<Link className={getNavClass('/admin/courses')} to="/admin/courses">
<span className="material-symbols-outlined" data-icon="auto_stories">auto_stories</span>
<span>Courses</span>
</Link>
<Link className={getNavClass('/admin/schedules')} to="/admin/schedules">
<span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
<span>Schedules</span>
</Link>
<Link className={getNavClass('/admin/payments')} to="/admin/payments">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
<span>Payments</span>
</Link>
<Link className={getNavClass('/admin/logs')} to="/admin/logs">
<span className="material-symbols-outlined" data-icon="assignment">assignment</span>
<span>Logs</span>
</Link>
<Link className={getNavClass('/admin/settings')} to="/admin/settings">
<span className="material-symbols-outlined" data-icon="security">security</span>
<span>Security</span>
</Link>
</nav>
<button className="w-full py-4 px-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 mb-4">
<span className="material-symbols-outlined text-[20px]">add_circle</span>
                New Lesson
            </button>
<div className="pt-4 border-t border-slate-200/50 dark:border-slate-800 space-y-1">
<Link className="flex items-center gap-3 px-4 py-3 text-slate-500 font-medium hover:bg-slate-200/50 rounded-xl transition-all" to="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span>Support</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 text-error font-medium hover:bg-error-container/20 rounded-xl transition-all" to="#">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
<span>Logout</span>
</Link>
</div>
</div>
</aside>
    </>
  );
}
