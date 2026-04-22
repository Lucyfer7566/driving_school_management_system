import { Link } from 'react-router-dom';

export function UserNavbar() {
  return (
    <>
      <header className="bg-[#faf8ff] shadow-[0_4px_20px_-10px_rgba(0,55,176,0.1)] full-width top-0 sticky z-50">
<div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
<div className="text-xl font-black text-[#0037b0] tracking-tighter">
                Precision Driving
            </div>
<nav className="hidden md:flex items-center gap-8 font-['Inter'] font-semibold tracking-tight leading-6">
<Link className="text-[#0037b0] font-bold border-b-2 border-[#0037b0] pb-1" to="#">Khóa học</Link>
<Link className="text-slate-600 font-medium hover:text-[#1D4ED8] transition-colors duration-200" to="#">Lịch học</Link>
<Link className="text-slate-600 font-medium hover:text-[#1D4ED8] transition-colors duration-200" to="#">Học phí</Link>
<Link className="text-slate-600 font-medium hover:text-[#1D4ED8] transition-colors duration-200" to="#">Hướng dẫn</Link>
</nav>
<div className="flex items-center gap-4">
<button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
                    Đăng ký học ngay
                </button>
</div>
</div>
</header>
    </>
  );
}
