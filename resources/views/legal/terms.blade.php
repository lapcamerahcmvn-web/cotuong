@extends('layouts.app')
@section('title', 'Điều khoản sử dụng — Học Cờ Tướng')
@section('description', 'Điều khoản sử dụng website Học Cờ Tướng: tài khoản, quy tắc ứng xử, chơi cờ công bằng, bản quyền nội dung bài học và giới hạn trách nhiệm.')

@php $mail = config('site.contact_email'); $op = config('site.operator'); @endphp
@section('content')
<nav class="crumbs" aria-label="breadcrumb"><a href="{{ route('home') }}">Trang chủ</a><x-icon name="chev-right" /><span>Điều khoản sử dụng</span></nav>
<article class="prose max-w-3xl">
    <h1 class="page-title !mb-2">Điều khoản sử dụng</h1>
    <p class="muted">Cập nhật lần cuối: 06/10/2026 · Website <a href="{{ url('/') }}">{{ parse_url(url('/'), PHP_URL_HOST) }}</a> ("Học Cờ Tướng") là một dự án của <a href="{{ $op['url'] }}" target="_blank" rel="noopener">{{ $op['name'] }}</a>.</p>
    <p>Khi truy cập hoặc tạo tài khoản trên Học Cờ Tướng, bạn đồng ý với các điều khoản dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng website.</p>

    <h2>1. Dịch vụ</h2>
    <p>Học Cờ Tướng cung cấp miễn phí: bài học cờ tướng và cờ úp có bàn cờ tương tác, luyện tập thế cờ, chơi với máy, đấu với bạn bè, phân tích ván, nhận dạng bàn cờ từ ảnh và các tính năng đi kèm. Chúng tôi có thể thay đổi, tạm dừng hoặc ngừng một phần tính năng mà không cần báo trước, nhưng sẽ cố gắng giữ dữ liệu học tập của bạn.</p>

    <h2>2. Tài khoản</h2>
    <ul class="list-disc pl-5">
        <li>Bạn chịu trách nhiệm giữ an toàn tài khoản và mọi hoạt động diễn ra dưới tài khoản của mình.</li>
        <li>Thông tin đăng ký phải trung thực; tên hiển thị không được mạo danh người khác hay chứa nội dung xúc phạm.</li>
        <li>Người dưới 16 tuổi nên dùng tài khoản dưới sự đồng ý và hướng dẫn của cha mẹ / người giám hộ.</li>
        <li>Mỗi người nên dùng một tài khoản; tạo nhiều tài khoản để trục lợi XP / xếp hạng có thể bị khoá.</li>
    </ul>

    <h2>3. Quy tắc ứng xử</h2>
    <ul class="list-disc pl-5">
        <li>Bình luận lịch sự, đúng chủ đề; không spam, quảng cáo, chia sẻ nội dung vi phạm pháp luật, xúc phạm, phân biệt đối xử.</li>
        <li>Không tấn công, dò quét, khai thác lỗi, gửi yêu cầu tự động hàng loạt hay làm gián đoạn website.</li>
        <li>Chúng tôi có quyền ẩn / xoá nội dung vi phạm và tạm khoá hoặc khoá tài khoản vi phạm.</li>
    </ul>

    <h2>4. Chơi cờ công bằng</h2>
    <ul class="list-disc pl-5">
        <li>Không dùng phần mềm / engine cờ khác để đi thay khi đấu với người thật, không dàn xếp kết quả để cày XP hay thứ hạng.</li>
        <li>Luật thi đấu áp dụng trên website (chiếu hết, hết nước đi, chiếu dai, đuổi bắt dai, lặp nước, hết giờ…) được mô tả tại trang chơi; kết quả do hệ thống xử lý theo các luật đó là kết quả cuối cùng.</li>
        <li>Cấp độ, XP, huy hiệu và bảng xếp hạng chỉ nhằm tạo động lực học tập, <strong>không phải đẳng cấp cờ chính thức</strong> và không quy đổi thành tiền hay giải thưởng vật chất (trừ khi có thông báo chương trình riêng).</li>
    </ul>

    <h2>5. Bản quyền nội dung</h2>
    <ul class="list-disc pl-5">
        <li>Lời giảng, bài viết, hình ảnh, giao diện và mã nguồn của website thuộc về Học Cờ Tướng / {{ $op['name'] }}. Bạn được xem và dùng cho mục đích học tập cá nhân; không sao chép hàng loạt, đăng lại hay khai thác thương mại khi chưa có đồng ý bằng văn bản.</li>
        <li>Nước đi và thế cờ của các ván cờ là dữ kiện; lời bình trên website được biên soạn lại bằng lời riêng của chúng tôi.</li>
        <li>Nội dung bạn tạo (bình luận, thế cờ trong thư viện) vẫn thuộc về bạn; bạn cho phép chúng tôi hiển thị nội dung đó trên website theo chức năng tương ứng (ví dụ bình luận công khai dưới bài học).</li>
        <li>Nếu bạn cho rằng nội dung nào trên website vi phạm quyền của bạn, hãy liên hệ để chúng tôi xem xét gỡ bỏ.</li>
    </ul>

    <h2>6. Giới hạn trách nhiệm</h2>
    <p>Website được cung cấp "nguyên trạng". Nội dung bài học và phân tích của máy có thể còn sai sót; chúng tôi không đảm bảo website hoạt động liên tục, không lỗi. Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm cho thiệt hại gián tiếp phát sinh từ việc sử dụng website. Liên kết tới website khác (nếu có) thuộc trách nhiệm của chủ website đó.</p>

    <h2>7. Dữ liệu cá nhân</h2>
    <p>Việc thu thập và xử lý dữ liệu cá nhân được mô tả trong <a href="{{ route('legal.privacy') }}">Chính sách bảo mật</a>.</p>

    <h2>8. Thay đổi điều khoản &amp; luật áp dụng</h2>
    <p>Chúng tôi có thể cập nhật điều khoản; ngày cập nhật ghi ở đầu trang. Tiếp tục sử dụng sau khi cập nhật nghĩa là bạn đồng ý với bản mới. Điều khoản được điều chỉnh bởi pháp luật Việt Nam.</p>

    <h2>9. Liên hệ</h2>
    <p>Email: <a href="mailto:{{ $mail }}">{{ $mail }}</a></p>
</article>
@endsection
