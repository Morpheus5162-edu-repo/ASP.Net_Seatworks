const CAR_FIRST_RATE = 0.00;
const CAR_SECOND_RATE = 10.00;
const TRUCK_FIRST_RATE = 30.00;
const TRUCK_SECOND_RATE = 15.25
const BUS_FIRST_RATE = 60.00;
const BUS_SECOND_RATE = 30.15;

$(document).ready(function() {
    $("#calculate").click(function() {
        let vehicleType = $("#vehicleType").val();
        let inHour = $("#inHour").val();
        let inMinute = $("#inMinute").val();
        let outHour = $("#outHour").val();
        let outMinute = $("#outMinute").val();
        
        if (inHour === "" || inMinute === "" || 
            outHour === "" || outMinute === "") {
            alert("Please fill in all time fields.");
            return;
        }
        
        inHour = parseInt(inHour);
        inMinute = parseInt(inMinute);
        outHour = parseInt(outHour);
        outMinute = parseInt(outMinute);
        
        if (outHour < inHour || (outHour === inHour && outMinute === inMinute)) {
            alert("Invalid time: Exit time must be after entry time!");
            return;
        }
        
        // Calaculate total minutes of parking time
        let totalMinutes = (outHour * 60 + outMinute) - (inHour * 60 + inMinute);
        // Round up to the nearest hour
        let totalHours = Math.ceil(totalMinutes / 60);
        
        let charge = 0;
        
        // If-else ladder to determine
        // parking fee based on vehicle input
        if (vehicleType === "car") {
            // Using ternary operator to calculate parking fee 
            // based on the first and second rate of the hours
            // the vehicle is parked 
            charge = totalHours <= 3 ? CAR_FIRST_RATE : (totalHours - 3) * CAR_SECOND_RATE;
        } else if (vehicleType === "truck") {
            charge = totalHours <= 2 ? totalHours * TRUCK_FIRST_RATE : (TRUCK_FIRST_RATE * 2) + (totalHours - 2) * TRUCK_SECOND_RATE;
        } else if (vehicleType === "bus") {
            charge = totalHours <= 1 ? BUS_FIRST_RATE : BUS_FIRST_RATE + (totalHours - 1) * BUS_SECOND_RATE;
        }
        
        // Format time into AM/PM format
        let timeInFormatted = ((inHour % 12) || 12) + ':' + (inMinute < 10 ? '0' : '') + inMinute + (inHour >= 12 ? ' PM' : ' AM');
        let timeOutFormatted = ((outHour % 12) || 12) + ':' + (outMinute < 10 ? '0' : '') + outMinute + (outHour >= 12 ? ' PM' : ' AM');
        
        $("#result").html(
            "Type of Vehicle: " + vehicleType.toUpperCase() + "<br>" +
            "TIME-IN: " + timeInFormatted + "<br>" +
            "TIME-OUT: " + timeOutFormatted + "<br>" +
            "PARKING TIME: " + Math.floor(totalMinutes / 60) + ":" + (totalMinutes % 60) + "<br>" +
            "ROUNDED TOTAL: " + totalHours + " hours<br>" +
            "TOTAL CHARGES: <b>P " + charge.toFixed(2) + "</b>"
        );
        $("#resultContainer").removeAttr("hidden");
    });
});