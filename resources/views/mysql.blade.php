@extends("master")


@section("css")
<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}"/>
@endsection

@section("main")

<form action="{{ asset('/mysql') }}" method="post" enctype="multipart/form-data">
    @csrf
    <input type="file" name="file">
    <input type="text" name="filename" id="filename">
    <button type="submit">Submit</button>
</form>

@isset ($content)

<p>{{ $content }}</p>

@endisset

@endsection