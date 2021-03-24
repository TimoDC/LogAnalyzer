<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('assets/css/apacheLog.css') }}">
</head>

<body>

    @isset ($content)

    <p>{!! $content !!}</p>

    @endisset

    <div class="logContainer">
        <div class="logInfo">
            <p></p>
        </div>
        <div class="logChart hidden">
            <div>
                <p>IP Address</p>
                <canvas id="ipChart"></canvas>
            </div>
            <div>
                <p>identity Client</p>
                <canvas id="identityClientChart"></canvas>
            </div>
            <div>
                <p>User ID</p>
                <canvas id="useridChart"></canvas>
            </div>
            <div>
                <p>Time</p>
                <canvas id="timeChart"></canvas>
            </div>
            <div>
                <p>Verbs</p>
                <canvas id="verbsChart"></canvas>
            </div>
            <div>
                <p>Requested Files</p>
                <canvas id="requestedFileChart"></canvas>
            </div>
            <div>
                <p>Http Code</p>
                <canvas id="httpCodeChart"></canvas>
            </div>
            <div>
                <p>Response Code</p>
                <canvas id="responseCodeChart"></canvas>
            </div>
            <div>
                <p>Size Requested Page</p>
                <canvas id="requestSizeChart"></canvas>
            </div>
            <div>
                <p>Requested URL</p>
                <canvas id="requestedUrlChart"></canvas>
            </div>
            <div>
                <p>User Agents</p>
                <canvas id="userAgentChart"></canvas>
            </div>
        </div>

    </div>



    <script src="{{ asset('assets/js/apacheLog.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
</body>

</html>