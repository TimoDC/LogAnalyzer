@extends("master")

@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/authlogs.css') }}"/>
@endsection

@section("main")
<section id="authlogcharts">
    <h1>Auth Logs</h1>
    <input type="hidden" id="authlog" name="authlog" value="{{ asset($authlog) }}">
</section>
@endsection

@section("script")
<script src="{{ asset('assets/js/authlog.js') }}"></script>
@endsection