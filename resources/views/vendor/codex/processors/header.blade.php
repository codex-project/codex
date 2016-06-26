<header>
    @if(isset($subtitle) && strlen($subtitle) > 0)
        <small>{{ $subtitle }}</small>
    @endif
    <h1>{{ $title }}</h1>
</header>