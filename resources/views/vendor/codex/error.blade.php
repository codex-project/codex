@extends(codex()->view('layouts.base'))

{{-- Meta --}}
@push('meta')
<meta name="description" content="{{ config('codex.display_name') }}.">
<meta name="keywords" content="laravel, php, framework, web, artisans, taylor otwell">
<meta name="viewport" content="width=device-width, initial-scale=1">
@endpush

{{-- Stylesheets --}}
@section('stylesheets')
    @parent
    <link rel="apple-touch-icon" href="{{ asset('vendor/codex/favicon.png') }}">
@show

{{-- Body --}}
@section('body')
    <nav class="main" data-layout="nav">
        <a href="/" class="brand">
            {{--<img src="{{ $assetPath }}/img/laravel-logo.png" height="30" alt="Laravel logo">--}}
            {{ config('codex.display_name') }}
        </a>

        <div class="responsive-sidebar-nav">
            <a href="#" class="toggle-slide menu-link btn">&#9776;</a>
        </div>

        @section('header')
            @stack('nav')

            @section('menu-projects')
                {!! $codex->projects->renderMenu() !!}
            @show
        @show


    </nav>

    <!-- CONTENT -->
    <div class="docs-wrapper" data-layout="wrapper">
        <a class="sidebar-toggle" data-action='sidebar-toggle' title='Toggle sidebar'><i class="fa fa-list"></i></a>

        <div class="text-center">
            <h1>{{ $title }}</h1>
            <p>{{ $text }}</p>
            @if(isset($goBack) && $goBack !== false)
                @set($goBackCount, is_int($goBack) ? $goBack : 1)
                <a href="javascript:history.back({{ $goBackCount }});">Go back</a>
            @endif
        </div>

    </div>
    <!-- CONTENT:END -->

    @stack('footer')

@stop

{{-- Footer --}}
@push('footer')
@section('footer')
    <footer class="main" data-layout="footer">
        <p>Copyright &copy; {{ config('codex.display_name') }}.</p>
    </footer>
@show
@endpush

