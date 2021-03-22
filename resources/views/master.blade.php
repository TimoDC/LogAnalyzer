<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogAnalyzer</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/reset.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/screen.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/aside.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/footer.css') }}"/>
    @yield("css")
</head>
<body>
    <header>
        <h1>LogAnalyzer</h1>
    </header>

    <main>
        <aside>
            <a  id="newDashboardButton">New Dashboard</a>

            <div id="dashboardButtons">
                <a href="#">Dashboard 1</a>
            
                <a href="#">Dashboard 2</a>
            
                <a href="#">Dashboard 3</a>
            </div>

            <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                Logout
            </a>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>


            <a href="#" id="settingsButton">Settings</a>
        </aside>
        @yield('main')
    </main>




    <section class="new-dashboard-popup hidden">
        <h2>Make a new dashboard</h2>
        <form action="/">
            <input type="text" id="name" name="name" placeholder="Name">
            <input type="text" id="discription" name="discription" placeholder="Description">
            <input type="submit" value="Make">
        </form> 
    </section>

    <footer>&copy; 2021 - LogAnalyzer</footer>
    <script src="{{ asset('assets/js/main.js') }}"></script>
</body>
</html>