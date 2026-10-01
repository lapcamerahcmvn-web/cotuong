@props(['name', 'label' => null])
<svg {{ $attributes->merge(['class' => 'ic']) }} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @if($label) role="img" aria-label="{{ $label }}" @else aria-hidden="true" focusable="false" @endif><use href="#i-{{ $name }}"/></svg>
