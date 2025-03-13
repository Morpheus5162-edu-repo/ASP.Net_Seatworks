const REGEX = /^(?!0*(\.0+)?$)\d+(\.\d+)?$/;

function evaluateTriangleType(a, b, c) {
    if (a === b && b === c) {
        return "Equilateral Triangle";
    } else {
        if (a === b || b === c || a === c) {
            return "Isosceles Triangle";
        } else {
            return "Scalene Triangle";
        }
    }
}

function errorMessage(message) {
    $("#errorCardBody").text(message);
    $("#errorCard").removeAttr("hidden");
}

$(document).ready(function() {
    $("#submitBtn").click(function() {
        let a = $("#sideA").val().trim();
        let b = $("#sideB").val().trim();
        let c = $("#sideC").val().trim();

        if(!REGEX.test(a) || !REGEX.test(b) || !REGEX.test(c)) {
            return errorMessage("Input should be a number grater than 0.00.");
        }

        a = parseFloat(a, 10);
        b = parseFloat(b, 10);
        c = parseFloat(c, 10);

        if (a <= 0 && b <= 0 && c <= 0) {
            return errorMessage("Measurement should be greater than zero.");
        }

        // Triangle Inequality Theorem
        if (!(a + b > c && a + c > b && b + c > a)) {
            return errorMessage("Invalid triangle: The sum of any two sides must be greater than the third.");
        }
        
        if ($("#errorCard").is(":visible")) {
            $("#errorCard").attr("hidden", true);
        }

        let result = evaluateTriangleType(a, b, c);

        $("#inputCard").attr("hidden", true);
        $("#outputCardBody").html(`<strong>${result}</strong>`);
        $("#outputCard").removeAttr("hidden");
    });

    $("#resetBtn").click(function () {
        $("#outputCard").attr("hidden", true);
        $("#inputCard").removeAttr("hidden");
        $("#sideA, #sideB, #sideC").val("");
    });
});