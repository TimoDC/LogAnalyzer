@extends("master")

@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/authlogs.css') }}"/>
@endsection

@section("main")
<section id="authlogcharts">
    <h1>Auth Logs</h1>
    <input type="hidden" id="authlog" name="authlog" value="{{ asset($authlog) }}">

    <div id="entries">
        <h2><span></span> entries found</h2>

        <table>
            <thead>
                <tr>
                    <th><div>Timestamp</div></th>
                    <th><div>Hostname</div></th>
                    <th><div>App-Name</div></th>
                    <th><div>Message</div></th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</section>
@endsection

@section("script")
<script src="{{ asset('assets/js/authlog.js') }}"></script>
@endsection