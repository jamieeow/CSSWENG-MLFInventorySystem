

/*  shows the table for artist modals */
function showArtistModal (artistID, artistName) {
    $("#salesList").html('')
    $("#artistModalTitle").html(artistName)
    var selected = $(this).children("option:selected").val();
    var total = 0;

    $.get('/getItems', {artistID: artistID, projection: "itemName itemPrice itemsSold stockQuantity"}, function(itemRes){
        for (i = 0; i < itemRes.length; i++) {
            $("#artistSales").append("<tr><td>" + itemRes[i].itemName + 
                                    "</td><td>" + itemRes[i].stockQuantity + 
                                    "</td><td>" + itemRes[i].itemPrice.toFixed(2) + 
                                    "</td><td>" + itemRes[i].itemsSold + "</td></tr>")
        }

        $.get('/getBundles', {artistID: artistID, projection: "bundleName bundlePrice bundleSold bundleStock"}, function(bundleRes){
            for (i = 0; i < bundleRes.length; i++) {
                $("#artistSales").append("<tr><td>" + bundleRes[i].bundleName + 
                                        "</td><td>" + bundleRes[i].bundleStock + 
                                        "</td><td>" + bundleRes[i].bundlePrice.toFixed(2) + 
                                        "</td><td>" + bundleRes[i].bundleSold + "</td></tr>")
            }

            if (!itemRes && !bundleRes) {
                $("#artistSales").append("<tr><td> No items for sale</td> <td>0</td>" + 
                                                    "<td>0.00</td> <td>0</td></tr>")

            }

        })
    })

    $("#artistModal").modal('toggle');
}

$(document).ready(function () {
    
    /*  shows the sales report according to selected artist */
    $("select[name='selectedArtistSales']").change(function() {
        var selected = $(this).children("option:selected").val();
        var total = 0;

        $.get('/getItems', {artistID: selected, projection: "itemName itemPrice itemsSold"}, function(itemRes){
            
            if (itemRes) {
                $("#salesList").html("<tr><td>" + itemRes[0].itemName + 
                                        "</td><td>" + itemRes[0].itemPrice.toFixed(2) + 
                                        "</td><td>" + itemRes[0].itemsSold + "</td></tr>")
            }

            for (i = 1; i < itemRes.length; i++) {
                total += (itemRes[i].itemPrice * itemRes[i].itemsSold)
                $("#salesList").append("<tr><td>" + itemRes[i].itemName + 
                                    "</td><td>" + itemRes[i].itemPrice.toFixed(2) + 
                                    "</td><td>" + itemRes[i].itemsSold + "</td></tr>")
            }

            $.get('/getBundles', {artistID: selected, projection: "bundleName bundlePrice bundleSold"}, function(bundleRes){
                
                for (i = 0; i < bundleRes.length; i++) {
                    total += (bundleRes[i].bundlePrice * bundleRes[i].bundleSold)
                    $("#salesList").append("<tr><td>" + bundleRes[i].bundleName + 
                                        "</td><td>" + bundleRes[i].bundlePrice.toFixed(2) + 
                                        "</td><td>" + bundleRes[i].bundleSold + "</td></tr>")
                }
                
                if (!itemRes && !bundleRes) {
                    $("#salesList").html("<tr><td> No items for sale</td>" + 
                                            "<td>0.00</td> <td>0</td></tr>")
                }

                $("#totalSoldSales").html("PHP " + parseFloat(total).toFixed(2))
            })
        })
    })

    /*  resets values upon closing of modal */
    $(".modal").on('hidden.bs.modal', function() {
        $("#salesList").html("<tr class='row m-0'><td class='col'>Select an artist</td></tr>")
        $("#totalSoldSales").html(parseFloat(0))
        $("#artistSales").html('')
    })
})