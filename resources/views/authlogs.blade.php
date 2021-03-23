@extends("master")

@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/authlogs.css') }}"/>
@endsection

@section("main")
<section>
    <h1>Auth Logs</h1>

    <form method="post" action="{{ route('upload-authlog') }}">
        @csrf

        <label for="authlog">Upload Auth Log</label>
        <input type="file" name="authlog" id="authlog" accept=".log" required>

        <input type="submit" name="upload" value="Upload">
    </form>
</section>
@endsection