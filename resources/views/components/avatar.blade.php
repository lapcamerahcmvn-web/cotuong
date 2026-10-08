{{-- Ảnh đại diện + khung đổi bằng xu (config/shop.php, CSS .avatar.frame-* trong ui.css).
     <x-avatar :name="$u->name" :src="$u->avatar" :frame="$u->avatar_frame" size="lg" /> --}}
@props(['name' => '', 'src' => null, 'frame' => null, 'size' => null, 'lazy' => false])
<span {{ $attributes->merge(['class' => trim('avatar ' . ($size ? 'avatar--' . $size : '') . ' ' . \App\Services\ShopService::frameClass($frame))]) }}>@if($src)<img src="{{ $src }}" alt="" referrerpolicy="no-referrer" @if($lazy) loading="lazy" @endif>@else{{ mb_strtoupper(mb_substr((string) $name, 0, 1)) }}@endif</span>
