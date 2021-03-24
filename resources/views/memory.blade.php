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

    $DiskTotal = shell_exec("df / | tail +2 | awk '{print $2/1000000}' OFMT='%.2f'");
    $DiskUsed = shell_exec("df / | tail +2 | awk '{print $3/1000000}' OFMT='%.2f'");
    $DiskFree = shell_exec("df / | tail +2 | awk '{print $4/1000000}' OFMT='%.2f'");
    $DiskName = shell_exec("df / | tail +2 | awk '{print $1}'");

    $AmountProcesses = shell_exec("ps -e | wc -l");

    $usr = shell_exec("mpstat |grep all | awk '{print $3}'");
    $sys = shell_exec("mpstat |grep all | awk '{print $5}'");
    $iowait = shell_exec("mpstat |grep all | awk '{print $6}'");
    $idle = shell_exec("mpstat |grep all | awk '{print $12}'");

    $hostname = shell_exec("uname -n");
    $kernelRelease = shell_exec("uname -r");
    $cpuModel = shell_exec("cat /proc/cpuinfo | grep name | awk '{print $4,$5,$6}'");
    $cpuSpeed = shell_exec("cat /proc/cpuinfo | grep name | awk '{print $7,$8,$9'}");
    ?>

<body>

<button class="btn" onclick="history.back()">Home</button>

<div id="CanvasContainer">
    <div>
        <canvas id="memoryCanvas"></canvas>
    </div>

    <div>
        <canvas id="swapCanvas"></canvas>
    </div>

    <div>
        <canvas id="cpuCanvas"></canvas>
    </div>

    <div>
        <canvas id="diskCanvas"></canvas>
    </div>
</div>

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

    <table>
        <tr>
            <th></th>
            <th scope="col">total</th>
            <th scope="col">used</th>
            <th scope="col">free</th>
        </tr>
        <tr>
            <th scope="row"><?php echo $DiskName ?></th>
            <td class="DiskTotal"><?php echo $DiskTotal ?>GB</td>
            <td id="DiskUsed"><?php echo $DiskUsed ?>GB</td>
            <td id="DiskFree"><?php echo $DiskFree ?>GB</td>
        </tr>
    </table>

    <table>
        <tr>
            <th scope="row">Hostname</th>
            <td id="user"><?php echo $hostname ?></td>
        </tr>
        <tr>
            <th scope="row">Kernel Release</th>
            <td id="system"><?php echo $kernelRelease ?></td>
        </tr>
        <tr>
            <th scope="row">CPU Model</th>
            <td id="iowait"><?php echo $cpuModel ?></td>
        </tr>
        <tr>
            <th scope="row">CPU Speed</th>
            <td id="idle"><?php echo $cpuSpeed ?></td>
        </tr>
    </table>
</div>

<script src="{{ asset('assets/js/memory.js') }}"></script>
</body>
</html>