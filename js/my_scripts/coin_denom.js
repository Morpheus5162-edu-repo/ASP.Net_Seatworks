$(document).ready(function() {
    $("#calculate").click(function() {
        var price = parseFloat($("#price").val());
        var tendered = parseFloat($("#tendered").val());
        
        // Compute the change amount and convert to centavos
        var rawChange = tendered - price;
        var change = Math.round(rawChange * 100);
        
        var denominations = [20, 10, 5, 1, 0.25, 0.10, 0.05];
        var result = "Change: " + (change / 100).toFixed(2) + "\n\nCoin Denomination\n";

        // Iterate through each denomination
        for (var i = 0; i < denominations.length; i++) {
            var denom = denominations[i];

            // Determine how many of this denomination fit into the change
            var count = Math.floor(change / (denom * 100));
            console.log(count);

            // Subtract the used amount from the change
            change -= count * (denom * 100);
            console.log(change);

            // Format the denomination label (peso or centavo)
            var label = denom >= 1 ? denom + " peso" : denom.toFixed(2) + " cent.";

            // Append the denomination count to the output string
            output += label + ": " + count + "\n";
        }
        
        $("#output").text(result + output);
    });
});