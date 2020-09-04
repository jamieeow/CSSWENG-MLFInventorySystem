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

    

});