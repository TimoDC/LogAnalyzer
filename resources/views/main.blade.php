@extends("master")

@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}" />
@yield('scripts')
@endsection

@section("main")
@yield('php')
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

    <div class="log">
    @isset($board)
        <form action="/addLogFile/{{ $board -> id }}" method="post" enctype="multipart/form-data">
            @csrf
            <input type="file" name="logFile">
            <label for="LogType">Log Type</label>
            <select name="LogType" id="LogType">
                @if($board -> apacheLogFile === NULL)
                <option value="Apache">Apache</option>
                @endif
                @if($board -> authLogFile === NULL)
                <option value="Auth">Auth</option>
                @endif
                @if($board -> mysqlLogFile === NULL)
                <option value="MySQL">MySQL</option>
                @endif
            </select>
            <button type="submit">Submit</button>
        </form>

    <section>
        <ul>
            <div>
                @isset($dashboard)
                @if($board -> apacheLogFile !== NULL)
                <li><a href="/dashboard/{{ $board -> id }}/apache">Apache Logs</a></li>
                @endif
                @if($board -> authLogFile !== NULL)
                <li><a href="/dashboard/{{ $board -> id }}/auth">Auth Logs</a></li>
                @endif
                @if($board -> mysqlLogFile !== NULL)
                <li><a href="/dashboard/{{ $board -> id }}/mysql">MySQL Logs</a></li>
                @endif
                @endisset
            </div>
        </ul>
    </section>
    @endisset()

    @yield('log')
    @yield('content')
    </div>
</main>
@endsection