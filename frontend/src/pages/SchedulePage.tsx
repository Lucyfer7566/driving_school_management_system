import { useState, useEffect } from 'react';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';
import { useAppStore } from '../store/useAppStore';
import { scheduleAPI, enrollmentAPI, userAPI } from '../services/api';

interface ScheduleFromAPI {
  id: number;
  courseId: number;
  instructorId: number;
  studentId: number;
  lessonDate: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string | null;
  course: { id: number; title: string; licenseType: string } | null;
  instructor: { id: number; name: string; email: string } | null;
  student: { id: number; name: string; email: string } | null;
}

interface Enrollment {
  id: number;
  courseId: number;
  status: string;
  course: { id: number; title: string; price: number };
}

interface Instructor {
  id: number;
  name: string;
  email: string;
}

const SchedulePage = () => {
  const { isLoggedIn, user } = useAppStore();
  const [schedules, setSchedules] = useState<ScheduleFromAPI[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Registration Modal State
  const [showModal, setShowModal] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    courseId: '',
    instructorId: '',
    lessonDate: '',
    startTime: '08:00',
    endTime: '10:00',
    notes: '',
  });

  const fetchSchedules = () => {
    if (!isLoggedIn) return;
    setLoading(true);
    scheduleAPI.getAll({ take: 50 })
      .then(res => setSchedules(res.data.schedules || []))
      .catch(err => console.error('Failed to fetch schedules:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSchedules();
  }, [isLoggedIn]);

  // Load modal data when opening
  useEffect(() => {
    if (showModal && enrollments.length === 0) {
      enrollmentAPI.getMyEnrollments()
        .then(res => {
          setEnrollments(res.data.enrollments || []);
          if (res.data.enrollments?.length > 0) {
            setFormData(prev => ({ ...prev, courseId: String(res.data.enrollments[0].courseId) }));
          }
        })
        .catch(console.error);
        
      userAPI.getInstructors()
        .then(res => {
          setInstructors(res.data.users || []);
          if (res.data.users?.length > 0) {
            setFormData(prev => ({ ...prev, instructorId: String(res.data.users[0].id) }));
          }
        })
        .catch(console.error);
    }
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.courseId || !formData.instructorId || !formData.lessonDate || !formData.startTime || !formData.endTime) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    
    setSubmitting(true);
    setError('');
    
    try {
      await scheduleAPI.generate({
        courseId: Number(formData.courseId),
        instructorId: Number(formData.instructorId),
        studentId: user!.id,
        lessonDate: new Date(formData.lessonDate).toISOString(),
        startTime: formData.startTime,
        endTime: formData.endTime,
        notes: formData.notes,
      });
      
      setShowModal(false);
      setFormData({
        courseId: enrollments.length > 0 ? String(enrollments[0].courseId) : '',
        instructorId: instructors.length > 0 ? String(instructors[0].id) : '',
        lessonDate: '',
        startTime: '08:00',
        endTime: '10:00',
        notes: '',
      });
      fetchSchedules();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Đăng ký lịch học thất bại. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const statusLabel = (s: string) => {
    switch (s) {
      case 'SCHEDULED': return { text: 'Đã xếp lịch', color: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'COMPLETED': return { text: 'Đã hoàn thành', color: 'bg-green-100 text-green-700 border-green-200' };
      case 'CANCELLED': return { text: 'Đã hủy', color: 'bg-red-100 text-red-700 border-red-200' };
      default: return { text: s, color: 'bg-gray-100 text-gray-700 border-gray-200' };
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <>
      <UserNavbar />
      
      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-xl w-full shadow-2xl animate-[scaleIn_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-on-surface">Đăng ký buổi học</h3>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-on-surface bg-surface-container rounded-full p-2">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {error && (
              <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Khóa học</label>
                <select 
                  value={formData.courseId} 
                  onChange={e => setFormData({...formData, courseId: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="" disabled>-- Chọn khóa học --</option>
                  {enrollments.map(e => (
                    <option key={e.id} value={e.courseId}>{e.course.title}</option>
                  ))}
                </select>
                {enrollments.length === 0 && <p className="text-xs text-red-500 mt-1">Bạn chưa đăng ký khóa học nào.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Giảng viên</label>
                <select 
                  value={formData.instructorId} 
                  onChange={e => setFormData({...formData, instructorId: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="" disabled>-- Chọn giảng viên --</option>
                  {instructors.map(i => (
                    <option key={i.id} value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Ngày học</label>
                  <input 
                    type="date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.lessonDate} 
                    onChange={e => setFormData({...formData, lessonDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Từ giờ</label>
                    <input 
                      type="time" 
                      required
                      value={formData.startTime} 
                      onChange={e => setFormData({...formData, startTime: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Đến giờ</label>
                    <input 
                      type="time" 
                      required
                      value={formData.endTime} 
                      onChange={e => setFormData({...formData, endTime: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-1">Ghi chú (Tùy chọn)</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Thực hành sa hình..."
                  value={formData.notes} 
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-outline bg-surface-container-lowest outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="pt-4 border-t border-surface-variant/30 mt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl font-bold text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  disabled={submitting || enrollments.length === 0}
                  className="px-6 py-3 rounded-xl font-bold text-on-primary bg-primary hover:scale-[1.02] transition-transform shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Đang xử lý...' : 'Đăng ký'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-surface-container-lowest py-12">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Lịch học của tôi</h1>
              <p className="text-on-surface-variant">Xem và quản lý lịch học các buổi thực hành/lý thuyết.</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-xl font-bold hover:scale-[1.02] shadow-md transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Đăng ký buổi học
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Col - Legend */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-variant/30">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">info</span>
                  Chú thích
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>Đã xếp lịch</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>Đã hoàn thành</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-400"></div>
                    <span>Đã hủy</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-variant/30">
                <h3 className="font-bold text-lg mb-2">Tổng quan</h3>
                <div className="space-y-2 text-sm text-on-surface-variant">
                  <p>Tổng buổi: <span className="font-bold text-on-surface">{schedules.length}</span></p>
                  <p>Hoàn thành: <span className="font-bold text-green-600">{schedules.filter(s => s.status === 'COMPLETED').length}</span></p>
                  <p>Sắp tới: <span className="font-bold text-blue-600">{schedules.filter(s => s.status === 'SCHEDULED').length}</span></p>
                </div>
              </div>
            </div>

            {/* Right Col - Schedule List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-surface-variant/30 overflow-hidden">
                <div className="p-6 border-b border-surface-variant/30 bg-surface-container-lowest flex justify-between items-center">
                  <h3 className="font-bold text-lg">Danh sách buổi học</h3>
                </div>
                
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-3 text-on-surface-variant text-sm">Đang tải lịch học...</span>
                  </div>
                ) : schedules.length === 0 ? (
                  <div className="p-12 text-center text-on-surface-variant">
                    Chưa có lịch học nào. Hãy đăng ký buổi học ngay!
                  </div>
                ) : (
                  <div className="divide-y divide-surface-variant/30">
                    {schedules.map(sched => {
                      const st = statusLabel(sched.status);
                      return (
                        <div key={sched.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-surface-container-lowest/50 transition-colors">
                          <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 text-primary p-3 rounded-xl">
                              <span className="material-symbols-outlined">
                                {sched.course?.licenseType === 'C' ? 'local_shipping' : 'directions_car'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-bold text-on-surface text-lg">{sched.startTime} - {sched.endTime}</h4>
                              <p className="text-on-surface-variant font-medium">{sched.course?.title || 'Khóa học'}</p>
                              <p className="text-sm text-on-surface-variant mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">calendar_today</span> {formatDate(sched.lessonDate)}
                              </p>
                              <p className="text-sm text-on-surface-variant mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">person</span> GV: {sched.instructor?.name || 'Chưa phân công'}
                              </p>
                              {sched.notes && (
                                <p className="text-xs text-on-surface-variant mt-1 italic">📝 {sched.notes}</p>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${st.color}`}>
                              {st.text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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

export default SchedulePage;
