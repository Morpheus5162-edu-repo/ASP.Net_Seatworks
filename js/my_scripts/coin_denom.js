$(document).ready(function() {
    $("#calculate").click(function() {
        // Get the price and tendered amount from input fields
        var priceText = $("#price").val();
        var tenderedText = $("#tendered").val();

        // Function to properly parse input values
        function parseAmount(input) {
            var num = parseFloat(input);
            // Ensure values like 1650 are treated as 16.50
            return (num >= 100 && !input.includes(".")) ? num / 100 : num;
        }

        // Convert input values correctly
        var price = parseAmount(priceText);
        var tendered = parseAmount(tenderedText);
        
        // Compute the change amount and convert to centavos
        var rawChange = tendered - price;
        var change = Math.round(rawChange * 100);
        
        var denominations = [20, 10, 5, 1, 0.25, 0.10, 0.05];
        var result = "Change: " + (change / 100).toFixed(2) + "\n\nCoin Denomination\n";

        // Prepare the result header
        var result = `<p><strong>Change:</strong> ${rawChange.toFixed(2)}</p>`;
        result += `<h3>Coin Denomination</h3><ul>`;

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
            var label = denom >= 1 ? `${denom} peso` : `${denom.toFixed(2)} cent.`;

            // Append the denomination count to the output string
            result += `<li>${label}: ${count}</li>`;
        }
        result += `</ul>`;
        
        $("#output").html(result);
    });
});