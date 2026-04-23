import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const API_URL = 'http://localhost:8000/api/courses';

type Course = {
  id: number;
  title: string;
  description: string;
  licenseType: string;
  price: number;
  duration: string;
};

const CourseDetails = () => {
  const { id } = useParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch API theo ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API_URL}/${id}`);
        setCourse(res.data?.course || null);
      } catch (err) {
        console.error('Fetch course detail error:', err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  return (
    <>
      <UserNavbar />

      <main>
        {loading ? (
          <div className="text-center py-20">Đang tải...</div>
        ) : !course ? (
          <div className="text-center py-20">Không tìm thấy khóa học</div>
        ) : (
          <>
            {/* HERO */}
            <section className="bg-blue-600 text-white py-24">
              <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold mb-4">
                  {course.title}
                </h1>

                <p className="opacity-90 mb-6">
                  {course.description}
                </p>

                <div className="flex gap-4">
                  <Link
                    to="/courses"
                    className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold"
                  >
                    Xem khóa khác
                  </Link>

                  <Link
                    to="/roadmap"
                    className="bg-white/20 px-6 py-3 rounded-xl"
                  >
                    Lộ trình học
                  </Link>
                </div>
              </div>
            </section>

            {/* INFO */}
            <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
              
              <div className="bg-white shadow rounded-xl p-6">
                <p className="text-gray-500 text-sm">Hạng bằng</p>
                <p className="text-xl font-bold">{course.licenseType}</p>
              </div>

              <div className="bg-white shadow rounded-xl p-6">
                <p className="text-gray-500 text-sm">Thời gian</p>
                <p className="text-xl font-bold">{course.duration}</p>
              </div>

              <div className="bg-white shadow rounded-xl p-6">
                <p className="text-gray-500 text-sm">Học phí</p>
                <p className="text-xl font-bold text-blue-600">
                  {course.price.toLocaleString()}đ
                </p>
              </div>
            </section>

            {/* DESCRIPTION */}
            <section className="max-w-4xl mx-auto px-6 pb-20">
              <h2 className="text-2xl font-bold mb-4">
                Chi tiết khóa học
              </h2>

              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default CourseDetails;