// Separation of Concerns

/* 
    1. Get input from user
        1. (money amount) amount of money loaned in dollars
        2. (# of months) time in loan will be repaid, in months
        3. (rate) percentage rate at which interest will accrue on the loan
    

    2. Do Math --Functions--
------------------------------- Formulas ------------------------------
Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)(-Number of Months) )
Remaining Balance before the very first month equals the amount of the loan.
Interest Payment = Previous Remaining Balance * rate/1200
Principal Payment = Total Monthly Payment - Interest Payment
At end each month, Remaining Balance = Previous Remaining Balance - principal payments


    3. Display/Output 6 pieces of info in a table (all in separate columns) - can put them in objects in an array to display
        1. Month - 1 is 1st month of payment - all the way to last month
        2. Payment amount
        3. Principal paid this month
        4. Interest paid this month
        5. Total interest paid to date
        6. remaining loan balance at the end of the month

*/


// Element IDs
// Inputs - loanAmountInput termMonthsInput interestRateInput

function getValues() {
    // get inputs
    let loanAmount = parseInt(document.getElementById('loanAmountInput').value);
    let termMonths = parseInt(document.getElementById('termMonthsInput').value);
    let interestRate = parseInt(document.getElementById('interestRateInput').value);


    if (isNaN(loanAmount) || isNaN(termMonths) || isNaN(interestRate) || loanAmount <= 0 || termMonths <= 0 || interestRate <= 0) {
        Swal.fire(
            {
                backdrop: false,
                title: 'Please Enter Valid Numbers',
            }
        );
    } else {

        let mortgageArray = calculateAll(loanAmount, termMonths, interestRate);
    
        displayTitleData(mortgageArray, loanAmount, termMonths)
        displayValues(mortgageArray, loanAmount);
    }


}


// Total Monthly Payment = (amount loaned) * (rate/1200) / (1 – (1 + rate/1200)(-Number of Months) )
// Remaining Balance before the very first month equals the amount of the loan.
// Interest Payment = Previous Remaining Balance * rate/1200
// Principal Payment = Total Monthly Payment - Interest Payment
// At end each month, Remaining Balance = Previous Remaining Balance - principal payments

// need to loop through every month
function calculateAll(loanAmount, termMonths, interestRate) {

    // Remaining Balance before the very first month equals the amount of the loan.
    let tableData = [];
   
    let remainingBalance = loanAmount; 
    
    let totalMonthlyPayment = (loanAmount) * (interestRate/1200) / (1 - (1 + interestRate/1200)**(-termMonths));
    let interestPayment = remainingBalance * interestRate/1200;
    let totalInterestPayment = 0;
    let principalPayment = totalMonthlyPayment - interestPayment;
    let principalPaymentSum = 0;

    let i = 1;

    // 1. Month - 1 is 1st month of payment - all the way to last month
    // 2. Payment amount
    // 3. Principal paid this month
    // 4. Interest paid this month
    // 5. Total interest paid to date
    // 6. remaining loan balance at the end of the month
    
    for( termMonths; termMonths > 0; termMonths-- ) {
        // do the math for each month

        principalPaymentSum = principalPaymentSum + principalPayment;


        if (remainingBalance - principalPayment <= 0) {
            principalPayment = remainingBalance - interestPayment;
            remainingBalance = 0;
        } else {
            remainingBalance = remainingBalance - principalPayment;
        }
        
        totalInterestPayment = totalInterestPayment + interestPayment;
        
        let tableObject = {
            monthNum: i,
            paymentAmount: totalMonthlyPayment,
            principalAmount: principalPayment,
            interestAmount: interestPayment,
            totalInterestAmount: totalInterestPayment,
            remainingBalanceAmount: remainingBalance
        }; 


        interestPayment = remainingBalance * interestRate/1200;
        principalPayment = totalMonthlyPayment - interestPayment;
        
        i++

        tableData.push(tableObject);
    }


    return tableData;

}





