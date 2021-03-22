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
    <style>
        .hidden {
            visibility: hidden;
            width: 0;
            height: 0;
        }
        .new-dashboard{
            cursor: pointer;
        }
    </style>

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

    <section class="new-dashboard-popup hidden">
        <h2>Make a new dashboard</h2>
        <form action="/">
            <label for="name">Name</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="discription">Discription</label><br>
            <input type="text" id="discription" name="discription"><br><br>
            <input type="submit" value="Make">
        </form> 
    </section>

    <script src="{{ asset('assets/js/main.js') }}"></script>
</body>
</html>