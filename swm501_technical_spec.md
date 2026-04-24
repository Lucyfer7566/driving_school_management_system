# Tài liệu kỹ thuật tổng hợp dự án SWM501-Spring2026-MSA36HN-G9

## Tổng quan hệ thống
Dự án **SWM501-Spring2026-MSA36HN-G9** là một web application quản lý và hỗ trợ hoạt động của trung tâm/trường dạy lái xe, tập trung vào trải nghiệm của học viên, quản lý khóa học, đặt lịch học, thanh toán trực tuyến, thông báo và các dịch vụ hỗ trợ.[cite:1][cite:2]

Theo lịch sử Jira, dự án đang vận hành theo Scrum Board và đã chuyển sang **Sprint 3 - Complete Function 3**, cho thấy backlog trước đó đã được cập nhật sau Sprint 2 và phạm vi chức năng tiếp tục được mở rộng/điều chỉnh.[cite:1][cite:2]

## Nguồn yêu cầu và phạm vi chức năng
Các nhóm chức năng đã xuất hiện trong backlog và các issue liên quan gồm:

- **Quản lý thanh toán trực tuyến**: hỗ trợ nhiều phương thức thanh toán online cho học viên.[cite:2]
- **Đặt lịch và phân công buổi học**: hệ thống lập lịch, gán buổi học cho học viên.[cite:1][cite:2]
- **Định giá/gợi ý giá khóa học theo thời gian thực**: logic pricing theo xu hướng thị trường và nhu cầu.[cite:1]
- **Thông báo, nhắc nhở và giao tiếp**: hỗ trợ nhắc lịch, cập nhật trạng thái, hỗ trợ 24/7.[cite:2]
- **Chọn khóa học trending và lộ trình học**: đây là dependency đầu vào đã từng block chức năng thanh toán trong backlog trước đó.[cite:2]

## Mô hình người dùng
Hệ thống cần hỗ trợ tối thiểu các vai trò sau:

| Vai trò | Mục tiêu nghiệp vụ | Nhu cầu kỹ thuật |
|---|---|---|
| Học viên | Chọn khóa, xem lộ trình, đặt lịch, thanh toán | Giao diện thân thiện, thanh toán an toàn, theo dõi tiến độ [cite:1][cite:2] |
| Quản lý/Manager | Theo dõi gói học, giá khóa học, vận hành | Dashboard quản trị, cấu hình pricing, báo cáo [cite:1] |
| Nhân sự vận hành/điều phối | Phân công buổi học và xử lý lịch | Calendar, phân công tự động/bán tự động [cite:1][cite:2] |
| Hệ thống hỗ trợ CSKH | Gửi thông báo, hỗ trợ 24/7 | Notification service, chat/helpdesk hooks [cite:2] |

## Những gì cần code trong toàn dự án

### 1. Module xác thực và phân quyền
Cần xây dựng đăng nhập, đăng xuất, quản lý phiên, và phân quyền theo vai trò học viên, quản lý, điều phối viên, nhân viên hỗ trợ. Mọi API nghiệp vụ như thanh toán, đặt lịch, quản trị gói học đều phải có middleware kiểm tra quyền truy cập.[cite:2]

**Các hạng mục code:**
- Trang login/logout.
- Quản lý JWT hoặc session.
- RBAC theo role.
- Route guard cho frontend và backend.
- Audit log cho thao tác quản trị quan trọng.

### 2. Module quản lý khóa học và learning path
Người dùng cần chọn khóa học đang thịnh hành, xem lộ trình học, thông tin gói học, thời lượng, học phí và điều kiện đăng ký; đây là phần nền cho thanh toán và scheduling.[cite:2]

**Các hạng mục code:**
- CRUD khóa học.
- CRUD package/gói học.
- Trang danh sách khóa học, chi tiết khóa học.
- Gợi ý khóa học trending.
- Mapping khóa học ↔ lộ trình ↔ buổi học.
- API lấy danh sách khóa học, chi tiết, học phí, trạng thái mở đăng ký.

### 3. Module thanh toán và tài chính
Backlog cho thấy đây là một epic trọng tâm với user story hỗ trợ **multiple online payment methods** cho học viên.[cite:2]

**Các hạng mục code:**
- Tạo đơn thanh toán từ gói học/khóa học.
- Tích hợp cổng thanh toán online, ưu tiên các phương thức phổ biến tại Việt Nam như VNPay, MoMo, chuyển khoản ngân hàng hoặc cổng giả lập nếu phạm vi môn học không yêu cầu tích hợp production.
- Lưu transaction, trạng thái thanh toán, mã giao dịch, lịch sử retry.
- Webhook/callback xử lý cập nhật trạng thái thành công, thất bại, pending.
- Màn hình checkout, payment result, transaction history.
- Theo dõi tài chính cơ bản: tổng doanh thu, số đơn thành công, đơn chờ xử lý, hoàn tiền (nếu có).
- Validation chống double-submit, idempotency cho callback.

### 4. Module booking và scheduling
Sprint hiện tại trong lịch sử Jira cho thấy chức năng scheduling vẫn là một phần đang được thực hiện ở Sprint 3.[cite:1]

**Các hạng mục code:**
- Lịch học viên theo ngày/tuần/tháng.
- Tạo slot học, định nghĩa thời lượng buổi học.
- Đăng ký/đổi/hủy buổi học.
- Phân công giáo viên hoặc xe/phòng thực hành nếu mô hình dữ liệu có yêu cầu.
- Logic tránh trùng lịch học viên, trùng tài nguyên, vượt sức chứa.
- Tự động gán lesson cho học viên theo learning path.
- API tra cứu lịch trống và booking rules.

