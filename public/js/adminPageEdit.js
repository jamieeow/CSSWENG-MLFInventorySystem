//Javascript codes for edit functions of /admin
$(document).ready(function () {

    //edit artist change values according to selector
    $("select[name='artistsListDropdownEdit']").change(function() {
        $("#selectBundleItems").html('')
        var selected = $(this).children("option:selected").val();
        $.get('/admin/getArtist', {artistID: selected, projection: "_id artistID artistName"}, function(result){
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

        $.get('/admin/getEvent', {eventID: selected, projection: "_id eventID eventName startDate endDate isCurrentEvent"}, function(result){
            //check and uncheck box according to isCurrentEvent
            if (result.isCurrentEvent) {
                $("#editSetCurrentEvent").prop("checked", true);
            }
            else {
                $("#editSetCurrentEvent").prop("checked", false);
            }
            
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
    
    //  edit item selector changes values according to selected artist
    $(".manageItemsArtist").change(function() {
        $(".manageItemsList").html('<option class="defaultVal" value="" disabled selected>select item</option>')
        var selected = $(this).children("option:selected").val();
        console.log(selected);

        $.get('/admin/getItems', {artistID: selected, projection: "_id itemName"}, function(result){
            if (result) {
                for (var i=0; i < result.length; i++) {
                    $(".manageItemsList").append('<option value="' + result[i]._id + '">' + result[i].itemName + '</option>')
                }
            }
        })
    })
    
    //  edit bundle selector changes values according to selected artist
    $("#artistsListDropdownBundleEdit").change(function() {
        $("#artistsListDropdownBundle").html('<option class="defaultVal" value="" disabled selected>select bundle</option>')
        var selected = $(this).children("option:selected").val();
        console.log(selected);

        $.get('/admin/getBundles', {artistID: selected, projection: "_id bundleName"}, function(result){
            console.log(result)
            if (result) {
                for (var i=0; i < result.length; i++) {
                    $("#artistsListDropdownBundle").append('<option value="' + result[i]._id + '">' + result[i].bundleName + '</option>')
                }
            }
        })
    })

    $("#manageItemsWindow").on('hidden.bs.modal', function(){
        $(".manageItemsList").html('<option class="defaultVal" value="" disabled selected>select item</option>')
    })

    $("#manageBundlesWindow").on('hidden.bs.modal', function(){
        $("#artistsListDropdownBundle").html('<option class="defaultVal" value="" disabled selected>select bundle</option>')
    })

});