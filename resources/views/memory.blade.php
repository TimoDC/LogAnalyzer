<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Usage</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/reset.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/screen.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/memory.css') }}"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"
            integrity="sha512-d9xgZrVZpmmQlfonhQUvTR7lMPtO7NkZMkA0ABN3PHCbKA5nqylQ/yWlFAyY6hYgdF1Qh6nYiuADWwKB4C2WSw=="
            crossorigin="anonymous"></script>
</head>

<?php
    $MemTotal = shell_exec("free --mega |grep Mem| cut -c 10-22 | sed -e 's/^[ \t]*//'");
    $MemUsed = shell_exec("free  --mega |grep Mem| cut -c 20-32 | sed -e 's/^[ \t]*//'");
    $MemFree = shell_exec("free --mega |grep Mem| cut -c 35-45 | sed -e 's/^[ \t]*//'");
    $SwapTotal = shell_exec("free  --mega |grep Swap| cut -c 10-22| sed -e 's/^[ \t]*//'");
    $SwapUsed = shell_exec("free  --mega |grep Swap| cut -c 20-32| sed -e 's/^[ \t]*//'");
    $SwapFree = shell_exec("free --mega |grep Swap| cut -c 35-45 | sed -e 's/^[ \t]*//'");

    $AmountProcesses = shell_exec("ps -e | wc -l");

    $usr = shell_exec("mpstat |grep all | cut -c 20-25 | sed -e 's/^[ \t]*//'");
    $sys = shell_exec("mpstat |grep all | cut -c 34-40 | sed -e 's/^[ \t]*//'");
    $iowait = shell_exec("mpstat |grep all | cut -c 45-50 | sed -e 's/^[ \t]*//'");
    $idle = shell_exec("mpstat |grep all | cut -c 90-100 | sed -e 's/^[ \t]*//'");
    ?>

<body>
<a href="../"> Home </a>

<div id="tableContainer">
    
<table>
    <tr>
        <th></th>
        <th scope="col">total</th>
        <th scope="col">used</th>
        <th scope="col">free</th>
    </tr>
    <tr>
        <th scope="row">Mem</th>
        <td class="MemTotal"><?php echo $MemTotal ?>MB</td>
        <td id="MemUsed"><?php echo $MemUsed ?>MB</td>
        <td id="MemFree"><?php echo $MemFree ?>MB</td>
    </tr>
    <tr>
        <th scope="row">Swap</th>
        <td class="SwapTotal"><?php echo $SwapTotal ?>MB</td>
        <td id="SwapUsed"><?php echo $SwapUsed ?>MB</td>
        <td id="SwapFree"><?php echo $SwapFree ?>MB</td>
    </tr>
</table>

<table>
    <tr>
        <th scope="row">Amount of running processes</th>
        <td id="MemFree"><?php echo $AmountProcesses ?></td>
    </tr>
</table>

<table>
    <tr>
        <th scope="row">CPU (user)</th>
        <td id="user"><?php echo $usr ?>%</td>
    </tr>
    <tr>
        <th scope="row">CPU (system)</th>
        <td id="system"><?php echo $sys ?>%</td>
    </tr>
    <tr>
        <th scope="row">CPU (iowait)</th>
        <td id="iowait"><?php echo $iowait ?>%</td>
    </tr>
    <tr>
        <th scope="row">CPU (idle)</th>
        <td id="idle"><?php echo $idle ?>%</td>
    </tr>
</table>
</div>

<div id="CanvasContainer">
    <div>
        <div class="label">
            <h2>Memory Usage</h2>
            <h2 class="MemTotal">%</h2>
        </div>
        <canvas id="memoryCanvas"></canvas>
    </div>

    <div>
        <div class="label">
            <h2>Swap Usage</h2>
            <h2 class="SwapTotal">%</h2>
        </div>
        <canvas id="swapCanvas"></canvas>
    </div>

    <div>
        <div class="label">
            <h2>CPU Usage</h2>
            <h2 class="cpuTotal">%</h2>
        </div>
        <canvas id="cpuCanvas"></canvas></div>
</div>

<script src="{{ asset('assets/js/memory.js') }}"></script>
</body>
</html>