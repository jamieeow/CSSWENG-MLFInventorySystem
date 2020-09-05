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
        $("#newPriceStock").prop("step", "0.01")
    });

    restockItem.click(function () {
        $("label[for='newPriceStock']").text("quantity to add");
        $("#newPriceStock").prop("step", "1")
    });

    reserveStocks.click(function () {
        $("label[for='newPriceStock']").text("quantity to reserve");
        $("#newPriceStock").prop("step", "1")
    });

    /*  Admin Page */
    addBundle.click(function () {
        $("label[for='newItemName']").text("bundle name");

        $("#addItemWindow").on('hidden.bs.modal', function () {
            $("label[for='newItemName']").text("item name");
        })
    })
    
})