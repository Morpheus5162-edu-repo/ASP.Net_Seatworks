const TAX_PERCENTAGE = 0.0825;

function formatPrice(value) {
    return parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

$(document).ready(function(){
    $("#calculate").click(function() {
        // Array of objects where each object represents
        // a product with 3 key and value pair
        let products = [
            { name: "TV", price: 400.00, qty: $("#tv").val() },
            { name: "VCR", price: 220.00, qty: $("#vcr").val() },
            { name: "REMOTE CNTRLR", price: 35.20, qty: $("#remote").val() },
            { name: "CD PLAYER", price: 300.00, qty: $("#cd").val() },
            { name: "TAPE RECORDER", price: 150.00, qty: $("#tape").val() }
        ];

        let subtotal = 0;
        let tableRows = "";
        
        for (let i = 0; i < products.length; i++) {
            let product = products[i];
            let productTotalPrice = product.qty * product.price;

            if (product.qty > 0) {
                tableRows += `<tr>
                    <td>${product.qty}</td>
                    <td>${product.name}</td>
                    <td>${formatPrice(product.price)}</td>
                    <td>${formatPrice(productTotalPrice)}</td>
                </tr>`;
            }
            subtotal += productTotalPrice;
        }

        let tax = subtotal * TAX_PERCENTAGE;
        let totalAmount = subtotal + tax;

        $("#billTable tbody").html(tableRows);
        $("#subtotal").text(formatPrice(subtotal));
        $("#tax").text(formatPrice(tax));
        $("#total").text(formatPrice(totalAmount));
        $("#billTable").removeAttr("hidden");
    });
});