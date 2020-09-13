//Javascript codes for add functions of /admin

var bundleItemSelected = [] // array of selected item ID for bundle

/*  highlights selected item in artistItemsSection modals */
function selectBundleItems(itemID, itemName, itemPrice) {
    if ($("#" + itemID + "-selectBundleItems").hasClass('bg-secondary')) { //remove item from bundle
        $("#" + itemID + "-selectBundleItems").removeClass('bg-secondary');
        const index = bundleItemSelected.indexOf(itemName)
        if (index > -1) { 
            bundleItemSelected.splice(index, 1)
        }
    }
    else { //add item to bundle
        $("#" + itemID + "-selectBundleItems").addClass('bg-secondary');
        bundleItemSelected.push(itemName)
    }
    $("#selectedItems").val(bundleItemSelected);
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
        $("[id$=selectBundleItems]").removeClass('bg-secondary')
        $("#artistItemsSection").html('')
        $('.clearInput').val('');
    })
    //if bundle not selected then alert
    $("#artistSelectBundle").submit(function(e) {
        if (bundleItemSelected.length == 0) {
            alert("Please select an item!");
            e.preventDefault();
        }
    })

    $("select[name='artistsListDropdownBundleAdd']").change(function() {
        $("#selectBundleItems").html('')
        var selected = $(this).children("option:selected").val();

        $.get('/getItems', {artistID: selected, projection: "_id itemName itemPrice stockQuantity itemPicture"}, function(result){
            console.log(result)
            for (i = 0; i < result.length; i++) {

                if (result[i].stockQuantity > 0) {
                    $("#selectBundleItems").append('<div class="col mb-3" id="' + result[i]._id + '-selectBundleItems" style="padding: 5px">' +
                                                            '<div class="card">' +
                                                                '<img src="' + result[i].itemPicture + '" class="card-img-top" alt="...">' +
                                                                '<div class="card-body">' +
                                                                    '<h5 class="card-title">' + result[i].itemName + '</h5>' +
                                                                    '<p class="card-text">PHP ' + result[i].itemPrice + ' | ' + result[i].stockQuantity + ' left</p>' +
                                                                    '<a href="#" class="stretched-link" onclick="selectBundleItems(\'' + result[i]._id + '\', \'' + result[i].itemName + '\', \'' + result[i].itemPrice + '\', \'' + result[i].stockQuantity + '\', \'item\')" style="size: 0px;"></a>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div>')
                }
            }
        })
    })

});