<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LogAnalyzer</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/reset.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/screen.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/aside.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/footer.css') }}" />
    @yield("css")
</head>

<body>
    <header>
        <h1>LogAnalyzer</h1>
    </header>

    @yield('main')

    <section class="new-dashboard-popup hidden">
        <div>
            <a href="#" class="close">X</a>
            <h2>Make a new dashboard</h2>
            <form action="/createDashBoard" method="post">
                @csrf
                <input type="text" id="name" name="name" placeholder="Name">
                <input type="text" id="discription" name="discription" placeholder="Description">
                <input type="submit" value="Make">
            </form>
        </div>
    </section>

    <footer>&copy; 2021 - LogAnalyzer</footer>
    <script src="{{ asset('assets/js/main.js') }}"></script>
    @yield('script')
</body>

</html>