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
        //$("#addSelectBundleItems").html('');
        //$("#addBundleItemsSection").html('');
        //$("#editBundleItemsSection").html('');
        $("#editSetCurrentEvent").prop("checked", false);
        $('.clearInput').val('');
    })
    //if bundle not selected then alert
    $("#addArtistSelectBundle").submit(function(e) {
        if (bundleItemSelected.length == 0) {
            alert("Please select an item!");
            e.preventDefault();
        }
    })

    $("select[name='artistsListDropdownBundleAdd']").change(function() {
        $("#addSelectBundleItems").html('')
        var selected = $(this).children("option:selected").val();

        $.get('/admin/getItems', {artistID: selected, projection: "_id itemName itemPrice stockQuantity itemPicture"}, function(result){
            console.log(result)
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

    

});