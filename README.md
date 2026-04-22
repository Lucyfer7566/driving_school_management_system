# Velocity - Driving School Management System

Velocity là một nền tảng quản lý trường đào tạo lái xe toàn diện bao gồm Giao diện người dùng (học viên) và Giao diện quản trị viên (Admin). Dự án được triển khai thành cấu trúc MVP độc lập giữa Frontend và Backend.

## Cấu trúc thư mục

- `frontend/`: Ứng dụng Single Page Application (SPA) xây dựng bằng **React + Vite + Tailwind CSS**. Nơi điều khiển toàn bộ giao diện tương tác.
- `backend/`: Máy chủ API xây dựng bằng **Node.js + Express.js**. Nơi xử lý logic nghiệp vụ và tương tác với cơ sở dữ liệu.
- `site/`: Thư mục lưu trữ các tệp thiết kế HTML/CSS nguyên bản (Tham khảo).

## Hướng dẫn cài đặt và khởi chạy

Để chạy dự án trên máy tính của bạn, hãy đảm bảo bạn đã cài đặt sẵn [Node.js](https://nodejs.org/).

### 1. Khởi chạy Giao diện (Frontend)

Mở Terminal tại thư mục gốc của dự án và làm theo các bước sau:

```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Khởi chạy máy chủ phát triển Vite
npm run dev
```

Sau khi chạy lệnh trên, ứng dụng React sẽ có thể truy cập tại: **[http://localhost:5173](http://localhost:5173)**
* Giao diện người dùng: `/`
* Cổng quản trị viên: `/admin`

### 2. Khởi chạy Máy chủ (Backend)

Khởi động một Terminal khác (giữ nguyên Terminal cũ đang chạy Frontend) và thực hiện các bước sau:

```bash
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Khởi chạy máy chủ development với Nodemon
npm run dev
```

Máy chủ API sẽ mặc định khởi chạy ở cổng localhost sẵn sàng phục vụ các request gọi dừ liệu từ Frontend.

## Công nghệ sử dụng
- **Vite & React** (Phát triển giao diện tốc độ cao)
- **Tailwind CSS v4** (Utility-first framework cho Styling UI)
- **React-Router-Dom** (Khởi tạo kết cấu SPA cho Frontend)
- **Express / Node.js** (API Backend server)
- **Zustand / Hook Form** (Kế hoạch State management tương lai)

Dự án này là nền tảng quản trị trung tâm, giúp tối ưu quy trình giảng dạy, quản trị học viên và phân tích lịch trình khóa học tự động hóa toàn diện.
