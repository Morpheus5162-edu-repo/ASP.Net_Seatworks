// Work hours, salary rate, overtime rate, tax rate,
// deductions, and deduction percentage are set
// as constants so it can be easily overridden/updated
// when there are changes in the policy
const REGULAR_HOURS = 120;
const OT_RATE = 1.5;
const REGULAR_RATE = 490.88;
const PROBATION_RATE = 420.30;
const CASUAL_RATE = 380.56;
const PART_TIME_RATE = 300.10;
const SINGLE_TAX_RATE = 0.1575;
const MARRIED_TAX_RATE = 0.1012;
const WIDOW_TAX_RATE = 0.1235;
const OTHER_TAX_RATE = 0.1260;
const HIGHEST_DEDUCTION_PERCENTAGE = 0.115;
const MIDDLE_DEDUCTION_PERCENTAGE = 0.0916;
const LOWEST_DEDUCTION_PERCENTAGE = 0.105;
const HIGHEST_PHILHEALTH_DEDUCITON = 420;
const MIDDLE_PHILHEALTH_DEDUCTION = 380;
const LOWEST_PHILHEALTH_DEDUCTION = 290;
const HIGHEST_PAGIBIG_DEDUCTION = 0.0375;
const MIDDLE_PAGIBIG_DEDUCTION = 0.0275;
const LOWEST_PAGIBIG_DEDUCTION = 0.0255;

$(document).ready(function () {
    $("#payrollForm").submit(function (e) {
        // Allows JavaScript to handle the 
        // form submission without refreshing the page
        e.preventDefault();

        let empID = $("#empID").val();
        let lastname = $("#lastname").val();
        let firstname = $("#firstname").val();
        let middleInitial = $("#middleInitial").val();
        let civilStatus = $("#civilStatus").val();
        let employmentStatus = $("#employmentStatus").val();
        let hoursWorked = parseFloat($("#hoursWorked").val());

        // Ternary operation to determine employee status
        let salaryRate = employmentStatus === "R" ? REGULAR_RATE :
                          employmentStatus === "P" ? PROBATION_RATE :
                          employmentStatus === "C" ? CASUAL_RATE : PART_TIME_RATE;
        
        let overtimeRate = (salaryRate / 8) * OT_RATE;
        let overtimeHours = hoursWorked > REGULAR_HOURS ? hoursWorked - REGULAR_HOURS : 0;

        let basicPay = REGULAR_HOURS * (salaryRate / 8);
        let overtimePay = overtimeHours * overtimeRate;
        let grossEarnings = basicPay + overtimePay;

        // Determines tax rate
        let taxRate = civilStatus === "S" ? SINGLE_TAX_RATE :
                      civilStatus === "M" ? MARRIED_TAX_RATE :
                      civilStatus === "W" ? WIDOW_TAX_RATE : OTHER_TAX_RATE;

        let taxDeduction = grossEarnings * taxRate;

        // Determines SSS deductions
        let sssDeduction = grossEarnings >= 12000 ? grossEarnings * HIGHEST_DEDUCTION_PERCENTAGE :
                           grossEarnings < 9500 ? grossEarnings * MIDDLE_DEDUCTION_PERCENTAGE : 
                           grossEarnings * LOWEST_DEDUCTION_PERCENTAGE;

        // PhilHealth deductions
        let philHealthDeduction = grossEarnings >= 12000 ? HIGHEST_PHILHEALTH_DEDUCITON :
                                  grossEarnings < 9500 ? LOWEST_PHILHEALTH_DEDUCTION : MIDDLE_PHILHEALTH_DEDUCTION;
        
        // PagIbig deductions
        let pagIbigDeduction = civilStatus === "M" ? grossEarnings * HIGHEST_PAGIBIG_DEDUCTION :
                               civilStatus === "S" ? grossEarnings * MIDDLE_PAGIBIG_DEDUCTION : 
                               grossEarnings * LOWEST_PAGIBIG_DEDUCTION;

        let totalDeductions = taxDeduction + sssDeduction + philHealthDeduction + pagIbigDeduction;
        let netEarnings = grossEarnings - totalDeductions;

        // So that the output would be 
        // the whole word and not just the value
        // from the selection in html form
        employmentStatus = employmentStatus === "R" ? "Regular" :
                           employmentStatus === "P" ? "Probationary" :
                           employmentStatus === "C" ? "Casual" : "Part Timer";

        civilStatus = civilStatus === "S" ? "Single" :
                      civilStatus === "M" ? "Married" :
                      civilStatus === "W" ? "Widow" : "Other";

        // Payroll object to store payroll information
        let payrollData = {
            empID, lastname, firstname, middleInitial,
            civilStatus, employmentStatus, hoursWorked, regularRate: salaryRate,
            basicPay, overtimePay, taxDeduction, sssDeduction, 
            philHealthDeduction, pagIbigDeduction, grossEarnings,
            totalDeductions, netEarnings
        };

        // Converts payrollData object into JSON string
        // then stores as value in localStorage with
        // a key, named "payrollData"
        localStorage.setItem("payrollData", JSON.stringify(payrollData));
        // Redirect to payroll_results page
        window.location.href = "payroll_result.html";
    });
});