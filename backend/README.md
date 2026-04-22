# Driving School Management System - Backend

Backend API cho hệ thống quản lý trường dạy lái xe, phục vụ các luồng đăng nhập, quản lý người dùng, khóa học, đăng ký học, thanh toán, lịch học và audit log.

README này được viết để frontend developer hoặc người mới có thể tự:
- clone project
- setup backend thành công
- kết nối MySQL
- sync schema Prisma
- seed dữ liệu mẫu
- login và test API ngay bằng Swagger hoặc Postman

## 1. Project Overview

Driving School Management System là hệ thống quản lý nghiệp vụ cho trung tâm đào tạo lái xe. Backend cung cấp REST API để phục vụ cả admin dashboard và frontend client.

Các module chính:
- `Auth`: đăng ký, đăng nhập, refresh token, logout, lấy thông tin user hiện tại
- `Users`: quản lý user, hồ sơ cá nhân, security settings, role assignment
- `Courses`: danh sách khóa học, chi tiết khóa học, tạo/cập nhật/xóa khóa học
- `Enrollments`: đăng ký khóa học, xem enrollment của chính mình, admin duyệt trạng thái
- `Payments`: tạo payment, webhook cập nhật trạng thái, refund
- `Schedules`: tạo và xem lịch học/lịch dạy
- `Audit Logs`: ghi nhận hoạt động hệ thống phục vụ kiểm tra và truy vết

Base URL:

```txt
http://localhost:8000/api
```

Port mặc định:

```txt
8000
```

## 2. Tech Stack

- Framework: `Node.js`, `Express`
- Database: `MySQL`
- ORM: `Prisma ORM`
- Auth: `JWT Bearer Token`
- Authorization: `RBAC` với các role `ADMIN`, `INSTRUCTOR`, `STUDENT`
- Validation: `Zod`
- API Docs: `Swagger UI` (`swagger-jsdoc` + `swagger-ui-express`)
- Security / Middleware: `helmet`, `cors`, `express-rate-limit`, `morgan`

## 3. Installation Guide

### 3.1 Clone project

```bash
git clone <your-repository-url>
cd Final_Project/backend
```

### 3.2 Cài dependencies

```bash
npm install
```

### 3.3 Tạo file `.env`

Có thể copy từ file mẫu:

```bash
cp .env.example .env
```

Nếu đang dùng Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Ví dụ nội dung `.env`:

```env
PORT=8000
NODE_ENV=development
DATABASE_URL="mysql://root:password@localhost:3306/velocity"
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN="7d"
```

Gợi ý:
- `DATABASE_URL` phải đúng user/password/host/port/database MySQL của bạn
- `JWT_SECRET` nên thay bằng chuỗi bí mật riêng
- nếu project cần môi trường local ổn định hơn, có thể thêm:

```env
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN="30d"
DEFAULT_USER_PASSWORD=ChangeMe123!
```

## 4. Database Setup

Đây là bước quan trọng nhất để backend chạy được.

### Bước 1: Tạo database MySQL `velocity`

Đăng nhập MySQL rồi tạo database:

```sql
CREATE DATABASE velocity;
```

Hoặc dùng command line:

```bash
mysql -u root -p -e "CREATE DATABASE velocity;"
```

### Bước 2: Config `DATABASE_URL`

Trong file `.env`:

```env
DATABASE_URL="mysql://root:password@localhost:3306/velocity"
```

Format chuẩn:

```txt
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

### Bước 3: Sync schema Prisma

Chạy lần lượt:

```bash
npx prisma generate
npx prisma db push
```

Ý nghĩa:
- `npx prisma generate`: tạo Prisma Client
- `npx prisma db push`: sync schema trong `prisma/schema.prisma` xuống database

## 5. Seed Data

Project có file:

```txt
prisma/seed.js
```

Seed script sẽ:
- tạo dữ liệu mẫu cho toàn hệ thống
- hash password bằng `bcrypt`
- tạo sẵn dữ liệu test để frontend có thể gọi API ngay

### Reset sạch database và seed lại từ đầu

```bash
npx prisma db push --force-reset
node prisma/seed.js
```

Hoặc dùng Prisma seed:

```bash
npx prisma db push --force-reset
npx prisma db seed
```

Sau khi seed, dữ liệu mẫu sẽ bao gồm:
- khoảng `40 users`
- `10 courses`
- `120 enrollments`
- `80 payments`
- `120 schedules`
- `200 audit logs`

Các tài khoản test được đảm bảo có thể dùng ngay sau seed:
- `user1@test.com` → `ADMIN`
- `user2@test.com` → `STUDENT`
- `user3@test.com` → `INSTRUCTOR`

Password mặc định của các tài khoản seed:

```txt
123456
```

Lưu ý:
- các user đầu tiên được set `ACTIVE` để có thể login test ngay
- các user khác có thể có status ngẫu nhiên như `LOCKED`, `SUSPENDED`, `DISABLED`

## 6. Run Project

Chạy backend ở chế độ development:

```bash
npm run dev
```

Server sẽ chạy tại:

```txt
http://localhost:8000
```

Kiểm tra nhanh:

```txt
GET http://localhost:8000/
```

Expected response:

```json
{
  "message": "Velocity API is running"
}
```

## 7. API Documentation

Swagger UI:

```txt
http://localhost:8000/api/docs
```

### Cách authorize bằng Bearer token trên Swagger

1. Gọi `POST /api/auth/login`
2. Copy giá trị `token` từ response
3. Nhấn nút `Authorize` trên Swagger
4. Dán token theo format:

```txt
Bearer <token>
```

5. Nhấn `Authorize`
6. Test trực tiếp các API protected

Lưu ý:
- Swagger đang mount tại `/api/docs`
- phần lớn API protected yêu cầu JWT hợp lệ trong header `Authorization`
- một số API chỉ dành cho `ADMIN`

## 8. Test Accounts + API Flow

Phần này là flow ngắn gọn để frontend dev có thể test ngay mà không cần hỏi lại backend dev.

### Bước 1: Login

Endpoint:

```http
POST /api/auth/login
```

Full URL:

```txt
http://localhost:8000/api/auth/login
```

Request body:

```json
{
  "email": "user1@test.com",
  "password": "123456"
}
```

Response mẫu:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user1@test.com",
    "username": "user1@test.com",
    "name": "User 1",
    "department": null,
    "role": "ADMIN",
    "status": "ACTIVE"
  }
}
```

