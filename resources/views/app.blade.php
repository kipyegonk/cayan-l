<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover">
<title>Cayan Events Ke.</title>
<link rel="stylesheet" href="{{ asset('css/app.css') }}?v={{ filemtime(public_path('css/app.css')) }}">
</head>
<body>
<div id="app"></div>
<script src="{{ asset('js/config.js') }}"></script>
<script src="{{ asset('js/offline.js') }}"></script>
<script src="{{ asset('js/api.js') }}"></script>
<script src="{{ asset('js/quote-preview.js') }}"></script>
<script src="{{ asset('js/app-core.js') }}"></script>
<script src="{{ asset('js/views/dashboard.js') }}"></script>
<script src="{{ asset('js/views/quotes.js') }}"></script>
<script src="{{ asset('js/views/catalog.js') }}"></script>
<script src="{{ asset('js/views/clients.js') }}"></script>
<script src="{{ asset('js/views/users.js') }}"></script>
<script src="{{ asset('js/views/settings.js') }}"></script>
<script src="{{ asset('js/events/events.js') }}"></script>
<script src="{{ asset('js/boot.js') }}"></script>
</body>
</html>
