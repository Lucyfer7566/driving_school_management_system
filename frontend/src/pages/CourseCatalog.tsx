import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const API_URL = 'http://localhost:8000/api/courses';

// ✅ TYPE
type Course = {
  id: number;
  title: string;
  description: string;
  licenseType: string;
  price: number;
  duration: string;
};

type CourseQuery = {
  category?: string;
  keyword?: string;
};

const CourseCatalog = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');

  // ✅ FETCH API
  const fetchCourses = async (query?: CourseQuery) => {
    try {
      setLoading(true);

      const params: CourseQuery = {};

      if (query?.category) params.category = query.category;
      if (query?.keyword) params.keyword = query.keyword;

      const res = await axios.get(API_URL, { params });

      setCourses(res.data?.courses || []);
    } catch (err) {
      console.error('Fetch courses error:', err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SEARCH + FILTER (debounce)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCourses({
        category,
        keyword,
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [category, keyword]);

  return (
    <>
      <UserNavbar />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
          <span className="text-xl font-black text-blue-900">
            Precision Drive
          </span>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        {/* FILTER + SEARCH */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="bg-slate-100 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between">
            
            {/* FILTER */}
            <div className="flex gap-2 flex-wrap">
              {['', 'B1', 'B2', 'C'].map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold ${
                    category === item
                      ? 'bg-blue-600 text-white'
                      : 'bg-white hover:bg-gray-200'
                  }`}
                >
                  {item || 'Tất cả'}
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm khóa học..."
              className="px-4 py-2 rounded-xl border w-full md:w-80"
            />
          </div>
        </section>

        {/* COURSE LIST */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {loading ? (
            <p>Đang tải...</p>
          ) : courses.length === 0 ? (
            <p>Không có khóa học</p>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 flex flex-col"
              >
                <div className="mb-4">
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                    {course.licenseType}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="text-sm mb-4">
                  <p>⏱ {course.duration}</p>
                </div>

                <div className="text-lg font-bold text-blue-600 mb-4">
                  {course.price.toLocaleString()}đ
                </div>

                <Link
                  to={`/courses/${course.id}`}
                  className="mt-auto text-center bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                >
                  Xem chi tiết
                </Link>
              </div>
            ))
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CourseCatalog;