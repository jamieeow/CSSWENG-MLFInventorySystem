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

    /*  Admin Page */
    addBundle.click(function () {
        $("label[for='newItemName']").text("bundle name");

        $("#addItemWindow").on('hidden.bs.modal', function () {
            $("label[for='newItemName']").text("item name");
        })
    })
    
})