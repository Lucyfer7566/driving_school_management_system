import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <>
      <footer className="bg-slate-50 border-t border-slate-200">
<div className="max-w-7xl mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
<div className="col-span-1 md:col-span-1">
<div className="text-lg font-bold text-[#0037b0] mb-6">Precision Navigator</div>
<p className="text-slate-500 text-sm leading-relaxed mb-6">Hệ thống đào tạo lái xe ứng dụng công nghệ hàng đầu Việt Nam, mang đến trải nghiệm học tập hiện đại và chuyên nghiệp.</p>
<div className="flex gap-4">
<Link className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" to="#">
<span className="material-symbols-outlined text-lg" data-icon="facebook">social_leaderboard</span>
</Link>
<Link className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" to="#">
<span className="material-symbols-outlined text-lg" data-icon="language">language</span>
</Link>
</div>
</div>
<div>
<h6 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">Liên hệ</h6>
<ul className="space-y-4 text-sm text-slate-500">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary text-lg" data-icon="location_on">location_on</span>
<span>123 Đường Ba Đình, Quận 1, TP. Hồ Chí Minh</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-lg" data-icon="call">call</span>
<span>Hotline: 1900 6789</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-lg" data-icon="mail">mail</span>
<span>info@precisiondriving.vn</span>
</li>
</ul>
</div>
<div>
<h6 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">Liên kết nhanh</h6>
<ul className="space-y-4 text-sm font-['Inter']">
<li><Link className="text-slate-500 hover:text-[#0037b0] transition-all" to="#">Về chúng tôi</Link></li>
<li><Link className="text-slate-500 hover:text-[#0037b0] transition-all" to="#">Khóa học B1/B2</Link></li>
<li><Link className="text-slate-500 hover:text-[#0037b0] transition-all" to="#">Thủ tục đăng ký</Link></li>
<li><Link className="text-slate-500 hover:text-[#0037b0] transition-all" to="#">Câu hỏi thường gặp</Link></li>
</ul>
</div>
<div>
<h6 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">Pháp lý</h6>
<ul className="space-y-4 text-sm font-['Inter']">
<li><Link className="text-slate-500 hover:text-[#0037b0] transition-all underline decoration-transparent hover:decoration-primary" to="#">Điều khoản</Link></li>
<li><Link className="text-slate-500 hover:text-[#0037b0] transition-all underline decoration-transparent hover:decoration-primary" to="#">Chính sách bảo mật</Link></li>
<li><Link className="text-slate-500 hover:text-[#0037b0] transition-all underline decoration-transparent hover:decoration-primary" to="#">Chính sách hoàn phí</Link></li>
</ul>
</div>
</div>
<div className="max-w-7xl mx-auto px-8 py-6 border-t border-slate-200 text-center text-slate-400 text-xs">
            © 2024 Precision Navigator Driving School. All rights reserved.
        </div>
</footer>
    </>
  );
}
