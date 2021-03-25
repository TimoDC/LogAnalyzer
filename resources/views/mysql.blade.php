@extends("master")


@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}"/>
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/mysql.css') }}"/>
@endsection

@section("main")

@isset ($content)

<p id="logContent">{!! $content !!}</p>

<div id="content">
    <div id="tables">
        <table id="connectionTable">
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

        <table id="prepareTable">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Query</th>
                </tr>
            </thead>
            <tbody id="logTable">

            </tbody>
        </table>
    </div>
    <div id="charts">
        <div class="canvas">
            <canvas id="databaseChart"></canvas>
        </div>
        <div class="canvas">
            <canvas id="userChart"></canvas>
        </div>
        <div class="canvas">
            <canvas id="loginChart"></canvas>
        </div>
        <div class="canvas">
            <canvas id="queryChart"></canvas>
        </div>
    </div>
</div>
@endisset

@endsection

@section("script")
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
    <script src="{{ asset('assets/js/sqlLogs.js') }}"></script>
@endsection