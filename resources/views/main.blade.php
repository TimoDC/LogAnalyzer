@extends("master")

@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}"/>
@endsection

@section("main")
<section>
    <ul>
        <div>
            <li>Apache Logs</li>
            <li>SSH Logs</li>
            <li>ModSec Logs</li>
        </div>

        <div>
            <li>MySQL Logs</li>
            <li><a href="{{ route('authlogs') }}">Auth Logs</a></li>
            <li>Overview All Logs</li>
        </div>
    </ul>
</section>

@endsection