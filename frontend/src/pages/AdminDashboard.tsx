import { AdminSidebar } from '../components/AdminSidebar';
import { AdminNavbar } from '../components/AdminNavbar';

const AdminDashboard = () => {
  return (
    <>

<AdminSidebar />

<main className="ml-64 p-8 space-y-8">
<AdminNavbar />

<div className="flex justify-between items-end">
<div>
<h2 className="text-3xl font-black text-blue-900 tracking-tighter">System Oversight</h2>
<p className="text-on-surface-variant font-medium">Real-time telemetry and management controls.</p>
</div>
<div className="flex items-center gap-2 bg-surface-container-high p-1 rounded-xl">
<button className="px-4 py-2 bg-surface-container-lowest shadow-sm rounded-lg text-xs font-bold text-primary">Live Data</button>
<button className="px-4 py-2 text-xs font-bold text-slate-500">History</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-3xl shadow-xl shadow-primary/20 relative overflow-hidden group">
<div className="relative z-10">
<p className="text-primary-fixed/70 text-xs font-bold uppercase tracking-widest mb-1">Total Users</p>
<h3 className="text-4xl font-black text-white tracking-tighter">1,284</h3>
<div className="mt-4 flex items-center gap-2 text-white/80 text-xs font-medium">
<span className="bg-white/20 px-2 py-0.5 rounded-md">+12.5%</span>
<span>vs last month</span>
</div>
</div>
<span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/10 text-9xl group-hover:scale-110 transition-transform duration-500">group</span>
</div>
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 bg-secondary-container/30 rounded-xl flex items-center justify-center text-primary">
<span className="material-symbols-outlined">auto_stories</span>
</div>
<span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</span>
</div>
<p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Active Courses</p>
<h3 className="text-3xl font-black text-on-surface tracking-tighter">42</h3>
<div className="mt-3 w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full w-3/4 rounded-full"></div>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 bg-error-container/30 rounded-xl flex items-center justify-center text-error">
<span className="material-symbols-outlined">shield_with_heart</span>
</div>
<span className="text-[10px] font-bold text-error uppercase tracking-widest">Secure</span>
</div>
<p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Security Events</p>
<h3 className="text-3xl font-black text-on-surface tracking-tighter">0</h3>
<p className="text-xs text-slate-500 mt-2 font-medium">Last 24 hours</p>
</div>
<div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-10 h-10 bg-tertiary-container/10 rounded-xl flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">payments</span>
</div>
<span className="text-emerald-600 text-xs font-bold">+99.8%</span>
</div>
<p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">Payment Success</p>
<h3 className="text-3xl font-black text-on-surface tracking-tighter">98.4%</h3>
<p className="text-xs text-slate-500 mt-2 font-medium">Processing stability</p>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-4 bg-surface-container-low rounded-3xl p-6 flex flex-col">
<h4 className="text-sm font-black text-on-surface uppercase tracking-wider mb-6">User Status Monitor</h4>
<div className="space-y-4 flex-1">
<div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl shadow-sm">
<div className="flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-emerald-500"></div>
<span className="text-sm font-bold">Active Sessions</span>
</div>
<span className="text-lg font-black text-primary">842</span>
</div>
<div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl shadow-sm">
<div className="flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-amber-500"></div>
<span className="text-sm font-bold">Locked Accounts</span>
</div>
<span className="text-lg font-black text-on-surface">12</span>
</div>
<div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl shadow-sm">
<div className="flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-error"></div>
<span className="text-sm font-bold">Suspended</span>
</div>
<span className="text-lg font-black text-error">5</span>
</div>
</div>
<div className="mt-6 pt-6 border-t border-slate-200">
<div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-2">
<span>MFA Adoption Rate</span>
<span>92%</span>
</div>
<div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
<div className="bg-primary h-full w-[92%] rounded-full"></div>
</div>
</div>
</div>

<div className="lg:col-span-8 bg-surface-container-lowest rounded-3xl p-6 shadow-sm">
<div className="flex justify-between items-center mb-6">
<h4 className="text-sm font-black text-on-surface uppercase tracking-wider">Recent Audit Logs</h4>
<button className="text-xs font-bold text-primary hover:underline">View All Logs</button>
</div>
<div className="space-y-1">
<div className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-lg px-2">
<div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[18px]">key</span>
</div>
<div className="flex-1">
<p className="text-xs font-bold text-on-surface">Admin <span className="text-primary">alex.t</span> updated permissions for Instructor <span className="text-primary">Sarah J.</span></p>
<p className="text-[10px] text-slate-400 font-medium">2 minutes ago • 192.168.1.45</p>
</div>
<span className="text-[10px] font-bold text-slate-400 px-2 py-1 bg-slate-100 rounded">AUTH_LEVEL_CHANGE</span>
</div>
<div className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-lg px-2">
<div className="w-8 h-8 rounded-lg bg-error-container/20 flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[18px]">lock_reset</span>
</div>
<div className="flex-1">
<p className="text-xs font-bold text-on-surface">Password reset forced for <span className="text-primary">mark.d@velocity.edu</span></p>
<p className="text-[10px] text-slate-400 font-medium">14 minutes ago • System Trigger</p>
</div>
<span className="text-[10px] font-bold text-slate-400 px-2 py-1 bg-slate-100 rounded">SEC_POLICY</span>
</div>
<div className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-lg px-2">
<div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
<span className="material-symbols-outlined text-[18px]">payments</span>
</div>
<div className="flex-1">
<p className="text-xs font-bold text-on-surface">VNPay Transaction #90284 verified successfully</p>
<p className="text-[10px] text-slate-400 font-medium">28 minutes ago • Payment Gateway</p>
</div>
<span className="text-[10px] font-bold text-slate-400 px-2 py-1 bg-slate-100 rounded">FIN_TRANSACTION</span>
</div>
<div className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-lg px-2">
<div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
<span className="material-symbols-outlined text-[18px]">settings</span>
</div>
<div className="flex-1">
<p className="text-xs font-bold text-on-surface">System configuration backup completed</p>
<p className="text-[10px] text-slate-400 font-medium">1 hour ago • Auto-Task</p>
</div>
<span className="text-[10px] font-bold text-slate-400 px-2 py-1 bg-slate-100 rounded">SYS_MAINTENANCE</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 relative overflow-hidden">
<div className="relative z-10">
<div className="flex justify-between items-start mb-12">
<div>
<h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Revenue Streams</h4>
<h3 className="text-4xl font-black text-white tracking-tighter">$142,500.00</h3>
</div>
<div className="flex gap-4">
<div className="flex items-center gap-2">
<span className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></span>
<span className="text-xs font-bold text-slate-300">VNPay</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50"></span>
<span className="text-xs font-bold text-slate-300">MoMo</span>
</div>
</div>
</div>

<div className="flex items-end gap-3 h-48">
<div className="flex-1 bg-white/5 h-[30%] rounded-t-lg relative group transition-all hover:bg-white/10">
<div className="absolute bottom-0 w-full bg-blue-600 h-2/3 rounded-t-lg"></div>
</div>
<div className="flex-1 bg-white/5 h-[50%] rounded-t-lg relative group transition-all hover:bg-white/10">
<div className="absolute bottom-0 w-full bg-blue-600 h-3/4 rounded-t-lg"></div>
</div>
<div className="flex-1 bg-white/5 h-[80%] rounded-t-lg relative group transition-all hover:bg-white/10">
<div className="absolute bottom-0 w-full bg-blue-600 h-1/2 rounded-t-lg"></div>
<div className="absolute bottom-0 w-full bg-pink-500 h-1/4 rounded-t-lg"></div>
</div>
<div className="flex-1 bg-white/5 h-[60%] rounded-t-lg relative group transition-all hover:bg-white/10">
<div className="absolute bottom-0 w-full bg-blue-600 h-4/5 rounded-t-lg"></div>
</div>
<div className="flex-1 bg-white/5 h-[90%] rounded-t-lg relative group transition-all hover:bg-white/10">
<div className="absolute bottom-0 w-full bg-blue-600 h-[85%] rounded-t-lg"></div>
<div className="absolute bottom-0 w-full bg-pink-500 h-[10%] rounded-t-lg"></div>
</div>
<div className="flex-1 bg-white/5 h-[40%] rounded-t-lg relative group transition-all hover:bg-white/10">
<div className="absolute bottom-0 w-full bg-blue-600 h-full rounded-t-lg"></div>
</div>
</div>
<div className="flex justify-between mt-4 px-2">
<span className="text-[10px] font-bold text-slate-500">MON</span>
<span className="text-[10px] font-bold text-slate-500">TUE</span>
<span className="text-[10px] font-bold text-slate-500">WED</span>
<span className="text-[10px] font-bold text-slate-500">THU</span>
<span className="text-[10px] font-bold text-slate-500">FRI</span>
<span className="text-[10px] font-bold text-slate-500">SAT</span>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-6">
<div className="bg-surface-container-low rounded-3xl p-6 flex-1">
<h4 className="text-sm font-black text-on-surface uppercase tracking-wider mb-6">Trending Courses</h4>
<div className="space-y-4">
<div className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">directions_car</span>
</div>
<div>
<p className="text-sm font-bold">Advanced Night Driving</p>
<p className="text-[10px] text-slate-500">24 New Enrollments this week</p>
</div>
</div>
<span className="material-symbols-outlined text-emerald-500">trending_up</span>
</div>
<div className="flex items-center justify-between group cursor-pointer">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">local_shipping</span>
</div>
<div>
<p className="text-sm font-bold">Class C Heavy Vehicle</p>
<p className="text-[10px] text-slate-500">18 New Enrollments this week</p>
</div>
</div>
<span className="material-symbols-outlined text-slate-300">trending_flat</span>
</div>
</div>
</div>
<div className="bg-surface-container-highest rounded-3xl p-6 flex items-center gap-4 relative overflow-hidden">
<div className="flex-1 relative z-10">
<p className="text-[10px] font-black text-primary-container uppercase tracking-widest mb-1">Global Success Rate</p>
<p className="text-2xl font-black text-on-surface tracking-tighter">88.5% Passing</p>
</div>
<div className="w-16 h-16 rounded-full border-4 border-primary border-t-slate-200 flex items-center justify-center relative z-10">
<span className="text-xs font-black">A+</span>
</div>
<div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
<span className="material-symbols-outlined text-[120px]">military_tech</span>
</div>
</div>
</div>
</div>

<div>
<h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-1">Admin Power Controls</h4>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<button className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span className="material-symbols-outlined">person_add</span>
</div>
<div>
<span className="block text-sm font-bold">Create User</span>
<span className="block text-[10px] text-slate-400 font-medium">Provision new account</span>
</div>
</div>
<span className="material-symbols-outlined text-slate-300 group-hover:text-primary">chevron_right</span>
</button>
<button className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
<span className="material-symbols-outlined">rule</span>
</div>
<div>
<span className="block text-sm font-bold">Manage Permissions</span>
<span className="block text-[10px] text-slate-400 font-medium">Edit role boundaries</span>
</div>
</div>
<span className="material-symbols-outlined text-slate-300">chevron_right</span>
</button>
<button className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
<span className="material-symbols-outlined">password</span>
</div>
<div>
<span className="block text-sm font-bold">Reset Password</span>
<span className="block text-[10px] text-slate-400 font-medium">Force credentials reset</span>
</div>
</div>
<span className="material-symbols-outlined text-slate-300">chevron_right</span>
</button>
<button className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-error-container/20 flex items-center justify-center text-error group-hover:bg-error group-hover:text-white transition-colors">
<span className="material-symbols-outlined">logout</span>
</div>
<div>
<span className="block text-sm font-bold">Revoke Sessions</span>
<span className="block text-[10px] text-slate-400 font-medium">Logout all global users</span>
</div>
</div>
<span className="material-symbols-outlined text-slate-300">chevron_right</span>
</button>
</div>
</div>
</main>

<button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
<span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
</button>
    </>
  );
};

export default AdminDashboard;
