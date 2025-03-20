function formatPrice(value) {
    return parseFloat(value).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

$(document).ready(function () {
    // Fetches the stored string using the key "payrollData"
    // then converts the JSON string back into a JavaScript object
    let payrollData = JSON.parse(localStorage.getItem("payrollData"));

    // If the passing of data is interrupted 
    // or lost, then it gives an error message 
    // and returns to the input page
    if (!payrollData) {
        alert("No payroll data found.");
        window.location.href = "payroll_system.html";
        return;
    }

    let data = `
        <tr><th>Employee ID</th><td>${payrollData.empID}</td></tr>
        <tr><th>Last Name</th><td>${payrollData.lastname}</td></tr>
        <tr><th>First Name</th><td>${payrollData.firstname}</td></tr>
        <tr><th>Middle Initial</th><td>${payrollData.middleInitial}</td></tr>
        <tr><th>Civil Status</th><td>${payrollData.civilStatus}</td></tr>
        <tr><th>Employment Status</th><td>${payrollData.employmentStatus}</td></tr>
        <tr><th>Hours Worked</th><td>${payrollData.hoursWorked}</td></tr>
        <tr><th>Regular Rate per Hour</th><td>${formatPrice((payrollData.regularRate / 8))}</td></tr>
        <tr><th>Basic Pay</th><td>${formatPrice(payrollData.basicPay)}</td></tr>
        <tr><th>Overtime Pay</th><td>${formatPrice(payrollData.overtimePay)}</td></tr>
        <tr><th>Gross Earnings</th><td>${formatPrice(payrollData.grossEarnings)}</td></tr>
        <tr><th>Withholding Tax</th><td>${formatPrice(payrollData.taxDeduction)}</td></tr>
        <tr><th>SSS Deduction</th><td>${formatPrice(payrollData.sssDeduction)}</td></tr>
        <tr><th>PhilHealth Deduction</th><td>${formatPrice(payrollData.philHealthDeduction)}</td></tr>
        <tr><th>Pag-Ibig Deduction</th><td>${formatPrice(payrollData.pagIbigDeduction)}</td></tr>
        <tr><th>Total Deductions</th><td>${formatPrice(payrollData.totalDeductions)}</td></tr>
        <tr><th>Net Earnings</th><td>${formatPrice(payrollData.netEarnings)}</td></tr>
    `;

    $("#payrollSummary").html(data);

    $("#backBtn").click(function () {
        // Redirect back to payroll_system page
        window.location.href = "payroll_system.html";
    });
});