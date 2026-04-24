import { useState } from 'react';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'support'>('notifications');

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Thanh toán thành công', content: 'Giao dịch TRX-982103 số tiền 14.535.000đ đã được xác nhận.', time: '10:35 24/04/2026', read: false, type: 'payment' },
    { id: 2, title: 'Nhắc nhở lịch học', content: 'Bạn có lịch học "Thực hành đường trường" vào lúc 14:00 ngày mai (25/04/2026). Vui lòng đến đúng giờ.', time: '14:00 24/04/2026', read: false, type: 'reminder' },
    { id: 3, title: 'Xếp lớp thành công', content: 'Hệ thống đã xếp giảng viên Nguyễn Văn Tuấn cho khóa học B2 của bạn.', time: '09:00 20/04/2026', read: true, type: 'system' },
  ];

  // Mock support tickets
  const tickets = [
    { id: 'TCK-112', subject: 'Xin đổi lịch học ngày 10/05', status: 'Đang xử lý', date: '24/04/2026' },
    { id: 'TCK-089', subject: 'Thắc mắc về thủ tục khám sức khỏe', status: 'Đã đóng', date: '15/04/2026' },
  ];

  return (
    <>
      <UserNavbar />
      <main className="min-h-screen bg-surface-container-lowest py-12">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Thông báo & Hỗ trợ</h1>
            <p className="text-on-surface-variant">Quản lý thông báo hệ thống và liên hệ bộ phận hỗ trợ học viên.</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-surface-variant/30 p-4 space-y-2 sticky top-24">
                <button 
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'notifications' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
                >
                  <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                  Thông báo
                  {notifications.some(n => !n.read) && (
                    <span className="ml-auto bg-error text-on-error text-[10px] px-2 py-0.5 rounded-full">Mới</span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('support')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'support' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
                >
                  <span className="material-symbols-outlined" data-icon="support_agent">support_agent</span>
                  Yêu cầu hỗ trợ
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-sm border border-surface-variant/30 p-8 min-h-[500px]">
                
                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div>
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-surface-variant/30">
                      <h3 className="font-bold text-xl text-on-surface">Danh sách thông báo</h3>
                      <button className="text-sm font-medium text-primary hover:underline">Đánh dấu tất cả đã đọc</button>
                    </div>
                    
                    <div className="space-y-4">
                      {notifications.map(noti => (
                        <div key={noti.id} className={`p-5 rounded-2xl border transition-colors ${noti.read ? 'border-surface-variant/30 bg-surface-container-lowest' : 'border-primary/30 bg-primary/5'}`}>
                          <div className="flex gap-4 items-start">
                            <div className={`p-3 rounded-full ${noti.type === 'payment' ? 'bg-green-100 text-green-600' : noti.type === 'reminder' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                              <span className="material-symbols-outlined" data-icon={noti.type === 'payment' ? 'payments' : noti.type === 'reminder' ? 'alarm' : 'info'}>
                                {noti.type === 'payment' ? 'payments' : noti.type === 'reminder' ? 'alarm' : 'info'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-lg ${noti.read ? 'font-medium text-on-surface' : 'font-bold text-primary'}`}>{noti.title}</h4>
                                <span className="text-xs text-on-surface-variant">{noti.time}</span>
                              </div>
                              <p className="text-on-surface-variant text-sm leading-relaxed">{noti.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Support Tab */}
                {activeTab === 'support' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-xl text-on-surface mb-6">Gửi yêu cầu mới</h3>
                      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                          <label className="block text-sm font-medium text-on-surface mb-1">Tiêu đề</label>
                          <input type="text" placeholder="VD: Xin đổi lịch học..." className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-on-surface mb-1">Loại hỗ trợ</label>
                          <select className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none">
                            <option>Lịch học & Xếp lớp</option>
                            <option>Học phí & Thanh toán</option>
                            <option>Hồ sơ & Giấy tờ</option>
                            <option>Khác</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-on-surface mb-1">Nội dung chi tiết</label>
                          <textarea rows={5} placeholder="Trình bày chi tiết vấn đề của bạn..." className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"></textarea>
                        </div>
                        <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-md">
                          Gửi yêu cầu
                        </button>
                      </form>
                    </div>

                    <div>
                      <h3 className="font-bold text-xl text-on-surface mb-6">Lịch sử hỗ trợ</h3>
                      <div className="space-y-4">
                        {tickets.map(ticket => (
                          <div key={ticket.id} className="p-4 rounded-xl border border-surface-variant/30 bg-surface-container-lowest hover:bg-surface-container transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-xs font-bold text-on-surface-variant">{ticket.id}</span>
                              <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${ticket.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-700' : 'bg-surface-variant text-on-surface-variant'}`}>{ticket.status}</span>
                            </div>
                            <h4 className="font-bold text-on-surface mb-1 line-clamp-1">{ticket.subject}</h4>
                            <p className="text-xs text-on-surface-variant">Ngày gửi: {ticket.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default SupportPage;
