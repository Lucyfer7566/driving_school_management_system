## Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Tech Stack](#-tech-stack)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
- [Khởi chạy dự án](#khởi-chạy-dự-án)
- [Tài khoản demo](#tài-khoản-demo)
- [Tính năng chính](#tính-năng-chính)
- [API Documentation](#api-documentation)
- [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)
- [Tài liệu liên quan](#tài-liệu-liên-quan)

---

## Tổng quan

**Precision Driving** là nền tảng web quản lý trung tâm đào tạo lái xe, tập trung vào trải nghiệm học viên với các tính năng:

- Xem và tìm kiếm khóa học lái xe (B1, B2, C)
- Đăng ký tài khoản, đăng nhập bảo mật JWT
- Tư vấn khóa học qua **Trợ lý ảo AI** (tích hợp OpenAI GPT)
- Thanh toán trực tuyến (VNPay, MoMo, Chuyển khoản)
- Xem lịch sử giao dịch
- Đăng ký & quản lý lịch học
- Dữ liệu thực lưu trữ trong MySQL qua Prisma ORM

Dự án được thiết kế theo kiến trúc **Client-Server (SPA + REST API)**, triển khai độc lập giữa Frontend và Backend.

---

## 🏗 Kiến trúc hệ thống

```
┌──────────────────┐         HTTP/REST         ┌──────────────────┐
│                  │ ◄──────────────────────► │                  │
│   React SPA      │    localhost:5173         │   Express API    │
│   (Vite + TS)    │         ───►              │   (Node.js)      │
│                  │    localhost:8000/api      │                  │
└──────────────────┘                           └────────┬─────────┘
        │                                               │
        │  OpenAI API                                    │  Prisma ORM
        ▼                                               ▼
  ┌─────────────┐                                ┌─────────────┐
  │  ChatGPT    │                                │   MySQL DB   │
  │  (gpt-4o)   │                                │  "velocity"  │
  └─────────────┘                                └─────────────┘
```

---

## 🛠 Tech Stack

### Frontend
| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| React | 19.x | UI Library |
| Vite | 8.x | Build tool & Dev server |
| TypeScript | 6.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| React Router DOM | 7.x | SPA Routing |
| Zustand | 5.x | State management |
| React Hook Form | 7.x | Form handling |
| OpenAI API | GPT-4o-mini | AI Chatbot |

### Backend
| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| Node.js | 24.x | Runtime |
| Express | 5.x | Web framework |
| Prisma ORM | 5.22 | Database ORM |
| MySQL | 8.x | Database |
| JWT | — | Authentication |
| Zod | 4.x | Validation |
| Swagger UI | — | API Documentation |
| Helmet + CORS | — | Security middleware |
| bcrypt | — | Password hashing |

---

## Cấu trúc thư mục

```
driving_school_management_system/
├── frontend/                   # React SPA (Vite + TypeScript)
│   ├── src/
│   │   ├── components/         # UI components (Navbar, Chatbot, Footer, ...)
│   │   ├── pages/              # Route pages (Home, Courses, Checkout, ...)
│   │   ├── services/           # API service layer (axios)
│   │   └── store/              # Zustand state management
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                    # Express REST API
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── middleware/         # Auth, RBAC, error handling
│   │   ├── lib/                # Prisma client
│   │   └── utils/              # Audit logger, helpers
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.js             # Seed data script
│   ├── .env.example
│   └── package.json
│
├── docs/
│   └── DEMO_SCRIPT.md          # Kịch bản demo chi tiết
│
├── README.md                   # ← Bạn đang đọc file này
└── swm501_technical_spec.md    # Tài liệu kỹ thuật dự án
```

---

## 💻 Yêu cầu hệ thống

Trước khi cài đặt, đảm bảo máy bạn đã có:

| Phần mềm | Phiên bản tối thiểu | Tải về |
|---|---|---|
| Node.js | 18.x trở lên | [nodejs.org](https://nodejs.org/) |
| npm | 9.x trở lên | Đi kèm Node.js |
| MySQL | 8.0 trở lên | [mysql.com](https://dev.mysql.com/downloads/) |
| Git | Bất kỳ | [git-scm.com](https://git-scm.com/) |

---

## Hướng dẫn cài đặt

### Bước 1: Clone dự án

```bash
git clone <repository-url>
cd driving_school_management_system
```

### Bước 2: Tạo database MySQL

Mở MySQL CLI hoặc MySQL Workbench, chạy:

```sql
CREATE DATABASE velocity;
```

### Bước 3: Cấu hình Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Tạo file cấu hình từ mẫu
copy .env.example .env       # Windows CMD
# hoặc
Copy-Item .env.example .env  # PowerShell
# hoặc
cp .env.example .env         # macOS / Linux
```

Chỉnh sửa file `backend/.env` với thông tin MySQL của bạn:

```env
PORT=8000
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/velocity"
JWT_SECRET="your_secret_key_here"
JWT_EXPIRES_IN="7d"
```

> **Quan trọng**: Thay `YOUR_PASSWORD` bằng mật khẩu MySQL thực tế của bạn.

### Bước 4: Khởi tạo Database & Seed dữ liệu

```bash
# Tạo Prisma Client
npx prisma generate

# Đẩy schema xuống database
npx prisma db push

# Seed dữ liệu mẫu (khóa học, tài khoản, ...)
node prisma/seed.js
```

### Bước 5: Cài đặt Frontend

```bash
# Quay lại thư mục gốc, vào frontend
cd ../frontend

# Cài đặt dependencies
npm install
```

### Bước 6: Cấu hình API Key cho Chatbot AI

```bash
# Tạo file cấu hình frontend từ mẫu
copy .env.example .env       # Windows CMD
# hoặc
Copy-Item .env.example .env  # PowerShell
# hoặc
cp .env.example .env         # macOS / Linux
```

Chỉnh sửa file `frontend/.env`, thay API key bằng key OpenAI của bạn:

```env
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
```

> **Lấy API key tại**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)  
> **Lưu ý**: File `.env` đã được gitignore, sẽ **không bị push** lên GitHub.  
> Nếu không có API key, chatbot sẽ tự động sử dụng **scripted responses** — demo vẫn hoạt động bình thường.

---

## Khởi chạy dự án

Bạn cần **2 terminal** chạy song song:

### Terminal 1 — Backend API

```bash
cd backend
npm run dev
```

Server sẽ chạy tại: **http://localhost:8000**

### Terminal 2 — Frontend App

```bash
cd frontend
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:5173**

### Kiểm tra nhanh

| Endpoint | Mô tả |
|---|---|
| http://localhost:5173 | Giao diện người dùng |
| http://localhost:8000/api/docs | Swagger API Documentation |
| http://localhost:8000/api/courses | API danh sách khóa học |

---

## Tài khoản demo

Sau khi seed dữ liệu, các tài khoản sau sẵn sàng sử dụng:

| Role | Email | Password | Mô tả |
|---|---|---|---|
| `ADMIN` | user1@test.com | 123456 | Quản trị viên hệ thống |
| `STUDENT` | user2@test.com | 123456 | Học viên mẫu |
| `INSTRUCTOR` | user3@test.com | 123456 | Giảng viên mẫu |

> Có thể tự tạo tài khoản mới qua trang **Đăng ký** trên giao diện.

---

## Tính năng chính

### Trang chủ
- Hero banner giới thiệu trung tâm
- Khóa học nổi bật (B1, B2, C)
- Thống kê trung tâm (15k+ học viên, 98% tỷ lệ đỗ)
- Testimonials từ học viên

### Khóa học
- Danh sách 8 khóa học với bộ lọc theo hạng bằng
- Trang chi tiết khóa học (nội dung, giá, thời gian, chương trình học)
- Nút đăng ký nhanh

### Trợ lý ảo AI
- Chatbot tích hợp OpenAI GPT-4o-mini
- Tư vấn khóa học, gợi ý theo nhu cầu, báo giá
- Hỗ trợ đăng ký thanh toán trực tiếp từ cửa sổ chat
- Fallback scripted responses khi API không khả dụng

### Thanh toán
- Checkout với thông tin khóa học, học viên, chi phí chi tiết
- 3 phương thức: VNPay, MoMo, Chuyển khoản
- Giảm giá khuyến mãi Hè 2026
- Popup thành công với mã giao dịch

### Lịch sử giao dịch
- Danh sách giao dịch với trạng thái realtime
- Thông tin chi tiết: mã giao dịch, phương thức, số tiền, thời gian

### Lịch học
- Lịch trình buổi học dạng danh sách với icon trạng thái
- Modal đăng ký buổi học: chọn khóa, giảng viên, ngày, giờ
- Chú thích (notes) cho từng buổi học

### Xác thực & Bảo mật
- Đăng ký / Đăng nhập bằng email
- JWT Bearer Token authentication
- RBAC (Role-Based Access Control): ADMIN, INSTRUCTOR, STUDENT
- Auto-logout khi token hết hạn

---

## API Documentation

Swagger UI có sẵn tại: **http://localhost:8000/api/docs**

### Các nhóm API chính

| Nhóm | Base Path | Mô tả |
|---|---|---|
| Auth | `/api/auth` | Đăng nhập, đăng ký, thông tin user |
| Courses | `/api/courses` | CRUD khóa học |
| Enrollments | `/api/enrollments` | Đăng ký khóa học |
| Payments | `/api/payments` | Tạo thanh toán, webhook |
| Schedules | `/api/schedules` | Lịch học / Đăng ký buổi học |
| Users | `/api/users` | Quản lý người dùng |
| Audit Logs | `/api/audit-logs` | Nhật ký hệ thống |

### Cách sử dụng Swagger

1. Truy cập http://localhost:8000/api/docs
2. Gọi `POST /api/auth/login` với email & password
3. Copy giá trị `token` từ response
4. Nhấn nút **Authorize** → dán `Bearer <token>` → nhấn **Authorize**
5. Test bất kỳ API nào trực tiếp trên Swagger

---

## Xử lý lỗi thường gặp

### Backend không khởi động được

```bash
# Kiểm tra MySQL đã chạy chưa
mysql -u root -p -e "SELECT 1;"

# Kiểm tra DATABASE_URL trong .env
# Đảm bảo database "velocity" đã tồn tại
```

### Lỗi Prisma `Cannot find module '.prisma/client'`

```bash
cd backend
npx prisma generate
```

Nếu vẫn lỗi:

```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules\.prisma
npx prisma generate
```

### Lỗi 401 Unauthorized khi gọi API

- Token hết hạn → Đăng nhập lại
- Chưa gửi header `Authorization: Bearer <token>`
- Tài khoản bị khóa → Sử dụng tài khoản seed mặc định

### Lỗi 409 khi đăng ký khóa học

- Đã đăng ký khóa này rồi (trùng enrollment)
- Reset database: `npx prisma db push --force-reset && node prisma/seed.js`

### Chatbot không phản hồi

- OpenAI API key hết hạn hoặc hết quota → Chatbot tự động fallback sang scripted responses
- Kiểm tra console browser để xem lỗi chi tiết

---

## Tài liệu liên quan

| Tài liệu | Đường dẫn | Mô tả |
|---|---|---|
| Kịch bản Demo | [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md) | Hướng dẫn từng bước demo trước giảng viên |
| Technical Spec | [swm501_technical_spec.md](swm501_technical_spec.md) | Tài liệu kỹ thuật tổng hợp dự án |
| API Docs (live) | http://localhost:8000/api/docs | Swagger UI interactive |

---
