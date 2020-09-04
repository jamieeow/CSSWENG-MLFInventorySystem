$(document).ready(function () {
    //Add artist button POST method to /admin/addArtist
    $('#addArtistButton').click(function () {
        $.ajax({
            url: '/admin/addArtist',
            method: 'POST',
            data: {
                artistID: $('#newArtistID').val(),
                artistName: $('#newArtistName').val(),
            }
        })

        //if added successfully do these 
        //TODO: error checking e.g. empty
        $('#artistsListDropdownItem').append($('<option>', { 
            text: $('#newArtistName').val()
        }));
        $('#artistsListDropdownBundle').append($('<option>', { 
            text: $('#newArtistName').val()
        }));
        $('#addArtistWindow').modal('toggle');
        $('#newArtistName').val("");
        $('#newArtistID').val("");
    });

    $('#addItemButton').click(function () {
        $.ajax({
            url: '/admin/addItem',
            method: 'POST',
            data: {
                artistID: $('#artistsListDropdownItem').val(),
                //eventID: ,
                itemName: $('#newItemName').val(),
                itemPrice: $('#newPriceStock').val(),
                stockQuantity: $('#newStockQuantity').val(),
                //itemsSold: {type: Number, required: true},
                //itemPicture: {type: String, required: true},
            }
        })
        $('#artistsListDropdown').val("");
        $('#newItemName').val("");
        $('#newPriceStock').val("");
        $('#newStockQuantity').val("");
    });

});