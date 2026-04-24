import { useState } from 'react';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { enrollmentAPI, paymentAPI } from '../services/api';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('VNPAY');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successTrxId, setSuccessTrxId] = useState('');
  const navigate = useNavigate();
  const { selectedCourse, user, addTransaction, setSelectedCourse, setLastEnrollmentId } = useAppStore();

  const course = selectedCourse || {
    id: 3,
    name: 'Hạng B2 - Xe số sàn & Số tự động (Hành nghề)',
    category: 'Hạng B2',
    duration: '3.5 tháng',
    price: 15000000,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
  };

  const discount = 1000000;
  const healthFee = 450000;
  const examFee = 585000;
  const total = course.price + healthFee + examFee - discount;

  const fmt = (n: number) => n.toLocaleString('vi-VN') + 'đ';

  const methodLabels: Record<string, string> = {
    VNPAY: 'VNPay',
    MOMO: 'MoMo',
    BANK_CARD: 'Chuyển khoản',
  };

  const handlePay = async () => {
    setLoading(true);
    setError('');

    try {
      // Step 1: Create enrollment
      const enrollRes = await enrollmentAPI.create(Number(course.id));
      const enrollment = enrollRes.data.enrollment;
      setLastEnrollmentId(enrollment.id);

      // Step 2: Create payment
      const payRes = await paymentAPI.create({
        enrollmentId: enrollment.id,
        method: paymentMethod,
      });
      const payment = payRes.data.payment;

      // Step 3: Simulate webhook (mark COMPLETED)
      await paymentAPI.webhook(payment.transactionRef, 'COMPLETED');

      // Step 4 is now removed - user manually registers schedules on SchedulePage

      // Step 5: Add to local state
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      addTransaction({
        id: payment.transactionRef,
        date: dateStr,
        amount: fmt(payment.amount),
        method: methodLabels[paymentMethod] || paymentMethod,
        status: 'success',
        course: course.name,
      });

      // Show success popup
      setSuccessTrxId(payment.transactionRef);
      setShowSuccess(true);
    } catch (err: any) {
      const msg = err.response?.data?.error?.message
        || err.response?.data?.error
        || 'Thanh toán thất bại. Vui lòng thử lại.';
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSelectedCourse(null);
    navigate('/transactions');
  };

  return (
    <>
      <UserNavbar />

      {/* Success Popup Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleSuccessClose}>
          <div className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl text-center animate-[scaleIn_0.3s_ease-out]" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-600" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-on-surface mb-2">Thanh toán thành công!</h3>
            <p className="text-on-surface-variant mb-2">Bạn đã đăng ký thành công khóa học</p>
            <p className="font-bold text-primary text-lg mb-1">{course.name}</p>
            <p className="text-sm text-on-surface-variant mb-6">
              Mã giao dịch: <span className="font-mono font-bold text-on-surface">{successTrxId}</span>
            </p>
            <div className="space-y-3">
              <button
                onClick={handleSuccessClose}
                className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-md"
              >
                Xem lịch sử giao dịch
              </button>
              <button
                onClick={() => { setShowSuccess(false); setSelectedCourse(null); navigate('/schedule'); }}
                className="w-full bg-surface-container text-on-surface py-3 rounded-xl font-bold hover:bg-surface-container-high transition-colors"
              >
                Xem lịch học
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-surface-container-lowest py-12">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Thanh toán khóa học</h1>
            <p className="text-on-surface-variant">Hoàn tất thủ tục đăng ký để giữ chỗ và xếp lớp sớm nhất.</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              {error}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Col */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Course Info */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-surface-variant/30">
                <h3 className="font-bold text-xl mb-6 pb-4 border-b border-surface-variant/30 text-on-surface">Thông tin đơn hàng</h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 aspect-[4/3] rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={course.image} alt="Course" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">{course.category}</div>
                    <h4 className="text-xl font-bold text-on-surface mb-2">{course.name}</h4>
                    <ul className="space-y-2 text-on-surface-variant text-sm">
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">schedule</span> Thời gian học: {course.duration}</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">school</span> Giảng viên: Sắp xếp ngẫu nhiên</li>
                      <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">date_range</span> Khai giảng dự kiến: 15/06/2026</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-surface-variant/30">
                <h3 className="font-bold text-xl mb-6 pb-4 border-b border-surface-variant/30 text-on-surface">Thông tin học viên</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Họ và tên</label>
                    <input type="text" defaultValue={user?.name || ''} className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Số điện thoại</label>
                    <input type="text" defaultValue={user?.phone || ''} placeholder="0987654321" className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
                    <input type="email" defaultValue={user?.email || ''} disabled className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container/50 text-on-surface-variant cursor-not-allowed" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1">Căn cước công dân (CCCD)</label>
                    <input type="text" placeholder="Nhập số CCCD (12 số)" className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Payment Methods */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-surface-variant/30">
                <h3 className="font-bold text-xl mb-6 pb-4 border-b border-surface-variant/30 text-on-surface">Phương thức thanh toán</h3>
                <div className="space-y-4">
                  {(['VNPAY', 'MOMO', 'BANK_CARD'] as const).map(method => (
                    <label key={method} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === method ? 'border-primary bg-primary/5' : 'border-outline/30 hover:border-outline'}`}>
                      <input 
                        type="radio" name="payment" 
                        checked={paymentMethod === method} 
                        onChange={() => setPaymentMethod(method)}
                        className="w-5 h-5 text-primary accent-primary" 
                      />
                      <div className="flex-1">
                        <div className="font-bold text-on-surface">{methodLabels[method]}</div>
                        <div className="text-xs text-on-surface-variant">
                          {method === 'VNPAY' && 'Thanh toán qua ví VNPay hoặc QR Code'}
                          {method === 'MOMO' && 'Thanh toán bằng ví điện tử MoMo'}
                          {method === 'BANK_CARD' && 'Quét mã VietQR để thanh toán'}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bill Summary */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-surface-variant/30 sticky top-24">
                <h3 className="font-bold text-xl mb-6 pb-4 border-b border-surface-variant/30 text-on-surface">Chi tiết thanh toán</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Học phí cơ bản</span>
                    <span className="font-medium text-on-surface">{fmt(course.price)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Phí khám sức khỏe</span>
                    <span className="font-medium text-on-surface">{fmt(healthFee)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Phí sát hạch (Thu hộ)</span>
                    <span className="font-medium text-on-surface">{fmt(examFee)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá (Khuyến mãi Hè)</span>
                    <span className="font-medium">-{fmt(discount)}</span>
                  </div>
                </div>

                <div className="border-t border-surface-variant/30 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-on-surface">Tổng cộng</span>
                    <span className="font-black text-2xl text-primary">{fmt(total)}</span>
                  </div>
                  <p className="text-xs text-right text-on-surface-variant mt-1">Đã bao gồm VAT</p>
                </div>

                <button
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full block text-center bg-primary text-on-primary py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Đang xử lý thanh toán...' : 'Xác nhận & Thanh toán'}
                </button>
                <p className="text-xs text-center text-on-surface-variant mt-4 leading-relaxed">
                  Bằng việc bấm xác nhận, bạn đồng ý với các <a href="#" className="text-primary hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="text-primary hover:underline">Chính sách hoàn tiền</a> của chúng tôi.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default CheckoutPage;
