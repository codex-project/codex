<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Codex - {{ $currentManual }} v{{ $currentVersion }}</title>

		<!-- CSS -->
		<link rel="stylesheet" href="/assets/css/bootswatch/flatly.min.css">
		<link rel="stylesheet" href="/assets/css/codex.css">
	</head>
	<body>
		<nav class="navbar navbar-inverse" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>

					<a href="/" class="navbar-brand">Codex</a>
				</div>

				<div id="navbar" class="collapse navbar-collapse">
					<ul class="nav navbar-nav">
						@if (count($manuals) > 1)
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">{{ $currentManual }} <span class="caret"></span></a>
								<ul class="dropdown-menu" role="menu">
									@foreach ($manuals as $manual)
										<li><a href="/{{ $manual }}">{{ $manual }}</a> </li>
									@endforeach
								</ul>
							</li>
						@else
							<li><p class="navbar-text">{{ $currentManual }}</p></li>
						@endif

						@if (count($versions) > 1)
							<li class="dropdown">
								<a href="#" class="dropdown-toggle" data-toggle="dropdown">{{ $currentVersion }} <span class="caret"></span></a>
								<ul class="dropdown-menu" role="menu">
									@foreach ($versions as $version)
										<li><a href="/{{ $currentManual }}/{{ $version }}">{{ $version }}</a> </li>
									@endforeach
								</ul>
							</li>
						@else
							<li><p class="navbar-text">{{ $currentVersion }}</p></li>
						@endif
					</ul>
				</div>
			</div>
		</nav>

		@yield('content')

		<!-- Javascript -->
		<script src="/assets/js/jquery-2.1.1.min.js"></script>
		<script src="/assets/js/bootstrap.min.js"></script>
		<script src="/assets/js/codex.js"></script>
	</body>
</html>
