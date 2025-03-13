const GRADE_CEILING = 100;
const GRADE_A_FLOOR = 90;
const GRADE_B_FLOOR = 80;
const GRADE_C_FLOOR = 70;
const GRADE_D_FLOOR = 60;
const REGEX = /^[0-9]\d*$/;

function getEvaluationRemarks(grade) {
    switch (true) {
        case grade >= GRADE_A_FLOOR && grade <= GRADE_CEILING:
            return "A";
        case grade >= GRADE_B_FLOOR && grade < GRADE_A_FLOOR:
            return "B";
        case grade >= GRADE_C_FLOOR && grade < GRADE_B_FLOOR:
            return "C";
        case grade >= GRADE_D_FLOOR && grade < GRADE_C_FLOOR:
            return "D";
        case grade < GRADE_D_FLOOR:
            return "F";
    }
}

function errorMessage(message) {
    $("#errorCardBody").text(message);
    $("#errorCard").removeAttr("hidden");
}

function outputMessage(message) {
    $("#inputCard").attr("hidden", true);
    $("#errorCard").attr("hidden", true);
    $("#outputCardBody").html(message);
    $("#outputCard").removeAttr("hidden");
}

$(document).ready(function() {
    $("#submitBtn").click(function () {
        let prelim = $("#prelim").val().trim();
        let midterm = $("#midterm").val().trim();
        let semi_final = $("#semi_final").val().trim();
        let final = $("#final").val().trim();

        // REGEX to check for non-numeric inputs
        if (!REGEX.test(prelim) || !REGEX.test(midterm) || 
            !REGEX.test(semi_final) || !REGEX.test(final)) {
                return errorMessage("Input should be numeric.");
            }
        
        prelim = parseInt(prelim, 10);
        midterm = parseInt(midterm, 10);
        semi_final = parseInt(semi_final, 10);
        final = parseInt(final, 10);

        // If statement with multiple conditions
        if (prelim == 0 || midterm == 0 || semi_final == 0 || final == 0) {
            return errorMessage("Input should be greater than zero.");
        }
        // Same with if statement with multiple conditions but with 
        // a single output. Clean and readable than the former
        switch (true) {
            case prelim > 100:
            case midterm > 100:
            case semi_final > 100:
            case final > 100:
                return errorMessage("Input should not exceed 100.");
        }

        outputMessage(`
            <table class="table table-bordered">
                <tr><td>Prelim</td><td>${getEvaluationRemarks(prelim)}</td></tr>
                <tr><td>Midterm</td><td>${getEvaluationRemarks(midterm)}</td></tr>
                <tr><td>Semi Final</td><td>${getEvaluationRemarks(semi_final)}</td></tr>
                <tr><td>Final</td><td>${getEvaluationRemarks(final)}</td></tr>
            </table>
        `);
    });

    $("#resetBtn").click(function () {
        $("#outputCard").attr("hidden", true);
        $("#inputCard").removeAttr("hidden");
        $("#prelim, #midterm, #semi_final, #final").val("");
    });
});