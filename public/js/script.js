// JavaScript source code
$(document).ready(function () {
    var  newOrderWindow, financialWindow;

    var createDiscount, restockItem, reserveStocks;
    var addItem, addArtist, addBundle;

    newOrderWindow = $("#newOrderWindow");
    financialWindow = $("#financialWindow");

    createDiscount = $("#createDiscount");

    addBundle = $("#addBundle");
    //restockItem = $("");
    //reserveStocks = $("");

    $("label[for='newPriceStock']").text("price");

    createDiscount.click(function () {
        $("label[for='newPriceStock']").text("discount percentage");

        $("#financialWindow").on('hidden.bs.modal', function () {
            $("label[for='newPriceStock']").text("price");
        })
    });

    addBundle.click(function () {
        $("label[for='newItemName']").text("bundle name");

        $("#addItemWindow").on('hidden.bs.modal', function () {
            $("label[for='newItemName']").text("item name");
        })
    })
    
})