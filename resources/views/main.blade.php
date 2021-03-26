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
    </aside>

    <div class="log">
        @isset($board)
        <form action="/addLogFile/{{ $board -> id }}" method="post" enctype="multipart/form-data">
            @csrf
            <div>
                <input type="file" name="logFile">
                <div>
                    <input type="checkbox" name="OSFile" id="OSFile">
                    <label for="OSFile">Use System Logs</label>
                </div>
            </div>
            <div>
                <div>
                    <label for="LogType">Log Type: </label>
                    <select name="LogType" id="LogType">
                        <option value="Apache">Apache Access</option>
                        <option value="Apache2">Apache Error</option>
                        <option value="Auth">Auth</option>
                        <option value="MySQL">MySQL</option>
                    </select>
                </div>
            </div>
            <button type="submit">Submit</button>
            <form action="/delete/{{ $dashboard -> id }}" method="post">
                <button type="submit">Delete Dashboard</button>
            </form>
        </form>

        <section>
            <ul>
                <div>
                    @isset($dashboard)
                    @if($board -> apacheLogFile !== NULL)
                    <li><a href="/dashboard/{{ $board -> id }}/apache">Apache Access Logs</a></li>
                    @endif
                    @if($board -> apacheErrorLogFile !== NULL)
                    <li><a href="/dashboard/{{ $board -> id }}/apache2">Apache Error Logs</a></li>
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
        @yield('apache2')
        @yield('content')
    </div>
</main>
@endsection