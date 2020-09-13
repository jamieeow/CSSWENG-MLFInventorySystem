//Javascript codes for edit functions of /admin
$(document).ready(function () {

    //edit artist change values according to selector
    $("select[name='artistsListDropdownEdit']").change(function() {
        $("#selectBundleItems").html('')
        var selected = $(this).children("option:selected").val();
        console.log(selected);

        $.get('/admin/getArtist', {artistID: selected, projection: "_id artistID artistName"}, function(result){
            console.log(result)
            if (result) {
                $("#editArtistName").val(result.artistName);
                $("#editArtistIDNo").val(result.artistID);
            }
        })
    })
    
    
    

});