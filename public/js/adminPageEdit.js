//Javascript codes for edit functions of /admin
$(document).ready(function () {

    //edit artist change values according to selector
    $("select[name='artistsListDropdownEdit']").change(function() {
        $("#selectBundleItems").html('')
        var selected = $(this).children("option:selected").val();
        console.log(selected);

        $.get('/admin/getArtist', {artistID: selected, projection: "_id artistID artistName"}, function(result){
            console.log(result)
            if (result) {
                $("#editArtistName").val(result.artistName);
                $("#editArtistIDNo").val(result.artistID);
            }
        })
    })
    
    //edit event change values according to selector
    $("select[name='selectedEvent']").change(function() {
        var selected = $(this).children("option:selected").val();
        console.log(selected);

        $.get('/admin/getEvent', {eventID: selected, projection: "_id eventID eventName startDate endDate"}, function(result){
            console.log(result)
            d1 = new Date(result.startDate);
            d2 = new Date(result.endDate);

            startMonth = d1.getMonth();
            startMonth += 1;
            if (startMonth < 10) {
                startMonth = '0'+startMonth;
            }

            startDate = d1.getDate();
            if (startDate < 10) {
                startDate = '0'+startDate;
            }

            endMonth = d2.getMonth();
            endMonth += 1;
            if (endMonth < 10) {
                endMonth = '0'+endMonth;
            }

            endDate = d2.getDate();
            if (endDate < 10) {
                endDate = '0'+endDate;
            }
            startDateFormat = d1.getFullYear() + '-' + startMonth + '-' + startDate;
            endDateFormat = d2.getFullYear() + '-' + endMonth + '-' + endDate;
            if (result) {
                $("#editEventName").val(result.eventName);
                $("#editStartEventDate").val(startDateFormat);
                $("#editEndEventDate").val(endDateFormat);
            }
        })
    })

    /*$('a[id^="manage"]').click(function () {
        $("body, html").animate({
            scrollTop: $('.tab-content').offset().top
        }, 600);
    })*/
    

});