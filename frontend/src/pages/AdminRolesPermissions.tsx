import { AdminSidebar } from '../components/AdminSidebar';
import { AdminNavbar } from '../components/AdminNavbar';

const AdminRolesPermissions = () => {
  return (
    <>

<AdminSidebar />

<main className="pl-64 min-h-screen">
<AdminNavbar />

<div className="p-8 max-w-7xl mx-auto">

<div className="mb-10 relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-primary to-primary-container text-white shadow-xl">
<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
<div className="relative z-10">
<div className="flex items-center gap-3 mb-2">
<span className="material-symbols-outlined bg-white/20 p-2 rounded-xl text-white" data-icon="security">security</span>
<h2 className="text-3xl font-extrabold tracking-tighter">Phân quyền &amp; Vai trò (RBAC)</h2>
</div>
<p className="text-white/80 max-w-2xl text-lg leading-relaxed font-light">
                        Quản lý quyền truy cập của người dùng dựa trên vai trò. Thiết lập các ranh giới bảo mật và đảm bảo mỗi thành viên chỉ truy cập vào các tài nguyên cần thiết để vận hành hiệu quả.
                    </p>
</div>
</div>

<div className="grid grid-cols-12 gap-8">

<div className="col-span-12 lg:col-span-4 space-y-4">
<div className="bg-surface-container-low p-6 rounded-3xl">
<h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6">Danh sách vai trò</h3>
<div className="space-y-3">

<button className="w-full text-left p-4 rounded-2xl bg-surface-container-lowest hover:bg-white transition-all group border border-transparent hover:border-primary-fixed">
<div className="flex justify-between items-start mb-1">
<span className="font-bold text-on-surface group-hover:text-primary transition-colors">Super Admin</span>
<span className="material-symbols-outlined text-primary text-sm" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
</div>
<p className="text-xs text-on-surface-variant font-medium">Toàn quyền truy cập hệ thống cao nhất.</p>
</button>

<button className="w-full text-left p-4 rounded-2xl bg-surface-container-lowest hover:bg-white transition-all group border border-transparent hover:border-primary-fixed">
<div className="flex justify-between items-start mb-1">
<span className="font-bold text-on-surface group-hover:text-primary transition-colors">Manager</span>
<span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="admin_panel_settings">admin_panel_settings</span>
</div>
<p className="text-xs text-on-surface-variant font-medium">Quản lý khóa học, học viên và báo cáo.</p>
</button>

<button className="w-full text-left p-4 rounded-2xl bg-primary text-white transition-all ring-4 ring-primary/10 shadow-lg scale-[1.02]">
<div className="flex justify-between items-start mb-1">
<span className="font-bold">Instructor</span>
<span className="material-symbols-outlined text-white text-sm" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
</div>
<p className="text-xs text-white/80 font-medium">Quản lý lịch dạy và đánh giá học viên.</p>
</button>

<button className="w-full text-left p-4 rounded-2xl bg-surface-container-lowest hover:bg-white transition-all group border border-transparent hover:border-primary-fixed">
<div className="flex justify-between items-start mb-1">
<span className="font-bold text-on-surface group-hover:text-primary transition-colors">Student</span>
<span className="material-symbols-outlined text-on-surface-variant text-sm" data-icon="person">person</span>
</div>
<p className="text-xs text-on-surface-variant font-medium">Xem khóa học, lịch học và kết quả cá nhân.</p>
</button>
</div>
</div>

<div className="bg-primary-container p-6 rounded-3xl text-white">
<p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-4">Thống kê người dùng</p>
<div className="flex items-end justify-between">
<div>
<h4 className="text-3xl font-black -tracking-tight">124</h4>
<p className="text-sm font-medium opacity-80">Instructors hiện tại</p>
</div>
<div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
<span className="material-symbols-outlined text-2xl" data-icon="monitoring">monitoring</span>
</div>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-8">
<div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-outline-variant/10 overflow-hidden flex flex-col h-full">
<div className="p-8 border-b border-surface-container-high">
<div className="flex justify-between items-center">
<div>
<h3 className="text-2xl font-extrabold text-on-surface tracking-tight">Quyền hạn cho Instructor</h3>
<p className="text-on-surface-variant text-sm mt-1">Tùy chỉnh quyền hạn chi tiết cho nhóm giáo viên hướng dẫn.</p>
</div>
<span className="px-4 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold uppercase tracking-widest">Draft Mode</span>
</div>
</div>
<div className="p-8 flex-1 space-y-10">

<section>
<div className="flex items-center gap-2 mb-6">
<div className="w-1.5 h-6 bg-primary rounded-full"></div>
<h4 className="text-lg font-bold text-on-surface">Nhóm Core Permissions</h4>
</div>
<div className="grid gap-4">

<label className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl cursor-pointer hover:bg-surface-container-high transition-colors">
<div className="flex items-center gap-4">
<div className="p-2 bg-white rounded-lg shadow-sm">
<span className="material-symbols-outlined text-primary" data-icon="visibility">visibility</span>
</div>
<div>
<p className="font-semibold text-on-surface">Xem khóa học</p>
<p className="text-xs text-on-surface-variant">Cho phép truy cập danh sách và chi tiết các khóa học đang mở.</p>
</div>
</div>
<div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
<input defaultChecked={true} className="opacity-0 w-0 h-0 peer" type="checkbox"/>
<span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-300 rounded-full transition-all duration-300 peer-checked:bg-primary before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6"></span>
</div>
</label>

<label className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl cursor-pointer hover:bg-surface-container-high transition-colors">
<div className="flex items-center gap-4">
<div className="p-2 bg-white rounded-lg shadow-sm">
<span className="material-symbols-outlined text-primary" data-icon="how_to_reg">how_to_reg</span>
</div>
<div>
<p className="font-semibold text-on-surface">Duyệt học viên</p>
<p className="text-xs text-on-surface-variant">Cho phép xác nhận đăng ký của học viên vào lớp học tương ứng.</p>
</div>
</div>
<div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
<input defaultChecked={true} className="opacity-0 w-0 h-0 peer" type="checkbox"/>
<span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-300 rounded-full transition-all duration-300 peer-checked:bg-primary before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6"></span>
</div>
</label>

<label className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl cursor-pointer hover:bg-surface-container-high transition-colors">
<div className="flex items-center gap-4">
<div className="p-2 bg-white rounded-lg shadow-sm">
<span className="material-symbols-outlined text-primary" data-icon="calendar_month">calendar_month</span>
</div>
<div>
<p className="font-semibold text-on-surface">Xem lịch dạy</p>
<p className="text-xs text-on-surface-variant">Truy cập lịch trình giảng dạy cá nhân và hệ thống phòng học.</p>
</div>
</div>
<div className="relative inline-block w-12 h-6 transition duration-200 ease-in">
<input defaultChecked={true} className="opacity-0 w-0 h-0 peer" type="checkbox"/>
<span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-slate-300 rounded-full transition-all duration-300 peer-checked:bg-primary before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6"></span>
</div>
</label>
</div>
</section>

<section>
<div className="flex items-center gap-2 mb-6">
<div className="w-1.5 h-6 bg-tertiary rounded-full"></div>
<h4 className="text-lg font-bold text-on-surface">Nhóm Advanced Permissions</h4>
</div>
<div className="grid gap-4 opacity-60 grayscale-[0.5]">

<div className="flex items-center justify-between p-4 bg-surface-container-high rounded-2xl cursor-not-allowed">
<div className="flex items-center gap-4">
<div className="p-2 bg-white rounded-lg shadow-sm">
<span className="material-symbols-outlined text-tertiary" data-icon="edit_square">edit_square</span>
</div>
<div>
<p className="font-semibold text-on-surface">Chỉnh sửa kết quả thi</p>
<p className="text-xs text-on-surface-variant">Yêu cầu quyền Manager để thay đổi điểm số sau khi nộp.</p>
</div>
</div>
<div className="relative inline-block w-12 h-6 opacity-40">
<div className="absolute cursor-not-allowed top-0 left-0 right-0 bottom-0 bg-slate-400 rounded-full before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full transition-all"></div>
</div>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container-high rounded-2xl cursor-not-allowed">
<div className="flex items-center gap-4">
<div className="p-2 bg-white rounded-lg shadow-sm">
<span className="material-symbols-outlined text-tertiary" data-icon="history_edu">history_edu</span>
</div>
<div>
<p className="font-semibold text-on-surface">Truy cập Audit Logs</p>
<p className="text-xs text-on-surface-variant">Xem nhật ký hoạt động hệ thống của các giáo viên khác.</p>
</div>
</div>
<div className="relative inline-block w-12 h-6 opacity-40">
<div className="absolute cursor-not-allowed top-0 left-0 right-0 bottom-0 bg-slate-400 rounded-full before:content-[''] before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full transition-all"></div>
</div>
</div>
</div>
</section>
</div>

<div className="p-8 bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2 text-on-surface-variant italic text-sm">
<span className="material-symbols-outlined text-sm" data-icon="info">info</span>
                                Lần cập nhật cuối: 12 phút trước
                            </div>
<div className="flex items-center gap-3">
<button className="px-6 py-2.5 rounded-xl font-bold text-on-surface hover:bg-surface-container-high transition-all active:scale-95 duration-150">
                                    Hủy thay đổi
                                </button>
<button className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-150">
                                    Lưu thay đổi
                                </button>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
    </>
  );
};

export default AdminRolesPermissions;
