var itemCart = []
var bundleCart = []
var inItemCart = []
var inBundleCart = []
var totalPrice = 0
var financialSelected

/* updates the checkout List and local variables when an item card is clicked */
function buyItem(itemID, itemName, itemPrice, stockQuantity, itemType) {
    var i, cart, inCart;
    
    if (itemType == 'item') {
        cart = itemCart
        inCart = inItemCart
    } else {
        cart = bundleCart
        inCart = inBundleCart
    }
    
    i = inCart.indexOf(itemID)

    if (i == -1) {
        inCart.push(itemID)
        cart.push({itemID: itemID, quantity: 1})
        totalPrice += parseFloat(itemPrice)

        $("#checkoutItemsList").append("<tr id='" + itemID + "Cart'>" + 
                                        "<td style='width: 10%'><button type='button' class='close' onclick='removeCartItem(" + itemID + ", " + itemPrice + ", " + itemType + ")' aria-label='Close'>" + 
                                            "<span aria-hidden='true'>&times;</span></button></td>" + 
                                        "<td id='" + itemID + "Quantity'>(1) " + itemName + "</td>" + 
                                        "<td id='" + itemID + "Total' class='text-right'>" + parseFloat(itemPrice).toFixed() + "</td></tr>")
    } else {
        var q;

        if (cart[i].quantity == stockQuantity) {
            alert("No more stocks!")
        } else {
            cart[i].quantity += 1
            q = cart[i].quantity
    
            var p = q * parseFloat(itemPrice)
            totalPrice += parseFloat(itemPrice)
    
            $("#" + itemID + "Quantity").html("(" + q + ") " + itemName);
            $("#" + itemID + "Total").html(parseFloat(p).toFixed(2));
        }
        
    }
    
    $("#totalPrice").html(parseFloat(totalPrice).toFixed(2))
    $("#checkoutBtn").prop("disabled", false)
}

/*  updates the checkout list and local variables when the remove item button is clicked */
function removeCartItem(itemID, itemPrice, itemType) {
    var i ;
    var cart, inCart;
    
    if (itemType = 'item') {
        cart = itemCart
        inCart = inItemCart

        $("#" + itemID + "Cart").remove()
    } else {
        cart = bundleCart
        inCart = inBundleCart
    }
    
    i = inCart.indexOf(String(itemID))
    totalPrice -= (parseInt(cart[i].quantity) * parseFloat(itemPrice))

    cart.splice(i, 1)
    inCart.splice(i, 1)
    $("#totalPrice").html(parseFloat(totalPrice).toFixed(2))

    if (inItemCart.length + inBundleCart.length == 0) {
        $("#checkoutBtn").prop("disabled", true)
    }
}

/*  highlights selected item in financialItemList modals */
function financialItem(itemID, itemType) {
    $("[id$=financialItem]").removeClass('bg-secondary')
    $("#" + itemID + "-financialItem").addClass('bg-secondary')
    financialSelected = {
        itemID: itemID,
        itemType: itemType
    }
}

