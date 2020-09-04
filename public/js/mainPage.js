var buyCart = []
var inCart = []
var totalPrice = 0
var financialSelected

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
}

/*  updates the checkout list and local variables when the remove item button is clicked */
function removeCartItem(itemID, itemPrice) {
    var i = inCart.indexOf(String(itemID))
    totalPrice -= (parseInt(buyCart[i].quantity) * parseFloat(itemPrice))

    buyCart.splice(i, 1)
    inCart.splice(i, 1)

    $("#" + itemID + "Cart").remove()
    $("#totalPrice").html(parseFloat(totalPrice))
}

/*  highlights selected item in financialItemList modals */
function financialItem(itemID, itemName, itemPrice) {
    $("[id$=financialItem-item]").removeClass('bg-secondary')
    $("#" + itemID + "-financialItem-item").addClass('bg-secondary')
    financialSelected = itemID
}


$(document).ready(function () {
    $(".itemGrid").hide()
    $("[id$=financialItem]").addClass("mx-0")
    
    /*  changes the item cards in buyItemSection according to selected artist */
    $("select[name='selectedArtist']").change(function() {
        var selected = $(this).children("option:selected").val();
        $(".itemGrid").hide()
        $("#" + selected + "-buyItem").show()
    })
    
    /*  changes the item cards in financialItemList according to selected artist */
    $("select[name='financeSelectedArtist']").change(function() {
        var selected = $(this).children("option:selected").val();
        $(".itemGrid").hide()
        $("#" + selected + "-financialItem").show()
    })

    /*  resets all values upon closing of any modal */
    $(".modal").on('hidden.bs.modal', function() {
        $(".defaultVal").prop("selected", true)
        $(".itemGrid").hide()
        $("[id$=financialItem-item]").removeClass('bg-secondary')
        $("#checkoutItemsList").html('')

        buyCart = []
        inCart = []
        totalPrice = 0
        financialSelected = ''
    })
})
