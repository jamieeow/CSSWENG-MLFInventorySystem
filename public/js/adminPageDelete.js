//Javascript codes for delete functions of /admin
function deleteArtist(e) {
    var selected = $("select[name='artistsListDropdownEdit']").children("option:selected").val();
    if (selected != '') {
        if(!confirm('Are you sure you want to delete?')) {
            e.preventDefault();
            return false;
        }
        else {
            $.post('/admin/deleteArtist', {artistID: selected}, function(result){
                if (result) {
                    console.log("post success");
                    window.location = '/admin';
                    return true;
                }
            })
        }
    }
    else {
        alert('Please select an artist!');
        e.preventDefault();
        return false;
    }
}
$(document).ready(function () {
    
});