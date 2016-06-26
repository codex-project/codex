
@foreach($items as $item)
    <li>
        <a href="#{{ $item->getValue()->getSlug()  }}">
            <span class="title">{{ $item->getValue()->getText() }}</span>
        </a>
        @if($item->hasChildren())
            <ul class="sub-menu">
                @include(codex()->view($view), [ 'items' => $item->getChildren(), 'view' => $view ])
            </ul>
        @endif
    </li>
@endforeach
