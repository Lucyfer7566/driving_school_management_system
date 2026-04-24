const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const enrollmentStatuses = ["PENDING", "ACTIVE", "COMPLETED", "CANCELLED"];
const paymentStatuses = ["PENDING", "PROCESSING", "COMPLETED", "FAILED"];
const methods = ["VNPay", "MoMo", "Chuyển khoản"];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
    console.log("🌱 Seeding realistic driving school data...");

    const hashedPassword = await bcrypt.hash("123456", 10);

    // ===== USERS (Vietnamese names, realistic) =====
    const userData = [
        // Fixed accounts for demo
        { email: "admin@precision.vn", name: "Trần Minh Quản Trị", role: "ADMIN", status: "ACTIVE" },
        { email: "student@precision.vn", name: "Nguyễn Văn An", role: "STUDENT", status: "ACTIVE" },
        { email: "instructor@precision.vn", name: "Phạm Đức Thắng", role: "INSTRUCTOR", status: "ACTIVE" },
        // Demo student account (matches chatbot flow)
        { email: "test@demo.com", name: "Nguyễn Văn A", role: "STUDENT", status: "ACTIVE" },
        // More instructors
        { email: "gv.lehong@precision.vn", name: "Lê Hồng Phúc", role: "INSTRUCTOR", status: "ACTIVE" },
        { email: "gv.tranthien@precision.vn", name: "Trần Thiện Tâm", role: "INSTRUCTOR", status: "ACTIVE" },
        { email: "gv.vuminh@precision.vn", name: "Vũ Minh Hoàng", role: "INSTRUCTOR", status: "ACTIVE" },
        // More students
        { email: "hv.phamlan@precision.vn", name: "Phạm Thị Lan", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.ngothanh@precision.vn", name: "Ngô Thanh Tùng", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.doanhuyen@precision.vn", name: "Đoàn Thị Huyền", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.lytuan@precision.vn", name: "Lý Tuấn Kiệt", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.hoangmai@precision.vn", name: "Hoàng Thị Mai", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.buianh@precision.vn", name: "Bùi Quốc Anh", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.dangthao@precision.vn", name: "Đặng Phương Thảo", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.vothang@precision.vn", name: "Võ Đình Thắng", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.trinhlinh@precision.vn", name: "Trịnh Thùy Linh", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.nguyendat@precision.vn", name: "Nguyễn Tiến Đạt", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.lehanh@precision.vn", name: "Lê Thị Hạnh", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.phanminh@precision.vn", name: "Phan Minh Trí", role: "STUDENT", status: "ACTIVE" },
        { email: "hv.truongson@precision.vn", name: "Trương Sơn Hải", role: "STUDENT", status: "ACTIVE" },
    ];

    const users = [];
    for (const ud of userData) {
        const user = await prisma.user.create({
            data: {
                email: ud.email,
                username: ud.email,
                password: hashedPassword,
                name: ud.name,
                role: ud.role,
                status: ud.status,
            }
        });
        users.push(user);
    }
    console.log(`✅ Created ${users.length} users`);

    // ===== COURSES (realistic driving school courses) =====
    const courseData = [
        {
            title: "Hạng B1 – Xe số tự động (Cá nhân)",
            description: "Khóa học lái xe ô tô số tự động dành cho nhu cầu cá nhân. Bao gồm lý thuyết, thực hành sa hình và đường trường. Học phí đã bao gồm lệ phí thi sát hạch, khám sức khỏe và phí cấp bằng.",
            licenseType: "B1",
            price: 12000000,
            duration: "3 tháng"
        },
        {
            title: "Hạng B1 Premium – Số tự động VIP",
            description: "Khóa học B1 cao cấp với xe mới, lịch học linh hoạt, giảng viên 1 kèm 1. Ưu tiên thi sớm, hỗ trợ đến khi đỗ.",
            licenseType: "B1",
            price: 18000000,
            duration: "2.5 tháng"
        },
        {
            title: "Hạng B2 – Xe số sàn & Số tự động (Hành nghề)",
            description: "Khóa học lái xe ô tô hạng B2 cho phép lái cả xe số sàn và số tự động, phù hợp cho người muốn hành nghề lái xe. Bao gồm đầy đủ lý thuyết, thực hành và thi sát hạch.",
            licenseType: "B2",
            price: 15000000,
            duration: "3.5 tháng"
        },
        {
            title: "Hạng B2 Cấp tốc – Tốt nghiệp nhanh",
            description: "Khóa học B2 rút gọn thời gian, tăng cường buổi học thực hành, phù hợp người cần bằng gấp. Học 6 buổi/tuần.",
            licenseType: "B2",
            price: 19000000,
            duration: "2 tháng"
        },
        {
            title: "Hạng C – Xe tải",
            description: "Khóa học lái xe tải hạng C, phù hợp cho người muốn lái xe tải từ 3.5 tấn trở lên. Chương trình đào tạo bài bản, đúng quy định Bộ GTVT.",
            licenseType: "C",
            price: 20000000,
            duration: "4 tháng"
        },
        {
            title: "Nâng hạng B1 lên B2",
            description: "Chương trình đào tạo nâng hạng từ B1 lên B2 cho người đã có bằng B1. Tập trung vào kỹ năng lái xe số sàn và bổ sung kiến thức hành nghề.",
            licenseType: "B2",
            price: 8000000,
            duration: "1.5 tháng"
        },
        {
            title: "Nâng hạng B2 lên C",
            description: "Chương trình nâng hạng từ B2 lên C. Học viên sẽ được đào tạo lái xe tải với chương trình chuyên sâu và thực hành trên xe tải thực tế.",
            licenseType: "C",
            price: 10000000,
            duration: "2 tháng"
        },
        {
            title: "Hạng B2 Cuối tuần",
            description: "Khóa B2 dành cho người đi làm, chỉ học Thứ 7 và Chủ nhật. Lịch học linh hoạt, không ảnh hưởng công việc.",
            licenseType: "B2",
            price: 16500000,
            duration: "4.5 tháng"
        },
    ];

    const courses = [];
    for (const cd of courseData) {
        const course = await prisma.course.create({ data: cd });
        courses.push(course);
    }
    console.log(`✅ Created ${courses.length} courses`);

    // ===== ENROLLMENTS =====
    const students = users.filter(u => u.role === "STUDENT");
    const enrollments = [];

    for (let i = 0; i < 30; i++) {
        const student = students[i % students.length];
        const course = courses[i % courses.length];

        const enrollment = await prisma.enrollment.create({
            data: {
                userId: student.id,
                courseId: course.id,
                status: randomItem(enrollmentStatuses),
            }
        });
        enrollments.push(enrollment);
    }
    console.log(`✅ Created ${enrollments.length} enrollments`);

    // ===== PAYMENTS =====
    const now = new Date();
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    for (let i = 0; i < enrollments.length; i++) {
        const enrollment = enrollments[i];
        const course = courses.find(c => c.id === enrollment.courseId);
        const amount = course ? course.price : 15000000;

        await prisma.payment.create({
            data: {
                userId: enrollment.userId,
                enrollmentId: enrollment.id,
                amount: amount,
                method: randomItem(methods),
                status: randomItem(paymentStatuses),
                transactionRef: `TXN_${Date.now()}_${i}`,
                createdAt: randomDate(threeMonthsAgo, now),
            }
        });
    }
    console.log(`✅ Created ${enrollments.length} payments`);

    // ===== SCHEDULES =====
    const instructors = users.filter(u => u.role === "INSTRUCTOR");
    const timeSlots = [
        { start: "07:30", end: "09:30" },
        { start: "09:30", end: "11:30" },
        { start: "13:30", end: "15:30" },
        { start: "15:30", end: "17:30" },
    ];
    const scheduleStatuses = ["SCHEDULED", "COMPLETED", "CANCELLED"];

    let scheduleCount = 0;
    for (const enrollment of enrollments) {
        const student = users.find(u => u.id === enrollment.userId);
        const course = courses.find(c => c.id === enrollment.courseId);
        if (!student || !course) continue;

        // Create 3-5 schedule entries per enrollment
        const numSessions = 3 + Math.floor(Math.random() * 3);
        for (let j = 0; j < numSessions; j++) {
            const instructor = randomItem(instructors);
            const slot = randomItem(timeSlots);
            const futureDate = new Date(now.getTime() + (j * 2 + Math.floor(Math.random() * 5)) * 24 * 60 * 60 * 1000);

            await prisma.schedule.create({
                data: {
                    courseId: course.id,
                    instructorId: instructor.id,
                    studentId: student.id,
                    lessonDate: futureDate,
                    startTime: slot.start,
                    endTime: slot.end,
                    status: j < 2 ? "COMPLETED" : randomItem(scheduleStatuses),
                    notes: j === 0 ? "Buổi học đầu tiên - Làm quen xe" : null,
                }
            });
            scheduleCount++;
        }
    }
    console.log(`✅ Created ${scheduleCount} schedules`);

    // ===== ROLE PERMISSIONS =====
    await prisma.rolePermission.createMany({
        data: [
            { role: "ADMIN", permissions: { fullAccess: true } },
            { role: "INSTRUCTOR", permissions: { manageSchedule: true, viewStudents: true } },
            { role: "STUDENT", permissions: { enroll: true, viewSchedule: true, makePayment: true } }
        ],
        skipDuplicates: true
    });

    // ===== AUDIT LOGS =====
    const auditActions = ["LOGIN", "ENROLL", "PAYMENT", "SCHEDULE_UPDATE", "PROFILE_UPDATE"];
    const auditResources = ["AUTH", "ENROLLMENT", "PAYMENT", "SCHEDULE", "USER"];

    for (let i = 0; i < 50; i++) {
        const user = randomItem(users);
        await prisma.auditLog.create({
            data: {
                userId: user.id,
                action: randomItem(auditActions),
                resource: randomItem(auditResources),
                status: Math.random() > 0.1 ? "SUCCESS" : "FAILED",
                createdAt: randomDate(threeMonthsAgo, now),
            }
        });
    }
    console.log(`✅ Created 50 audit logs`);

    console.log("\n🎉 SEED COMPLETED SUCCESSFULLY!");
    console.log("📋 Demo accounts:");
    console.log("  Admin:      admin@precision.vn / 123456");
    console.log("  Student:    student@precision.vn / 123456");
    console.log("  Student:    test@demo.com / 123456");
    console.log("  Instructor: instructor@precision.vn / 123456");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
