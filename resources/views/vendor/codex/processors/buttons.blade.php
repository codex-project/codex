<div class="{{ $wrapper_class }} {{ $wrapper_class . '-groups' }}">
    @if($type === 'groups')
        @foreach($groups as $group => $buttons)
        <div class="{{ $group_wrapper_class }}">
            @foreach($buttons as $button)
                {!! $button->render() !!}
            @endforeach
        </div>
        @endforeach
    @endif
</div>
