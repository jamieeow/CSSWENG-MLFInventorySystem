var bundleItemSelected = []

/*  highlights selected item in artistItemsSection modals */
function bundleItem(itemID, itemName, itemPrice) {
    if ($("#" + itemID + "-bundleItem-item").hasClass('bg-secondary')) { //remove item from bundle
        $("#" + itemID + "-bundleItem-item").removeClass('bg-secondary');
        const index = bundleItemSelected.indexOf(itemID)
        if (index > -1) { 
            bundleItemSelected.splice(index, 1) 
        }
    }
    else { //add item to bundle
        $("#" + itemID + "-bundleItem-item").addClass('bg-secondary');
        bundleItemSelected.push(itemID)
    }
    console.log(bundleItemSelected);
}

$(document).ready(function () {
    //Add artist button POST method to /admin/addArtist
    $('#addArtistButton').click(function () {
        $.ajax({
            url: '/admin/addArtist',
            method: 'POST',
            data: {
                artistID: $('#newArtistIDNo').val(),
                artistName: $('#newArtistName').val(),
            }
        })

        //if added successfully do these 
        //TODO: error checking e.g. empty
        $('#artistsListDropdownItem').append($('<option>', { 
            text: $('#newArtistName').val(),
            value: $('#newArtistIDNo').val(),
        }));
        $('#artistsListDropdownBundle').append($('<option>', { 
            text: $('#newArtistName').val(),
            value: $('#newArtistIDNo').val(),
        }));
        $('#addArtistWindow').modal('toggle');
        $('#newArtistName').val("");
        $('#newArtistIDNo').val("");
    });

    //Starting here is codes for bundle

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
        $("#checkoutItemsList").html('')
    })    

});