### Bước 2: Dùng token

Header:

```http
Authorization: Bearer <token>
```

Ví dụ với `fetch`:

```js
fetch("http://localhost:8000/api/courses", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

### Bước 3: Test theo role

#### ADMIN

```txt
email: user1@test.com
password: 123456
```

API nên test:
- `GET /api/users`
- `POST /api/courses`
- `PATCH /api/enrollments/{id}/status`
- `GET /api/audit-logs`

Ví dụ tạo course:

```http
POST /api/courses
```

```json
{
  "title": "B2 Premium",
  "description": "Advanced driving course",
  "licenseType": "B2",
  "price": 15000000,
  "duration": "3 months"
}
```

#### STUDENT

```txt
email: user2@test.com
password: 123456
```

API nên test:
- `GET /api/courses`
- `POST /api/enrollments`
- `GET /api/enrollments/me`

Ví dụ đăng ký khóa học:

```http
POST /api/enrollments
```

```json
{
  "courseId": 1
}
```

#### INSTRUCTOR

```txt
email: user3@test.com
password: 123456
```

API nên test:
- `GET /api/schedules`
- `GET /api/schedules/{id}`

Instructor sẽ nhìn thấy lịch dạy thuộc về chính mình theo scope của token hiện tại.

## 9. Quick Test (5 phút)

Nếu chỉ cần xác nhận backend hoạt động:

1. Chạy `npm install`
2. Tạo `.env`
3. Tạo database `velocity`
4. Chạy:

```bash
npx prisma generate
npx prisma db push --force-reset
node prisma/seed.js
npm run dev
```

5. Mở Swagger: `http://localhost:8000/api/docs`
6. Gọi `POST /api/auth/login` với:

```json
{
  "email": "user1@test.com",
  "password": "123456"
}
```

7. Copy `token`
8. Nhấn `Authorize` trong Swagger và dán:

```txt
Bearer <token>
```

9. Gọi thử:

```http
GET /api/courses
```

Nếu API trả về danh sách course thì backend đã chạy đúng.

## 10. API Overview

Các nhóm API chính:

- `/api/auth`
- `/api/users`
- `/api/courses`
- `/api/enrollments`
- `/api/payments`
- `/api/schedules`
- `/api/audit-logs`
- `/api/roles`

Chi tiết request/response, schema và thử trực tiếp xem tại Swagger:

```txt
http://localhost:8000/api/docs
```

## 11. Common Issues & Fix

### 401 Unauthorized

Nguyên nhân thường gặp:
- chưa gửi header `Authorization: Bearer <token>`
- token hết hạn hoặc sai định dạng
- password trong database không được hash đúng bằng `bcrypt`
- session của user đã bị revoke

Cách xử lý:
- login lại để lấy token mới
- kiểm tra chắc chắn password seed là `123456`
- nếu tự insert user bằng SQL, phải hash password trước

### 403 Account status invalid

Nguyên nhân:
- user không ở trạng thái `ACTIVE`

Cách xử lý:
- dùng tài khoản seed mặc định `user1`, `user2`, `user3`
- hoặc update `status` của user về `ACTIVE`

### Prisma errors

Ví dụ:
- `Cannot find module '.prisma/client'`
- lỗi `EPERM` liên quan Prisma DLL trên Windows

Fix:

```bash
rm -rf node_modules/.prisma
npx prisma generate
```

Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules\.prisma
npx prisma generate
```

Nếu vẫn lỗi:

```bash
rm -rf node_modules package-lock.json
npm install
npx prisma generate
```

### Database lỗi `P1000`

Nguyên nhân:
- sai username/password MySQL
- MySQL chưa chạy
- database chưa tồn tại

Fix:
- kiểm tra lại `DATABASE_URL`
- đảm bảo MySQL service đang chạy
- tạo database `velocity` trước khi `db push`

### Swagger `Failed to fetch`

Nguyên nhân thường gặp:
- server chưa chạy
- gọi sai URL
- CORS / browser cache

Fix:
- chắc chắn backend đang chạy tại `http://localhost:8000`
- mở đúng Swagger URL: `http://localhost:8000/api/docs`
- thử refresh browser hoặc mở tab ẩn danh

## 12. Notes for Frontend Dev

- Luôn login trước khi test API protected
- Gắn `Authorization: Bearer <token>` cho mọi request yêu cầu auth
- Một số API public như `GET /api/courses` không cần login
- Nhiều API admin-only sẽ trả `403` nếu token không phải `ADMIN`
- API list như `users`, `courses`, `schedules` có pagination/filter query
- Login response trả về cả `token` và `refreshToken`, frontend có thể dùng để refresh session
- Nếu backend seed lại bằng `--force-reset`, dữ liệu cũ sẽ bị xóa hoàn toàn

## Useful Commands

```bash
npm install
npx prisma generate
npx prisma db push
npx prisma db push --force-reset
node prisma/seed.js
npm run dev
```

## Recommended First API Calls

```http
POST /api/auth/login
GET /api/courses
GET /api/users
GET /api/enrollments/me
GET /api/schedules
GET /api/audit-logs
```
