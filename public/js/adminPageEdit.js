//Javascript codes for edit functions of /admin
$(document).ready(function () {
    //fill artists in manage artist
    $.get('/admin/getArtist', {}, function(result){
        console.log(result)
        for (i = 0; i < result.length; i++) {   
            $("#manageArtistSection").append('<div class="col mb-3" id="' + result[i]._id + '-editArtist" style="padding: 5px">' +
                                                    '<div class="card">' +
                                                        '<div class="card-body">' +
                                                            '<h6 class="card-title">Artist name : ' + result[i].artistName + '</h6>' +
                                                            '<h6 class="card-title">Artist ID number : ' + result[i].artistID + '</h6>' +
                                                        '</div>' +
                                                        '<button>Edit</button>' + 
                                                        '<button>Delete</button>' +
                                                       '</div>' +
                                                '</div>')
               
        }
    })

    
    $("select[name='artistsListDropdownItem']").change(function() {
        $("#manageItem").html('')
        var selected = $(this).children("option:selected").val();

        $.get('/getItems', {artistID: selected, projection: "_id itemName itemPrice stockQuantity itemPicture"}, function(result){
            console.log(result)
            console.log("no");
            for (i = 0; i < result.length; i++) {
                
                $("#manageItem").append('<div class="col mb-3" id="' + result[i]._id + '-manageItem" style="padding: 5px">' +
                                                        '<div class="card">' +
                                                            '<img src="' + result[i].itemPicture + '" class="card-img-top" alt="...">' +
                                                            '<div class="card-body align-self-stretch">' +
                                                                '<h5 class="card-title">' + result[i].itemName + '</h5>' +
                                                                '<p class="card-text">PHP ' + result[i].itemPrice + ' | ' + result[i].stockQuantity + ' left</p>' +
                                                                '<a href="#" class="stretched-link" onclick="manageItem(\'' + result[i]._id + '\', \'' + result[i].itemName + '\', \'' + result[i].itemPrice + '\', \'' + result[i].stockQuantity + '\')" style="size: 0px;"></a>' +
                                                            '</div>' +
                                                            '<div><button id="edit'+ result[i]._id +'">Edit</button><button id="delete'+ result[i]._id +'">Delete</button></div>' +
                                                        '</div>' +
                                                    '</div>')
            }
        })
    })
    
});