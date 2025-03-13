/* $(document).ready(function() {
    $("#calculate").click(function() {
        var price = parseFloat($("#price").val());
        var tendered = parseFloat($("#tendered").val());
        var change = Math.round((tendered - price) * 100); // Convert to centavos
        
        var denominations = [2000, 1000, 500, 100, 50, 20, 10, 5, 1, 0.25, 0.10, 0.05];
        var result = "Change: " + (change / 100).toFixed(2) + "\n\nCoin Denomination\n";
        
        var output = denominations.map(function(denom) {
            var count = Math.floor(change / (denom * 100));
            change %= denom * 100;
            return (denom >= 1 ? denom + " peso" : denom.toFixed(2) + " cent.") + ":\t" + count;
        }).join("\n");
        
        $("#output").text(result + output);
    });
});
 */

        var price = parseFloat("16.50");
        var tendered = parseFloat("20.00");
        
        // Compute the change amount and convert to centavos
        var rawChange = tendered - price;
        console.log(rawChange);
        var change = Math.round(rawChange * 100);
        console.log(change);

        // Define the available denominations
        var denominations = [2000, 1000, 500, 100, 50, 20, 10, 5, 1, 0.25, 0.10, 0.05];
        
        // Prepare the result header
        var result = "Change: " + (change / 100).toFixed(2) + "\n\nCoin Denomination\n";
        
        // Initialize an output string
        var output = "";

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
            output += label + ":\t" + count + "\n";
        }
        
        console.log(result+output);