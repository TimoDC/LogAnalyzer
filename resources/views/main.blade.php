@extends("master")

@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}"/>
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/aside.css') }}"/>
@endsection

@section("main")
<section>
    <ul>
        <div>
            <li>Apache Logs</li>
            <li>SSH Logs</li>
            <li>ModSec Logs</li>
        </div>

        <div>
            <li>MySQL Logs</li>
            <li>Auth Logs</li>
            <li>Overview All Logs</li>
        </div>
    </ul>
</section>
<aside>
    <h3>Dashboards: </h3>
    <div id="dashboardButtons">
        <a href=#><h4>Dashboard 1</h4></a>
    
        <a href=#><h4>Dashboard 2</h4></a>
    
        <a href=#><h4>Dashboard 3</h4></a>
    </div>

    <a href=# id="logoutButton">Logout</a>
    <a href=# id="settingsButton">Settings</a>
</aside>

@endsection