/*  shows toast */
function showToast(func, state) {
    $(".toast").toast("hide")
    if (state) {
        $(".toast-title").addClass('text-success')
        $(".toast-title").html('Success')
        $(".toast-body").html(func + ' processed successfully')
        $(".toast").toast("show")
    } else {
        $(".toast-title").addClass('text-danger')
        $(".toast-title").html('Failed')
        $(".toast-body").html(func + ' failed to process')
        $(".toast").toast("show")
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
                $("#" + artistID + "-table").append("<tr><td>" + bundleRes[i].bundleName + 
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
    $("[id$=financialItem]").addClass("mx-0")
    
    /*  changes the item cards in buyItemSection according to selected artist */
    $("select[name='selectedArtist']").change(function() {
        $("#buyItem").html('')
        var selected = $(this).children("option:selected").val();

        $.get('/getItems', {artistID: selected, projection: "_id itemName itemPrice stockQuantity itemPicture"}, function(result){
            for (i = 0; i < result.length; i++) {
                
                if (result[i].stockQuantity > 0) {
                    $("#buyItem").append('<div class="col mb-3" id="' + result[i]._id + '-buyItem" style="padding: 5px">' +
                                                            '<div class="card">' +
                                                                '<img src="' + result[i].itemPicture + '" class="card-img-top" alt="...">' +
                                                                '<div class="card-body">' +
                                                                    '<h5 class="card-title">' + result[i].itemName + '</h5>' +
                                                                    '<p class="card-text">PHP ' + result[i].itemPrice.toFixed(2) + ' | ' + result[i].stockQuantity + ' left</p>' +
                                                                    '<a href="#" class="stretched-link" onclick="buyItem(\'' + result[i]._id + '\', \'' + result[i].itemName + '\', \'' + result[i].itemPrice + '\', \'' + result[i].stockQuantity + '\', \'item\')" style="size: 0px;"></a>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div>')
                }
            }
        })

        $.get('/getBundles', {artistID: selected, projection: "_id bundleName bundlePrice bundleStock bundlePicture"}, function(result){
            for (i = 0; i < result.length; i++) {
                
                if ( result[i].bundleStock > 0 ) {
                    $("#buyItem").append('<div class="col mb-3" id="' + result[i]._id + '-buyItem" style="padding: 5px">' +
                                                            '<div class="card">' +
                                                                '<img src="' + result[i].bundlePicture + '" class="card-img-top" alt="...">' +
                                                                '<div class="card-body">' +
                                                                    '<h5 class="card-title">' + result[i].bundleName + '</h5>' +
                                                                    '<p class="card-text">PHP ' + result[i].bundlePrice.toFixed(2) + ' | ' + result[i].bundleStock + ' left</p>' +
                                                                    '<a href="#" class="stretched-link" onclick="buyItem(\'' + result[i]._id + '\', \'' + result[i].bundleName + '\', \'' + result[i].bundlePrice + '\', \'' + result[i].bundleStock + '\', \'bundle\')" style="size: 0px;"></a>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div>')
                }
            }
        })
    })
    
    /*  changes the item cards in financialItemList according to selected artist */
    $("select[name='financeSelectedArtist']").change(function() {
        var selected = $(this).children("option:selected").val();
        $("#financialItem").html('')
        var selected = $(this).children("option:selected").val();

        $.get('/getItems', {artistID: selected, projection: "_id itemName itemPrice stockQuantity itemPicture"}, function(result){
            for (i = 0; i < result.length; i++) {
                
                $("#financialItem").append('<div class="col mb-3" id="' + result[i]._id + '-financialItem" style="padding: 5px">' +
                                                        '<div class="card">' +
                                                            '<img src="' + result[i].itemPicture + '" class="card-img-top" alt="...">' +
                                                            '<div class="card-body">' +
                                                                '<h5 class="card-title">' + result[i].itemName + '</h5>' +
                                                                '<p class="card-text">PHP ' + result[i].itemPrice.toFixed(2) + ' | ' + result[i].stockQuantity + ' left</p>' +
                                                                '<a href="#" class="stretched-link" onclick="financialItem(\'' + result[i]._id + '\', \'item\')" style="size: 0px;"></a>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>')
            }
        })

        $.get('/getBundles', {artistID: selected, projection: "_id bundleName bundlePrice bundleStock bundlePicture"}, function(result){
            for (i = 0; i < result.length; i++) {
                
                $("#financialItem").append('<div class="col mb-3" id="' + result[i]._id + '-financialItem" style="padding: 5px">' +
                                                        '<div class="card">' +
                                                            '<img src="' + result[i].bundlePicture + '" class="card-img-top" alt="...">' +
                                                            '<div class="card-body">' +
                                                                '<h5 class="card-title">' + result[i].bundleName + '</h5>' +
                                                                '<p class="card-text">PHP ' + result[i].bundlePrice.toFixed(2) + ' | ' + result[i].bundleStock + ' left</p>' +
                                                                '<a href="#" class="stretched-link" onclick="financialItem(\'' + result[i]._id + '\', \'bundle\')" style="size: 0px;"></a>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>')
            }
        })
    })
    
    /*  shows the sales report according to selected artist */
    $("select[name='selectedArtistSales']").change(function() {
        var selected = $(this).children("option:selected").val();
        var total = 0;

        $.get('/getItems', {artistID: selected, projection: "itemName itemPrice itemsSold"}, function(itemRes){
            
            if (itemRes) {
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

            $.get('/getBundles', {artistID: selected, projection: "bundleName bundlePrice bundleSold"}, function(bundleRes){
                
                for (i = 0; i < bundleRes.length; i++) {
                    total += (bundleRes[i].bundlePrice * bundleRes[i].bundleSold)
                    $("#salesList").append("<tr class='row m-0'><td class='col-6'>" + bundleRes[i].bundleName + 
                                        "</td><td class='col-3'>" + bundleRes[i].bundlePrice.toFixed(2) + 
                                        "</td><td class='col-3'>" + bundleRes[i].bundleSold + "</td></tr>")
                }
                
                if (!itemRes && !bundleRes) {
                    $("#salesList").html("<tr class='row m-0'><td class='col-6'> No items for sale</td>" + 
                                            "<td class='col-3'>0.00</td> <td class='col-3'>0</td></tr>")
                }

                $("#totalSoldSales").html("PHP " + parseFloat(total).toFixed(2))
            })
        })
    })

    /*  resets all values upon closing of any modal */
    $(".modal").on('hidden.bs.modal', function() {
        $(".defaultVal").prop("selected", true)
        $(".itemGrid").html('')
        $("#checkoutItemsList").html('')
        $("#totalPrice").html(parseFloat(0))
        $("#checkoutBtn").prop("disabled", true)
        $("#newPriceStock").val('')
        $("#salesList").html('')
        $("#totalSoldSales").html(parseFloat(0))
        $("#artistSales").html('')

        itemCart = []
        bundleCart = []
        inItemCart = []
        inBundleCart = []
        totalPrice = 0
        financialSelected = ''
    })

    /*  new order submit button */
    $("#checkoutBtn").click(function() {
        var cart = {
            items: itemCart,
            bundles: bundleCart
        }
        if (itemCart.length + bundleCart.length > 0) {
            $.post('/orderCheckOut', cart, function(result){
                $("#newOrderWindow").modal('toggle')
                showToast("Checkout", result)
            })
        }
    })

    /*  add stocks submit button */
    $("#saveOrder").click(function() {
        var label = $("label[for='newPriceStock']").text()
        var input = $("#newPriceStock").val()

        if (input > 0 && financialSelected != "") {
            var details = {
                item: financialSelected.itemID,
                itemType: financialSelected.itemType,
                value: input
            }

            $.post('/restockItem', details, function(result){
                $("#financialWindow").modal('toggle')
                showToast("Restock", result)
            })
        }
    })
})
