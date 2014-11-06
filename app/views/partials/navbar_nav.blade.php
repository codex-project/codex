<ul class="nav navbar-nav">
	@if (isset($currentManual))
		@if (count($manuals) > 1)
			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-book"></span> {{ $currentManual }} <span class="caret"></span></a>
				<ul class="dropdown-menu" role="menu">
					@foreach ($manuals as $manual)
						<li><a href="{{ url('/'.$manual) }}">{{ $manual }}</a> </li>
					@endforeach
				</ul>
			</li>
		@else
			<li><p class="navbar-text"><span class="glyphicon glyphicon-book"></span> {{ $currentManual }}</p></li>
		@endif
	@endif

	@if (isset($currentVersion))
		@if (count($versions) > 1)
			<li class="dropdown">
				<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-bookmark"></span> {{ $currentVersion }} <span class="caret"></span></a>
				<ul class="dropdown-menu" role="menu">
					@foreach ($versions as $version)
						<li><a href="{{ url('/'.$currentManual.'/'. $version) }}">{{ $version }}</a> </li>
					@endforeach
				</ul>
			</li>
		@else
			<li><p class="navbar-text"><span class="glyphicon glyphicon-bookmark"></span> {{ $currentVersion }}</p></li>
		@endif
	@endif
</ul>
