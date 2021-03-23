<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Usage</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/reset.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/screen.css') }}"/>
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
    ?>

<body>
<a href="../"> Home </a>

<div>
    
<table>
    <tr>
        <th></th>
        <th scope="col">total</th>
        <th scope="col">used</th>
        <th scope="col">free</th>
    </tr>
    <tr>
        <th scope="row">Mem</th>
        <td id="MemTotal"><?php echo $MemTotal ?></td>
        <td id="MemUsed"><?php echo $MemUsed ?></td>
        <td id="MemFree"><?php echo $MemFree ?></td>
    </tr>
    <tr>
        <th scope="row">Swap</th>
        <td id="SwapTotal"><?php echo $SwapTotal ?></td>
        <td id="SwapUsed"><?php echo $SwapUsed ?></td>
        <td id="SwapFree"><?php echo $SwapFree ?></td>
    </tr>
</table>
</div>

<canvas id="memoryCanvas" height="50rem"></canvas>
<canvas id="swapCanvas" height="50rem"></canvas>

<script src="{{ asset('assets/js/memory.js') }}"></script>
</body>
</html>