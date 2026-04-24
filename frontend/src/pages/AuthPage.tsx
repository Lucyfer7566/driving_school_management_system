import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { authAPI } from '../services/api';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, selectedCourse } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }
    if (!isLogin && !name) {
      setError('Vui lòng nhập họ và tên.');
      return;
    }

    setLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await authAPI.login(email, password);
      } else {
        res = await authAPI.register({ email, password, name });
      }

      const { token, user } = res.data;
      login(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: '',
          role: user.role,
        },
        token
      );

      // If user came here from course enrollment → redirect to checkout
      if (selectedCourse) {
        navigate('/checkout');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      const msg = err.response?.data?.error?.message
        || err.response?.data?.error
        || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface-container-low">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" 
          alt="Driving School" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-on-primary p-12">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Precision Driving</h1>
          <p className="text-lg opacity-90">Hành trình làm chủ tay lái bắt đầu từ đây.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-surface-variant/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-on-surface mb-2">
              {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
            </h2>
            <p className="text-on-surface-variant">
              {isLogin ? 'Đăng nhập để quản lý lộ trình học của bạn' : 'Đăng ký ngay để bắt đầu khóa học lái xe'}
            </p>
          </div>

          <div className="flex bg-surface-container-lowest p-1 rounded-xl mb-8 border border-surface-variant/50">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                isLogin ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                !isLogin ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Đăng ký
            </button>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Họ và tên</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nguyễn Văn A" 
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com" 
                className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-on-surface">Mật khẩu</label>
                {isLogin && <Link to="#" className="text-xs text-primary font-medium hover:underline">Quên mật khẩu?</Link>}
              </div>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              {!isLogin && (
                <p className="text-xs text-on-surface-variant mt-1">Mật khẩu tối thiểu 6 ký tự</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-surface-variant/30 text-center">
            <p className="text-sm text-on-surface-variant">
              Về trang chủ? <Link to="/" className="text-primary font-bold hover:underline">Nhấn vào đây</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
