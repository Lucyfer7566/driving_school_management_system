## Checklist trước khi demo

Hoàn thành tất cả các bước sau **trước khi demo**:

- [ ] MySQL đang chạy, database `velocity` đã tồn tại
- [ ] Backend đã cấu hình `.env` đúng `DATABASE_URL`
- [ ] Reset database sạch:
  ```bash
  cd backend
  npx prisma db push --force-reset
  node prisma/seed.js
  ```
- [ ] Backend đang chạy: `npm run dev` → http://localhost:8000
- [ ] Frontend đang chạy: `npm run dev` → http://localhost:5173
- [ ] Mở trình duyệt, xóa cache & localStorage:
  - Nhấn `F12` → Console → gõ `localStorage.clear()` → Enter → Refresh trang
- [ ] Đóng tất cả tab không liên quan
- [ ] Tắt thông báo máy tính (Notifications, Teams, Slack, ...)

---

## Luồng demo chính

### Giai đoạn 1: Giới thiệu trang chủ

**Thao tác:**
1. Mở trình duyệt tại **http://localhost:5173**
2. Cuộn chậm từ trên xuống, giới thiệu:
   - Hero banner với slogan trung tâm
   - 3 khóa học nổi bật (B1, B2, C) — hiển thị ảnh, giá, thời gian
   - Thống kê trung tâm: 15k+ học viên, 98% tỷ lệ đỗ, 12+ năm kinh nghiệm
   - Testimonials từ học viên cũ

**Điểm nhấn khi thuyết trình:**
> *"Trang chủ được thiết kế tập trung vào trải nghiệm người dùng. Học viên có thể nhanh chóng nắm bắt các khóa học nổi bật và đánh giá từ người học trước."*

---

### Giai đoạn 2: Xem danh sách & chi tiết khóa học

**Thao tác:**
1. Click **"Khóa học"** trên thanh navigation
2. Giới thiệu trang danh sách khóa học:
   - 8 khóa học với thông tin: tên, hạng bằng, thời gian, giá
   - Có thể lọc theo hạng (B1, B2, C)
3. Click **"Xem chi tiết"** trên khóa **Hạng B2 — Xe số sàn & Số tự động (Hành nghề)**
4. Giới thiệu trang chi tiết:
   - Thông tin chi tiết khóa học
   - Chương trình đào tạo
   - Điều kiện đăng ký
   - Giá và nút đăng ký

**Điểm nhấn:**
> *"Dữ liệu khóa học được lấy trực tiếp từ database qua REST API. Mỗi khóa học có đầy đủ thông tin giúp học viên đưa ra quyết định."*

---

### Giai đoạn 3: Đăng ký tài khoản

**Thao tác:**
1. Click **"Đăng nhập / Đăng ký"** trên navbar
2. Chuyển sang tab **"Đăng ký"**
3. Điền thông tin:
   - Họ tên: `Nguyễn Minh Demo`
   - Email: `demo@precision.vn`
   - Mật khẩu: `123456`
4. Click **"Đăng ký"**
5. Hệ thống tự động đăng nhập sau khi đăng ký thành công

**Điểm nhấn:**
> *"Hệ thống sử dụng JWT authentication. Mật khẩu được hash bằng bcrypt trước khi lưu vào database. Sau khi đăng ký, token được cấp và lưu trong localStorage để duy trì phiên đăng nhập."*

---

### Giai đoạn 4: Tương tác với Trợ lý ảo AI

**Thao tác:**
1. Click **nút chat tròn** ở góc phải dưới màn hình
2. Cửa sổ chatbot mở ra với lời chào tự động
3. Gõ: **"Tôi muốn tìm hiểu về khóa B2"** → Enter
4. Chờ chatbot phản hồi (2–5 giây) — giới thiệu thông tin khóa B2
5. Gõ: **"Đăng ký B2"** → Enter
6. Chờ chatbot phản hồi — xuất hiện nút xanh **"Thanh toán khóa học này"**

**Điểm nhấn:**
> *"Trợ lý ảo tích hợp OpenAI GPT-4o-mini, được huấn luyện với ngữ cảnh của trung tâm. Bot có thể tư vấn khóa học, báo giá, giải đáp chính sách, và hỗ trợ đăng ký thanh toán trực tiếp trong cửa sổ chat."*

**Nếu chatbot AI không phản hồi (do API lỗi):**
> Hệ thống tự động fallback sang scripted responses. Demo vẫn hoạt động bình thường, chỉ cần tiếp tục thao tác.

---

### Giai đoạn 5: Thanh toán

**Thao tác:**
1. Click nút xanh **"Thanh toán khóa học này"** trong chatbot
2. Hệ thống chuyển đến trang **Checkout**
3. Giới thiệu trang thanh toán:
   - Thông tin học viên (tự động điền từ tài khoản)
   - Chi tiết khóa học đã chọn
   - Bảng chi phí: Học phí + Khám sức khỏe + Lệ phí thi − Khuyến mãi = Tổng
   - 3 phương thức thanh toán: **VNPay** | **MoMo** | **Chuyển khoản**
