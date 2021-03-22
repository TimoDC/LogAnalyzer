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
    <a href="#" id="newDashboardButton">New Dashboard</a>

    <div id="dashboardButtons">
        <a href="#">Dashboard 1</a>
    
        <a href="#">Dashboard 2</a>
    
        <a href="#">Dashboard 3</a>
    </div>

    <a href="#" id="logoutButton">Logout</a>
    <a href="#" id="settingsButton">Settings</a>
</aside>

@endsection