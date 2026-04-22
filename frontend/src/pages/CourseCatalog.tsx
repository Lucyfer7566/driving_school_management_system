import { Link } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const CourseCatalog = () => {
  return (
    <>

<UserNavbar />
      
<nav className="fixed top-0 w-full z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm dark:shadow-none">
<div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
<div className="flex items-center gap-8">
<span className="text-xl font-black tracking-tighter text-blue-900 dark:text-blue-100">Precision Drive</span>
<div className="hidden md:flex gap-6 items-center font-sans antialiased tracking-tight text-sm">
<Link className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200" to="#">Dashboard</Link>
<Link className="text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 font-bold pb-1 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200" to="#">Khóa học</Link>
<Link className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200" to="#">Lịch học</Link>
<Link className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200" to="#">Học viên</Link>
<Link className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200" to="#">Báo cáo</Link>
</div>
</div>
<div className="flex items-center gap-4">
<div className="hidden lg:flex items-center bg-slate-200/20 dark:bg-slate-800/20 rounded-full px-3 py-1 gap-2">
<span className="material-symbols-outlined text-sm text-slate-500">search</span>
<input className="bg-transparent border-none focus:ring-0 text-xs w-32" placeholder="Tìm kiếm..." type="text"/>
</div>
<div className="flex items-center gap-3">
<button className="material-symbols-outlined text-slate-500 hover:text-blue-600 transition-colors">notifications</button>
<button className="material-symbols-outlined text-slate-500 hover:text-blue-600 transition-colors">settings</button>
<div className="h-8 w-8 rounded-full bg-surface-container-high overflow-hidden">
<img alt="Instructor profile" className="h-full w-full object-cover" data-alt="Close-up professional portrait of a confident male driving instructor in a clean white shirt with soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTEQncKLiDvU0bPyjZwYiOFmo1HsbphHsd9q0tS1YIAEmLQxRclSP0gRTzHMlvDDtp2vAFZPyXoI8NIrGlH5GyyUJyur-E1SGiR4VK7G3pFf3ISqMoVPgmZVH0o7EoyWOegW7RqB2Iy9BmkyVDe9NyeNc3M2RfsZysHBNtEmXQpcMoZG-f7wgUyrIvD40g3qSh8gNADcPn1mDpkKNM2PLNHeI4kgGXmBVXJ5LHCoP7jh8-9m2Vh16thUctaFzW3J1-PLi6KRmBU7Y"/>
</div>
</div>
<Link to="/courses" className="inline-flex justify-center items-center text-center hidden sm:block px-4 py-2 bg-primary-container text-white text-xs font-bold rounded-lg active:scale-95 transition-transform">Đăng ký ngay</Link>
</div>
</div>
</nav>
<main className="pt-24 pb-20">

<section className="max-w-7xl mx-auto px-6 mb-12">
<div className="bg-surface-container-low rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
<div className="flex flex-wrap gap-2 w-full md:w-auto">
<button className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold shadow-sm">Tất cả</button>
<button className="px-5 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface-variant text-sm font-semibold hover:bg-surface-container-high transition-colors">Hạng B1</button>
<button className="px-5 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface-variant text-sm font-semibold hover:bg-surface-container-high transition-colors">Hạng B2</button>
<button className="px-5 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface-variant text-sm font-semibold hover:bg-surface-container-high transition-colors">Hạng C</button>
</div>
<div className="relative w-full md:w-96">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Tìm tên khóa học hoặc mã hiệu..." type="text"/>
</div>
</div>
</section>

<section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

<div className="group bg-surface-container-low rounded-[2rem] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
<div className="h-56 relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
<div className="absolute inset-0 flex items-center justify-center p-8">
<img alt="B1 Car" className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-500" data-alt="Abstract minimalist 3D render of a sleek modern electric sedan with smooth surfaces and clean lines in a bright white studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtdhL4cMJCGKcrIP31hP5RIDo8nFVivqRd4z0RMWwmWSEaqbaIgXPNvxpZ5XeG_UMQcvcoTt0-WHWaAkqOShMawOXS5HVVMs17RQITmReETptRL2aFgZD6PQrKcziaODIi9GdJFi5pUe6KjnGQMKMBIlLXikCGLI7TMSLO0dKcprFfeG-WjkTcmp2gT6mxpUA8_UZTYbKx5xfA9EDCEWbuGP0SvXEtvgDBt82hSQcox0g2HYq0iHxluBrn_WlTniod89bK58iFtzw"/>
</div>
<div className="absolute top-6 left-6">
<span className="px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary">Hạng B1</span>
</div>
</div>
<div className="p-8 flex flex-col flex-grow">
<h3 className="text-2xl font-black tracking-tight text-on-surface mb-3">Khóa B1 Số Tự Động</h3>
<p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Lý tưởng cho người đi làm và gia đình. Tập trung vào kỹ năng vận hành xe số tự động an toàn trong đô thị.</p>
<div className="space-y-4 mb-8">
<div className="flex items-center justify-between text-sm">
<span className="text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-lg">schedule</span> Thời gian học
                            </span>
<span className="font-bold text-on-surface">3 tháng</span>
</div>
<div className="flex items-center justify-between text-sm">
<span className="text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-lg">event</span> Dự kiến sát hạch
                            </span>
<span className="font-bold text-on-surface">Tháng 05/2024</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant text-sm">Học phí trọn gói</span>
<span className="text-2xl font-black text-primary">15.000.000đ</span>
</div>
</div>
<div className="mt-auto grid grid-cols-1 gap-3">
<Link to="/courses" className="inline-flex justify-center items-center text-center w-full py-4 bg-primary text-on-primary font-bold rounded-2xl hover:brightness-110 transition-all active:scale-[0.98]">Đăng ký ngay</Link>
<Link to="/courses/1" className="inline-flex justify-center items-center text-center w-full py-4 bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold rounded-2xl hover:bg-surface-container-high transition-all active:scale-[0.98]">Xem chi tiết</Link>
</div>
</div>
</div>

<div className="group bg-surface-container-low rounded-[2rem] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
<div className="h-56 relative bg-gradient-to-br from-slate-100 to-blue-100 overflow-hidden">
<div className="absolute inset-0 flex items-center justify-center p-8">
<img alt="B2 Truck" className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-500" data-alt="Minimalist abstract vector-style render of a classic pickup truck silhouette emphasizing precision engineering and mechanical durability" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe3y9OwHRkQKmjhLK-4chlyq_okxDDf8nLOg59FN3bqsxl-lhsog7tDD-ZdcHa6yEHgSKNMRPiHsH7Esu1GVI7XkvVZ6JIKxjn21Y3cis7WEl257Xl4Tqon8byMMxIcKWojRZdVGt531ARZMhVN-wIQ0rwkn2zHHrGTE9P3djsRSVXtB7vBJGrNRHOnwVR4DVbGEX7OquJvoOdiUleFQX0JuZXNIlFfjOPuE1To9CgWjQlWjzRCkUrp7kdH9f-5Y6Q1rBkUaX5KwQ"/>
</div>
<div className="absolute top-6 left-6">
<span className="px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary">Hạng B2</span>
</div>
</div>
<div className="p-8 flex flex-col flex-grow">
<h3 className="text-2xl font-black tracking-tight text-on-surface mb-3">Khóa B2 Số Sàn</h3>
<p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Dành cho những người muốn làm chủ hoàn toàn kỹ năng lái xe chuyên nghiệp. Phù hợp cho cả kinh doanh vận tải.</p>
<div className="space-y-4 mb-8">
<div className="flex items-center justify-between text-sm">
<span className="text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-lg">schedule</span> Thời gian học
                            </span>
<span className="font-bold text-on-surface">3.5 tháng</span>
</div>
<div className="flex items-center justify-between text-sm">
<span className="text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-lg">event</span> Dự kiến sát hạch
                            </span>
<span className="font-bold text-on-surface">Tháng 06/2024</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant text-sm">Học phí trọn gói</span>
<span className="text-2xl font-black text-primary">14.000.000đ</span>
</div>
</div>
<div className="mt-auto grid grid-cols-1 gap-3">
<Link to="/courses" className="inline-flex justify-center items-center text-center w-full py-4 bg-primary text-on-primary font-bold rounded-2xl hover:brightness-110 transition-all active:scale-[0.98]">Đăng ký ngay</Link>
<Link to="/courses/1" className="inline-flex justify-center items-center text-center w-full py-4 bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold rounded-2xl hover:bg-surface-container-high transition-all active:scale-[0.98]">Xem chi tiết</Link>
</div>
</div>
</div>

<div className="group bg-surface-container-low rounded-[2rem] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
<div className="h-56 relative bg-gradient-to-br from-orange-50 to-blue-50 overflow-hidden">
<div className="absolute inset-0 flex items-center justify-center p-8">
<img alt="Class C Truck" className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-500" data-alt="Stylized 3D graphic of a heavy-duty transport truck with a powerful engine profile, rendered in professional navy and silver tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcNt0_ZGxMJ6cFkin3o118_tSesl4-oepz26bL5LykxGKvuZTIjdo4VTM7OI2MKbOSGdX5T2TwbdccAnqwwIpqu83Gu9h8eGp21ITR0JKZKkwcL5zwLIu_fJ64Lq6_ZBAYMfux6bws33-1dc5WSpG7Y0e-x8koHcsnDWzcIWXjcYvhA_GHTN3KqPkggrkZxRLOibTSSng6uMw_cvTAlIF0eJC3BpEo0n2tScQBAMS-ieAqMzXUkYgzVlt9V6yCZ9Vnp9kdIxC49sQ"/>
</div>
<div className="absolute top-6 left-6">
<span className="px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary">Hạng C</span>
</div>
</div>
<div className="p-8 flex flex-col flex-grow">
<h3 className="text-2xl font-black tracking-tight text-on-surface mb-3">Khóa C Tải</h3>
<p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Đào tạo lái xe tải trọng tải lớn trên 3.500kg. Quy trình đào tạo khắt khe và thực tiễn nhất cho tài xế đường dài.</p>
<div className="space-y-4 mb-8">
<div className="flex items-center justify-between text-sm">
<span className="text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-lg">schedule</span> Thời gian học
                            </span>
<span className="font-bold text-on-surface">5 tháng</span>
</div>
<div className="flex items-center justify-between text-sm">
<span className="text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-lg">event</span> Dự kiến sát hạch
                            </span>
<span className="font-bold text-on-surface">Tháng 08/2024</span>
</div>
<div className="flex items-center justify-between">
<span className="text-on-surface-variant text-sm">Học phí trọn gói</span>
<span className="text-2xl font-black text-primary">18.000.000đ</span>
</div>
</div>
<div className="mt-auto grid grid-cols-1 gap-3">
<Link to="/courses" className="inline-flex justify-center items-center text-center w-full py-4 bg-primary text-on-primary font-bold rounded-2xl hover:brightness-110 transition-all active:scale-[0.98]">Đăng ký ngay</Link>
<Link to="/courses/1" className="inline-flex justify-center items-center text-center w-full py-4 bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold rounded-2xl hover:bg-surface-container-high transition-all active:scale-[0.98]">Xem chi tiết</Link>
</div>
</div>
</div>
</section>

<section className="max-w-7xl mx-auto px-6 mt-20">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div className="text-center">
<div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
<span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
</div>
<h4 className="font-bold text-on-surface mb-2">Tỉ lệ đỗ 98%</h4>
<p className="text-xs text-on-surface-variant">Quy trình đào tạo tối ưu kết hợp mẹo thi sát hạch thực tiễn.</p>
</div>
<div className="text-center">
<div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
<span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
</div>
<h4 className="font-bold text-on-surface mb-2">Xe đời mới 100%</h4>
<p className="text-xs text-on-surface-variant">Sử dụng các dòng xe hiện đại, điều hòa mát mẻ, vận hành êm ái.</p>
</div>
<div className="text-center">
<div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
<span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>update</span>
</div>
<h4 className="font-bold text-on-surface mb-2">Giờ học linh hoạt</h4>
<p className="text-xs text-on-surface-variant">Tự chọn thời gian học rảnh: sáng, chiều hoặc tối kể cả T7/CN.</p>
</div>
<div className="text-center">
<div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
<span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
</div>
<h4 className="font-bold text-on-surface mb-2">Học phí trả góp</h4>
<p className="text-xs text-on-surface-variant">Hỗ trợ chia nhỏ học phí đóng làm nhiều đợt 0% lãi suất.</p>
</div>
</div>
</section>
</main>
<Footer />

</>
  );
};

export default CourseCatalog;
