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
        Swal.fire('Error deleting artist','Please select an artist');
        e.preventDefault();
        return false;
    }
}

function deleteItem(e) {
    var selected = $("select[name='artistsListDropdownItem']").children("option:selected").val();
    if (selected != '') {
        if(!confirm('Are you sure you want to delete?')) {
            e.preventDefault();
            return false;
        }
        else {
            $.post('/admin/deleteItem', {itemID: selected}, function(result){
                if (result) {
                    console.log("post success");
                    window.location = '/admin';
                    return true;
                }
            })
        }
    }
    else {
        Swal.fire('Error deleting item','Please select an artist');
        e.preventDefault();
        return false;
    }
}

function deleteBundle(e) {
    var selected = $("select[name='artistsListDropdownBundle']").children("option:selected").val();
    if (selected != '') {
        if(!confirm('Are you sure you want to delete?')) {
            e.preventDefault();
            return false;
        }
        else {
            $.post('/admin/deleteBundle', {bundleID: selected}, function(result){
                if (result) {
                    console.log("post success");
                    window.location = '/admin';
                    return true;
                }
            })
        }
    }
    else {
        Swal.fire('Error deleting bundle','Please select a bundle');
        e.preventDefault();
        return false;
    }
}

function deleteEvent(e) {
    var selected = $("select[name='selectedEvent']").children("option:selected").val();
    if (selected != '') {
        if(!confirm('Are you sure you want to delete?')) {
            e.preventDefault();
            return false;
        }
        else {
            $.post('/admin/deleteEvent', {eventID: selected}, function(result){
                if (result) {
                    console.log("post success");
                    window.location = '/admin';
                    return true;
                }
            })
        }
    }
    else {
        Swal.fire('Error deleting event','Please select an event');
        e.preventDefault();
        return false;
    }
}

$(document).ready(function () {
    
});