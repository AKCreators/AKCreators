
document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const result = document.getElementById('result'); // Result element
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            handleButtonClick(button.id);
        });
    });

    function handleButtonClick(buttonId) {
        switch (buttonId) {
            case 'clear':
                display.innerText = '';
                result.innerText = ''; // Clear result
                break;
            case 'backspace':
                display.innerText = display.innerText.slice(0, -1);
                break;
            case 'equal':
                try {
                    let expression = display.innerText.replace(/π/g, Math.PI);
                    const evaluatedResult = evaluateExpression(expression);
                    result.innerText = evaluatedResult; // Display result
                } catch (error) {
                    result.innerText = 'Error'; // Handle error
                    setTimeout(() => {
                        result.innerText = '';
                    }, 2000);
                }
                break;
            case 'sin':
                display.innerText += 'sin(';
                break;
            case 'cos':
                display.innerText += 'cos(';
                break;
            case 'tan':
                display.innerText += 'tan(';
                break;
            case 'pi':
                display.innerText += 'π'; // Use π symbol
                break;
            default:
                display.innerText += buttonId; // For numbers and other inputs
        }
    }

    function evaluateExpression(expression) {
        // Handle trigonometric functions
        const regex = /([a-z]+)\(([^)]+)\)/g; // Matches sin(x), cos(x), tan(x)

        expression = expression.replace(regex, (match, func, arg) => {
            const degrees = parseFloat(arg);
            let result;

            switch (func) {
                case 'sin':
                    result = Math.sin(degrees * (Math.PI / 180)); // Convert degrees to radians
                    break;
                case 'cos':
                    result = Math.cos(degrees * (Math.PI / 180)); // Convert degrees to radians
                    break;
                case 'tan':
                    result = Math.tan(degrees * (Math.PI / 180)); // Convert degrees to radians
                    break;
                default:
                    return match; // Return the original match if no function found
            }

            return result; // Replace the function call with the calculated result
        });

        // Evaluate the rest of the expression safely
        return Function(`'use strict'; return (${expression})`)();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const result = document.getElementById('result'); // Result element
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            handleButtonClick(button.id);
        });
    });

    function handleButtonClick(buttonId) {
        switch (buttonId) {
            case 'clear':
                display.innerText = '';
                result.innerText = ''; // Clear result
                break;
            case 'backspace':
                display.innerText = display.innerText.slice(0, -1);
                break;
            case 'equal':
                try {
                    let expression = display.innerText.replace(/π/g, Math.PI);
                    const evaluatedResult = evaluateExpression(expression);
                    result.innerText = evaluatedResult; // Display result
                } catch (error) {
                    result.innerText = 'Error'; // Handle error
                    setTimeout(() => {
                        result.innerText = '';
                    }, 2000);
                }
                break;
            case 'sin':
                display.innerText += 'sin(';
                break;
            case 'cos':
                display.innerText += 'cos(';
                break;
            case 'tan':
                display.innerText += 'tan(';
                break;
            case 'pi':
                display.innerText += 'π'; // Use π symbol
                break;
            default:
                display.innerText += buttonId; // For numbers and other inputs
        }
    }

    function evaluateExpression(expression) {
        // Handle trigonometric functions
        const regex = /([a-z]+)\(([^)]+)\)/g; // Matches sin(x), cos(x), tan(x)

        expression = expression.replace(regex, (match, func, arg) => {
            const degrees = parseFloat(arg);
            let result;

            switch (func) {
                case 'sin':
                    result = Math.sin(degrees * (Math.PI / 180)); // Convert degrees to radians
                    break;
                case 'cos':
                    result = Math.cos(degrees * (Math.PI / 180)); // Convert degrees to radians
                    break;
                case 'tan':
                    result = Math.tan(degrees * (Math.PI / 180)); // Convert degrees to radians
                    break;
                default:
                    return match; // Return the original match if no function found
            }

            return result; // Replace the function call with the calculated result
        });

        // Evaluate the rest of the expression safely
        return Function(`'use strict'; return (${expression})`)();
    }
});

