import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';
import { courseAPI } from '../services/api';

// Course image mapping by license type
const courseImages: Record<string, string> = {
  B1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtdhL4cMJCGKcrIP31hP5RIDo8nFVivqRd4z0RMWwmWSEaqbaIgXPNvxpZ5XeG_UMQcvcoTt0-WHWaAkqOShMawOXS5HVVMs17RQITmReETptRL2aFgZD6PQrKcziaODIi9GdJFi5pUe6KjnGQMKMBIlLXikCGLI7TMSLO0dKcprFfeG-WjkTcmp2gT6mxpUA8_UZTYbKx5xfA9EDCEWbuGP0SvXEtvgDBt82hSQcox0g2HYq0iHxluBrn_WlTniod89bK58iFtzw',
  B2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe3y9OwHRkQKmjhLK-4chlyq_okxDDf8nLOg59FN3bqsxl-lhsog7tDD-ZdcHa6yEHgSKNMRPiHsH7Esu1GVI7XkvVZ6JIKxjn21Y3cis7WEl257Xl4Tqon8byMMxIcKWojRZdVGt531ARZMhVN-wIQ0rwkn2zHHrGTE9P3djsRSVXtB7vBJGrNRHOnwVR4DVbGEX7OquJvoOdiUleFQX0JuZXNIlFfjOPuE1To9CgWjQlWjzRCkUrp7kdH9f-5Y6Q1rBkUaX5KwQ',
  C: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcNt0_ZGxMJ6cFkin3o118_tSesl4-oepz26bL5LykxGKvuZTIjdo4VTM7OI2MKbOSGdX5T2TwbdccAnqwwIpqu83Gu9h8eGp21ITR0JKZKkwcL5zwLIu_fJ64Lq6_ZBAYMfux6bws33-1dc5WSpG7Y0e-x8koHcsnDWzcIWXjcYvhA_GHTN3KqPkggrkZxRLOibTSSng6uMw_cvTAlIF0eJC3BpEo0n2tScQBAMS-ieAqMzXUkYgzVlt9V6yCZ9Vnp9kdIxC49sQ',
};

const gradients: Record<string, string> = {
  B1: 'from-blue-50 to-indigo-100',
  B2: 'from-slate-100 to-blue-100',
  C: 'from-orange-50 to-blue-50',
};

interface Course {
  id: number;
  title: string;
  description: string;
  licenseType: string;
  price: number;
  duration: string;
}

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + 'đ';
}

const CourseCatalog = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    courseAPI.getAll({ size: 50 })
      .then(res => {
        setCourses(res.data.courses || []);
      })
      .catch(err => {
        console.error('Failed to fetch courses:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = courses.filter(c => {
    const matchFilter = filter === 'ALL' || c.licenseType === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.description.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <>
      <UserNavbar />
      <main className="pt-8 pb-20">

        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="bg-surface-container-low rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {['ALL', 'B1', 'B2', 'C'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    filter === f
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {f === 'ALL' ? 'Tất cả' : `Hạng ${f}`}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
                placeholder="Tìm tên khóa học hoặc mã hiệu..."
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Skeleton loaders
            [1, 2, 3].map(i => (
              <div key={i} className="bg-surface-container-low rounded-[2rem] overflow-hidden animate-pulse">
                <div className="h-56 bg-surface-container" />
                <div className="p-8 space-y-4">
                  <div className="h-6 bg-surface-container rounded w-3/4" />
                  <div className="h-4 bg-surface-container rounded w-full" />
                  <div className="h-4 bg-surface-container rounded w-1/2" />
                  <div className="h-12 bg-surface-container rounded-2xl mt-6" />
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-on-surface-variant text-lg">Không tìm thấy khóa học phù hợp.</p>
            </div>
          ) : (
            filtered.map(course => (
              <div key={course.id} className="group bg-surface-container-low rounded-[2rem] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
                <div className={`h-56 relative bg-gradient-to-br ${gradients[course.licenseType] || 'from-blue-50 to-indigo-100'} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img
                      alt={course.title}
                      className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:scale-110 transition-transform duration-500"
                      src={courseImages[course.licenseType] || courseImages.B2}
                    />
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                      Hạng {course.licenseType}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black tracking-tight text-on-surface mb-3">{course.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed line-clamp-2">{course.description}</p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">schedule</span> Thời gian học
                      </span>
                      <span className="font-bold text-on-surface">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant text-sm">Học phí trọn gói</span>
                      <span className="text-2xl font-black text-primary">{formatPrice(course.price)}</span>
                    </div>
                  </div>
                  <div className="mt-auto grid grid-cols-1 gap-3">
                    <Link to={`/courses/${course.id}`} className="inline-flex justify-center items-center text-center w-full py-4 bg-primary text-on-primary font-bold rounded-2xl hover:brightness-110 transition-all active:scale-[0.98]">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        <section className="max-w-7xl mx-auto px-6 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <h4 className="font-bold text-on-surface mb-2">Tỉ lệ đỗ 98%</h4>
              <p className="text-xs text-on-surface-variant">Quy trình đào tạo tối ưu kết hợp mẹo thi sát hạch thực tiễn.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
              </div>
              <h4 className="font-bold text-on-surface mb-2">Xe đời mới 100%</h4>
              <p className="text-xs text-on-surface-variant">Sử dụng các dòng xe hiện đại, điều hòa mát mẻ, vận hành êm ái.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>update</span>
              </div>
              <h4 className="font-bold text-on-surface mb-2">Giờ học linh hoạt</h4>
              <p className="text-xs text-on-surface-variant">Tự chọn thời gian học rảnh: sáng, chiều hoặc tối kể cả T7/CN.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-container/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              </div>
              <h4 className="font-bold text-on-surface mb-2">Học phí trả góp</h4>
              <p className="text-xs text-on-surface-variant">Hỗ trợ chia nhỏ học phí đóng làm nhiều đợt 0% lãi suất.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CourseCatalog;
