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
				{{ $content }}
			</div>
		</div>
	</div>
@stop
