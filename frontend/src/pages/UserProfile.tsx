import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const UserProfile = () => {
  return (
    <>
      <UserNavbar />
      <main className="min-h-screen bg-surface-container-lowest py-12">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Profile Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-surface-variant/30 p-8 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-full h-full rounded-full bg-surface-dim overflow-hidden border-4 border-white shadow-lg">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-sm" data-icon="edit">edit</span>
                  </button>
                </div>
                <h2 className="text-xl font-bold text-on-surface">Nguyễn Văn A</h2>
                <p className="text-sm text-on-surface-variant mb-4">Học viên hạng B2</p>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 border border-green-200">
                  <span className="material-symbols-outlined text-[14px]" data-icon="check_circle">check_circle</span> Đã xác minh CCCD
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-surface-variant/30 p-2 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold bg-primary/10 text-primary">
                  <span className="material-symbols-outlined" data-icon="person">person</span> Thông tin cá nhân
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined" data-icon="lock">lock</span> Đổi mật khẩu
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Progress Summary */}
              <div className="bg-primary rounded-3xl shadow-lg p-8 text-on-primary relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Tiến độ khóa học B2</h3>
                    <p className="opacity-90 mb-6">Bạn đã hoàn thành 45% khối lượng chương trình. Cố lên nhé!</p>
                    <div className="flex gap-6">
                      <div>
                        <div className="text-3xl font-black mb-1">12/30</div>
                        <div className="text-sm opacity-80">Giờ thực hành</div>
                      </div>
                      <div>
                        <div className="text-3xl font-black mb-1">8/10</div>
                        <div className="text-sm opacity-80">Chuyên đề LT</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-32 h-32 relative flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" strokeOpacity="0.2"></circle>
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray="283" strokeDashoffset="155" className="text-white"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-3xl font-black">45%</div>
                  </div>
                </div>
                
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
              </div>

              {/* Edit Form */}
              <div className="bg-white rounded-3xl shadow-sm border border-surface-variant/30 p-8">
                <h3 className="font-bold text-xl text-on-surface mb-6 pb-4 border-b border-surface-variant/30">Cập nhật thông tin</h3>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Họ và tên</label>
                    <input type="text" defaultValue="Nguyễn Văn A" className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Số điện thoại</label>
                    <input type="text" defaultValue="0987654321" className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
                    <input type="email" defaultValue="nguyenvana@example.com" disabled className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container/50 text-on-surface-variant cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Ngày sinh</label>
                    <input type="date" defaultValue="1995-08-15" className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1">Căn cước công dân (CCCD)</label>
                    <input type="text" defaultValue="001095123456" disabled className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container/50 text-on-surface-variant cursor-not-allowed" />
                    <p className="text-xs text-on-surface-variant mt-1">Liên hệ bộ phận CSKH nếu cần thay đổi CCCD.</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1">Địa chỉ liên hệ</label>
                    <input type="text" defaultValue="123 Nguyễn Trãi, Thanh Xuân, Hà Nội" className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  
                  <div className="md:col-span-2 flex justify-end mt-4">
                    <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-md">
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserProfile;
