@extends('layouts.master')

@section('content')
	<div class="container">
		<div class="row">
			<div id="sidebar" class="col-md-3">
				<nav class="toc">
					{{ $toc }}
				</nav>
			</div>

			<div class="col-md-9 documentation">
				<h1>Search results for <small>"{{ $search }}"</small></h1>

				<div id="search-results">
					@if (count($results) > 0)
						<ol>
							@foreach ($results as $result)
								<li>
									<a href="{{ url($result['url']) }}">{{ Markdown::parse($result['title']) }}</a>
								</li>
							@endforeach
						</ol>
					@else
						<p>
							Shucks, no results found Batman.
						</p>
					@endif
				</div>

				@include('partials.footer')
			</div>
		</div>
	</div>
@stop
