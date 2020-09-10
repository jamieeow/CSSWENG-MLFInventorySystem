//Javascript codes for add functions of /admin

var bundleItemSelected = [] // array of selected item ID for bundle

/*  highlights selected item in artistItemsSection modals */
function bundleItem(itemID, itemName, itemPrice) {
    if ($("#" + itemID + "-bundleItem-item").hasClass('bg-secondary')) { //remove item from bundle
        $("#" + itemID + "-bundleItem-item").removeClass('bg-secondary');
        const index = bundleItemSelected.indexOf(itemName)
        if (index > -1) { 
            bundleItemSelected.splice(index, 1)
        }
    }
    else { //add item to bundle
        $("#" + itemID + "-bundleItem-item").addClass('bg-secondary');
        bundleItemSelected.push(itemName)
    }
    $("#selectedItems").val(bundleItemSelected);
}

$(document).ready(function () {
    //Codes for bundle
    $(".itemGrid").hide()
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
        $(".itemGrid").hide()
        $("[id$=bundleItem-item]").removeClass('bg-secondary')
        $('.clearInput').val('');
    })

    $("#artistSelectBundle").submit(function(e) {
        if (bundleItemSelected.length == 0) {
            alert("Please select an item!");
            e.preventDefault();
        }
        console.log("submitted");
    })

});