@extends("main")

@section("log")
@isset ($content)

{!! $content !!}

@endisset

<link rel="stylesheet" href="{{ asset('assets/css/apacheLog.css') }}">
<div class="logContainer">
    <div class="logItems">
        <div class="ip">
            <input type="checkbox" id="ip" name="ip" value="ip" checked>
            <label for="ip">IP</label>
        </div>

        <div class="identityClient">
            <input type="checkbox" id="identityClient" name="identityClient" value="identityClient">
            <label for="identityClient">Client Identity</label>
        </div>
        <div class="userid">
            <input type="checkbox" id="userid" name="userid" value="userid">
            <label for="userid">User ID</label>
        </div>
        <div class="time">
            <input type="checkbox" id="time" name="time" value="time">
            <label for="time">Time</label>
        </div>
        <div class="verbs">
            <input type="checkbox" id="verbs" name="verbs" value="verbs" checked>
            <label for="verbs">HTTP Verbs</label>
        </div>
        <div class="requestedFile">
            <input type="checkbox" id="requestedFile" name="requestedFile" value="requestedFile" checked>
            <label for="requestedFile">Requested File</label>
        </div>
        <div class="httpCode">
            <input type="checkbox" id="httpCode" name="httpCode" value="httpCode">
            <label for="httpCode">HTTP Code</label>
        </div>
        <div class="responseCode">
            <input type="checkbox" id="responseCode" name="responseCode" value="responseCode" checked>
            <label for="responseCode">Response Code</label>
        </div>
        <div class="requestSize">
            <input type="checkbox" id="requestSize" name="requestSize" value="requestSize" checked>
            <label for="requestSize">Request Size</label>
        </div>
        <div class="requestedUrl">
            <input type="checkbox" id="requestedUrl" name="requestedUrl" value="requestedUrl" checked>
            <label for="requestedUrl">Requested Url</label>
        </div>
        <div class="OS">
            <input type="checkbox" id="OS" name="OS" value="OS" checked>
            <label for="OS">Operating System</label>
        </div>
        <div class="browser">
            <input type="checkbox" id="browser" name="browser" value="browser" checked>
            <label for="browser">Browser</label>
        </div>
        <div class="parameter">
            <input type="checkbox" id="parameter" name="parameter" value="parameter" checked>
            <label for="parameter">Parameter</label>
        </div>
        <div class="parameterKey">
            <input type="checkbox" id="parameterKey" name="parameterKey" value="parameterKey" checked>
            <label for="parameterKey">Parameter Keys</label>
        </div>
        <div class="parameterValue">
            <input type="checkbox" id="parameterValue" name="parameterValue" value="parameterValue" checked>
            <label for="parameterValue">Parameter Values</label>
        </div>
    </div>

    <div class="logInfo">
        <div>
            <p>Amount Of Logs:</p>
            <p class="logAmount"></p>
        </div>
        <div>
            <p>Most Common Visitor:</p>
            <p class="visitorIp"></p>
        </div>
        <div>
            <p>Most Used Operating System:</p>
            <p class="mostUsedOS"></p>
        </div>
        <div>
            <p>Most used Browser:</p>
            <p class="mostUsedBrowser"></p>
        </div>
        <div>
            <p>Most Requested URL:</p>
            <p class="mostRequestUrl"></p>
        </div>
        <div>
            <p>Amount Of Unique Visitors:</p>
            <p class="uniqueVisitors"></p>
        </div>
        <div>
            <p>Amount Of Client Side Errors:</p>
            <p class="clientSideErrors"></p>
        </div>
        <div>
            <p>Amount Of Server Side Errors:</p>
            <p class="serverSideErrors"></p>
        </div>
    </div>
    <div class="logChart">
        <div class="hidden">
            <p>IP Address</p>
            <canvas id="ipChart"></canvas>
        </div>
        <div class="hidden">
            <p>identity Client</p>
            <canvas id="identityClientChart"></canvas>
        </div>
        <div class="hidden">
            <p>User ID</p>
            <canvas id="useridChart"></canvas>
        </div>
        <div class="hidden">
            <p>Time</p>
            <canvas id="timeChart"></canvas>
        </div>
        <div class="hidden">
            <p>Verbs</p>
            <canvas id="verbsChart"></canvas>
        </div>
        <div class="hidden">
            <p>Requested Files</p>
            <canvas id="requestedFileChart"></canvas>
        </div>
        <div class="hidden">
            <p>Http Code</p>
            <canvas id="httpCodeChart"></canvas>
        </div>
        <div class="hidden">
            <p>Response Code</p>
            <canvas id="responseCodeChart"></canvas>
        </div>
        <div class="hidden">
            <p>Size Requested Page</p>
            <canvas id="requestSizeChart"></canvas>
        </div>
        <div class="hidden">
            <p>Requested URL</p>
            <canvas id="requestedUrlChart"></canvas>
        </div>
        <div class="hidden">
            <p>Operating System</p>
            <canvas id="OSChart"></canvas>
        </div>
        <div class="hidden">
            <p>Browser</p>
            <canvas id="browserChart"></canvas>
        </div>
        <div class="hidden">
            <p>Parameter Keys</p>
            <canvas id="parameterChart"></canvas>
        </div>
        <div class="hidden">
            <p>Parameter Keys</p>
            <canvas id="parameterKeyChart"></canvas>
        </div>
        <div class="hidden">
            <p>Parameter Values</p>
            <canvas id="parameterValueChart"></canvas>
        </div>


    </div>
    <script src="{{ asset('assets/js/apacheLog.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

    @endsection