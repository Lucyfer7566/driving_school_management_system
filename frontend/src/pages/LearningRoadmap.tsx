import { Link } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const LearningRoadmap = () => {
  return (
    <>

<UserNavbar />

<main className="pt-20">

<section className="relative w-full overflow-hidden bg-gradient-to-br from-primary-container to-primary py-24 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
<div className="z-10 max-w-2xl">
<h1 className="text-4xl md:text-6xl font-black text-on-primary tracking-tight mb-6 leading-tight">
                    Lộ trình lấy bằng lái xe B1 của bạn
                </h1>
<p className="text-lg md:text-xl text-on-primary-container opacity-90 leading-relaxed mb-8">
                    Từ lúc đăng ký cho đến khi cầm bằng, chúng tôi đồng hành cùng bạn trên mọi kilomet. Một kế hoạch học tập được tối ưu hóa cho sự an toàn và thành công.
                </p>
<div className="flex flex-wrap gap-4">
<Link to="/courses" className="inline-flex justify-center items-center text-center bg-surface-container-lowest text-primary px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">Bắt đầu ngay</Link>
<Link to="/courses/1" className="inline-flex justify-center items-center text-center border border-on-primary-container text-on-primary px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">Xem chi tiết</Link>
</div>
</div>
<div className="relative z-10 w-full md:w-1/2 flex justify-center">
<div className="glass-panel p-8 rounded-3xl border border-white/20 shadow-2xl w-full max-w-md">
<div className="relative aspect-square w-full">
<img className="w-full h-full object-cover rounded-2xl" data-alt="abstract minimalist vector line drawing of a car dashboard speedometer and digital interface in navy blue and white tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCij9cTJqssLvJUj85fZcGbO7gSfHD3pwtuw81VVWkTyI6qYh5Uk8s-qFblhqtqa03yoZsJS594LtR7srdm11gx84Wn9uK-hKI_5rrbWHvLqU2WDgeEI3sISJkEIaYjm1an1ew0uXnUHswegJ2Rqg7GeEW3vsq5fcCvRi8PlCRDqnoK5oGnrt93wJhbNTz6YtTTLthLbCRtVIrB2mVtMBfhlyhh51FmsFL8o-yZjOu18ssRVprz673tbYE-HJNtu7beVrMst-pATJQ"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent rounded-2xl"></div>
</div>
</div>

<div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-fixed-dim/20 blur-3xl rounded-full"></div>
<div className="absolute -bottom-12 -left-12 w-48 h-48 bg-on-primary-container/10 blur-3xl rounded-full"></div>
</div>
</section>

<section className="max-w-6xl mx-auto py-24 px-8">
<div className="flex flex-col items-center mb-16">
<span className="text-primary font-bold tracking-widest uppercase text-xs mb-2">Quy trình đào tạo</span>
<h2 className="text-3xl font-black text-on-surface tracking-tight">Hành trình trở thành tài xế chuyên nghiệp</h2>
</div>
<div className="relative">

<div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-2 bg-surface-container-highest -translate-x-1/2 rounded-full"></div>
<div className="space-y-12 relative">

<div className="flex flex-col md:flex-row items-center gap-8 group">
<div className="w-full md:w-1/2 flex justify-end order-2 md:order-1">
<div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-transparent group-hover:border-primary-fixed-dim transition-all duration-300 w-full max-w-md h-full flex flex-col justify-center">
<div className="flex items-center gap-4 mb-4">
<div className="md:hidden flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-white shrink-0">
<span className="material-symbols-outlined" data-icon="app_registration">app_registration</span>
</div>
<h3 className="text-xl font-bold text-primary">Đăng ký &amp; Nộp hồ sơ</h3>
</div>
<p className="text-on-surface-variant leading-relaxed">Chuẩn bị các giấy tờ cần thiết, thực hiện khám sức khỏe định kỳ và hoàn thiện mọi thủ tục hành chính tại trung tâm.</p>
</div>
</div>
<div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white z-10 border-4 border-surface group-hover:scale-110 transition-transform shadow-lg">
<span className="material-symbols-outlined" data-icon="app_registration">app_registration</span>
</div>
<div className="w-full md:w-1/2 order-3 md:order-3">
<div className="hidden md:block px-8 py-4 bg-surface-container-low rounded-xl text-sm font-medium text-primary uppercase tracking-widest w-fit">Bước khởi đầu</div>
</div>
</div>

<div className="flex flex-col md:flex-row items-center gap-8 group">
<div className="w-full md:w-1/2 order-3 md:order-1">
<div className="hidden md:block">
<div className="px-8 py-4 bg-surface-container-low rounded-xl text-sm font-medium text-primary uppercase tracking-widest w-fit ml-auto">Kiến thức nền tảng</div>
</div>
</div>
<div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white z-10 border-4 border-surface group-hover:scale-110 transition-transform shadow-lg">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
</div>
<div className="w-full md:w-1/2 flex justify-start order-2 md:order-3">
<div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-transparent group-hover:border-primary-fixed-dim transition-all duration-300 w-full max-w-md h-full flex flex-col justify-center">
<div className="flex items-center gap-4 mb-4">
<div className="md:hidden flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-white shrink-0">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
</div>
<h3 className="text-xl font-bold text-primary">Lý thuyết &amp; Đạo đức</h3>
</div>
<p className="text-on-surface-variant leading-relaxed">Nắm vững 600 câu hỏi luật giao thông, thi thử trực quan trên ứng dụng và trải nghiệm học trên cabin mô phỏng thực tế.</p>
</div>
</div>
</div>

<div className="flex flex-col md:flex-row items-center gap-8 group">
<div className="w-full md:w-1/2 flex justify-end order-2 md:order-1">
<div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-transparent group-hover:border-primary-fixed-dim transition-all duration-300 w-full max-w-md h-full flex flex-col justify-center">
<div className="flex items-center gap-4 mb-4">
<div className="md:hidden flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-white shrink-0">
<span className="material-symbols-outlined" data-icon="minor_crash">minor_crash</span>
</div>
<h3 className="text-xl font-bold text-primary">Tập lái xe sa hình</h3>
</div>
<p className="text-on-surface-variant leading-relaxed">Làm quen với các bộ phận của xe, tập lái 11 bài thi liên hoàn trong sân sa hình tiêu chuẩn dưới sự hướng dẫn của chuyên gia.</p>
</div>
</div>
<div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white z-10 border-4 border-surface group-hover:scale-110 transition-transform shadow-lg">
<span className="material-symbols-outlined" data-icon="minor_crash">minor_crash</span>
</div>
<div className="w-full md:w-1/2 order-3 md:order-3">
<div className="hidden md:block px-8 py-4 bg-surface-container-low rounded-xl text-sm font-medium text-primary uppercase tracking-widest w-fit">Kỹ năng sân bãi</div>
</div>
</div>

<div className="flex flex-col md:flex-row items-center gap-8 group">
<div className="w-full md:w-1/2 order-3 md:order-1">
<div className="hidden md:block">
<div className="px-8 py-4 bg-surface-container-low rounded-xl text-sm font-medium text-primary uppercase tracking-widest w-fit ml-auto">Kinh nghiệm thực tế</div>
</div>
</div>
<div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white z-10 border-4 border-surface group-hover:scale-110 transition-transform shadow-lg">
<span className="material-symbols-outlined" data-icon="distance">distance</span>
</div>
<div className="w-full md:w-1/2 flex justify-start order-2 md:order-3">
<div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-transparent group-hover:border-primary-fixed-dim transition-all duration-300 w-full max-w-md h-full flex flex-col justify-center">
<div className="flex items-center gap-4 mb-4">
<div className="md:hidden flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-white shrink-0">
<span className="material-symbols-outlined" data-icon="distance">distance</span>
</div>
<h3 className="text-xl font-bold text-primary">Chạy đường trường DAT</h3>
</div>
<p className="text-on-surface-variant leading-relaxed">Tích lũy tối thiểu 710km (hoặc 810km) lái xe đường trường có giám sát bằng thiết bị DAT để làm quen với giao thông thực tế.</p>
</div>
</div>
</div>

<div className="flex flex-col md:flex-row items-center gap-8 group">
<div className="w-full md:w-1/2 flex justify-end order-2 md:order-1">
<div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-transparent group-hover:border-primary-fixed-dim transition-all duration-300 w-full max-w-md h-full flex flex-col justify-center">
<div className="flex items-center gap-4 mb-4">
<div className="md:hidden flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-white shrink-0">
<span className="material-symbols-outlined" data-icon="assignment_turned_in">assignment_turned_in</span>
</div>
<h3 className="text-xl font-bold text-primary">Thi chứng chỉ &amp; Sát hạch</h3>
</div>
<p className="text-on-surface-variant leading-relaxed">Hoàn thành kỳ thi tốt nghiệp tại trường và tham dự kỳ thi sát hạch quốc gia do Sở GTVT tổ chức chấm điểm.</p>
</div>
</div>
<div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white z-10 border-4 border-surface group-hover:scale-110 transition-transform shadow-lg">
<span className="material-symbols-outlined" data-icon="assignment_turned_in">assignment_turned_in</span>
</div>
<div className="w-full md:w-1/2 order-3 md:order-3">
<div className="hidden md:block px-8 py-4 bg-surface-container-low rounded-xl text-sm font-medium text-primary uppercase tracking-widest w-fit">Thử thách cuối cùng</div>
</div>
</div>

<div className="flex flex-col md:flex-row items-center gap-8 group">
<div className="w-full md:w-1/2 order-3 md:order-1">
<div className="hidden md:block">
<div className="px-8 py-4 bg-primary-container rounded-xl text-sm font-bold text-white uppercase tracking-widest w-fit ml-auto">Thành công</div>
</div>
</div>
<div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white z-10 border-4 border-surface group-hover:scale-110 transition-transform shadow-lg">
<span className="material-symbols-outlined" data-icon="card_membership">card_membership</span>
</div>
<div className="w-full md:w-1/2 flex justify-start order-2 md:order-3">
<div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-2xl shadow-xl border border-white/20 transition-all duration-300 w-full max-w-md h-full flex flex-col justify-center">
<div className="flex items-center gap-4 mb-4">
<div className="md:hidden flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white shrink-0">
<span className="material-symbols-outlined" data-icon="card_membership">card_membership</span>
</div>
<h3 className="text-xl font-bold text-on-primary">Nhận Bằng Lái!</h3>
</div>
<p className="text-on-primary-container leading-relaxed">Chúc mừng bạn đã chính thức trở thành tài xế! Tấm bằng lái xe sẽ được gửi về tận tay bạn sau kỳ thi sát hạch.</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-low py-20 px-8">
<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
<div className="flex flex-col items-center">
<span className="text-4xl font-black text-primary mb-2">-0.02em tracking-tighter"&gt;95%</span>
<span className="text-on-surface-variant font-medium">Tỷ lệ đậu ngay lần đầu</span>
</div>
<div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-outline-variant/30 py-8 md:py-0">
<span className="text-4xl font-black text-primary mb-2 tracking-tighter">4.5 Tháng</span>
<span className="text-on-surface-variant font-medium">Thời gian trung bình cầm bằng</span>
</div>
<div className="flex flex-col items-center">
<span className="text-4xl font-black text-primary mb-2 tracking-tighter">5000+</span>
<span className="text-on-surface-variant font-medium">Học viên đã tốt nghiệp</span>
</div>
</div>
</section>
</main>
<Footer />

</>
  );
};

export default LearningRoadmap;
