import { useState, useEffect } from 'react';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';
import { useAppStore } from '../store/useAppStore';
import { enrollmentAPI } from '../services/api';

interface EnrollmentFromAPI {
  id: number;
  userId: number;
  courseId: number;
  status: string;
  createdAt: string;
  course: {
    id: number;
    title: string;
    price: number;
    licenseType: string;
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function formatPrice(n: number): string {
  return n.toLocaleString('vi-VN') + 'đ';
}

function mapStatus(status: string): 'success' | 'pending' | 'failed' {
  switch (status) {
    case 'ACTIVE':
    case 'COMPLETED':
      return 'success';
    case 'PENDING':
      return 'pending';
    case 'CANCELLED':
      return 'failed';
    default:
      return 'pending';
  }
}

const TransactionHistory = () => {
  const { transactions, isLoggedIn } = useAppStore();
  const [enrollments, setEnrollments] = useState<EnrollmentFromAPI[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    enrollmentAPI.getMyEnrollments()
      .then(res => setEnrollments(res.data.enrollments || []))
      .catch(err => console.error('Failed to fetch enrollments:', err))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  // Merge: local transactions (from checkout just now) + enrollments from DB
  const allTransactions = [
    ...transactions,
    ...enrollments
      .filter(e => !transactions.some(t => t.course === e.course.title))
      .map(e => ({
        id: `ENR-${e.id}`,
        date: formatDate(e.createdAt),
        amount: formatPrice(e.course.price),
        method: '—',
        status: mapStatus(e.status),
        course: e.course.title,
      })),
  ];

  return (
    <>
      <UserNavbar />
      <main className="min-h-screen bg-surface-container-lowest py-12">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Lịch sử giao dịch</h1>
            <p className="text-on-surface-variant">Tra cứu lịch sử thanh toán, học phí và hóa đơn của bạn.</p>
          </div>

          {/* Success banner for latest transaction */}
          {transactions.length > 0 && transactions[0].status === 'success' && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-green-800">Thanh toán thành công!</h4>
                <p className="text-sm text-green-600">Giao dịch <span className="font-bold">{transactions[0].id}</span> — {transactions[0].course} — <span className="font-bold">{transactions[0].amount}</span></p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl shadow-sm border border-surface-variant/30 overflow-hidden">
            <div className="p-6 border-b border-surface-variant/30 bg-surface-container-low flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Tìm mã giao dịch..." className="px-4 py-2 rounded-lg border border-outline/30 text-sm focus:outline-none focus:border-primary w-64" />
              </div>
              <div className="flex gap-2 items-center">
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-on-surface-variant text-sm">Đang tải dữ liệu...</span>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-lowest text-on-surface-variant text-sm border-b border-surface-variant/30">
                      <th className="p-4 font-medium">Mã GD</th>
                      <th className="p-4 font-medium">Thời gian</th>
                      <th className="p-4 font-medium">Nội dung</th>
                      <th className="p-4 font-medium">Phương thức</th>
                      <th className="p-4 font-medium">Số tiền</th>
                      <th className="p-4 font-medium text-center">Trạng thái</th>
                      <th className="p-4 font-medium text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-variant/20 text-sm text-on-surface">
                    {allTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-on-surface-variant">
                          Chưa có giao dịch nào. Hãy đăng ký khóa học đầu tiên!
                        </td>
                      </tr>
                    ) : (
                      allTransactions.map(trx => (
                        <tr key={trx.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="p-4 font-bold text-primary">{trx.id}</td>
                          <td className="p-4 text-on-surface-variant">{trx.date}</td>
                          <td className="p-4">{trx.course}</td>
                          <td className="p-4">
                            <span className="bg-surface-container px-2 py-1 rounded text-xs font-medium">{trx.method}</span>
                          </td>
                          <td className="p-4 font-bold">{trx.amount}</td>
                          <td className="p-4 text-center">
                            {trx.status === 'success' && <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">Thành công</span>}
                            {trx.status === 'pending' && <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200">Đang xử lý</span>}
                            {trx.status === 'failed' && <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200">Thất bại</span>}
                          </td>
                          <td className="p-4 text-center">
                            <button className="text-primary hover:text-primary-container transition-colors" title="Tải hóa đơn">
                              <span className="material-symbols-outlined text-[20px]">download</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-4 border-t border-surface-variant/30 text-center text-sm text-on-surface-variant flex justify-between items-center">
              <span>Hiển thị {allTransactions.length} giao dịch</span>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default TransactionHistory;
