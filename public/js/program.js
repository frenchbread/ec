$(document).ready(function() {

    var labelDay        = "day";
    var labelService    = "service";

    var programIds    = [];
    var programs      = $('#programs');
    var programId     = $('#programs>.programForm').size();

    var serviceIds = [];
    var services   = $('#services');
    var serviceId  = $('#services>.serviceForm').size();

    programIds.push(programId);
    serviceIds.push(serviceId);

    var timeFormat = {
        format : "dd-mm-yyyy"
    };

    var cars    = $('#cars').html();
    var cities  = $('#cities').html();

    addProgram = function () {

        programId++;

        var city;
        city  = labelDay + "_city_" + programId;

        var col1 = [
            '<div class="form-group">' +
                '<label>Город</label>' +
                '<br/>' +
                '<select id="'+ city +'" class="form-control">' +
                    cities +
                '</select>' +
            '</div>'
        ].join();

        var form = [
            '<div class="row programForm" id="programForm_'+programId+'">' +
                '<hr />' +
                '<div class="col-md-2">' +
                    col1 +
                '</div>' +
                '<div class="col-md-10">' +
                    '<div id="services"></div>' +
                    '<hr/>' +
                    '<a id="addRoom" onclick="addService('+programId+')" class="btn btn-xs btn-primary">+ Добавить сервис</a>' +
                '</div>' +
                '<div class="col-lg-12">' +
                    '<hr/>' +
                    '<a class="btn btn-xs btn-danger" onclick="removeProgram('+programId+')">x Убрать день</a>' +
                '</div>' +
            '</div>'
        ].join();



        $(form).appendTo(programs);
        programIds.push(programId);

        console.log("added " + programId);

        return false;
    };

    removeProgram = function (programIdd) {

        $('#programForm_'+programIdd).remove();

        var index   = programIds.indexOf(programIdd);
        var inList  = index > -1;
        if (inList) programIds.splice(index, 1);

        return false;
    };



    addService = function (progId) {

        var serviceType;

        serviceId++;

        serviceType   = labelService + "_serviceType_" + progId + "_" +serviceId;

        var form = [
            '<div class="serviceForm" id="serviceForm_'+serviceId+'">' +
                '<div class="form-group">' +
                    '<label>Тип сервиса</label>' +
                    '<br/>' +
                    '<select id="'+ serviceType +'" class="serviceTypee form-control" onchange="switchServiceType('+progId+','+serviceId+')">' +
                        '<option>-</option>' +
                        '<option value="transfer">Трансфер</option>' +
                        '<option value="withDriver">Аренда с водителем</option>' +
                        '<option value="excursion">Экскурсия</option>' +
                        '<option value="food">Питание</option>' +
                    '</select>' +
                '</div>' +
                '<span id="dynamicPlace_'+ serviceId +'"></span>' +
                '<div class="form-group" style="padding:2px;padding-top:30px;">' +
                    '<a href="#" class="btn btn-xs btn-danger" onclick="removeService('+progId+', '+serviceId+')">x</a>' +
                '</div>' +
            '</div>'
        ].join();

        //$('#hiddenServiceForm .serviceForm').attr('id', "serviceForm_"+serviceId);
        //$('#hiddenServiceForm .serviceTypee').attr('id', serviceType).attr('oncnahge', "switchServiceType("+progId+","+serviceId+")");
        //$('#hiddenServiceForm span').attr('id', "dynamicPlace_"+ serviceId);
        //$('#hiddenServiceForm a').attr('onclick', "removeService("+progId+", "+serviceId+")");


        //var form = $('#hiddenServiceForm').html();

        $(form).appendTo($('#programForm_'+progId+' #services'));

        serviceIds.push(serviceId);

        console.log("added " + progId + " and " + serviceId);


        return false;
    };

    removeService  = function (progId, serviceIdd) {

        $('#'+labelService+'_serviceType_'+progId+'_'+serviceIdd).closest('.serviceForm').remove();
        var index   = serviceIds.indexOf(serviceIdd);
        var inList  = index > -1;
        if (inList) serviceIds.splice(index, 1);

        return false;
    };

    switchServiceType = function (progIdd, serviceIdd) {

        var serviceType   = labelService + "_serviceType_" + progIdd + "_" +serviceIdd;
        var value = $('#'+serviceType).val();

        var dynamicPlace = '#dynamicPlace_'+serviceIdd;

        switch (value) {

            case "transfer":

                $(dynamicPlace).html($('#hiddenTransfer').html());

                $(dynamicPlace+' .transferCarType').attr('id', 'transferCarType_'+progIdd+'_'+serviceIdd).html(cars);
                $(dynamicPlace+' .transferFrom').attr('id', 'transferFrom_'+progIdd+'_'+serviceIdd);
                $(dynamicPlace+' .transferTo').attr('id', 'transferTo_'+progIdd+'_'+serviceIdd);

                $('#transferFrom_'+progIdd+'_'+serviceIdd).datepicker(timeFormat);
                $('#transferTo_'+progIdd+'_'+serviceIdd).datepicker(timeFormat);

                break;

            case "withDriver":

                $(dynamicPlace).html($('#hiddenWithDriver').html());

                $(dynamicPlace+' .driverCarType').attr('id', 'driverCarType_'+progIdd+'_'+serviceIdd).html(cars);
                $(dynamicPlace+' .driverFrom').attr('id', 'driverFrom_'+progIdd+'_'+serviceIdd);
                $(dynamicPlace+' .driverTo').attr('id', 'driverTo_'+progIdd+'_'+serviceIdd);

                $('#driverFrom_'+progIdd+'_'+serviceIdd).datepicker(timeFormat);
                $('#driverTo_'+progIdd+'_'+serviceIdd).datepicker(timeFormat);
                break;

            case "excursion":

                $(dynamicPlace).html($('#hiddenExcursion').html());

                $(dynamicPlace+' .goingPlace').attr('id', 'goingPlace_'+progIdd+'_'+serviceIdd);
                $(dynamicPlace+' .pplAmount').attr('id', 'pplAmount_'+progIdd+'_'+serviceIdd);

                break;

            case "food":

                $(dynamicPlace).html($('#hiddenFood').html());

                $(dynamicPlace+' .restaurant').attr('id', 'restaurant_'+progIdd+'_'+serviceIdd);
                $(dynamicPlace+' .menuTitle').attr('id', 'menuTitle_'+progIdd+'_'+serviceIdd);

                break;
        }

    }



});
