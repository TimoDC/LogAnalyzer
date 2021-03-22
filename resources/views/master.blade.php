<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogAnalyzer</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/reset.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/screen.css') }}"/>
    @yield("css")
</head>
<body>
    <header>
        <h1>LogAnalyzer</h1>
    </header>

    <main>
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
        @yield('main')
    </main>
</body>
</html>