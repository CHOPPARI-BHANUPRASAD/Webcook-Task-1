// Calculator class to handle all functionalities
class Calculator {
    constructor(screenElement) {
        // Reference to the screen element
        this.screenElement = screenElement;
        // Initialize the calculator
        this.reset();
    }

    // Method to reset the calculator
    reset() {
        this.currentValue = '0';  // Current value displayed on the screen
        this.prevValue = '';      // Previous value stored for operations
        this.operator = null;     // Operator for the current calculation
        this.updateScreen();      // Update the screen display
        this.screenElement.style.backgroundColor = '#1f127888'; // Reset the screen color
    }

    // Method to append number or decimal to the current value
    appendNumber(number) {
        // Prevent multiple leading zeros
        if (this.currentValue === '0' && number !== '.') {
            this.currentValue = number;
        } else {
            this.currentValue += number;
        }
        this.updateScreen();  // Update the screen display
    }

    // Method to handle operator button press
    chooseOperator(operator) {
        if (this.currentValue === '') return;  // Do nothing if no current value
        if (this.prevValue !== '') {
            this.calculate();  // Perform calculation if previous value exists
        }
        this.operator = operator;  // Set the chosen operator
        this.prevValue = this.currentValue;  // Store current value as previous
        this.currentValue = '';  // Reset current value for next input
    }

    // Method to perform calculation
    calculate() {
        let computation;
        const prev = parseFloat(this.prevValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current)) return;  // Exit if values are invalid
        // Perform operation based on the operator
        switch (this.operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentValue = computation.toString();  // Store result as current value
        this.operator = null;  // Reset operator
        this.prevValue = '';  // Clear previous value
        this.updateScreen();  // Update the screen display
        this.changeScreenColor(); // Change screen color after calculation
    }

    // Method to update the screen display
    updateScreen() {
        this.screenElement.innerText = this.currentValue;
    }

    // Method to change the screen color
    changeScreenColor() {
        this.screenElement.style.background='linear-gradient(120deg,#383cb6, #e7701b)'; // Change to desired color
    }

    // Method to handle button presses
    handleButtonPress(value) {
        if (!isNaN(value) || value === '.') {
            this.appendNumber(value);  // Append number or decimal
        } else if (value === 'all-clear') {
            this.reset();  // Reset the calculator
        } else if (value === '=') {
            this.calculate();  // Perform calculation
        } else {
            this.chooseOperator(value);  // Choose an operator
        }
    }
}

// Get reference to the calculator screen element
const screenElement = document.getElementById('calculator-screen');
// Instantiate the Calculator class
const calculator = new Calculator(screenElement);

// Add event listeners to all calculator buttons
const buttons = document.querySelectorAll('.calculator-keys .key');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.handleButtonPress(button.value);
    });
});
