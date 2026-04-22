import { AdminSidebar } from '../components/AdminSidebar';
import { AdminNavbar } from '../components/AdminNavbar';

const AdminSecuritySettings = () => {
  return (
    <>

<AdminSidebar />

<main className="ml-64 min-h-screen flex flex-col">
<AdminNavbar />

<div className="p-8 max-w-7xl mx-auto w-full flex-1">

<div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Cấu hình Bảo mật Toàn hệ thống</h2>
<p className="text-on-surface-variant max-w-2xl">Quản lý các quy tắc truy cập, chính sách mật khẩu và xác thực đa yếu tố để bảo vệ dữ liệu trường lái.</p>
</div>
<div className="flex items-center gap-3">
<div className="flex -space-x-2">
<div className="h-8 w-8 rounded-full ring-2 ring-surface bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-sm" data-icon="lock" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
</div>
<div className="h-8 w-8 rounded-full ring-2 ring-surface bg-green-100 flex items-center justify-center text-green-700">
<span className="material-symbols-outlined text-sm" data-icon="verified_user" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
</div>
</div>
<span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full uppercase tracking-wider">Hệ thống an toàn</span>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

<div className="md:col-span-7 glass-card rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300">
<div className="flex items-center gap-4 mb-8">
<div className="p-3 bg-primary/10 rounded-2xl text-primary">
<span className="material-symbols-outlined text-3xl" data-icon="security" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
</div>
<div>
<h3 className="text-xl font-bold tracking-tight">Cấu hình MFA (Xác thực 2 yếu tố)</h3>
<p className="text-sm text-on-surface-variant">Lớp bảo vệ bổ sung cho các tài khoản đặc quyền.</p>
</div>
</div>
<div className="space-y-6 flex-1">

<div className="flex items-center justify-between group">
<div className="max-w-[80%]">
<p className="font-semibold text-on-surface">Bắt buộc MFA cho Admin Roles</p>
<p className="text-xs text-on-surface-variant mt-1">Yêu cầu mã OTP qua Email hoặc Authenticator cho tất cả quản trị viên.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked={true} className="sr-only peer" type="checkbox"/>
<div className="w-12 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>

<div className="flex items-center justify-between group">
<div className="max-w-[80%]">
<p className="font-semibold text-on-surface">Cảnh báo người dùng chưa bật MFA</p>
<p className="text-xs text-on-surface-variant mt-1">Hiển thị thông báo nhắc nhở tại màn hình Dashboard của giảng viên và học viên.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-12 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
<div className="mt-8 p-4 bg-primary-fixed rounded-2xl flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-xl" data-icon="info">info</span>
<p className="text-xs text-on-primary-fixed-variant leading-relaxed">Sử dụng Google Authenticator hoặc Microsoft Authenticator để có mức độ bảo mật cao nhất.</p>
</div>
</div>

<div className="md:col-span-5 bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex flex-col">
<div className="flex items-center gap-4 mb-8">
<div className="p-3 bg-secondary/10 rounded-2xl text-secondary">
<span className="material-symbols-outlined text-3xl" data-icon="timer">timer</span>
</div>
<div>
<h3 className="text-xl font-bold tracking-tight">Quản lý Phiên làm việc</h3>
<p className="text-sm text-on-surface-variant">Kiểm soát thời gian duy trì đăng nhập.</p>
</div>
</div>
<div className="space-y-6">
<div>
<label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Thời gian timeout</label>
<div className="relative">
<select className="w-full bg-surface-container-lowest border-none rounded-xl py-3 px-4 text-sm appearance-none focus:ring-2 focus:ring-primary cursor-pointer">
<option>15 mins</option>
<option>30 mins</option>
<option>1 hour</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" data-icon="expand_more">expand_more</span>
</div>
</div>
<div>
<label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Giới hạn số thiết bị đăng nhập</label>
<div className="relative">
<input className="w-full bg-surface-container-lowest border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary" type="number" value="3"/>
<span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">Thiết bị</span>
</div>
<p className="text-[10px] text-on-surface-variant mt-2 px-1">Tự động đăng xuất phiên cũ nhất khi vượt quá giới hạn.</p>
</div>
</div>
</div>

<div className="md:col-span-12 bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/15 shadow-sm">
<div className="flex items-center gap-4 mb-10">
<div className="p-3 bg-tertiary/10 rounded-2xl text-tertiary">
<span className="material-symbols-outlined text-3xl" data-icon="password" style={{ fontVariationSettings: "'FILL' 1" }}>password</span>
</div>
<div>
<h3 className="text-xl font-bold tracking-tight">Chính sách Mật khẩu</h3>
<p className="text-sm text-on-surface-variant">Thiết lập độ phức tạp bắt buộc cho tất cả tài khoản người dùng.</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="space-y-2">
<label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Yêu cầu độ dài tối thiểu</label>
<input className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary" type="number" value="8"/>
<p className="text-[10px] text-on-surface-variant">Khuyến nghị: 8-12 ký tự.</p>
</div>
<div className="space-y-2">
<label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">Hạn chu kỳ đổi password</label>
<div className="relative">
<select className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-sm appearance-none focus:ring-2 focus:ring-primary cursor-pointer">
<option>30 days</option>
<option>60 days</option>
<option>90 days</option>
<option>Never</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" data-icon="calendar_month">calendar_month</span>
</div>
</div>
<div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
<div>
<p className="font-semibold text-sm">Yêu cầu ký tự đặc biệt</p>
<p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter">@ # $ % ^ &amp; *</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked={true} className="sr-only peer" type="checkbox"/>
<div className="w-12 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</div>

<div className="md:col-span-12 relative overflow-hidden rounded-3xl h-48 flex items-center justify-center group">
<div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105" data-alt="abstract close-up of a secure server hardware with glowing blue LED lights and circuit board details in a futuristic dark room" >
</div>
<div className="relative z-10 text-center px-6">
<h4 className="text-white text-xl font-bold mb-2">Trung tâm Kiểm soát Dữ liệu</h4>
<p className="text-primary-container text-sm max-w-lg mx-auto">Hệ thống Precision Navigator của bạn hiện đang chạy phiên bản bảo mật 4.2.1-stable với mã hóa AES-256 đầu cuối.</p>
</div>
</div>
</div>

<div className="mt-12 flex items-center justify-end gap-4 pb-10">
<button className="px-6 py-3 text-sm font-semibold text-on-surface-variant hover:bg-slate-200 transition-all rounded-xl">
                    Hủy bỏ thay đổi
                </button>
<button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="save" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                    Lưu Cấu Hình
                </button>
</div>
</div>
</main>

<div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-on-surface text-surface px-6 py-4 rounded-2xl shadow-2xl border border-white/10">
<div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
<span className="material-symbols-outlined text-white text-lg" data-icon="done">done</span>
</div>
<div>
<p className="text-xs font-bold leading-none">Chế độ tự động lưu</p>
<p className="text-[10px] opacity-70">Các bản nháp đã được lưu vào 10:45 AM</p>
</div>
</div>
    </>
  );
};

export default AdminSecuritySettings;
