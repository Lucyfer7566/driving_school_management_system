import { AdminSidebar } from '../components/AdminSidebar';
import { AdminNavbar } from '../components/AdminNavbar';

const AdminUserManagement = () => {
  return (
    <>

<AdminSidebar />

<main className="ml-64 pt-20 p-8 min-h-screen">
<AdminNavbar />

<div className="flex justify-between items-end mb-10">
<div>
<h2 className="text-3xl font-extrabold tracking-tighter text-on-surface mb-1">Quản lý Người Dùng</h2>
<p className="text-on-surface-variant/70 font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="group">group</span>
                    2,481 accounts registered in the system
                </p>
</div>
<button className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2">
<span className="material-symbols-outlined text-lg" data-icon="add">add</span>
                Thêm User mới
            </button>
</div>

<div className="bg-surface-container-low rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-6">
<div className="flex items-center gap-3">
<label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Vai trò:</label>
<select className="bg-surface-container-lowest border-none text-sm font-semibold rounded-lg py-2 px-4 focus:ring-2 focus:ring-primary/20 min-w-[140px]">
<option>Tất cả</option>
<option>Admin</option>
<option>Học viên</option>
<option>Giảng viên</option>
</select>
</div>
<div className="flex items-center gap-3">
<label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Trạng thái:</label>
<select className="bg-surface-container-lowest border-none text-sm font-semibold rounded-lg py-2 px-4 focus:ring-2 focus:ring-primary/20 min-w-[140px]">
<option>Tất cả</option>
<option>Active</option>
<option>Locked</option>
<option>Suspended</option>
</select>
</div>
<div className="flex-1"></div>
<div className="flex items-center gap-2 text-on-surface-variant/60">
<span className="text-xs font-bold italic">Hiển thị 50 bản ghi trên mỗi trang</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low/50">
<th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Học viên &amp; Thông tin</th>
<th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-center">Vai trò</th>
<th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-center">Trạng thái</th>
<th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Truy cập cuối</th>
<th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-right">Hành động</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-container-low">

<tr className="hover:bg-surface-container-low/30 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Close up portrait of a male student with friendly expression in natural daylight environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADfv3V7tGhdOYYFIFqt3dbt0pS1nZ_CYw0NS8Qntnk0mBgHx9m4FnDFLvtyOdWrCx01xyYaVDtJTlwVW8ae6SmmiEhMNaMr8jqnj2l6YNx1sCVIFW4Pp4u-l4rVKu6bn44J-ozfYqbarv7JAlqnBnpmYt2bNjfV6Bt0GWIIZIJfcNWixzN-nI-W8dmCDgI-rsbtrVkjJ_01-fclXs7IasL8a7JW3FPCp_105CmlGN75jqFjNSvUueYpgKYpwAx3yF_CykSqfTYDI4"/>
<div>
<h4 className="text-sm font-bold text-on-surface">Nguyễn Văn Nam</h4>
<p className="text-xs text-on-surface-variant">nam.nguyen@email.com</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-center">
<span className="text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full">Học viên</span>
</td>
<td className="px-6 py-4 text-center">
<span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-100/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Active
                            </span>
</td>
<td className="px-6 py-4">
<div className="text-xs font-medium text-on-surface-variant">
                                14:20 • 24/05/2024
                                <p className="text-[10px] font-normal opacity-60">IP: 192.168.1.12</p>
</div>
</td>
<td className="px-6 py-4">
<div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit">
<span className="material-symbols-outlined text-lg" data-icon="edit">edit</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Reset Password">
<span className="material-symbols-outlined text-lg" data-icon="lock_reset">lock_reset</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title="Revoke Session">
<span className="material-symbols-outlined text-lg" data-icon="logout">logout</span>
</button>
<button className="p-2 text-on-surface-variant hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Lock Account">
<span className="material-symbols-outlined text-lg" data-icon="lock">lock</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/30 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Portrait of a female professional instructor with a warm smile, corporate profile style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSXXXfXhxPVauSOKYq37ydT1xwonKcMFvdmk6N8fdDyFdH-FnQOGkN_KqJBz_Y98QRPP1diY73dw3KNOkkwPQHJVPNsBDTdIWTPlr1evfItQvDk42qFumpXNWpDMp7RQWdGkuWoQrpfWQWrOm-meNc3ZBgnwxBVhREztOcX4JF-a8oYrTRkBu8Vkw4FlX1W2yd7VJEyI_Lno6Gbb_TzqkJH9j2kXv1TOz1UQfkWO8j9znUoNw70-qic6nTW3Vig7cCX42LEGApTb8"/>
<div>
<h4 className="text-sm font-bold text-on-surface">Lê Thị Mai Anh</h4>
<p className="text-xs text-on-surface-variant">maianh.le@velocity.edu</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-center">
<span className="text-xs font-semibold text-secondary bg-secondary/5 px-3 py-1 rounded-full">Giảng viên</span>
</td>
<td className="px-6 py-4 text-center">
<span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-700 bg-amber-100/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
<span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                Locked
                            </span>
</td>
<td className="px-6 py-4">
<div className="text-xs font-medium text-on-surface-variant">
                                09:15 • 22/05/2024
                                <p className="text-[10px] font-normal opacity-60">IP: 10.0.0.45</p>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><span className="material-symbols-outlined text-lg" data-icon="edit">edit</span></button>
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><span className="material-symbols-outlined text-lg" data-icon="lock_reset">lock_reset</span></button>
<button className="p-2 text-on-surface-variant hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><span className="material-symbols-outlined text-lg" data-icon="lock_open">lock_open</span></button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/30 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-2xl bg-surface-dim flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="person">person</span>
</div>
<div>
<h4 className="text-sm font-bold text-on-surface">Trần Minh Hoàng</h4>
<p className="text-xs text-on-surface-variant">hoang.tm@email.com</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-center">
<span className="text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full">Học viên</span>
</td>
<td className="px-6 py-4 text-center">
<span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-red-700 bg-red-100/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
<span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                Suspended
                            </span>
</td>
<td className="px-6 py-4">
<div className="text-xs font-medium text-on-surface-variant">
                                11:45 • 15/04/2024
                                <p className="text-[10px] font-normal opacity-60">Policy violation</p>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><span className="material-symbols-outlined text-lg" data-icon="edit">edit</span></button>
<button className="p-2 text-on-surface-variant hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><span className="material-symbols-outlined text-lg" data-icon="settings_backup_restore">settings_backup_restore</span></button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/30 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<img className="w-12 h-12 rounded-2xl object-cover shadow-sm" data-alt="Professional woman portrait with elegant lighting and modern urban background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIqm5Twu2bMuuOMFN9bY90K-4mBC4X2h-v4szCAxT07nIbDePRyVwb-3o1zIlFY0rjo_siO2AxA6EMCA3jXTyniaPMcolyjjOIGahB24nQT81hsrG52q3AME4BAXNaRUH1Am8nTNybxNbVB1Tn5A-NKS8nvWZUQCN1tWGBDfZCuP7UGWLlq8gjHId5eXewsPxHXupsCLhFQBsTp8Lm7124Q6Xq_jsBv5M81fPylVeMrJpvWG7Ak_3-kpSCXFfKLQEFrq0H7QUDIUE"/>
<div>
<h4 className="text-sm font-bold text-on-surface">Phạm Khánh Linh</h4>
<p className="text-xs text-on-surface-variant">linh.pk@velocity.edu</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-center">
<span className="text-xs font-semibold text-on-surface bg-surface-container-highest px-3 py-1 rounded-full">Admin</span>
</td>
<td className="px-6 py-4 text-center">
<span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-100/50 px-2.5 py-1 rounded-md uppercase tracking-wider">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Active
                            </span>
</td>
<td className="px-6 py-4">
<div className="text-xs font-medium text-on-surface-variant">
                                08:30 • Today
                                <p className="text-[10px] font-normal opacity-60">IP: 1.1.1.1</p>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><span className="material-symbols-outlined text-lg" data-icon="edit">edit</span></button>
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-all"><span className="material-symbols-outlined text-lg" data-icon="history">history</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="mt-8 flex justify-between items-center px-4">
<p className="text-xs font-medium text-on-surface-variant">Showing <span className="font-bold">1-10</span> of <span className="font-bold">2,481</span> users</p>
<div className="flex gap-2">
<button className="p-2 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-lg" data-icon="chevron_left">chevron_left</span>
</button>
<button className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs">1</button>
<button className="px-4 py-2 rounded-xl bg-surface-container-low text-on-surface-variant font-bold text-xs hover:bg-surface-container-high transition-colors">2</button>
<button className="px-4 py-2 rounded-xl bg-surface-container-low text-on-surface-variant font-bold text-xs hover:bg-surface-container-high transition-colors">3</button>
<button className="px-4 py-2 rounded-xl bg-surface-container-low text-on-surface-variant font-bold text-xs hover:bg-surface-container-high transition-colors">...</button>
<button className="p-2 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-lg" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</main>

    </>
  );
};

export default AdminUserManagement;