function displayValues(mortgageObjectArray) {
    let tableBody = document.getElementById('mortgageTableBody');
    const mortgageTableRowTemplate = document.getElementById('mortgageTableRowTemplate');

    tableBody.innerHTML = "";

    for(let i = 0; i < mortgageObjectArray.length; i++) {
        let mortgageRow = document.importNode(mortgageTableRowTemplate.content, true);
        let currentMonth = mortgageObjectArray[i];


        // <!-- Table Row Template -->
        // <template id="mortgageTableRowTemplate">
        //     <tr>
        //         <td data-id="mortMonth"></td>
        //         <td data-id="mortPayment"></td>
        //         <td data-id="mortPrincipal"></td>
        //         <td data-id="mortInterest"></td>
        //         <td data-id="mortTotalInterest"></td>
        //         <td data-id="mortBalance"></td>
        //     </tr>
        // </template>

        // monthNum: i,
        // paymentAmount: totalMonthlyPayment,
        // principalAmount: principalPayment,
        // interestAmount: interestPayment,
        // totalInterestAmount: totalInterestPayment,
        // remainingBalanceAmount: remainingBalance

        // this is an array of the <td>'s from the template - were going to change them 
        let tableCells = mortgageRow.querySelectorAll('td');

        tableCells[0].textContent = currentMonth.monthNum;
        tableCells[1].textContent = currentMonth.paymentAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );
        tableCells[2].textContent = currentMonth.principalAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );
        tableCells[3].textContent = currentMonth.interestAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );
        tableCells[4].textContent = currentMonth.totalInterestAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );
        tableCells[5].textContent = currentMonth.remainingBalanceAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );


        tableBody.appendChild(mortgageRow);
    }

}


// 
// payment, principal, interest, cost

function displayTitleData(mortgageObjectArray, fullLoan, months) {


        let payment = mortgageObjectArray[0].paymentAmount;
        let lastMonth = months - 1;
        let totalInterest = mortgageObjectArray[lastMonth].totalInterestAmount;
        let totalCost = fullLoan + totalInterest;

        // Monthly Payment Amount (totalMonthlyPayment)

        // Loan Amount
        // Total Interest - array[termMonths - 1]
        // Loan Amount + Total Interest
    
        document.getElementById('payment').textContent = "$" +  payment.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );


        document.getElementById('principal').textContent = "$" + fullLoan.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );


        document.getElementById('interest').textContent = "$" +  totalInterest.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );


        document.getElementById('cost').textContent = "$" +  totalCost.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );



}


function displayValuesPercents(mortgageObjectArray, fullLoan) {
    let tableBody = document.getElementById('mortgageTableBody');
    const mortgageTableRowTemplate = document.getElementById('mortgageTableRowTemplate');

    tableBody.innerHTML = "";

    for(let i = 0; i < mortgageObjectArray.length; i++) {
        let mortgageRow = document.importNode(mortgageTableRowTemplate.content, true);
        let currentMonth = mortgageObjectArray[i];

        let tableCells = mortgageRow.querySelectorAll('td');
        let tableRowColor = mortgageRow.querySelector('tr');


        if ((i + 1) % 12 == 0) {

            tableRowColor.classList.add('bg-highlight', 'text-dark');

        } else if (currentMonth.remainingBalanceAmount <= fullLoan * .25) {

            tableRowColor.classList.add('table-danger')
        
        } else if (currentMonth.remainingBalanceAmount <= fullLoan * .5) {

            tableRowColor.classList.add('app-bg')
        
        } else if (currentMonth.remainingBalanceAmount <= fullLoan * .75) {

            tableRowColor.classList.add('side-bg')
        }



        tableCells[0].textContent = currentMonth.monthNum;
        tableCells[1].textContent = currentMonth.paymentAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );
        tableCells[2].textContent = currentMonth.principalAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );
        tableCells[3].textContent = currentMonth.interestAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );
        tableCells[4].textContent = currentMonth.totalInterestAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );
        tableCells[5].textContent = currentMonth.remainingBalanceAmount.toLocaleString(
            "en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
            }
        );


        tableBody.appendChild(mortgageRow);
    }

}



function getValuesPercents() {
    // get inputs
    let loanAmount = parseInt(document.getElementById('loanAmountInput').value);
    let termMonths = parseInt(document.getElementById('termMonthsInput').value);
    let interestRate = parseInt(document.getElementById('interestRateInput').value);


    if (isNaN(loanAmount) || isNaN(termMonths) || isNaN(interestRate) || loanAmount <= 0 || termMonths <= 0 || interestRate <= 0) {
        Swal.fire(
            {
                backdrop: false,
                title: 'Please Enter Valid Numbers',
            }
        );
    } else {

        let mortgageArray = calculateAll(loanAmount, termMonths, interestRate);
    
        displayTitleData(mortgageArray, loanAmount, termMonths)
        displayValuesPercents(mortgageArray, loanAmount);
    }


}