4. Chọn phương thức **VNPay** (hoặc giữ mặc định)
5. Click **"Xác nhận & Thanh toán"**
6. Chờ 2–3 giây → Popup **"Thanh toán thành công!"** xuất hiện
   - Hiển thị tên khóa học
   - Mã giao dịch (VD: `PAY-1777025782896-340`)
7. Click **"Xem lịch sử giao dịch"**

**Điểm nhấn:**
> *"Luồng thanh toán tạo 2 bản ghi trong database: 1 Enrollment (đăng ký khóa) và 1 Payment (giao dịch). Trạng thái thanh toán được cập nhật qua webhook simulation — đây là flow tương tự cổng thanh toán thực tế."*

---

### Giai đoạn 6: Xem lịch sử giao dịch

**Thao tác:**
1. Sau khi click "Xem lịch sử giao dịch", trang **Học phí** hiển thị
2. Giới thiệu:
   - Bảng giao dịch với cột: mã, khóa học, số tiền, phương thức, trạng thái, thời gian
   - Giao dịch vừa thực hiện hiển thị với badge **"Thành công"** màu xanh

**Điểm nhấn:**
> *"Học viên có thể theo dõi toàn bộ lịch sử thanh toán. Dữ liệu hiển thị realtime từ API, không phải hardcode."*

---

### Giai đoạn 7: Đăng ký lịch học

**Thao tác:**
1. Click **"Lịch học"** trên thanh navigation
2. Trang Lịch học hiển thị (ban đầu trống vì chưa đăng ký buổi nào)
3. Click nút **"Đăng ký buổi học"** (góc phải trên)
4. Modal đăng ký mở ra, điền:
   - **Khóa học**: Chọn "Hạng B2 — Xe số sàn & Số tự động (Hành nghề)"
   - **Giảng viên**: Chọn giảng viên từ dropdown (VD: Vũ Minh Hoàng)
   - **Ngày học**: Chọn ngày mai hoặc ngày bất kỳ trong tương lai
   - **Từ giờ**: 08:00
   - **Đến giờ**: 10:00
   - **Ghi chú**: "Học thực hành sa hình"
5. Click **"Đăng ký"**
6. Buổi học mới xuất hiện ngay trong danh sách lịch

**Điểm nhấn:**
> *"Học viên chủ động đăng ký lịch học theo thời gian phù hợp. Dữ liệu được lưu vào bảng Schedule trong database, liên kết với Course, Instructor, và Student."*

**Validation:**
> Thử đăng ký buổi học với giờ bắt đầu > giờ kết thúc, hoặc ngày trong quá khứ → hệ thống sẽ trả lỗi validation.

---

### Giai đoạn 8: Chat với trợ lý về lịch học (Tùy chọn)

**Thao tác:**
1. Mở lại chatbot
2. Gõ: **"Tôi muốn hỏi về chính sách đổi lịch học"**
3. Chatbot trả lời về chính sách hủy/đổi lịch (hủy trước 24h miễn phí, sát giờ tính 1 buổi)
4. Gõ: **"Có học cuối tuần không?"**
5. Chatbot xác nhận có lịch Thứ 7 và Chủ nhật

**Điểm nhấn:**
> *"Trợ lý ảo không chỉ hỗ trợ đăng ký mà còn giải đáp thắc mắc về chính sách, lịch học — giảm tải cho bộ phận CSKH."*

---

## Kết luận demo

Tóm tắt lại cho giảng viên:

> *"Vừa rồi chúng em đã demo luồng hoàn chỉnh từ góc nhìn học viên:*
> 1. *Khám phá khóa học trên trang chủ*
> 2. *Xem chi tiết khóa học*
> 3. *Đăng ký tài khoản mới*
> 4. *Tư vấn với trợ lý ảo AI và được gợi ý khóa học phù hợp*
> 5. *Thanh toán trực tuyến*
> 6. *Xem lịch sử giao dịch*
> 7. *Đăng ký lịch học chủ động*
>
> *Toàn bộ dữ liệu được lưu trữ trong MySQL, giao tiếp qua REST API bảo mật bằng JWT. Hệ thống có Swagger UI để kiểm tra API, và chatbot tích hợp OpenAI GPT hỗ trợ tư vấn 24/7."*

---

## Kịch bản xử lý sự cố khi demo

| Sự cố | Giải pháp |
|---|---|
| Trang trắng / lỗi kết nối | Kiểm tra cả 2 terminal (backend + frontend) còn chạy không |
| Đăng nhập lỗi 401 | Reset DB: `npx prisma db push --force-reset && node prisma/seed.js` |
| Chatbot không phản hồi | Bình tĩnh — chatbot tự fallback sang scripted mode, demo tiếp bình thường |
| Checkout lỗi 500 | Có thể do enrollment trùng → Clear localStorage (`F12` → Console → `localStorage.clear()`) → Refresh |
| Lịch học không load | Kiểm tra backend terminal có log lỗi không, restart backend nếu cần |
| Giảng viên hỏi về DB | Mở tab mới → http://localhost:8000/api/docs → Demo Swagger |

---

## Tài khoản backup (nếu đăng ký mới bị lỗi)

| Role | Email | Password |
|---|---|---|
| Student | user2@test.com | 123456 |
| Admin | user1@test.com | 123456 |
| Instructor | user3@test.com | 123456 |