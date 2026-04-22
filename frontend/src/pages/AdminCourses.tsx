import { AdminSidebar } from '../components/AdminSidebar';
import { AdminNavbar } from '../components/AdminNavbar';

const AdminCourses = () => {
  return (
    <>

<AdminSidebar />

<main className="ml-64 pt-24 px-8 pb-12 min-h-screen">
<AdminNavbar />

<div className="flex justify-between items-end mb-12">
<div>
<nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-2">
<span>Hệ thống</span>
<span className="material-symbols-outlined text-sm">chevron_right</span>
<span className="text-primary font-semibold">Khóa học</span>
</nav>
<h2 className="text-4xl font-extrabold tracking-tight text-primary">Quản lý Khóa học</h2>
<p className="text-on-surface-variant mt-2 text-lg">Theo dõi và điều chỉnh các chương trình đào tạo hiện có.</p>
</div>
<button className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
<span className="material-symbols-outlined">add_circle</span>
<span>+ Thêm khóa học mới</span>
</button>
</div>

<div className="grid grid-cols-12 gap-6">

<div className="col-span-12 lg:col-span-6 xl:col-span-4 group">
<div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-transparent hover:border-primary/10">
<div className="relative h-48 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern automatic transmission gear shifter in a luxury car interior with sleek metallic accents and soft interior lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMTF56p2T_Loyr60wiWsLeNkwgDDWDo2mxZe4u84ppMaAJZkWzmENDY14-VvE6unZzbIVrzdDO9FbYEwXZeHKQ-P76ruhmjT364aT0IUyOs2AWx9qSGomXW-vHzAvZH3J0-kLXkbkahfqXWPCmryiU0Z-rwibcRq56r40as6FxPXFPmCEwl3IIkeX-l-wlidyrg-CRIiNFWW7PulUZWD6lwPiS8y4ej0XKRa5S18mJQgxHSx59BzGjoQdyHRllPGsqe4GyFEf8gio"/>
<div className="absolute top-4 right-4">
<span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Đang tuyển sinh
                            </span>
</div>
</div>
<div className="p-6 flex-1 flex flex-col">
<div className="flex justify-between items-start mb-4">
<div>
<h3 className="text-xl font-bold text-on-surface tracking-tight">Khóa B1 - Số tự động</h3>
<p className="text-on-surface-variant text-sm mt-1">Hạng B11 - Xe số tự động không kinh doanh</p>
</div>
<span className="material-symbols-outlined text-primary-container bg-primary/5 p-2 rounded-lg">directions_car</span>
</div>
<div className="grid grid-cols-2 gap-4 py-4 my-4 border-y border-surface-container-high">
<div className="flex flex-col">
<span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Số học viên</span>
<span className="text-2xl font-black text-primary">124</span>
</div>
<div className="flex flex-col">
<span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Giảng viên</span>
<span className="text-sm font-semibold text-on-surface truncate">Trần Hoàng Nam</span>
</div>
</div>
<div className="mt-auto space-y-3">
<button className="w-full bg-surface-container-high hover:bg-primary-container hover:text-white transition-colors py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">group</span>
                                Danh sách học viên
                            </button>
<div className="grid grid-cols-2 gap-3">
<button className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-base">edit</span>
                                    Chỉnh sửa
                                </button>
<button className="bg-slate-100 hover:bg-error-container hover:text-error text-slate-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-base">archive</span>
                                    Lưu trữ
                                </button>
</div>
</div>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-6 xl:col-span-4 group">
<div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-transparent hover:border-primary/10">
<div className="relative h-48 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Classic manual gear stick in a professional driver training vehicle, neutral lighting with technical focus on the mechanical detail" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkjYVFDNPgV00HCaHwztrS3OQCSjoPSfusvoG4GxpsMYiHQ5E9pS2dDanogsFOgq1maXRr0Mqb9mbuFLDDi75tvlLRkYN9Uh7Uti4B1yOuxSet5UiutBhohReLmyyVr4lu2WccFdIH0p_pkXyUCLApVfYFgUdyW_KVb77az6fRGAOAmSBTglvh7RZCl2xZi6xRLOpAy2j_4NfoeijYOrk65jvyW4jXwJw8S3itz3ElziFMJkquHRi9ycoDHQJow7RTj3wLb0G2hRs"/>
<div className="absolute top-4 right-4">
<span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
<span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Đang dạy
                            </span>
</div>
</div>
<div className="p-6 flex-1 flex flex-col">
<div className="flex justify-between items-start mb-4">
<div>
<h3 className="text-xl font-bold text-on-surface tracking-tight">Khóa B2 - Số sàn</h3>
<p className="text-on-surface-variant text-sm mt-1">Hạng B2 - Đào tạo lái xe chuyên nghiệp</p>
</div>
<span className="material-symbols-outlined text-primary-container bg-primary/5 p-2 rounded-lg">fiber_manual_record</span>
</div>
<div className="grid grid-cols-2 gap-4 py-4 my-4 border-y border-surface-container-high">
<div className="flex flex-col">
<span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Số học viên</span>
<span className="text-2xl font-black text-primary">86</span>
</div>
<div className="flex flex-col">
<span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Giảng viên</span>
<span className="text-sm font-semibold text-on-surface truncate">Lê Minh Tuấn</span>
</div>
</div>
<div className="mt-auto space-y-3">
<button className="w-full bg-surface-container-high hover:bg-primary-container hover:text-white transition-colors py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">group</span>
                                Danh sách học viên
                            </button>
<div className="grid grid-cols-2 gap-3">
<button className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-base">edit</span>
                                    Chỉnh sửa
                                </button>
<button className="bg-slate-100 hover:bg-error-container hover:text-error text-slate-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-base">archive</span>
                                    Lưu trữ
                                </button>
</div>
</div>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-6 xl:col-span-4 group">
<div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-transparent hover:border-primary/10">
<div className="relative h-48 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Large commercial cargo truck on an open road during morning hours, highlighting heavy-duty transportation power and logistics authority" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZOMhM1EKbfWY-ohhQZA4Pz2ZRUnHpV7_ZxiWuxigOMs6_FYVQ3hKAsIq6Ryc8EX4hvg-nZvVCTneZxGXImDwPIdH3NkZTJgsYaxpFq4TflAt0S1jLMZtigE77cCIqLwZ74cdXrQJagb6F-boKfczQJM1xl-NG0Lam-Zf_5v_XYiqX8efWT2bfz2cYyBH_8yDkcO0yUGyUUtQQb09eIn1vnpMgNzrvjRSQx6nZEia0iuuHVPXNuGgr9NKpPw3MKwfujW2mbCrKi0Q"/>
<div className="absolute top-4 right-4">
<span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Đang tuyển sinh
                            </span>
</div>
</div>
<div className="p-6 flex-1 flex flex-col">
<div className="flex justify-between items-start mb-4">
<div>
<h3 className="text-xl font-bold text-on-surface tracking-tight">Khóa C - Xe tải</h3>
<p className="text-on-surface-variant text-sm mt-1">Hạng C - Đào tạo lái xe tải trọng lớn</p>
</div>
<span className="material-symbols-outlined text-primary-container bg-primary/5 p-2 rounded-lg">local_shipping</span>
</div>
<div className="grid grid-cols-2 gap-4 py-4 my-4 border-y border-surface-container-high">
<div className="flex flex-col">
<span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Số học viên</span>
<span className="text-2xl font-black text-primary">45</span>
</div>
<div className="flex flex-col">
<span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">Giảng viên</span>
<span className="text-sm font-semibold text-on-surface truncate">Nguyễn Quốc Huy</span>
</div>
</div>
<div className="mt-auto space-y-3">
<button className="w-full bg-surface-container-high hover:bg-primary-container hover:text-white transition-colors py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-lg">group</span>
                                Danh sách học viên
                            </button>
<div className="grid grid-cols-2 gap-3">
<button className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-base">edit</span>
                                    Chỉnh sửa
                                </button>
<button className="bg-slate-100 hover:bg-error-container hover:text-error text-slate-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-base">archive</span>
                                    Lưu trữ
                                </button>
</div>
</div>
</div>
</div>
</div>

<div className="col-span-12 mt-8">
<div className="bg-surface-container rounded-3xl p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
<div className="md:col-span-1">
<p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">Tổng quan đào tạo</p>
<h4 className="text-2xl font-black text-on-surface leading-tight">Phân tích Hiệu quả Khóa học</h4>
</div>
<div className="bg-surface-container-lowest p-6 rounded-2xl flex items-center gap-4">
<div className="w-12 h-12 bg-blue-50 text-primary flex items-center justify-center rounded-xl">
<span className="material-symbols-outlined">trending_up</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Tỉ lệ Đậu</p>
<p className="text-2xl font-black text-primary">92.4%</p>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-2xl flex items-center gap-4">
<div className="w-12 h-12 bg-amber-50 text-amber-600 flex items-center justify-center rounded-xl">
<span className="material-symbols-outlined">pending_actions</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Hồ sơ chờ</p>
<p className="text-2xl font-black text-amber-600">18</p>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-2xl flex items-center gap-4">
<div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl">
<span className="material-symbols-outlined">how_to_reg</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Mới đăng ký</p>
<p className="text-2xl font-black text-emerald-600">32</p>
</div>
</div>
</div>
</div>
</div>
</main>
    </>
  );
};

export default AdminCourses;
