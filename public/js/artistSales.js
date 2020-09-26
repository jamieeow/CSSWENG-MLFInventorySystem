var headers = {
    itemID: "Item ID",
    itemName: "Item Name",
    itemType: "Item or Bundle",
    itemPrice: "Price",
    itemsSold: "Quantity Sold",
    stockQuantity: "Stocks Left",
    includedItems: "Bundled Items"
};

/*  converts objects to csv */
const convertToCSV = function (objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

/*  exports sales report to CSV file */
const exportCSVFile = function (headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

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
    $("input[value='export data']").prop("disabled", true);
    /*  shows the sales report according to selected artist */
    $("select[name='selectedArtistSales']").change(function() {
        var selected = $(".salesReportArtist").children("option:selected").val();
        var sort = $(".salesReportSort").children("option:selected").val();
        var total = 0;

        if (selected != '') {
            $("input[value='export data']").prop("disabled", false);
            $.get('/getSorted', {artistID: selected, sort: sort}, function(itemRes){
                if (itemRes) {
                    total += (itemRes[0].itemPrice * itemRes[0].itemsSold)
                    $("#salesList").html("<tr class='row m-0'><td class='col-6'>" + itemRes[0].itemName + 
                                            "</td><td class='col-3'>" + itemRes[0].itemPrice.toFixed(2) + 
                                            "</td><td class='col-3'>" + itemRes[0].itemsSold + "</td></tr>")
                }

                for (i = 1; i < itemRes.length; i++) {
                    total += (itemRes[i].itemPrice * itemRes[i].itemsSold)
                    $("#salesList").append("<tr class='row m-0'><td class='col-6'>" + itemRes[i].itemName + 
                                        "</td><td class='col-3'>" + itemRes[i].itemPrice.toFixed(2) + 
                                        "</td><td class='col-3'>" + itemRes[i].itemsSold + "</td></tr>")
                }

                if (!itemRes) {
                    $("#salesList").html("<tr class='row m-0'><td class='col-6'> No items for sale</td>" + 
                                            "<td class='col-3'>0.00</td> <td class='col-3'>0</td></tr>")
                }

                $("#totalSoldSales").html("PHP " + parseFloat(total).toFixed(2))
                
            })
        }
    })

    /* exports sales report */
    $("input[value='export data']").click(function() {
        var selected = $(".salesReportArtist").children("option:selected").val();
        var sort = $(".salesReportSort").children("option:selected").val();

        if (selected != '') {
            $.get('/export', {artistID: selected, sort: sort}, function(result){
                if (result) {
                    exportCSVFile(headers, result.items, result.filename);
                }
            })
        }

    })

    /*  resets values upon closing of modal */
    $(".modal").on('hidden.bs.modal', function() {
        $("#salesList").html("<tr class='row m-0'><td class='col'>Select an artist</td></tr>")
        $("#totalSoldSales").html(parseFloat(0))
        $("#artistSales").html('')
        $("input[value='export data']").prop("disabled", true)
    })
})