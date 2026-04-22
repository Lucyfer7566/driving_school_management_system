import { Link } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const CourseDetails = () => {
  return (
    <>

<UserNavbar />
      
<main>

<section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-container py-24 md:py-32">
<div className="absolute inset-0 opacity-10">
<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
<path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"></path>
</svg>
</div>
<div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
<div className="max-w-3xl">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-on-primary-container text-xs font-bold uppercase tracking-wider mb-6">
<span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                        Chương trình đào tạo chuẩn
                    </div>
<h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-8">
                        Khóa học Lái xe hạng B1 <br/><span className="text-secondary-container">(Số tự động)</span>
</h1>
<div className="flex flex-wrap gap-4">
<Link to="/courses/1" className="inline-flex justify-center items-center text-center bg-surface-container-lowest text-primary hover:bg-surface-bright px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-black/10 active:scale-95 transition-all">Đăng ký khóa này</Link>
<Link to="/roadmap" className="inline-flex justify-center items-center text-center bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 rounded-xl font-bold text-lg active:scale-95 transition-all">Xem lộ trình học</Link>
</div>
</div>
</div>

<div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block opacity-20">
<div className="h-full w-full flex items-center justify-center">
<div className="grid grid-cols-2 gap-4">
<div className="w-32 h-32 bg-white rounded-3xl rotate-12"></div>
<div className="w-32 h-32 bg-white rounded-full -rotate-12 translate-y-12"></div>
<div className="w-32 h-32 border-4 border-white rounded-3xl -rotate-12"></div>
<div className="w-32 h-32 bg-white rounded-2xl rotate-45 translate-x-8"></div>
</div>
</div>
</div>
</section>

<div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
<div className="flex flex-col lg:flex-row gap-12">

<div className="lg:w-[70%] space-y-16">

<section>
<div className="flex items-center gap-4 mb-10">
<div className="w-12 h-12 bg-primary-fixed text-primary flex items-center justify-center rounded-2xl">
<span className="material-symbols-outlined">menu_book</span>
</div>
<h2 className="text-3xl font-black text-on-surface tracking-tight">Nội dung chương trình học</h2>
</div>
<div className="space-y-6">

<div className="group bg-surface-container-low rounded-3xl p-8 hover:bg-surface-container-lowest transition-all duration-300">
<div className="flex items-start gap-6">
<div className="text-4xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">01</div>
<div className="flex-1">
<h3 className="text-xl font-bold text-on-surface mb-3">Phần 1: Lý thuyết</h3>
<p className="text-on-surface-variant leading-relaxed mb-4">Học viên được trang bị kiến thức nền tảng về luật giao thông đường bộ và các kỹ năng an toàn cơ bản.</p>
<div className="flex flex-wrap gap-3">
<span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">600 câu hỏi luật</span>
<span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">Đạo đức người lái xe</span>
<span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">Cấu tạo &amp; Sửa chữa</span>
</div>
</div>
</div>
</div>

<div className="group bg-surface-container-low rounded-3xl p-8 hover:bg-surface-container-lowest transition-all duration-300">
<div className="flex items-start gap-6">
<div className="text-4xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">02</div>
<div className="flex-1">
<h3 className="text-xl font-bold text-on-surface mb-3">Phần 2: Thực hành sa hình</h3>
<p className="text-on-surface-variant leading-relaxed mb-4">Luyện tập trực tiếp trên sân tập tiêu chuẩn quốc gia với giáo viên hướng dẫn chuyên nghiệp.</p>
<div className="flex flex-wrap gap-3">
<span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">11 bài thi sát hạch</span>
<span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">Sân tập đạt chuẩn</span>
<span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">Xe số tự động đời mới</span>
</div>
</div>
</div>
</div>

<div className="group bg-surface-container-low rounded-3xl p-8 hover:bg-surface-container-lowest transition-all duration-300">
<div className="flex items-start gap-6">
<div className="text-4xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">03</div>
<div className="flex-1">
<h3 className="text-xl font-bold text-on-surface mb-3">Phần 3: Thực hành đường trường</h3>
<p className="text-on-surface-variant leading-relaxed mb-4">Nâng cao kỹ năng xử lý tình huống thực tế qua các cung đường giao thông thực tế dưới sự giám sát.</p>
<div className="flex flex-wrap gap-3">
<span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">710km giám sát hành trình</span>
<span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">Thiết bị DAT hiện đại</span>
<span className="px-4 py-2 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">Giao thông đô thị</span>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="bg-primary/5 rounded-[40px] p-10 border border-primary/10">
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 bg-white text-primary flex items-center justify-center rounded-2xl shadow-sm">
<span className="material-symbols-outlined">payments</span>
</div>
<h2 className="text-3xl font-black text-on-surface tracking-tight">Học phí và chính sách</h2>
</div>
<div className="grid md:grid-cols-2 gap-8">
<div className="space-y-4">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
<span className="font-medium text-on-surface">Cam kết trọn gói, không phát sinh chi phí phụ.</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
<span className="font-medium text-on-surface">Đã bao gồm lệ phí thi và cấp bằng.</span>
</div>
</div>
<div className="space-y-4">
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
<span className="font-medium text-on-surface">Hỗ trợ trả góp 0% lãi suất.</span>
</div>
<div className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
<span className="font-medium text-on-surface">Hoàn phí nếu không hài lòng chất lượng.</span>
</div>
</div>
</div>
</section>

<div className="relative h-[400px] w-full rounded-[40px] overflow-hidden group">
<img alt="Luxury car interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="modern car dashboard interior with digital screens at twilight soft focus on steering wheel high end driving aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlXu_8M3S8HMLy7qZLR-Gb_P2NkWIKxBqOV_EBPz5ctTR20BjARyKULrpZ34x4bfirEbs37_QmMPb4NOD25zGZad8Pbw2jKnQCWbJ8ka2SiV1IaVirf-zqy07FlihDW5H_GwsBgXW7rifC1EdFFuw5thYdWBNB1QK_W8sBVLaczLFzAEH5yeKEFdvM1gVTXJSwaCY4ftpiZJe-5XSgbQmFGmWvubS65OdznrVaabQIN3I540r2f_0A0R5eKJQ-pUABjca6hdzSL6w"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent flex items-end p-12">
<div className="text-white">
<p className="text-sm font-bold uppercase tracking-widest mb-2 opacity-80">Trải nghiệm</p>
<h4 className="text-3xl font-black">Học lái trên dòng xe hiện đại nhất</h4>
</div>
</div>
</div>
</div>

</div>
</div>
</main>
<Footer />

</>
  );
};

export default CourseDetails;
