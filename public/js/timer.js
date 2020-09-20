$(document).ready(function () {
    var x = setInterval(function() {
        var totalSeconds = $("#totalSeconds").val();
        if (totalSeconds > 0){
            totalSeconds--;
        }
        $("#totalSeconds").val(totalSeconds);
        var days = Math.floor(totalSeconds / (60*60*24));
        var hours = Math.floor((totalSeconds / (60*60)) % 24);
        var minutes = Math.floor((totalSeconds / 60) % 60);
        var seconds = Math.floor((totalSeconds % 60));
        $("#dayCounter").html('<h1 id="counterNumberDays" class="font-weight-bold">' + days + '</h1>' +
                                '<h5 id="textLabel">day left</h5>');
        
        $("#hoursCounter").html('<h1 id="counterNumberHours" class="font-weight-bold">' + hours + '</h1>' +
                                '<h5 id="textLabel">hours left</h5>');

        $("#minutesCounter").html('<h1 id="counterNumberMinutes" class="font-weight-bold">' + minutes + '</h1>' +
                                '<h5 id="textLabel">minutes left</h5>');

        $("#secondsCounter").html('<h1 id="counterNumberSeconds" class="font-weight-bold">' + seconds + '</h1>' +
                                '<h5 id="textLabel">seconds left</h5>');
      }, 1000);
})