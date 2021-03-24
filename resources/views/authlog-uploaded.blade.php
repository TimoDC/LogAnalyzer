@extends("master")

@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/authlogs.css') }}"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"></script>
@endsection

@section("main")
<section id="authlogcharts">
    <h1>Auth Logs</h1>
    <input type="hidden" id="authlog" name="authlog" value="{{ asset($authlog) }}">

    <div id="entries">
        <h2><span></span> entries</h2>

        <table>
            <thead>
                <tr>
                    <th><div>Timestamp</div></th>
                    <th><div>Hostname</div></th>
                    <th><div>App-Name</div></th>
                    <th><div>Message</div></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>

    <div class="totals">
        <div id="totalerrors">
            </div>

        <div id="totalunsuccessfulattempts">
        </div>
    </div>

    <div class="charts">
        <div id="appnamechart">
            <canvas id="appname" width="400" height="400"></canvas>
        </div>

        <div id="unsuccessfulattemptschart">
            <canvas id="unsuccessfulattempts" width="400" height="400"></canvas>
        </div>
    </div>

    <div class="charts">
        <div id="activitychart">
            <canvas id="activity" width="400" height="400"></canvas>
        </div>

        <div id="unsuccessfulusernameschart">
            <canvas id="unsuccessfulusernames" width="400" height="400"></canvas>
        </div>
    </div>

    <div class="charts">
        <div id="commandschart">
            <canvas id="commands" width="400" height="400"></canvas>
        </div>
    </div>
</section>
@endsection

@section("script")
<script src="{{ asset('assets/js/palette.js') }}"></script>
<script src="{{ asset('assets/js/authlog.js') }}"></script>
@endsection