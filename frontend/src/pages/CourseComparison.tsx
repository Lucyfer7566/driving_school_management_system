import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const API_URL = 'http://localhost:8000/api/courses/compare';

// ✅ Type rõ ràng
type Course = {
  id: number;
  title: string;
  licenseType: string;
  price: number;
  duration: string;
};

const CourseComparison = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ stable (không tạo lại mỗi render)
  const courseIds = [1, 2, 3];

  useEffect(() => {
    let isMounted = true; // tránh setState khi unmount

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(API_URL, {
          params: {
            ids: courseIds.join(','),
          },
        });

        if (isMounted) {
          setCourses(res.data?.courses || []);
        }
      } catch (err) {
        console.error('Compare fetch error:', err);
        if (isMounted) setCourses([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <UserNavbar />

      <nav className="fixed top-0 w-full z-50 bg-slate-50/90 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-blue-800">
            Precision Driving
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-24 mb-24">
        {loading ? (
          <p>Đang tải...</p>
        ) : courses.length === 0 ? (
          <p>Không có dữ liệu so sánh</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="w-full border-collapse">
              
              {/* HEADER */}
              <thead>
                <tr>
                  <th className="p-6 text-left">Tiêu chí</th>
                  {courses.map((course) => (
                    <th key={course.id} className="p-6 text-center">
                      <span className="font-bold">{course.title}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* LICENSE */}
                <tr>
                  <td className="p-6 font-semibold">Hạng bằng</td>
                  {courses.map((c) => (
                    <td key={c.id} className="p-6 text-center">
                      {c.licenseType}
                    </td>
                  ))}
                </tr>

                {/* PRICE */}
                <tr>
                  <td className="p-6 font-semibold">Học phí</td>
                  {courses.map((c) => (
                    <td key={c.id} className="p-6 text-center text-blue-600 font-bold">
                      {c.price.toLocaleString()}đ
                    </td>
                  ))}
                </tr>

                {/* DURATION */}
                <tr>
                  <td className="p-6 font-semibold">Thời gian</td>
                  {courses.map((c) => (
                    <td key={c.id} className="p-6 text-center">
                      {c.duration}
                    </td>
                  ))}
                </tr>

                {/* ACTION */}
                <tr>
                  <td></td>
                  {courses.map((c) => (
                    <td key={c.id} className="p-6">
                      <Link
                        to={`/courses/${c.id}`}
                        className="block text-center bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>

            </table>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default CourseComparison;