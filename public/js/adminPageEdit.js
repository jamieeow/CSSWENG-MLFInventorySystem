//Javascript codes for edit functions of /admin
var bundleItemSelectedEdit = [] // array of selected item ID for bundle

/*  highlights selected item in artistItemsSection modals */
function editSelectBundleItems(itemID, itemName, itemPrice) {
    if ($("#" + itemID + "-editSelectBundleItems").hasClass('bg-secondary')) { //remove item from bundle
        $("#" + itemID + "-editSelectBundleItems").removeClass('bg-secondary');
        const index = bundleItemSelectedEdit.indexOf(itemName)
        if (index > -1) { 
            bundleItemSelectedEdit.splice(index, 1)
        }
    }
    else { //add item to bundle
        $("#" + itemID + "-editSelectBundleItems").addClass('bg-secondary');
        bundleItemSelectedEdit.push(itemName)
    }
    $("#editSelectedItems").val(bundleItemSelectedEdit);
}

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

        $.get('/admin/getEvent', {eventID: selected, projection: "_id eventID eventName startDate endDate isCurrentEvent"}, function(result){
            //check and uncheck box according to isCurrentEvent
            if (result.isCurrentEvent) {
                $("#editSetCurrentEvent").prop("checked", true);
                $("#editCurrentEvent").val(1);
            }
            else {
                $("#editSetCurrentEvent").prop("checked", false);
                $("#editCurrentEvent").val(0);
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

        $.get('/admin/getItems', {artistID: selected, projection: "_id itemName"}, function(result){
            if (result) {
                for (var i=0; i < result.length; i++) {
                    $(".manageItemsList").append('<option value="' + result[i]._id + '">' + result[i].itemName + '</option>')
                }
            }
        })
    })

    // edit item details changes according to selected item
    $("#artistsListDropdownItem").change(function() {
        var selected = $(this).children("option:selected").val();

        $.get('/admin/getItemsProp', {itemID: selected, projection: "_id itemName stockQuantity itemPicture"}, function(result){
            if (result) {
                $("#editItemName").val(result.itemName);
                $("#editItemStockQuantity").val(result.stockQuantity);
                $("#editItemPhoto").attr('src', result.itemPicture);
            }
        })
    })
    
    //  edit bundle selector changes values according to selected artist
    $("#artistsListDropdownBundleEdit").change(function() {
        $("#artistsListDropdownBundle").html('<option class="defaultVal" value="" disabled selected>select bundle</option>')
        var selected = $(this).children("option:selected").val();

        $.get('/admin/getBundles', {artistID: selected, projection: "_id bundleName"}, function(result){
            console.log(result)
            if (result) {
                for (var i=0; i < result.length; i++) {
                    $("#artistsListDropdownBundle").append('<option value="' + result[i]._id + '">' + result[i].bundleName + '</option>')
                }
            }
        })
    })

    // edit bundle details changes according to selected bundle
    $("#artistsListDropdownBundle").change(function() {
        var selected = $(this).children("option:selected").val();
        console.log(selected);

        $.get('/admin/getBundlesProp', {bundleID: selected, projection: "_id bundleName bundleStock bundlePicture"}, function(result){
            if (result) {
                console.log(result);
                $("#editBundleName").val(result.bundleName);
                $("#editBundleStockQuantity").val(result.bundleStock);
                $("#editBundlePhoto").attr('src',result.bundlePicture);
            }
        })
    })

    var enteredFirst = true;

    $("a[id^='manage']").click(function () {
        if (enteredFirst == true) {
            $("#editArtistsOption").attr("class", "nav-link active");
            $("#editItemOption").attr("class", "nav-link active");
            $("#editBundleOption").attr("class", "nav-link active");
            $("#editEventsOption").attr("class", "nav-link active");
            enteredFirst = false;
        }
        else {
            if ($("a[id^='edit']a[id$='Option']").attr("class") != "nav-link active") {
                $("#editArtistsOption").attr("class", "nav-link");
            }
        }
    })

    

    /*$("div[id$='Window']").on('hidden.bs.modal', function () {
        $(".manageItemsList").html('<option class="defaultVal" value="" disabled selected>select item</option>')
    })*/
    

    $("#manageItemsWindow").on('hidden.bs.modal', function(){
        $(".manageItemsList").html('<option class="defaultVal" value="" disabled selected>select item</option>')
    })

    $("#manageBundlesWindow").on('hidden.bs.modal', function(){
        $("#artistsListDropdownBundle").html('<option class="defaultVal" value="" disabled selected>select bundle</option>')
    })

    //show items of bundle in edit bundle
    $("select[name='artistsListDropdownBundleEdit']").change(function() {
        $("#editSelectBundleItems").html('')
        var selected = $(this).children("option:selected").val();

        $.get('/admin/getItems', {artistID: selected, projection: "_id itemName itemPrice stockQuantity itemPicture"}, function(result){
            console.log(result)
            for (i = 0; i < result.length; i++) {

                if (result[i].stockQuantity > 0) {
                    $("#editSelectBundleItems").append('<div class="col mb-3" id="' + result[i]._id + '-editSelectBundleItems" style="padding: 5px">' +
                                                            '<div class="card">' +
                                                                '<img src="' + result[i].itemPicture + '" class="card-img-top" alt="...">' +
                                                                '<div class="card-body">' +
                                                                    '<h5 class="card-title">' + result[i].itemName + '</h5>' +
                                                                    '<p class="card-text">PHP ' + result[i].itemPrice + ' | ' + result[i].stockQuantity + ' left</p>' +
                                                                    '<a href="#" class="stretched-link" onclick="editSelectBundleItems(\'' + result[i]._id + '\', \'' + result[i].itemName + '\', \'' + result[i].itemPrice + '\', \'' + result[i].stockQuantity + '\', \'item\')" style="size: 0px;"></a>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div>')
                }
            }
        })
    })

});