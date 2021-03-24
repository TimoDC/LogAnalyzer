@extends("master")


@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}"/>
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/mysql.css') }}"/>
@endsection

@section("main")

@isset ($content)

<p id="logContent">{!! $content !!}</p>
<table>
    <thead>
        <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Time</th>
            <th>Login</th>
            <th>User</th>
            <th>Database</th>
        </tr>
    </thead>
    <tbody id="logTable">

    </tbody>
</table>

<canvas id="polarChart" height="50rem"></canvas>

@endisset

@endsection

@section("scripts")
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
    <script src="{{ asset('assets/js/sqlLogs.js') }}"></script>
@endsection