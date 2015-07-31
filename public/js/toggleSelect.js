$(document).ready(function() {

  $('#service').on('change', function() {
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
    alert('clicked!')
  })

});
