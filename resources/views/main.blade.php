@extends("master")

@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}"/>
@endsection

@section("main")
<section>
    <ul>
        <li>Apache Logs</li>
        <li>SSH Logs</li>
        <li>ModSec Logs</li>
        <li>MySQL Logs</li>
        <li>Auth Logs</li>
        <li>Overview All Logs</li>
    </ul>
</section>
@endsection