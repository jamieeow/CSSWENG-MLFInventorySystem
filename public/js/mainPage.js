$(document).ready(function () {
    $(".itemGrid").hide()
    
    $("select[name='selectedArtist']").change(function() {
        var selected = $(this).children("option:selected").val();
        $(".itemGrid").hide()
        $("#" + selected + "-buyItemSection").show()
    })
    
    $("select[name='financeSelectedArtist']").change(function() {
        var selected = $(this).children("option:selected").val();
        $(".itemGrid").hide()
        $("#" + selected + "-financialItemList").show()
    })
})