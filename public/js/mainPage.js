var buyCart = []
var inCart = []
var totalPrice = 0

/* updates the checkout List and local variables when an item card is clicked */
function buyItem(itemID, itemName, itemPrice) {
    var i = inCart.indexOf(itemID)

    if (i == -1) {
        inCart.push(itemID)
        buyCart.push({itemID: itemID, quantity: 1})

        $("#checkoutItemsList").append("<tr id='" + itemID + "Cart'>" + 
                                        "<td><button type='button' class='close' onclick='removeCartItem(" + itemID + ", " + itemPrice + ")' aria-label='Close'>" + 
                                            "<span aria-hidden='true'>&times;</span></button></td>" + 
                                        "<td id='" + itemID + "Quantity'>(1) " + itemName + "</td>" + 
                                        "<td id='" + itemID + "Total' class='text-right'>" + parseFloat(itemPrice) + "</td></tr>")
    } else {    

        buyCart[i].quantity += 1
        var q = buyCart[i].quantity
        var p = q * parseFloat(itemPrice)

        $("#" + itemID + "Quantity").html("(" + q + ") " + itemName);
        $("#" + itemID + "Total").html(parseFloat(p));
    }
    
    totalPrice += parseFloat(itemPrice)
    $("#totalPrice").html(parseFloat(totalPrice))
    console.log(buyCart)
}

/*  updates the checkout list and local variables when the remove item button is clicked */
function removeCartItem(itemID, itemPrice) {
    var i = inCart.indexOf(String(itemID))
    totalPrice -= (parseInt(buyCart[i].quantity) * parseFloat(itemPrice))

    buyCart.splice(i, 1)
    inCart.splice(i, 1)
    console.log(buyCart)

    $("#" + itemID + "Cart").remove()
    $("#totalPrice").html(parseFloat(totalPrice))
}

$(document).ready(function () {
    $(".itemGrid").hide()
    
    $("select[name='selectedArtist']").change(function() {
        var selected = $(this).children("option:selected").val();
        $(".itemGrid").hide()
        $("#" + selected + "-buyItem").show()
    })
    
    $("select[name='financeSelectedArtist']").change(function() {
        var selected = $(this).children("option:selected").val();
        $(".itemGrid").hide()
        $("#" + selected + "-financialItemList").show()
    })
})
