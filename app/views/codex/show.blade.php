@extends('layouts.master')

@section('content')
	<div class="container">
		<div class="row">
			@if ( ! is_null($toc))
				<div id="sidebar" class="col-md-3">
					<nav class="toc">
						{{ $toc }}
					</nav>
				</div>

				<div class="col-md-9 documentation">
					<p class="pull-right">
						<small>{{ $lastUpdated }}</small>
					</p>

					{{ $content }}

					@include('partials.footer')
				</div>
			@else
				<div class="col-md-12 documentation">
					<p class="pull-right">
						<small>{{ $lastUpdated }}</small>
					</p>

					{{ $content }}

					@include('partials.footer')
				</div>
			@endif
		</div>
	</div>
@stop
