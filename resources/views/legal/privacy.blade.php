@extends('layouts.app')
@section('title', 'Chính sách bảo mật — Học Cờ Tướng')
@section('description', 'Học Cờ Tướng thu thập dữ liệu gì, dùng vào việc gì, lưu bao lâu và quyền của bạn với dữ liệu cá nhân (theo Nghị định 13/2023/NĐ-CP).')

@php $mail = config('site.contact_email'); $op = config('site.operator'); @endphp
@section('content')
<nav class="crumbs" aria-label="breadcrumb"><a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" /><span>Chính sách bảo mật</span></nav>
<article class="prose max-w-3xl">
    <h1 class="page-title !mb-2">Chính sách bảo mật</h1>
    <p class="muted">Cập nhật lần cuối: 06/10/2026 · Áp dụng cho website <a href="{{ url('/') }}">{{ parse_url(url('/'), PHP_URL_HOST) }}</a> ("Học Cờ Tướng", "chúng tôi") — một dự án của <a href="{{ $op['url'] }}" target="_blank" rel="noopener">{{ $op['name'] }}</a>.</p>

    <p>Chúng tôi chỉ thu thập những dữ liệu cần để bạn học cờ, lưu tiến độ và chơi cờ trên website. Chúng tôi <strong>không bán</strong> dữ liệu cá nhân và không dùng dữ liệu của bạn cho quảng cáo nhắm mục tiêu.</p>

    <h2>1. Dữ liệu chúng tôi thu thập</h2>
    <h3>Khi bạn tạo tài khoản / đăng nhập</h3>
    <ul class="list-disc pl-5">
        <li><strong>Đăng nhập bằng Google:</strong> tên hiển thị, địa chỉ email, ảnh đại diện và mã định danh tài khoản Google. Chúng tôi không nhận mật khẩu Google của bạn.</li>
        <li><strong>Đăng ký bằng email:</strong> tên hiển thị, email và mật khẩu (được lưu dưới dạng băm một chiều — không ai, kể cả quản trị viên, đọc được mật khẩu gốc).</li>
    </ul>
    <h3>Khi bạn dùng website (đã đăng nhập)</h3>
    <ul class="list-disc pl-5">
        <li><strong>Tiến độ học:</strong> bài đã học, thời gian đọc, kết quả giải thế cờ, điểm XP, chuỗi ngày học, huy hiệu, mục tiêu ngày, xếp hạng.</li>
        <li><strong>Ván đấu:</strong> các nước đi của ván với máy và ván đấu bạn, kết quả, kết quả phân tích ván, các thế "sai lầm của tôi".</li>
        <li><strong>Nội dung bạn tạo:</strong> bình luận, thế cờ lưu trong thư viện, danh sách theo dõi / bạn bè.</li>
        <li><strong>Nhật ký truy cập:</strong> trang đã xem, thời điểm, địa chỉ IP và loại trình duyệt — dùng để bảo mật tài khoản (phát hiện đăng nhập lạ) và hỗ trợ khi bạn gặp lỗi. Nhật ký này được <strong>tự động xoá sau 180 ngày</strong>.</li>
    </ul>
    <h3>Với mọi khách truy cập</h3>
    <ul class="list-disc pl-5">
        <li><strong>Thống kê lượt xem ẩn danh:</strong> đường dẫn trang và một mã băm một chiều (không lưu IP gốc, không định danh được bạn) để đếm số người xem mỗi bài.</li>
        <li><strong>Google Analytics 4</strong> (nếu website đang bật): số liệu sử dụng tổng hợp như trang được xem, thiết bị, khu vực ước lượng. Xem thêm <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">chính sách của Google</a>.</li>
    </ul>
    <h3>Dữ liệu chỉ nằm trên thiết bị của bạn (không gửi về máy chủ)</h3>
    <ul class="list-disc pl-5">
        <li>Cài đặt giao diện bàn cờ, âm thanh, chế độ sáng/tối; ván đang chơi dở với máy; tiến độ khi chưa đăng nhập; mẫu chữ quân cờ máy học khi bạn nhận dạng ảnh — lưu trong bộ nhớ trình duyệt (localStorage). Bạn có thể xoá bằng cách xoá dữ liệu trang web trong trình duyệt.</li>
        <li><strong>Nhận dạng bàn cờ từ ảnh:</strong> ảnh được xử lý <strong>ngay trên trình duyệt</strong>, không tải lên máy chủ. Riêng khi bạn chủ động bấm "Nhận dạng lại bằng AI", ảnh bàn cờ đã nắn thẳng mới được gửi tới dịch vụ AI (Anthropic) để đọc thế cờ; chúng tôi không lưu ảnh đó.</li>
    </ul>

    <h2>2. Cookie</h2>
    <p>Website dùng cookie <strong>cần thiết</strong>: cookie phiên đăng nhập, cookie chống giả mạo yêu cầu (CSRF) và — nếu bạn chọn "Ghi nhớ đăng nhập" — cookie ghi nhớ. Không dùng cookie quảng cáo. Nếu Google Analytics được bật, Google có thể đặt cookie thống kê.</p>

    <h2>3. Mục đích sử dụng</h2>
    <ul class="list-disc pl-5">
        <li>Cung cấp chức năng: lưu tiến độ, XP, lịch sử ván, thư viện, xếp hạng, đấu bạn.</li>
        <li>Bảo mật tài khoản, chống gian lận XP / bảng xếp hạng, xử lý bình luận vi phạm.</li>
        <li>Cải thiện nội dung bài học và tính năng dựa trên số liệu tổng hợp.</li>
        <li>Liên hệ với bạn khi bạn yêu cầu hỗ trợ.</li>
    </ul>

    <h2>4. Chia sẻ dữ liệu</h2>
    <p>Chúng tôi không bán hay cho thuê dữ liệu cá nhân. Dữ liệu chỉ được xử lý bởi:</p>
    <ul class="list-disc pl-5">
        <li><strong>Nhà cung cấp hạ tầng</strong> (máy chủ lưu trữ website) — chỉ để vận hành dịch vụ.</li>
        <li><strong>Google</strong> — đăng nhập bằng Google, Google Analytics (nếu bật).</li>
        <li><strong>Anthropic</strong> — chỉ ảnh bàn cờ khi bạn bấm nhận dạng bằng AI.</li>
        <li>Cơ quan nhà nước có thẩm quyền khi pháp luật yêu cầu.</li>
    </ul>
    <p><strong>Thông tin công khai:</strong> tên hiển thị, ảnh đại diện, cấp độ, XP, huy hiệu và thứ hạng hiện trên bảng xếp hạng / trang kỳ thủ; bình luận hiện công khai dưới bài học. Bạn có thể ẩn mình khỏi bảng xếp hạng trong <em>Cài đặt</em>.</p>

    <h2>5. Thời gian lưu trữ</h2>
    <ul class="list-disc pl-5">
        <li>Dữ liệu tài khoản, tiến độ học, ván đấu: lưu trong suốt thời gian tài khoản còn hoạt động; xoá khi bạn yêu cầu xoá tài khoản.</li>
        <li>Nhật ký truy cập: 180 ngày.</li>
        <li>Thống kê lượt xem ẩn danh: lưu lâu dài dưới dạng không định danh.</li>
    </ul>

    <h2>6. Quyền của bạn</h2>
    <p>Theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân, bạn có quyền: được biết về việc xử lý dữ liệu; truy cập và nhận bản sao dữ liệu; chỉnh sửa dữ liệu (tên hiển thị trong <em>Cài đặt</em>); yêu cầu xoá dữ liệu / xoá tài khoản; rút lại sự đồng ý; phản đối hoặc hạn chế xử lý; khiếu nại theo quy định pháp luật.</p>
    <p>Để thực hiện các quyền trên, gửi email tới <a href="mailto:{{ $mail }}">{{ $mail }}</a> từ địa chỉ email của tài khoản. Chúng tôi phản hồi trong vòng 72 giờ làm việc.</p>

    <h2>7. Bảo mật</h2>
    <p>Kết nối mã hoá HTTPS; mật khẩu băm một chiều; trang quản trị chỉ dành cho nhân sự được phân quyền; giới hạn tần suất gửi yêu cầu để chống dò mật khẩu và spam. Không có hệ thống nào an toàn tuyệt đối — nếu phát hiện sự cố ảnh hưởng tới dữ liệu của bạn, chúng tôi sẽ thông báo theo quy định.</p>

    <h2>8. Trẻ em</h2>
    <p>Website phù hợp cho người học cờ ở mọi lứa tuổi. Người dưới 16 tuổi nên tạo tài khoản khi có sự đồng ý và hướng dẫn của cha mẹ / người giám hộ. Cha mẹ có thể yêu cầu xoá tài khoản của con qua email ở trên.</p>

    <h2>9. Thay đổi chính sách</h2>
    <p>Khi chính sách thay đổi đáng kể, chúng tôi cập nhật ngày ở đầu trang và thông báo trên website. Xem thêm <a href="{{ route('legal.terms') }}">Điều khoản sử dụng</a>.</p>
</article>
@endsection
