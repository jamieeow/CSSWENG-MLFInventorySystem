// JavaScript source code
$(document).ready(function () {
    var  newOrderWindow, financialWindow;

    var createDiscount, restockItem, reserveStocks;
    var addItem, addArtist, addBundle;

    newOrderWindow = $("#newOrderWindow");
    financialWindow = $("#financialWindow");

    createDiscount = $("#createDiscount");

    addBundle = $("#addBundle");
    restockItem = $("#restockItem");
    reserveStocks = $("#reserveStocks");

    /*  Main Page   */
    createDiscount.click(function () {
        $("label[for='newPriceStock']").text("discount percentage");
    });

    restockItem.click(function () {
        $("label[for='newPriceStock']").text("quantity to add");
    });

    restockItem.click(function () {
        $("label[for='newPriceStock']").text("quantity to reserve");
    });

    /*  Admin Page */
    addBundle.click(function () {
        $("label[for='newItemName']").text("bundle name");

        $("#addItemWindow").on('hidden.bs.modal', function () {
            $("label[for='newItemName']").text("item name");
        })
    })
    
})