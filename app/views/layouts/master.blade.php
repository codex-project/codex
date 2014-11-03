<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Codex - {{ $currentManual }} v{{ $currentVersion }}</title>

		<!-- CSS -->
		<link rel="stylesheet" href="/assets/css/bootswatch/flatly.min.css">
		<link rel="stylesheet" href="/assets/css/prettify/freshcut.css">
		<link rel="stylesheet" href="/assets/css/codex.css">
	</head>
	<body>
		@include('partials.analytics_tracking')
		@include('partials.navbar')

		@yield('content')

		<!-- Javascript -->
		<script src="/assets/js/jquery-2.1.1.min.js"></script>
		<script src="/assets/js/bootstrap.min.js"></script>
		<script src="/assets/js/prettify/run_prettify.js"></script>
		<script src="/assets/js/codex.js"></script>
	</body>
</html>
