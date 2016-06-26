@if(isset($breadcrumb))
    <nav class="breadcrumbs">
        <ul>
            <li><a href="{{ $project->url('index') }}">{{ $project->getDisplayName() }}</a><i class="fa fa-arrow-right"></i></li>
            @foreach($breadcrumb as $item)
                @if($item->getId() !== 'root')
                    <li>
                        <a {!! $item->parseAttributes() !!}>{{ $item->getValue() }}</a>
                        @if($item->hasChildren())
                            <i class="fa fa-arrow-right"></i>
                        @endif
                    </li>
                @endif
            @endforeach
        </ul>
    </nav>
@endif