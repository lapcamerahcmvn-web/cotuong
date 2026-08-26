@extends('layouts.app')

@section('title', 'Học Cờ Tướng — Bàn Cờ Tương Tác, Diễn Giải Từng Nước')
@section('description', 'Học cờ tướng bài bản từ khai cuộc đến tàn cuộc và cờ úp. Bàn cờ tương tác đi từng nước có diễn giải, dễ hiểu cho người mới lẫn kỳ thủ.')

@push('head')
@php
    $ld = [
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        'name' => 'Học Cờ Tướng',
        'url' => url('/'),
        'inLanguage' => 'vi-VN',
    ];
    // Câu hỏi thường gặp — dùng cho cả FAQPage schema (Google/AI) lẫn phần hiển thị bên dưới.
    $faqs = [
        ['Học cờ tướng cho người mới bắt đầu từ đâu?', 'Bắt đầu từ luật chơi cơ bản và cách đi từng quân (Xe, Pháo, Mã, Tượng, Sĩ, Tướng, Tốt), sau đó học khai cuộc, trung cuộc (sát pháp) và tàn cuộc. Tại Học Cờ Tướng, mỗi bài có bàn cờ tương tác đi từng nước để bạn thấy rõ cách quân di chuyển.'],
        ['Cờ tướng có mấy loại quân và đi thế nào?', 'Có 7 loại quân: Tướng (đi 1 ô trong cung), Sĩ (chéo 1 ô trong cung), Tượng (chéo 2 ô, không qua sông), Mã (hình chữ nhật, bị cản chân mã), Xe (đi thẳng bao xa tuỳ ý), Pháo (đi thẳng như Xe, khi ăn phải có ngòi), Tốt (đi thẳng 1 ô, qua sông được đi ngang, không lùi).'],
        ['Cờ úp là gì?', 'Cờ úp là biến thể của cờ tướng: chơi trên cùng bàn cờ và bộ quân, nhưng 30 quân (trừ hai Tướng) được úp sấp mặt và tráo ngẫu nhiên — bạn không biết quân thật là gì cho tới khi lật. Quân úp đi theo binh chủng của ô xuất phát, khi đi nước đầu sẽ lật lộ mặt thật.'],
        ['Cờ úp khác cờ tướng thế nào?', 'Cờ úp thêm yếu tố ẩn thông tin (không biết quân úp là gì), khai cuộc chỉ gói trong khoảng 5 nước, con Pháo và cửa tướng quan trọng hơn, và rất ít khi hòa. Cờ tàn cờ úp cũng đa dạng hơn vì Sĩ ra được khỏi cung và Tượng qua được sông.'],
        ['Học cờ ở đây khác gì các trang khác?', 'Học Cờ Tướng có bàn cờ tương tác đi từng nước kèm diễn giải, cùng lộ trình bài học có cấu trúc từ nhập môn đến nâng cao — cho cả cờ tướng lẫn cờ úp. Bạn không chỉ đọc lý thuyết mà thấy trực tiếp từng nước trên bàn cờ.'],
    ];
    $ldFaq = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => collect($faqs)->map(fn ($f) => [
            '@type' => 'Question', 'name' => $f[0],
            'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f[1]],
        ])->all(),
    ];
