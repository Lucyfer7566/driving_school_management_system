import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/courses', label: 'Khóa học' },
  { to: '/schedule', label: 'Lịch học' },
  { to: '/transactions', label: 'Học phí' },
  { to: '/support', label: 'Hỗ trợ' },
];

export function UserNavbar() {
  const { isLoggedIn, user, logout } = useAppStore();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="bg-[#faf8ff] shadow-[0_4px_20px_-10px_rgba(0,55,176,0.1)] full-width top-0 sticky z-50">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-black text-[#0037b0] tracking-tighter">
            Precision Driving
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-['Inter'] font-semibold tracking-tight leading-6">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  isActive(item.to)
                    ? 'text-[#0037b0] font-bold border-b-2 border-[#0037b0] pb-1'
                    : 'text-slate-600 font-medium hover:text-[#1D4ED8] transition-colors duration-200'
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm hover:bg-primary/20 transition-colors">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  {user?.name || 'Học viên'}
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link to="/auth" className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
                Đăng nhập / Đăng ký
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
