var buyCart = []
var inCart = []
var totalPrice = 0

function buyItem(itemID, itemName, itemPrice) {
    var i = inCart.indexOf(itemID)

    if (i == -1) {
        inCart.push(itemID)
        buyCart.push({itemID: itemID, quantity: 1})

        $("#checkoutItemsList").append("<tr id='" + itemID + "Cart'><td id='" + itemID + "Quantity'>(1) " + itemName + "</td><td id='" + itemID + "Total' class='text-right'>" + parseFloat(itemPrice) + "</td></tr>")
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
