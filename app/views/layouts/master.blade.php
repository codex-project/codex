<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="shortcut icon" href="{{ asset('/favicon.ico') }}" type="image/x-icon">
		<link rel="icon" href="{{ asset('/favicon.ico') }}" type="image/x-icon">

		@if (isset($currentManual))
			<title>{{ $siteName }} - {{ $currentManual }} {{ $currentVersion }}</title>
		@else
			<title>{{ $siteName }}</title>
		@endif

		<!-- CSS -->
		<link rel="stylesheet" href="{{ asset('/assets/css/bootswatch/flatly.min.css') }}">
		<link rel="stylesheet" href="{{ asset('/assets/css/prettify/freshcut.css') }}">
		<link rel="stylesheet" href="{{ asset('/assets/css/codex.css') }}">
	</head>
	<body>
		@include('partials.analytics_tracking')
		@include('partials.navbar')

		@yield('content')

		<!-- Javascript -->
		<script src="{{ asset('/assets/js/jquery-2.1.1.min.js') }}"></script>
		<script src="{{ asset('/assets/js/bootstrap.min.js') }}"></script>
		<script src="{{ asset('/assets/js/prettify/run_prettify.js') }}"></script>
		<script src="{{ asset('/assets/js/codex.js') }}"></script>
	</body>
</html>