### 5. Module pricing động
Có issue về **real-time package/course pricing based on market trends and demand**, nghĩa là hệ thống không chỉ lưu giá tĩnh mà còn cần engine tính giá hoặc ít nhất là rule-based pricing.[cite:1]

**Các hạng mục code:**
- Bảng quy tắc định giá.
- Tham số nhu cầu, thời điểm, số chỗ còn lại, loại khóa học.
- Service tính giá động.
- Lưu lịch sử thay đổi giá.
- Màn hình cấu hình pricing cho manager.
- API preview giá trước khi publish.
- Cơ chế fallback về giá cơ bản khi rule lỗi.

### 6. Module thông báo, nhắc nhở, hỗ trợ 24/7
Backlog đã có nhóm chức năng notification, reminder, communication và hỗ trợ 24/7.[cite:2]

**Các hạng mục code:**
- Notification center trong hệ thống.
- Gửi email hoặc in-app notification khi thanh toán thành công/thất bại.
- Nhắc lịch học trước buổi học.
- Cảnh báo đổi lịch hoặc hủy buổi học.
- Form gửi yêu cầu hỗ trợ/chăm sóc khách hàng.
- Tích hợp live chat, chatbot hoặc ticket đơn giản tùy phạm vi môn học.
- Mẫu thông báo theo template.

### 7. Module quản trị và báo cáo
Quản trị viên và manager cần vùng quản trị để điều hành gói học, booking, pricing, thanh toán và hỗ trợ.[cite:1][cite:2]

**Các hạng mục code:**
- Dashboard KPI.
- Quản lý người dùng.
- Quản lý khóa học/gói học.
- Quản lý booking, trạng thái lesson.
- Quản lý thanh toán và transaction.
- Quản lý notification template.
- Báo cáo doanh thu, số lượng booking, tỷ lệ thanh toán thành công.

### Các thực thể dữ liệu chính

| Thực thể | Mục đích |
|---|---|
| User | Thông tin tài khoản và role |
| Course | Khóa học lái xe |
| Package | Gói học/biến thể đăng ký |
| LearningPath | Lộ trình học |
| Lesson / Session | Buổi học cụ thể |
| ScheduleSlot | Khung giờ có thể đặt |
| Booking | Đăng ký lịch học |
| PaymentOrder | Đơn thanh toán |
| PaymentTransaction | Giao dịch thanh toán |
| PricingRule | Quy tắc định giá |
| Notification | Thông báo gửi tới người dùng |
| SupportTicket | Yêu cầu hỗ trợ |

## Thiết kế API cần có
Các nhóm API tối thiểu:

- `POST /auth/login`, `POST /auth/logout`, `POST /auth/refresh`
- `GET /courses`, `GET /courses/:id`, `POST /courses`, `PUT /courses/:id`
- `GET /packages`, `POST /packages`
- `GET /learning-paths/:courseId`
- `GET /schedules/slots`, `POST /bookings`, `PATCH /bookings/:id/cancel`
- `POST /payments/orders`, `POST /payments/callback`, `GET /payments/history`
- `GET /pricing/preview`, `POST /pricing/rules`
- `GET /notifications`, `POST /support/tickets`
- `GET /admin/dashboard`

## Thiết kế giao diện cần code

### Cổng học viên
- Trang đăng nhập/đăng ký.
- Trang khám phá khóa học.
- Trang chi tiết khóa học/gói học.
- Trang learning path.
- Trang đặt lịch học.
- Trang checkout thanh toán.
- Trang lịch sử giao dịch.
- Trang thông báo/hỗ trợ.
- Trang hồ sơ cá nhân.

### Cổng quản trị
- Dashboard tổng quan.
- Quản lý khóa học và package.
- Quản lý lịch học và điều phối.
- Quản lý payment/transaction.
- Cấu hình pricing rule.
- Quản lý notification/support.
- Trang báo cáo.

## Luồng nghiệp vụ chính

### Luồng 1: Chọn khóa → thanh toán → xếp lịch
1. Học viên chọn khóa học hoặc gói học.[cite:2]
2. Hệ thống hiển thị learning path, giá và lựa chọn thanh toán.[cite:2]
3. Học viên thanh toán online qua phương thức phù hợp.[cite:2]
4. Hệ thống ghi nhận transaction và cập nhật trạng thái đăng ký.[cite:2]
5. Hệ thống mở quyền đặt lịch hoặc tự động gán lesson.[cite:1][cite:2]

### Luồng 2: Giá động
1. Manager cấu hình pricing rule.[cite:1]
2. Hệ thống tính giá theo nhu cầu/thị trường.[cite:1]
3. Frontend hiển thị giá preview cho người dùng.[cite:1]
4. Khi tạo order, giá được snapshot để tránh lệch dữ liệu sau thanh toán.[cite:1]

### Luồng 3: Nhắc lịch và hỗ trợ
1. Khi booking được tạo hoặc thay đổi, hệ thống sinh notification.[cite:2]
2. Trước giờ học, reminder được gửi qua email/in-app.[cite:2]
3. Nếu người dùng gặp vấn đề, họ tạo support request hoặc nhận hỗ trợ 24/7.[cite:2]
