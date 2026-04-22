import { Link } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const HomePage = () => {
  return (
    <>

<UserNavbar />

<main>

<section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 hero-gradient text-on-primary">
<div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
<div className="z-10">
<h1 className="text-5xl md:text-[60px] font-extrabold leading-[1.1] tracking-tight mb-6">
                        Đăng ký học lái xe nhanh chóng &amp; quản lý thông minh
                    </h1>
<p className="text-lg md:text-xl text-primary-fixed opacity-90 mb-10 max-w-lg leading-relaxed">
                        Quản lý lịch học, hồ sơ và tiến độ đào tạo trên một nền tảng duy nhất dành cho học viên hiện đại.
                    </p>
<div className="flex flex-wrap gap-4">
<Link to="/courses" className="inline-flex justify-center items-center text-center bg-surface-container-lowest text-primary px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-xl">Đăng ký ngay</Link>
<Link to="/courses" className="inline-flex justify-center items-center text-center border-2 border-primary-fixed text-primary-fixed px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">Xem khóa học</Link>
</div>
</div>
<div className="relative hidden md:block">
<div className="glass-panel p-6 rounded-[32px] shadow-2xl border border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-700">
<div className="bg-surface-container-low rounded-2xl overflow-hidden aspect-[4/3] relative">
<img alt="Dashboard View" className="w-full h-full object-cover grayscale-[0.2]" data-alt="Modern premium car dashboard interior with sleek digital interfaces and minimalist design under soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWBp-GCIU3DswAAJTKLJ0a9eq3-Rdhpr2IX6Li0zq25AF4E4CMAsOPxBhXQAgmYBAA0pk7eUodCb1jSKpNcgJZYNS2VlSQuwQ7Yz2a5IE86kS7m6TU3dBViNAz_d5xclXiEs-y7adnAoKKDRtEIq0IPL1Sk8mX88ZmFoeOw3HWpsK5N8tRc0n_mctOkznXKbnqcneASlRP_8p0iZUYClmG1LZc9EZjmsfIbdDGFUqissxn3aYLgQbDg4jwuYa5kSRKhGpwWEwHHZo"/>
<div className="absolute top-4 left-4 right-4 flex gap-4">
<div className="bg-white/80 backdrop-blur p-3 rounded-xl flex-1 shadow-sm">
<div className="h-2 w-12 bg-primary/20 rounded-full mb-2"></div>
<div className="h-4 w-20 bg-primary rounded-full"></div>
</div>
<div className="bg-white/80 backdrop-blur p-3 rounded-xl flex-1 shadow-sm border-t-2 border-primary">
<div className="h-2 w-12 bg-primary/20 rounded-full mb-2"></div>
<div className="h-4 w-24 bg-primary/60 rounded-full"></div>
</div>
</div>
</div>
</div>

<div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
</div>
</div>

<div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
<svg className="w-full h-full" viewBox="0 0 400 400" >
<path d="M0,200 Q100,50 200,200 T400,200" fill="none" stroke="currentColor" strokeWidth="2"></path>
</svg>
</div>
</section>

<section className="py-24 max-w-7xl mx-auto px-8">
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="bg-surface-container-low p-8 rounded-2xl flex flex-col items-start gap-4 hover:shadow-[0_32px_32px_-12px_rgba(0,55,176,0.06)] transition-all duration-300 group">
<span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform" data-icon="app_registration">app_registration</span>
<h3 className="text-xl font-bold text-on-surface">Đăng ký online</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">Nộp hồ sơ trực tuyến chỉ trong 5 phút, không cần chờ đợi tại văn phòng.</p>
</div>
<div className="bg-surface-container-low p-8 rounded-2xl flex flex-col items-start gap-4 hover:shadow-[0_32px_32px_-12px_rgba(0,55,176,0.06)] transition-all duration-300 group">
<span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform" data-icon="monitoring">monitoring</span>
<h3 className="text-xl font-bold text-on-surface">Theo dõi tiến độ</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">Cập nhật kết quả học tập và số giờ lái thực tế ngay trên ứng dụng di động.</p>
</div>
<div className="bg-surface-container-low p-8 rounded-2xl flex flex-col items-start gap-4 hover:shadow-[0_32px_32px_-12px_rgba(0,55,176,0.06)] transition-all duration-300 group">
<span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform" data-icon="calendar_month">calendar_month</span>
<h3 className="text-xl font-bold text-on-surface">Quản lý lịch học</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">Chủ động đặt lịch học lái với giảng viên yêu thích theo khung giờ rảnh.</p>
</div>
<div className="bg-surface-container-low p-8 rounded-2xl flex flex-col items-start gap-4 hover:shadow-[0_32px_32px_-12px_rgba(0,55,176,0.06)] transition-all duration-300 group">
<span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform" data-icon="account_balance_wallet">account_balance_wallet</span>
<h3 className="text-xl font-bold text-on-surface">Thanh toán minh bạch</h3>
<p className="text-on-surface-variant text-sm leading-relaxed">Học phí trọn gói được liệt kê chi tiết, không phát sinh chi phí ngoài dự kiến.</p>
</div>
</div>
</section>

<section className="py-24 bg-surface-container-low">
<div className="max-w-7xl mx-auto px-8">
<div className="text-center mb-16">
<h2 className="text-3xl font-extrabold text-on-surface mb-4 tracking-tight">Hành trình 4 bước chinh phục tay lái</h2>
<p className="text-on-surface-variant">Quy trình đơn giản, chuyên nghiệp và hiệu quả cao.</p>
</div>
<div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">

<div className="absolute top-12 left-0 w-full h-2 bg-surface-variant rounded-full hidden md:block">
<div className="h-full w-1/4 bg-primary rounded-full"></div>
</div>

<div className="relative z-10 flex flex-col items-center text-center gap-4 group">
<div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xl shadow-primary/30 ring-8 ring-surface-container-low">
<span className="material-symbols-outlined text-4xl" data-icon="edit_note">edit_note</span>
</div>
<h4 className="font-bold text-lg mt-2">Đăng ký</h4>
<p className="text-xs text-on-surface-variant max-w-[150px]">Chọn khóa học và điền thông tin cơ bản.</p>
</div>
<div className="relative z-10 flex flex-col items-center text-center gap-4 group">
<div className="w-24 h-24 rounded-full bg-surface-container-lowest border-2 border-primary-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors ring-8 ring-surface-container-low">
<span className="material-symbols-outlined text-4xl" data-icon="verified_user">verified_user</span>
</div>
<h4 className="font-bold text-lg mt-2">Xác minh</h4>
<p className="text-xs text-on-surface-variant max-w-[150px]">Hoàn tất hồ sơ pháp lý qua app.</p>
</div>
<div className="relative z-10 flex flex-col items-center text-center gap-4 group">
<div className="w-24 h-24 rounded-full bg-surface-container-lowest border-2 border-primary-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors ring-8 ring-surface-container-low">
<span className="material-symbols-outlined text-4xl" data-icon="school">school</span>
</div>
<h4 className="font-bold text-lg mt-2">Xếp lớp</h4>
<p className="text-xs text-on-surface-variant max-w-[150px]">Nhận thông tin giáo viên và lịch khai giảng.</p>
</div>
<div className="relative z-10 flex flex-col items-center text-center gap-4 group">
<div className="w-24 h-24 rounded-full bg-surface-container-lowest border-2 border-primary-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors ring-8 ring-surface-container-low">
<span className="material-symbols-outlined text-4xl" data-icon="directions_car">directions_car</span>
</div>
<h4 className="font-bold text-lg mt-2">Học &amp; thi</h4>
<p className="text-xs text-on-surface-variant max-w-[150px]">Thực hành đường trường và thi sát hạch.</p>
</div>
</div>
</div>
</section>

<section className="py-24 max-w-7xl mx-auto px-8">
<div className="flex justify-between items-end mb-12">
<div>
<h2 className="text-3xl font-extrabold text-on-surface mb-2 tracking-tight">Khóa học nổi bật</h2>
<p className="text-on-surface-variant">Lựa chọn bằng lái phù hợp với nhu cầu của bạn</p>
</div>
<Link className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all" to="#">
                    Tất cả khóa học <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

<div className="bg-surface-container-lowest rounded-[24px] overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-surface-container">
<div className="aspect-[16/10] overflow-hidden relative">
<img alt="B1 License" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Modern white sedan car driving on a scenic coastal road during sunset with soft orange light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfERRS9ElcHhN2VWuCv-aRZrYkOYMhnx_rYEEU7_fIeFPKVl-duaF7Uq418VR0CZEFXh0ofU1PN3NkHsAH9Hf_XJU9_VJCjzB8mLgDQAFHaILG82NjYqvAWEqmYw5G0WxcyAvONmVMhK78RIlN-ar8EebWF5dzt0EiiP8vF3R8xkZERVE9wI4N67E91xiS9-2BJ4q66MnMElXEyG33KWv8BnQGAOGdFSe9PJ4r-4ZlkZPtqNyiSxWfZW8m5C4MkNjQ7NZP8sNYI8c"/>
<div className="absolute top-4 right-4 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full">Phổ biến</div>
</div>
<div className="p-6">
<h3 className="text-xl font-bold mb-2 line-clamp-2">Hạng B1 - Xe số tự động (Không hành nghề)</h3>
<div className="flex items-center gap-4 mb-6 text-on-surface-variant text-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg" data-icon="schedule">schedule</span> 3 Tháng</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg" data-icon="payments">payments</span> 12.000.000đ</span>
</div>
<Link to="/courses/1" className="inline-flex justify-center items-center text-center w-full py-3 bg-surface-container-low text-primary font-bold rounded-xl group-hover:bg-primary group-hover:text-on-primary transition-colors">Xem chi tiết</Link>
</div>
</div>

<div className="bg-surface-container-lowest rounded-[24px] overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-surface-container">
<div className="aspect-[16/10] overflow-hidden relative">
<img alt="B2 License" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Manual transmission gear shift in a sports car interior with cinematic side lighting and focus on the handle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg78e-WkIqMpFdQIgsXGTULAVIO1FpKs5VxKcw2KBbgDaNs-qNb5c7v-5LdOL3qsSxFHjQbOr0LyMJdhWzk5V6PCulixCkZQgiQf3DQalLg6gG7zUxczkmaUkuRsht82vKTz-qanDL4nLxE-l8eGgiuGY_ZQPC0NxHieL2QSgmKYFPbADgNNzsgcovfuiDOez9wCnFPCHzIIX2uGg74ZuquEbkxYRDxXVMLIc0aAmX83UWlGgUUMXpZRwBSESmENkNlmck8dhgPXI"/>
</div>
<div className="p-6">
<h3 className="text-xl font-bold mb-2 line-clamp-2">Hạng B2 - Xe số sàn &amp; Số tự động (Hành nghề)</h3>
<div className="flex items-center gap-4 mb-6 text-on-surface-variant text-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg" data-icon="schedule">schedule</span> 3.5 Tháng</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg" data-icon="payments">payments</span> 14.500.000đ</span>
</div>
<Link to="/courses/1" className="inline-flex justify-center items-center text-center w-full py-3 bg-surface-container-low text-primary font-bold rounded-xl group-hover:bg-primary group-hover:text-on-primary transition-colors">Xem chi tiết</Link>
</div>
</div>

<div className="bg-surface-container-lowest rounded-[24px] overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-surface-container">
<div className="aspect-[16/10] overflow-hidden relative">
<img alt="C License" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Large heavy cargo truck on a highway under bright clear daylight with blue sky background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArf6EOz-V-iwdcxxl1BcTuiA0AJPewPhJhVVZwG1cNW6BSAEIMoMEKcb669u-wjT6CtZcaoALzHYM0ujvrbd619QeMyPJPYjIBE4qIqGaTxZ0itOtRLHlAlggLFKxsfjdVO4P0kvH7RZFWlgc9tDQkW0DDuvxPPMRbVMN7bYp5WDWuKumACfzfzn6WFjNqVUr4iOr3C1e6ekrz3weRcy0oTOMleA_AA0YoXWvL-GOpy7N5R9kY9Y41TCMUQLGC7xksm5HRZm_9L64"/>
</div>
<div className="p-6">
<h3 className="text-xl font-bold mb-2 line-clamp-2">Hạng C - Xe tải chuyên dụng</h3>
<div className="flex items-center gap-4 mb-6 text-on-surface-variant text-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg" data-icon="schedule">schedule</span> 5 Tháng</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-lg" data-icon="payments">payments</span> 18.000.000đ</span>
</div>
<Link to="/courses/1" className="inline-flex justify-center items-center text-center w-full py-3 bg-surface-container-low text-primary font-bold rounded-xl group-hover:bg-primary group-hover:text-on-primary transition-colors">Xem chi tiết</Link>
</div>
</div>
</div>
</section>

<section className="py-24 bg-white border-y border-surface-variant/30">
<div className="max-w-7xl mx-auto px-8">
<div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 text-center">
<div>
<div className="text-5xl font-black text-primary mb-2 -tracking-widest">15k+</div>
<div className="text-on-surface-variant font-medium">Học viên tốt nghiệp</div>
</div>
<div>
<div className="text-5xl font-black text-primary mb-2 -tracking-widest">98%</div>
<div className="text-on-surface-variant font-medium">Tỷ lệ đỗ sát hạch</div>
</div>
<div>
<div className="text-5xl font-black text-primary mb-2 -tracking-widest">12+</div>
<div className="text-on-surface-variant font-medium">Năm kinh nghiệm</div>
</div>
<div>
<div className="text-5xl font-black text-primary mb-2 -tracking-widest">45+</div>
<div className="text-on-surface-variant font-medium">Giảng viên tận tâm</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="p-8 bg-surface-container-low rounded-3xl relative">
<span className="material-symbols-outlined text-primary/20 text-6xl absolute top-4 right-8" data-icon="format_quote">format_quote</span>
<div className="flex gap-4 items-center mb-6">
<div className="w-12 h-12 rounded-full bg-surface-dim overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Portrait of a young smiling professional man with short dark hair in high resolution" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhtASSglcX9gbjvT6yAtisn5ZwCcUYf1TKbegQXeKUoNH4M1yHw_ELFJf9LHJi0tY8r9VZDIuq1xwGBxFaL1gLWhsrIlph6--GnLxIXmVUM9VTH7S2jrHK4mQp2RpwdHyvABJWgQsQkTaGXBWHSQc8h3ja3e14LFSY0hEbptfBmD05PDcxlBwr6wP4heBYY9ThTWaW0MyrqsXATdGI5uLmODiVhlIywWpUBA3PnDDCpyt55ikfpIGAMdSNnWkvEOZADD-2sXgs_SM"/>
</div>
<div>
<h5 className="font-bold">Minh Hoàng</h5>
<div className="flex text-tertiary-container text-xs">
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
</div>
</div>
</div>
<p className="text-on-surface-variant italic leading-relaxed">"Hệ thống quản lý rất thông minh, tôi có thể chủ động đổi lịch tập lái khi có việc đột xuất mà không cần gọi điện thoại phiền phức."</p>
</div>
<div className="p-8 bg-surface-container-low rounded-3xl relative">
<span className="material-symbols-outlined text-primary/20 text-6xl absolute top-4 right-8" data-icon="format_quote">format_quote</span>
<div className="flex gap-4 items-center mb-6">
<div className="w-12 h-12 rounded-full bg-surface-dim overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Portrait of a cheerful young woman with long wavy hair smiling warmly at the camera" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeVGp_8B49ZmehByucrfoQ_aX6CxpKT-b8UA-uyhMsXkwcbKwqrtrurvj6enGQig29lbZ9b-yMae6wQtycp2l_qY3FRNdFZp0qxT0zqY0M6sE9JXfHCm4wlnQOpcKvEvA9hEmnrQOiGRtRlFx282PKWCkslV0az84SU0q8dKeKS9ZbkWScyd5llY6Kvb9jrFLYedk3_6DgcFpua1Z1Hs0pnio9kM78u6Ub7PXxm6yqRTg2Ts_HwbYCIjyFoB-aYtD8hIum6cKisAE"/>
</div>
<div>
<h5 className="font-bold">Thu Trang</h5>
<div className="flex text-tertiary-container text-xs">
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
<span className="material-symbols-outlined text-[14px]" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
</div>
</div>
</div>
<p className="text-on-surface-variant italic leading-relaxed">"Thầy dạy cực kỳ nhiệt tình và xe tập lái đời mới, sạch sẽ. Quy trình đăng ký online giúp mình tiết kiệm rất nhiều thời gian."</p>
</div>
</div>
</div>
</section>

<section className="py-24 max-w-7xl mx-auto px-8">
<div className="hero-gradient rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
<div className="relative z-10 max-w-3xl mx-auto">
<h2 className="text-4xl md:text-5xl font-black text-on-primary mb-8 leading-tight">Bắt đầu hành trình lái xe hôm nay</h2>
<p className="text-primary-fixed opacity-90 text-lg mb-12">Chỉ mất 3 phút để đặt chỗ cho tương lai phía sau tay lái của bạn.</p>
<button className="w-full md:w-auto bg-surface-container-lowest text-primary px-12 py-5 rounded-2xl font-black text-xl hover:scale-[1.03] transition-transform shadow-xl">
                        ĐĂNG KÝ HỌC NGAY
                    </button>
</div>

<div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
<div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
<path d="M0 100 C 20 0 50 0 100 100" fill="none" stroke="white" strokeWidth="0.1"></path>
<path d="M0 100 C 30 10 60 10 100 100" fill="none" stroke="white" strokeWidth="0.1"></path>
</svg>
</div>
</div>
</section>
</main>
<Footer />

</>
  );
};

export default HomePage;
