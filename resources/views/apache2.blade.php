@extends("main")

@section("apache2")

<link rel="stylesheet" href="{{ asset('assets/css/apacheLog.css') }}">
<div class="logContainer">
    <div class="logItems">
        <div class="ip">
            <input type="checkbox" id="ip" name="ip" value="ip" checked>
            <label for="ip">IP</label>
        </div>
        <div class="XSS">
            <input type="checkbox" id="XSS" name="XSS" value="XSS" checked>
            <label for="XSS">XSS</label>
        </div>
        <div class="SQLI">
            <input type="checkbox" id="SQLI" name="SQLI" value="SQLI" checked>
            <label for="SQLI">SQL Injection</label>
        </div>
        <div class="PHPI">
            <input type="checkbox" id="PHPI" name="PHPI" value="PHPI" checked>
            <label for="PHPI">PHP Injection</label>
        </div>
    </div>

    <div class="logInfo">
        <div>
            <p>Amount Of Logs:</p>
            <p class="logAmount"></p>
        </div>
        <div>
            <p>Hacking Attempts:</p>
            <p class="hackingAttempts"></p>
        </div>
        <div>
            <p>Visitor With Most Hacking Attempts:</p>
            <p class="hackerIp"></p>
        </div>
        <div>
            <p>XSS Attempts:</p>
            <p class="XSSAttempts"></p>
        </div>
        <div>
            <p>Most Common XSS payload:</p>
            <p class="XSSPayload"></p>
        </div>
        <div>
            <p>SQL Injection Attempts:</p>
            <p class="SQLIAttempts"></p>
        </div>
        <div>
            <p>Most Common SQL Injection Payload:</p>
            <p class="SQLIPayload"></p>
        </div>
        <div>
            <p>PHP Injection Attempts:</p>
            <p class="PHPIAttempts"></p>
        </div>
    </div>
    <div class="logChart">
        <div class="hidden">
            <p>IP Address</p>
            <canvas id="ipChart"></canvas>
        </div>
        <div class="hidden">
            <p>XSS Payloads</p>
            <canvas id="XSSChart"></canvas>
        </div>
        <div class="hidden">
            <p>SQL Injection</p>
            <canvas id="SQLIChart"></canvas>
        </div>
        <div class="hidden">
            <p>PHP Injection</p>
            <canvas id="PHPIChart"></canvas>
        </div>
    </div>
    <script src="{{ asset('assets/js/apacheLog2.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

    @isset ($content)

    <div class="content hidden">{{ $content }}</div>

    @endisset

    @endsection