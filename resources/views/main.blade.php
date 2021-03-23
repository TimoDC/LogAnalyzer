@extends("master")

@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}" />
@endsection

@section("main")

<main>
    <aside>
        <a id="newDashboardButton">New Dashboard</a>

        <div id="dashboardButtons">
            @foreach ($dashboards as $dashboard)
                <a href="/dashboard/{{ $dashboard -> id }}">{{ $dashboard -> name }}</a>
            @endforeach
        </div>

        <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
            Logout
        </a>

        <a href="{{ route('memory') }}">
            Memory Usage
        </a>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>


        <a href="#" id="settingsButton">Settings</a>
    </aside>

    <section>
        <ul>
            <div>
            @if($dashboard -> apacheLogFile === "null"){
                <li>Apache Logs</li>
            @endif
            @if($dashboard -> authLogFile === "null"){
                <li>Auth Logs</li>
            @endif
            @if($dashboard -> mysqlLogFile  === "null"){
                <li>MySQL Logs</li>
            @endif
            </div>
        </ul>
    </section>


</main>




@endsection