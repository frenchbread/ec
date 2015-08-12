$(document).ready(function () {
    $('.serviceTypee').on('change', function() {

        alert("Hello")
        switch (this.value) {
            case "transfer":
                $('#dynamicPlace').html($('#hiddenTransfer').html());
                break;
            case "withDriver":
                $('#dynamicPlace').html($('#hiddenWithDriver').html());
                break;
            case "excursion":
                $('#dynamicPlace').html($('#hiddenExcursion').html());
                break;
            case "food":
                $('#dynamicPlace').html($('#hiddenFood').html());
                break;
        }
    });

    $('#addService').on('click', function() {
        alert('В разработке.. Добавление сервиса будет похоже на добавоение типа комнаты!')
    });

    $('#addDay').on('click', function () {
        alert('В разработке.. Добавление дня будет похоже на добавление варианта проживания!')
    });
})