require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const roles = ["ADMIN", "INSTRUCTOR", "STUDENT"];
const statuses = ["ACTIVE", "LOCKED", "SUSPENDED", "DISABLED"];
const enrollmentStatuses = ["PENDING", "ACTIVE", "COMPLETED", "CANCELLED"];
const paymentStatuses = ["PENDING", "PROCESSING", "COMPLETED", "FAILED"];
const methods = ["VNPay", "MoMo", "ZaloPay"];

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {
    console.log("🌱 Seeding LARGE dataset...");

    // 🔐 hash password 1 lần (tối ưu)
    const hashedPassword = await bcrypt.hash("123456", 10);

    // ===== USERS =====
    const users = [];
    for (let i = 1; i <= 40; i++) {
        let role;
        if (i === 1) role = "ADMIN";
        else if (i === 2) role = "STUDENT";
        else if (i === 3) role = "INSTRUCTOR";
        else role = randomItem(roles);

        const user = await prisma.user.create({
            data: {
                email: `user${i}@test.com`,
                username: `user${i}@test.com`,
                password: hashedPassword, // ✅ FIX
                name: `User ${i}`,
                role,

                // 👉 đảm bảo có user ACTIVE để login test
                status: i <= 5 ? "ACTIVE" : randomItem(statuses)
            }
        });
        users.push(user);
    }

    // ===== COURSES =====
    const courses = [];
    for (let i = 1; i <= 10; i++) {
        const course = await prisma.course.create({
            data: {
                title: `Course ${i}`,
                description: `Description for course ${i}`,
                licenseType: randomItem(["B1", "B2", "C"]),
                price: 3000000 + i * 1000000,
                duration: `${2 + i} months`
            }
        });
        courses.push(course);
    }

    // ===== ENROLLMENTS =====
    const enrollments = [];
    for (let i = 0; i < 120; i++) {
        const user = randomItem(users);
        const course = randomItem(courses);

        const enrollment = await prisma.enrollment.create({
            data: {
                userId: user.id,
                courseId: course.id,
                status: randomItem(enrollmentStatuses)
            }
        });

        enrollments.push(enrollment);
    }

    // ===== PAYMENTS =====
    for (let i = 0; i < 80; i++) {
        const enrollment = randomItem(enrollments);

        await prisma.payment.create({
            data: {
                userId: enrollment.userId,
                enrollmentId: enrollment.id,
                amount: 3000000 + Math.floor(Math.random() * 5000000),
                method: randomItem(methods),
                status: randomItem(paymentStatuses),
                transactionRef: `TXN_${Date.now()}_${i}`
            }
        });
    }

    // ===== SCHEDULES =====
    const instructors = users.filter(u => u.role === "INSTRUCTOR");

    for (let i = 0; i < 120; i++) {
        const instructor = instructors.length > 0
            ? randomItem(instructors)
            : users[0];

        const student = randomItem(users);
        const course = randomItem(courses);

        await prisma.schedule.create({
            data: {
                courseId: course.id,
                instructorId: instructor.id,
                studentId: student.id,
                lessonDate: new Date(),
                startTime: "08:00",
                endTime: "10:00",
                status: randomItem(["SCHEDULED", "COMPLETED", "CANCELLED"])
            }
        });
    }

    // ===== ROLE PERMISSIONS =====
    await prisma.rolePermission.createMany({
        data: [
            { role: "ADMIN", permissions: { fullAccess: true } },
            { role: "INSTRUCTOR", permissions: { manageSchedule: true } },
            { role: "STUDENT", permissions: { enroll: true } }
        ],
        skipDuplicates: true
    });

    // ===== AUDIT LOGS =====
    for (let i = 0; i < 200; i++) {
        const user = randomItem(users);

        await prisma.auditLog.create({
            data: {
                userId: user.id,
                action: randomItem(["LOGIN", "CREATE", "UPDATE", "DELETE"]),
                resource: randomItem(["USER", "COURSE", "PAYMENT"]),
                status: randomItem(["SUCCESS", "FAILED"])
            }
        });
    }

    console.log("✅ LARGE SEED COMPLETED");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
