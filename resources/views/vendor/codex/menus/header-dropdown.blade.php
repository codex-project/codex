<ul class="dropdown-nav">
    <li class="dropdown">
        <a class="dropdown-toggle" type="button" data-toggle="dropdown" role="button" aria-expanded="false">
            @if($menu->attr()->has('subtitle'))
                <span class="subtitle">{{ $menu->attr('subtitle') }}</span>
            @endif
            {{ $menu->attr('title') }}
            <span class="caret"></span>
        </a>
        <ul class="dropdown-menu pull-right" role="menu">
            @include('codex::menus.header-dropdown-child')
        </ul>
    </li>
</ul>
