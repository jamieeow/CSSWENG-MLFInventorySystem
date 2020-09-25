//Javascript codes for delete functions of /admin
function deleteArtist(e) {
    var selected = $("select[name='artistsListDropdownEdit']").children("option:selected").val();
    if (selected != '') {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                $.post('/admin/deleteArtist', {artistID: selected}, function(result){
                    if (result) {
                        window.location = '/admin';
                        return true;
                    }
                })
              Swal.fire(
                'Deleted!',
                'Artist has been deleted.',
                'success'
              )
            }
          })
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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                $.post('/admin/deleteItem', {itemID: selected}, function(result){
                    if (result) {
                        window.location = '/admin';
                        return true;
                    }
                })
              Swal.fire(
                'Deleted!',
                'Item has been deleted.',
                'success'
              )
            }
          })
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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                $.post('/admin/deleteBundle', {bundleID: selected}, function(result){
                    if (result) {
                        console.log("post success");
                        window.location = '/admin';
                        return true;
                    }
                })
              Swal.fire(
                'Deleted!',
                'Item has been deleted.',
                'success'
              )
            }
          })
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
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                $.post('/admin/deleteEvent', {eventID: selected}, function(result){
                    if (result) {
                        console.log("post success");
                        window.location = '/admin';
                        return true;
                    }
                })
              Swal.fire(
                'Deleted!',
                'Item has been deleted.',
                'success'
              )
            }
          })
        }
    else {
        Swal.fire('Error deleting event','Please select an event');
        e.preventDefault();
        return false;
    }
}

$(document).ready(function () {
    
});