@endphp
<script type="application/ld+json">{!! json_encode($ld, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
<script type="application/ld+json">{!! json_encode($ldFaq, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) !!}</script>
@endpush

@section('content')
<section class="hero">
    <div>
        <h1>Học cờ tướng qua <span class="hl">bàn cờ tương tác</span>, hiểu từng nước đi</h1>
        <p class="lead">Không chỉ xem — bạn đi lại từng nước, đọc lý do đằng sau mỗi thế trận. Từ khai cuộc, trung cuộc, tàn cuộc đến cờ úp, học bài bản theo giáo trình.</p>
        <div class="cta-row">
            <a href="{{ route('phase', 'khai-cuoc') }}" class="btn primary lg">Bắt đầu với Khai cuộc</a>
            <a href="{{ route('phase', 'co-up') }}" class="btn lg">Khám phá Cờ úp</a>
        </div>
        @if($totalLessons > 0)
            <p class="muted" style="margin-top:18px;font-size:14px;">Hiện có <strong>{{ $totalLessons }}</strong> bài học tương tác.</p>
        @endif
    </div>
    <div class="hero-board">
        <x-chess-board
            :initial-fen="$heroLesson?->initial_fen ?? 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR'"
            :steps="$heroSteps"
            :show-list="false" />
    </div>
</section>

<section class="section">
    <h2>Học theo giai đoạn ván cờ</h2>
    <p class="sub">Mỗi giai đoạn có tư duy riêng — chọn nơi bạn muốn mạnh lên.</p>
    <div class="phase-grid">
        @php
            $phaseMeta = [
                'khai-cuoc'  => ['icon' => '車', 'desc' => 'Bố trí quân, tranh tiên ngay từ đầu ván.'],
                'trung-cuoc' => ['icon' => '炮', 'desc' => 'Phối hợp tấn công, tính toán đổi quân.'],
                'tan-cuoc'   => ['icon' => '將', 'desc' => 'Kỹ thuật thắng thế cờ ít quân.'],
                'nhap-mon'   => ['icon' => '兵', 'desc' => 'Luật chơi và nước đi cơ bản cho người mới.'],
            ];
        @endphp
        @foreach($phaseMeta as $key => $m)
            <a href="{{ route('phase', $key) }}" class="phase-card card">
                <div class="pc-icon">{{ $m['icon'] }}</div>
                <h3>{{ \App\Models\Lesson::PHASES[$key] }}</h3>
                <p>{{ $m['desc'] }}</p>
                @if(($phases[$key]['count'] ?? 0) > 0)
                    <div class="pc-count">{{ $phases[$key]['count'] }} bài học</div>
                @else
                    <div class="pc-count" style="color:var(--ink-faint)">Sắp ra mắt</div>
                @endif
            </a>
        @endforeach
    </div>
</section>

@if($featured->isNotEmpty())
<section class="section">
    <h2>Bài học nổi bật</h2>
    <p class="sub">Những thế trận kinh điển, có bàn cờ đi từng nước.</p>
    <div class="lesson-list">
        @foreach($featured as $i => $lesson)
            <a href="{{ route('lessons.show', $lesson->slug) }}" class="lesson-item card">
                <span class="li-num">{{ str_pad($i + 1, 2, '0', STR_PAD_LEFT) }}</span>
                <span>
                    <span class="li-title">{{ $lesson->title }}</span>
                    <span class="li-sub">{{ $lesson->phase_label }} · {{ $lesson->move_count }} nước đi</span>
                </span>
                <span class="li-meta"><span class="tag level">{{ $lesson->level_label }}</span></span>
            </a>
        @endforeach
    </div>
</section>
@endif

<section class="section">
    <h2>Vì sao học cờ tướng tại Học Cờ Tướng?</h2>
    <div class="prose" style="max-width:760px;">
        <p><strong>Học Cờ Tướng</strong> giúp bạn học chơi <strong>cờ tướng</strong> và <strong>cờ úp</strong> bài bản, dễ hiểu — từ người mới chưa biết luật đến kỳ thủ muốn nâng cao. Điểm khác biệt là mỗi bài học đều có <strong>bàn cờ tương tác đi từng nước</strong>: bạn không chỉ đọc lý thuyết mà bấm “Tiến” để xem từng nước cờ diễn ra, kèm lời diễn giải vì sao đi nước đó.</p>
        <p>Lộ trình sắp theo bốn giai đoạn của ván cờ. <strong>Nhập môn</strong> dạy luật chơi và cách đi từng quân cho người mới. <strong>Khai cuộc</strong> hướng dẫn bố trí quân, tranh tiên ngay từ đầu. <strong>Trung cuộc</strong> tập trung vào sát pháp — các đòn phối hợp chiếu hết. <strong>Tàn cuộc</strong> rèn kỹ thuật thắng thế cờ ít quân. Riêng mảng <strong>cờ úp</strong> — môn cờ đang thịnh hành mà rất ít nơi dạy bài bản — có cả luật chơi lẫn chiến thuật soạn từ giáo trình thực chiến.</p>
        <p>Toàn bộ nội dung miễn phí. Đăng nhập để lưu tiến độ, đánh dấu bài đã học và được gợi ý bài tiếp theo phù hợp. Dù bạn học <strong>cách chơi cờ tướng cho người mới</strong> hay tìm <strong>các thế sát cờ tướng</strong> nâng cao, bạn đều thấy rõ từng nước trên bàn cờ.</p>
    </div>
</section>

<section class="section">
    <h2>Câu hỏi thường gặp</h2>
    <p class="sub">Những thắc mắc phổ biến khi bắt đầu học cờ tướng và cờ úp.</p>
    <div class="faq-list">
        @foreach($faqs as $f)
            <details class="faq-item card">
                <summary>{{ $f[0] }}</summary>
                <div class="faq-answer">{{ $f[1] }}</div>
            </details>
        @endforeach
    </div>
</section>

@if($series->isNotEmpty())
<section class="section">
    <h2>Chương trình học</h2>
    <p class="sub">Giáo trình có hệ thống, theo từng chuỗi bài.</p>
    <div class="lesson-list">
        @foreach($series as $s)
            <a href="{{ route('series', $s->slug) }}" class="lesson-item card">
                <span class="li-num">{{ $s->game_mode === 'co-up' ? '揭' : '課' }}</span>
                <span>
                    <span class="li-title">{{ $s->name }}</span>
                    <span class="li-sub">{{ $s->published_lessons_count }} bài đã xuất bản</span>
                </span>
                <span class="li-meta"><span class="tag phase">{{ \App\Models\Lesson::PHASES[$s->phase] ?? \App\Models\Lesson::GAME_MODES[$s->game_mode] ?? 'Chương trình' }}</span></span>
            </a>
        @endforeach
    </div>
</section>
@endif
@endsection
