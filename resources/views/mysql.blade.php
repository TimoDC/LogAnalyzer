@extends("main")


@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}"/>
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/mysql.css') }}"/>
@endsection


@section("log")

@isset ($content)

<div class="content hidden">{{ $content }}</div>

@endisset

<div id="content">
    <div id="tables">
        <div class="table">
            <table id="connectionTable">
                <thead>
                    <tr>
                        <th><div>Id</div></th>
                        <th><div>Date</div></th>
                        <th><div>Time</div></th>
                        <th><div>Login</div></th>
                        <th><div>User</div></th>
                        <th><div>Database</div></th>
                    </tr>
                </thead>
                <tbody id="logTable">

                </tbody>
            </table>
        </div>
        <div class="table">
            <table id="prepareTable">
                <thead>
                    <tr>
                        <th><div>Id</div></th>
                        <th><div>Query</div></th>
                    </tr>
                </thead>
                <tbody id="logTable">

                </tbody>
            </table>
        </div>
    </div>
    <div class="charts">
        <div class="canvas">
            <canvas id="databaseChart" width="400" height="400"></canvas>
        </div>
        <div class="canvas">
            <canvas id="userChart" width="400" height="400"></canvas>
        </div>
    </div>
    <div class="charts">
        <div class="canvas">
            <canvas id="loginChart" width="400" height="400"></canvas>
        </div>
        <div class="canvas">
            <canvas id="queryChart" width="400" height="400"></canvas>
        </div>
    </div>
</div>

@endsection

@section("script")
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
    <script src="{{ asset('assets/js/sqlLogs.js') }}"></script>
@endsection