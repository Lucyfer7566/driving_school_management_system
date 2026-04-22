import { AdminSidebar } from '../components/AdminSidebar';
import { AdminNavbar } from '../components/AdminNavbar';

const AdminAuditLogs = () => {
  return (
    <>

<AdminSidebar />

<main className="flex-1 ml-64 p-8 bg-surface">
<AdminNavbar />

<section className="mb-8 bg-surface-container-low rounded-3xl p-6 shadow-sm border border-outline-variant/10">
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

<div className="flex flex-col gap-2">
<label className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest px-1">Search User / ID</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline">search</span>
<input className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm" placeholder="e.g. ADM-0921" type="text"/>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest px-1">Action Type</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline">category</span>
<select className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 appearance-none transition-all text-sm">
<option>All Actions</option>
<option>Login</option>
<option>Reset Pass</option>
<option>Data Deletion</option>
<option>Course Edit</option>
</select>
<span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest px-1">Date Range</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline">calendar_today</span>
<input className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all text-sm" type="date"/>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="text-[10px] uppercase font-black text-on-surface-variant tracking-widest px-1">Risk Level</label>
<div className="flex gap-2">
<button className="flex-1 py-3 bg-surface-container-lowest rounded-xl text-xs font-bold text-on-surface-variant hover:bg-primary-fixed hover:text-primary transition-colors">Any</button>
<button className="flex-1 py-3 bg-surface-container-lowest rounded-xl text-xs font-bold text-error/80 hover:bg-error-container hover:text-error transition-colors">High Only</button>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-xl shadow-primary/5 border border-outline-variant/15">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-high/50">
<th className="px-6 py-5 text-[10px] uppercase font-black text-on-surface-variant tracking-widest border-b border-outline-variant/10">Timestamp</th>
<th className="px-6 py-5 text-[10px] uppercase font-black text-on-surface-variant tracking-widest border-b border-outline-variant/10">User</th>
<th className="px-6 py-5 text-[10px] uppercase font-black text-on-surface-variant tracking-widest border-b border-outline-variant/10">Action Description</th>
<th className="px-6 py-5 text-[10px] uppercase font-black text-on-surface-variant tracking-widest border-b border-outline-variant/10">Network Details</th>
<th className="px-6 py-5 text-[10px] uppercase font-black text-on-surface-variant tracking-widest border-b border-outline-variant/10 text-center">Status</th>
<th className="px-6 py-5 text-[10px] uppercase font-black text-on-surface-variant tracking-widest border-b border-outline-variant/10 text-center">Risk</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container">

<tr className="hover:bg-primary/5 transition-colors group">
<td className="px-6 py-5">
<div className="flex flex-col">
<span className="text-sm font-bold text-on-surface">2023-11-20</span>
<span className="text-xs text-outline tracking-tight">14:22:45</span>
</div>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<img className="w-9 h-9 rounded-full bg-surface-container-high object-cover" data-alt="professional portrait of a senior administrator in a navy suit with neutral background soft lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnbek0EkjyO7NEkCjuuMy07cRoeLLJGVG0fKBlnAo3oH8sV6P9pj5v2nU_VxB_Z8LVJ-Z7Rl3hb4R-O7htNqNSroX-IX_ov6ayF6gXwFYU4LXBb-0-9BHLC6MXyoWjA9oYfObxnvd43Os0eCuiz084YuTkNWyk8v5Lj72wK5-_9746k1fn6GmR28pTsbhWCqZgAw2czE42wUSgfbJqs7w12Db1Gz39Fof3K6dz6OWA92Ifx1OteysWaAm748fjgj2Txt28BRYZ7-s"/>
<div className="flex flex-col">
<span className="text-sm font-bold text-on-surface">Hoàng Minh Anh</span>
<span className="text-[10px] font-black text-primary-container tracking-wider uppercase">System Admin</span>
</div>
</div>
</td>
<td className="px-6 py-5">
<span className="text-sm font-medium text-on-surface-variant leading-relaxed">Xóa dữ liệu học viên (ID: HV-552)</span>
</td>
<td className="px-6 py-5">
<div className="flex flex-col gap-1">
<span className="text-xs font-mono text-outline">192.168.1.105</span>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm text-primary">browser_updated</span>
<span className="text-[10px] font-bold text-on-surface-variant">Chrome on Windows</span>
</div>
</div>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black tracking-widest uppercase">Thành công</span>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-3 py-1 bg-error-container text-on-error-container rounded-lg text-[10px] font-black tracking-widest uppercase border border-error/10">High</span>
</td>
</tr>

<tr className="hover:bg-primary/5 transition-colors group">
<td className="px-6 py-5">
<div className="flex flex-col">
<span className="text-sm font-bold text-on-surface">2023-11-20</span>
<span className="text-xs text-outline tracking-tight">14:15:10</span>
</div>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<img className="w-9 h-9 rounded-full bg-surface-container-high object-cover" data-alt="close-up profile of a female instructor with warm smile and soft office environment background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa-cWomMENiJg9Bt4svn28N2T4NdJGaUlXVkQEeTUXe-ulsjBnqb-wA-jNmnoABfC_82MrUoEKnUjOtSDikH_WoCdLmKXvcXxAmRbx_53OU4z-lOHsHNoB7Ybcq84Za8cZUewhm9jHCjuXd8_AAY4TuUSQW9Rnbpr_N6PTLt5nipSyib9ckRM0b1mxHxAJ7dW3hs1lBYA_A2XzwX-aloXZYr3QzD4CXzNG4i_aUl8u6wRBnlDzXcaf1XZuh_fipVbE7Mn2JL_iqLU"/>
<div className="flex flex-col">
<span className="text-sm font-bold text-on-surface">Lê Thị Mai</span>
<span className="text-[10px] font-black text-secondary tracking-wider uppercase">Instructor</span>
</div>
</div>
</td>
<td className="px-6 py-5">
<span className="text-sm font-medium text-on-surface-variant leading-relaxed">Đăng nhập hệ thống</span>
</td>
<td className="px-6 py-5">
<div className="flex flex-col gap-1">
<span className="text-xs font-mono text-outline">172.16.25.42</span>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm text-primary">smartphone</span>
<span className="text-[10px] font-bold text-on-surface-variant">Safari on iOS</span>
</div>
</div>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black tracking-widest uppercase">Thành công</span>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-3 py-1 bg-primary-fixed text-primary rounded-lg text-[10px] font-black tracking-widest uppercase border border-primary/10">Low</span>
</td>
</tr>

<tr className="hover:bg-primary/5 transition-colors group">
<td className="px-6 py-5">
<div className="flex flex-col">
<span className="text-sm font-bold text-on-surface">2023-11-20</span>
<span className="text-xs text-outline tracking-tight">13:58:33</span>
</div>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center">
<span className="material-symbols-outlined text-outline">person</span>
</div>
<div className="flex flex-col">
<span className="text-sm font-bold text-on-surface italic">Unknown</span>
<span className="text-[10px] font-black text-outline tracking-wider uppercase">Guest</span>
</div>
</div>
</td>
<td className="px-6 py-5">
<span className="text-sm font-medium text-on-surface-variant leading-relaxed">Đổi mật khẩu thất bại (ID: ADM-112)</span>
</td>
<td className="px-6 py-5">
<div className="flex flex-col gap-1">
<span className="text-xs font-mono text-error font-bold underline">103.22.41.119</span>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm text-error">public</span>
<span className="text-[10px] font-bold text-error tracking-tight">Unknown Browser</span>
</div>
</div>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-3 py-1 bg-error-container text-error rounded-full text-[10px] font-black tracking-widest uppercase">Thất bại</span>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-3 py-1 bg-tertiary-fixed text-tertiary rounded-lg text-[10px] font-black tracking-widest uppercase border border-tertiary/20">Medium</span>
</td>
</tr>

<tr className="hover:bg-primary/5 transition-colors group">
<td className="px-6 py-5">
<div className="flex flex-col">
<span className="text-sm font-bold text-on-surface">2023-11-20</span>
<span className="text-xs text-outline tracking-tight">12:10:02</span>
</div>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-3">
<img className="w-9 h-9 rounded-full bg-surface-container-high object-cover" data-alt="focused young man in casual office attire working on a laptop with minimalist office aesthetics" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa-R4Woc3tP2Xv9V02q6resLhGV6pKNrWcioUNlVICZuv9aiSG1g_odfuUfvt1spLLx1hvvUbmqUZFYigBeSqwq3qL_SoLAlp6DV_uo6xzDD1xou-lDIMMnm_JzC2Nm3duoEAilpH_uIluiOtJ0he4ybwzXMyyevEtF16RzUlcpulkywbTPS-4mj-7XRnQj5iD2V5NLh5CZn5FZ-Cas0A6nf0wBED3veH0vRm2IWJYMakMsMUg6YE7DmXAsCpnqPE6gfh-Bg23Vts"/>
<div className="flex flex-col">
<span className="text-sm font-bold text-on-surface">Nguyễn Văn Nam</span>
<span className="text-[10px] font-black text-secondary-container text-on-secondary-container tracking-wider uppercase">Staff</span>
</div>
</div>
</td>
<td className="px-6 py-5">
<span className="text-sm font-medium text-on-surface-variant leading-relaxed">Đổi mật khẩu</span>
</td>
<td className="px-6 py-5">
<div className="flex flex-col gap-1">
<span className="text-xs font-mono text-outline">192.168.1.210</span>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm text-primary">laptop_chromebook</span>
<span className="text-[10px] font-bold text-on-surface-variant">Edge on MacOS</span>
</div>
</div>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black tracking-widest uppercase">Thành công</span>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-3 py-1 bg-primary-fixed text-primary rounded-lg text-[10px] font-black tracking-widest uppercase border border-primary/10">Low</span>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-6 py-4 bg-surface-container-low flex justify-between items-center">
<span className="text-xs font-medium text-on-surface-variant">Showing 1 to 25 of 1,244 entries</span>
<div className="flex gap-1">
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors text-xs font-bold">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors text-xs font-bold">3</button>
<span className="px-2 self-center text-outline">...</span>
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors text-xs font-bold">50</button>
<button className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</section>

<section className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
<div className="md:col-span-1 bg-primary-fixed/30 rounded-2xl p-5 border border-primary/10">
<div className="flex items-center justify-between mb-4">
<span className="material-symbols-outlined text-primary p-2 bg-white rounded-lg shadow-sm">security</span>
<span className="text-[10px] font-black text-primary tracking-widest uppercase">Security Score</span>
</div>
<h4 className="text-2xl font-black text-on-primary-fixed-variant leading-tight">98.2%</h4>
<p className="text-[10px] font-bold text-primary/70 mt-1">Excellent System Health</p>
</div>
<div className="md:col-span-1 bg-surface-container-high rounded-2xl p-5">
<div className="flex items-center justify-between mb-4">
<span className="material-symbols-outlined text-on-surface-variant p-2 bg-white/50 rounded-lg">history</span>
<span className="text-[10px] font-black text-on-surface-variant tracking-widest uppercase">Daily Logs</span>
</div>
<h4 className="text-2xl font-black text-on-surface leading-tight">1,244</h4>
<p className="text-[10px] font-bold text-on-surface-variant/70 mt-1">+12% from yesterday</p>
</div>
<div className="md:col-span-2 glass-panel rounded-3xl p-5 border border-white relative overflow-hidden flex flex-col justify-center">
<div className="relative z-10">
<h4 className="text-lg font-black text-primary mb-1">Cảnh báo rủi ro cao</h4>
<p className="text-xs text-on-surface-variant leading-relaxed max-w-[70%]">Phát hiện 3 lần đổi mật khẩu thất bại liên tiếp từ địa chỉ IP 103.22.41.119 vào lúc 13:58:33.</p>
</div>
<div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/10 to-transparent"></div>
<button className="mt-4 w-fit px-4 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-md shadow-primary/30">Investigate Now</button>
</div>
</section>
</main>

<div className="fixed bottom-8 right-8 z-50">
<button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
<span className="material-symbols-outlined text-3xl">question_mark</span>
</button>
</div>
    </>
  );
};

export default AdminAuditLogs;
