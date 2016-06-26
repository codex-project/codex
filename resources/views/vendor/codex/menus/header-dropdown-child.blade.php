
@foreach($items as $item)
    @if($item->meta('hidden', false) === true)
        @continue
    @endif
    @if($item->hasChildren())
        <li class="submenu">
            <a href="#">
                {{ $item->getValue() }}
            </a>
            <ul class="dropdown-menu">
                @include('codex::menus.header-dropdown-child', [
                    'items' => $item->getChildren(),
                    'menu' => $menu
                ])
            </ul>
        </li>
    @else
        <li>
        <a href="{{ $item->attribute('href', '#') }}">
            @if($item->meta('icon', false) !== false)
                <i class="{{ $item->meta('icon') }}"></i>
            @endif
            {{ $item->getValue() }}
        </a>
        </li>
    @endif
@endforeach
