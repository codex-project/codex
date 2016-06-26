@extends('codex::layouts.base')

@section('bodyClass', 'the-404 exception')

@push('header')

    <div class="responsive-sidebar-nav">
        <a href="#" class="toggle-slide menu-link btn">&#9776;</a>
    </div>

    @section('menu-projects')
        {!! $codex->menus->get('projects')->render() !!}
    @show

@endpush

@push('content')

<div class="contain">
    <h1>Something went wrong</h1>
    <a href="javascript:history.back(1)" class="back">Go back</a>
</div>

@if(config('app.debug', false))
<div class="trace">
    {!! $trace !!}
</div>
@endif
@endpush