//Javascript codes for add functions of /admin

var bundleItemSelected = [] // array of selected item ID for bundle

/*  highlights selected item in artistItemsSection modals */
function addSelectBundleItems(itemID, itemName, itemPrice) {
    if ($("#" + itemID + "-addSelectBundleItems").hasClass('bg-secondary')) { //remove item from bundle
        $("#" + itemID + "-addSelectBundleItems").removeClass('bg-secondary');
        const index = bundleItemSelected.indexOf(itemName)
        if (index > -1) { 
            bundleItemSelected.splice(index, 1)
        }
    }
    else { //add item to bundle
        $("#" + itemID + "-addSelectBundleItems").addClass('bg-secondary');
        bundleItemSelected.push(itemName)
    }
    $("#addSelectedItems").val(bundleItemSelected);
}

function addArtist(e) {
    var artistName = $("#newArtistName").val();
    var artistIDNumber = $("#newArtistIDNo").val();
    var artistPassword = $("#newArtistPassword").val();
    var exist = false;
    //check if artist ID exist
    if ($("#newArtistIDNo").val() != '' && $("#newArtistName").val() != '' && $("#newArtistPassword").val() != '') {
        $.get('/admin/getArtist', {artistID: artistIDNumber, projection: "_id artistID artistName"}, function(result){
            if (result) {
                exist = true;
            }
            if (!exist) {
                    $.post('/admin/addArtist', {newArtistIDNo: artistIDNumber, newArtistName: artistName, newArtistPassword: artistPassword}, function(result){
                        if (result) {
                            window.location = '/admin';
                            return true;
                        }
                })
            }
            else {
                Swal.fire('Error adding artist','Artist ID already exist. Please type in another artist ID');
                e.preventDefault();
                return false;
            }
        })
    }
}

$(document).ready(function () {
    //Codes for bundle
    $("[id$=bundleItem]").addClass("mx-0")
    
    /*  changes the item cards in artistItemsSection according to selected artist */
    $("select[name='bundleSelectedArtist']").change(function() {
        var selected = $(this).children("option:selected").val();
        $(".itemGrid").hide()
        $("#" + selected + "-bundleItem").show()
    })

    /*  resets all values upon closing of any modal */
    $(".modal").on('hidden.bs.modal', function() {
        $(".defaultVal").prop("selected", true)
        $("[id$=addSelectBundleItems]").removeClass('bg-secondary')
        $("[id$=editSelectBundleItems]").removeClass('bg-secondary')
        $(".itemGrid").html('')
        $("#editItemPhoto").attr('src','photo/item-photo.png');
        $("#editBundlePhoto").attr('src','photo/item-photo.png');
        //$("#addSelectBundleItems").html('');
        //$("#addBundleItemsSection").html('');
        //$("#editBundleItemsSection").html('');
        $("#editSetCurrentEvent").prop("checked", false);
        $('.clearInput').val('');
    })
    //if bundle not selected then alert
    $("#addArtistSelectBundle").submit(function(e) {
        if (bundleItemSelected.length == 0) {
            Swal.fire("Error adding bundle","Please select at least one item to be added in the bundle");
            e.preventDefault();
        }
    })

    $("select[name='artistsListDropdownBundleAdd']").change(function() {
        $("#addSelectBundleItems").html('')
        var selected = $(this).children("option:selected").val();

        $.get('/admin/getItems', {artistID: selected, projection: "_id itemName itemPrice stockQuantity itemPicture"}, function(result){
            for (i = 0; i < result.length; i++) {

                if (result[i].stockQuantity > 0) {
                    $("#addSelectBundleItems").append('<div class="col mb-3" id="' + result[i]._id + '-addSelectBundleItems" style="padding: 5px">' +
                                                            '<div class="card">' +
                                                                '<img src="' + result[i].itemPicture + '" class="card-img-top" alt="...">' +
                                                                '<div class="card-body">' +
                                                                    '<h5 class="card-title">' + result[i].itemName + '</h5>' +
                                                                    '<p class="card-text">PHP ' + result[i].itemPrice + ' | ' + result[i].stockQuantity + ' left</p>' +
                                                                    '<a href="#" class="stretched-link" onclick="addSelectBundleItems(\'' + result[i]._id + '\', \'' + result[i].itemName + '\', \'' + result[i].itemPrice + '\', \'' + result[i].stockQuantity + '\', \'item\')" style="size: 0px;"></a>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div>')
                }
            }
        })
    })

    
    $('#manageItems').click(function(e) {
        $.get('/admin/getCurrEvent', {}, function(result){
            if (!result) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'There is no current event happening. Please select an event or items will not be added to any existing event',
                  })
            }
        })
    });

    $('#manageBundles').click(function(e) {
        $.get('/admin/getCurrEvent', {}, function(result){
            if (!result) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'There is no current event happening. Please select an event or bundles will not be added to any existing event',
                  })
            }
        })
    });

    $('#addSetCurrentEvent').click(function(e) {
        if ($('#addCurrentEvent').val() == 0) {
            $('#addCurrentEvent').val(1);
        }
        else if ($('#addCurrentEvent').val() == 1){
            $('#addCurrentEvent').val(0);
        }
    })

    $('#editSetCurrentEvent').click(function(e) {
        if ($('#editCurrentEvent').val() == 0) {
            $('#editCurrentEvent').val(1);
        }
        else if ($('#editCurrentEvent').val() == 1){
            $('#editCurrentEvent').val(0);
        }
    })
    
});