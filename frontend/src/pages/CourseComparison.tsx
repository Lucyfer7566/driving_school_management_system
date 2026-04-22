import { Link } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const CourseComparison = () => {
  return (
    <>

<UserNavbar />
      
<nav className="fixed top-0 w-full z-50 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-sm dark:shadow-none">
<div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
<div className="text-2xl font-black italic tracking-tighter text-blue-800 dark:text-blue-400">
                Precision Driving
            </div>
<div className="hidden md:flex gap-8 items-center">
<Link className="font-sans text-sm font-medium tracking-tight text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1" to="#">Khóa học</Link>
<Link className="font-sans text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-all" to="#">Lịch học</Link>
<Link className="font-sans text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-all" to="#">Học phí</Link>
<Link className="font-sans text-sm font-medium tracking-tight text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 transition-all" to="#">Hướng dẫn</Link>
</div>
<div className="flex gap-4 items-center">
<button className="px-4 py-2 text-sm font-medium text-slate-600 hover:opacity-80 transition-opacity">Đăng nhập</button>
<Link to="/courses" className="inline-flex justify-center items-center text-center px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 transition-all">Đăng ký ngay</Link>
</div>
</div>
<div className="bg-slate-200/40 dark:bg-slate-800/40 h-[1px]"></div>
</nav>

<main className="max-w-7xl mx-auto px-8 -mt-10 mb-24 relative z-20">
<div className="bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full border-collapse">
<thead>
<tr className="bg-surface-container-low">
<th className="p-8 text-left text-sm font-bold uppercase tracking-widest text-on-surface-variant w-1/4">Tiêu chí</th>
<th className="p-8 text-center w-1/4">
<div className="flex flex-col items-center gap-3">
<div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl" data-icon="directions_car">directions_car</span>
</div>
<span className="text-xl font-extrabold text-on-surface">B1 (Số tự động)</span>
</div>
</th>
<th className="p-8 text-center w-1/4">
<div className="flex flex-col items-center gap-3">
<div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl" data-icon="settings_input_component">settings_input_component</span>
</div>
<span className="text-xl font-extrabold text-on-surface">B2 (Số sàn)</span>
</div>
</th>
<th className="p-8 text-center w-1/4">
<div className="flex flex-col items-center gap-3">
<div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl" data-icon="local_shipping">local_shipping</span>
</div>
<span className="text-xl font-extrabold text-on-surface">C (Xe tải)</span>
</div>
</th>
</tr>
</thead>
<tbody className="text-on-surface">

<tr className="hover:bg-surface-container-low transition-colors duration-200">
<td className="p-8 font-semibold text-on-surface-variant bg-surface-container-lowest border-r border-outline-variant/10">Loại xe được lái</td>
<td className="p-8 text-center text-on-surface font-medium">Xe tự động</td>
<td className="p-8 text-center text-on-surface font-medium">Cả tự động &amp; số sàn</td>
<td className="p-8 text-center text-on-surface font-medium">Xe tải &gt; 3.5T</td>
</tr>

<tr className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors duration-200">
<td className="p-8 font-semibold text-on-surface-variant border-r border-outline-variant/10">Thời gian học</td>
<td className="p-8 text-center">3 tháng</td>
<td className="p-8 text-center">3.5 tháng</td>
<td className="p-8 text-center">5 tháng</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors duration-200">
<td className="p-8 font-semibold text-on-surface-variant bg-surface-container-lowest border-r border-outline-variant/10">Học phí trọn gói</td>
<td className="p-8 text-center font-black text-primary text-lg">15.000.000đ</td>
<td className="p-8 text-center font-black text-primary text-lg">14.000.000đ</td>
<td className="p-8 text-center font-black text-primary text-lg">18.000.000đ</td>
</tr>

<tr className="bg-surface-container-low/50 hover:bg-surface-container-low transition-colors duration-200">
<td className="p-8 font-semibold text-on-surface-variant border-r border-outline-variant/10">Độ khó</td>
<td className="p-8 text-center">
<div className="flex items-center justify-center gap-1">
<span>Dễ</span>
<span className="text-orange-500 font-bold">(⭐)</span>
</div>
</td>
<td className="p-8 text-center">
<div className="flex items-center justify-center gap-1">
<span>Trung bình</span>
<span className="text-orange-500 font-bold">(⭐⭐)</span>
</div>
</td>
<td className="p-8 text-center">
<div className="flex items-center justify-center gap-1">
<span>Khó</span>
<span className="text-orange-500 font-bold">(⭐⭐⭐)</span>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors duration-200">
<td className="p-8 font-semibold text-on-surface-variant bg-surface-container-lowest border-r border-outline-variant/10">Phù hợp với ai</td>
<td className="p-8 text-center text-sm leading-relaxed">Lái xe gia đình, nữ giới</td>
<td className="p-8 text-center text-sm leading-relaxed">Kinh doanh vận tải, taxi</td>
<td className="p-8 text-center text-sm leading-relaxed">Chở hàng chuyên nghiệp</td>
</tr>

<tr className="bg-surface-container-lowest">
<td className="p-8 border-r border-outline-variant/10"></td>
<td className="p-8">
<Link to="/courses/1" className="inline-flex justify-center items-center text-center w-full py-4 bg-primary text-white rounded-xl font-bold text-sm tracking-tight hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95">Đăng ký B1</Link>
</td>
<td className="p-8">
<Link to="/courses/1" className="inline-flex justify-center items-center text-center w-full py-4 bg-primary text-white rounded-xl font-bold text-sm tracking-tight hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95">Đăng ký B2</Link>
</td>
<td className="p-8">
<Link to="/courses/1" className="inline-flex justify-center items-center text-center w-full py-4 bg-primary text-white rounded-xl font-bold text-sm tracking-tight hover:shadow-lg hover:-translate-y-1 transition-all active:scale-95">Đăng ký C</Link>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="surface-container-low p-8 rounded-xl flex flex-col gap-4">
<span className="material-symbols-outlined text-primary text-4xl" data-icon="verified">verified</span>
<h3 className="text-lg font-bold">Cam kết chất lượng</h3>
<p className="text-on-surface-variant text-sm">Chương trình đào tạo chuẩn quốc tế với đội ngũ giáo viên giàu kinh nghiệm và tận tâm.</p>
</div>
<div className="surface-container-low p-8 rounded-xl flex flex-col gap-4">
<span className="material-symbols-outlined text-primary text-4xl" data-icon="support_agent">support_agent</span>
<h3 className="text-lg font-bold">Hỗ trợ 24/7</h3>
<p className="text-on-surface-variant text-sm">Luôn sẵn sàng giải đáp thắc mắc và hỗ trợ học viên trong suốt quá trình học tập và thi cử.</p>
</div>
<div className="surface-container-low p-8 rounded-xl flex flex-col gap-4">
<span className="material-symbols-outlined text-primary text-4xl" data-icon="history_edu">history_edu</span>
<h3 className="text-lg font-bold">Hồ sơ nhanh gọn</h3>
<p className="text-on-surface-variant text-sm">Thủ tục đăng ký đơn giản, tinh gọn giúp học viên tiết kiệm thời gian tối đa.</p>
</div>
</div>
</main>
<Footer />

</>
  );
};

export default CourseComparison;
