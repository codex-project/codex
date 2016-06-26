@section('opener')
<!DOCTYPE html><!--[if IE 8]>
<html class="ie8" lang="en"><![endif]-->
<!--[if IE 9]>
<html lang="en" class="ie9"><![endif]-->
<!--[if !IE]><!-->
<html lang="en"><!--<![endif]-->
@show
<head>
    <title>
        @section('title')
            {{ config('codex.display_name') }}
        @show
    </title>

    @stack('meta')

    @section('data')
        {!! codex()->theme->renderData() !!}
    @show

    @section('stylesheets')
        {!! codex()->theme->renderStylesheets() !!}
    @show

    @section('styles')
        {!! codex()->theme->renderStyles(); !!}
    @show

    @stack('head')

</head>

<body class="{{ codex()->theme->renderBodyClass() }}">

@section('body')

    <header>
        @stack('page-actions')
        @stack('header-top-menu')
    </header>

    <aside>
        @section('sidebar-menu')
        @show
    </aside>

    <nav>
        <ul data-layout="breadcrumbs">
            @section('breadcrumb')
                <li><a href="{{ route('codex.index') }}">Home</a><i class="fa fa-arrow-right"></i></li>
            @show
        </ul>
    </nav>

    @if (isset($errors) && count($errors) > 0)
        <div class="page-alerts page-alerts-top">
            @include('codex::partials/errors')
        </div>
    @endif

    <article>
        <header>
            <h1>@yield('page-title')
                <small> @yield('page-subtitle', '')</small>
            </h1>
        </header>
        @yield('content', '')
    </article>

    <footer>

    </footer>

@show



@section('javascripts')
    {!! codex()->theme->renderJavascripts() !!}
@show

@section('scripts')
    {!! codex()->theme->renderScripts() !!}
@show


</body>
</html>
