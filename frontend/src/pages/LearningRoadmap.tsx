import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserNavbar } from '../components/UserNavbar';
import { Footer } from '../components/Footer';

const API_URL = 'http://localhost:8000/api/users';

type Milestone = {
  title: string;
  description: string;
};

type RoadmapResponse = {
  roadmap: {
    userId: number;
    milestones: Milestone[];
  };
};

const LearningRoadmap = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ Demo userId (sau này lấy từ auth)
  const userId = 1;

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);

        const res = await axios.get<RoadmapResponse>(
          `${API_URL}/${userId}/roadmap`,
          {
            headers: {
              Authorization: `Bearer YOUR_TOKEN_HERE`, // ⚠️ cần JWT thật
            },
          }
        );

        setMilestones(res.data?.roadmap?.milestones || []);
      } catch (err) {
        console.error('Fetch roadmap error:', err);
        setMilestones([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <>
      <UserNavbar />

      <main className="pt-20">

        {/* HERO giữ nguyên */}
        <section className="bg-blue-600 text-white py-20 px-8">
          <h1 className="text-4xl font-bold mb-4">
            Lộ trình học của bạn
          </h1>
          <Link to="/courses" className="bg-white text-blue-600 px-6 py-2 rounded-xl">
            Chọn khóa học
          </Link>
        </section>

        {/* ROADMAP */}
        <section className="max-w-5xl mx-auto py-16 px-6">

          {loading ? (
            <p className="text-center">Đang tải...</p>
          ) : milestones.length === 0 ? (
            <p className="text-center">Chưa có lộ trình</p>
          ) : (
            <div className="space-y-8">
              {milestones.map((step, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-blue-600 mb-2">
                    Bước {index + 1}: {step.title}
                  </h3>

                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </>
  );
};

export default LearningRoadmap;