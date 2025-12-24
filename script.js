// Calculator State
let currentInput = '0';
let expression = '';
let result = '';
let isDarkMode = document.documentElement.classList.contains('dark');

// DOM Elements
const displayElement = document.getElementById('display');
const expressionElement = document.getElementById('expression');
const resultElement = document.getElementById('result');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleCircle = document.getElementById('theme-toggle-circle');

// Initialize display
updateDisplay();

// Theme toggle functionality
themeToggleBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        themeToggleCircle.classList.remove('translate-x-0');
        themeToggleCircle.classList.add('translate-x-7');
    } else {
        document.documentElement.classList.remove('dark');
        themeToggleCircle.classList.remove('translate-x-7');
        themeToggleCircle.classList.add('translate-x-0');
    }
});

// Button click handling
document.querySelectorAll('.number-btn, .operator-btn, .function-btn, .equal-btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const action = button.getAttribute('data-action');

        // Play click sound effect
        playClickSound();

        if (value !== null) {
            // Handle number or operator input
            handleInput(value);
        } else if (action !== null) {
            // Handle special actions
            handleAction(action);
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Numbers and operators
    if (/[\d+\-*/().]/.test(key)) {
        event.preventDefault();
        handleInput(key);
        playClickSound();
    }

    // Special keys
    switch (key) {
        case 'Enter':
        case '=':
            event.preventDefault();
            handleAction('equal');
            playClickSound();
            break;
        case 'Escape':
            event.preventDefault();
            handleAction('clear');
            playClickSound();
            break;
        case 'Backspace':
            event.preventDefault();
            handleAction('backspace');
            playClickSound();
            break;
        case 'p':
        case 'P':
            if (event.ctrlKey) break;
            event.preventDefault();
            handleInput('π');
            playClickSound();
            break;
    }

    // Highlight the pressed button
    highlightPressedButton(key);
});

// Functions
function handleInput(value) {
    // If current input is '0' or a result is showing, replace it
    if (currentInput === '0' || result !== '') {
        currentInput = '';
        if (result !== '') {
            expression = '';
            result = '';
        }
    }

    // Handle π input
    if (value === 'π') {
        currentInput += Math.PI.toString();
        expression += 'π';
    } else {
        currentInput += value;
        expression += value;
    }

    updateDisplay();
}

function handleAction(action) {
    switch (action) {
        case 'clear':
            currentInput = '0';
            expression = '';
            result = '';
            break;

        case 'backspace':
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
                expression = expression.slice(0, -1);
            } else {
                currentInput = '0';
                expression = '';
            }
            break;

        case 'sin':
        case 'cos':
        case 'tan':
            if (currentInput !== '0') {
                const angle = parseFloat(currentInput);
                let trigResult;

                switch (action) {
                    case 'sin': trigResult = Math.sin(angle * Math.PI / 180); break;
                    case 'cos': trigResult = Math.cos(angle * Math.PI / 180); break;
                    case 'tan': trigResult = Math.tan(angle * Math.PI / 180); break;
                }

                // Format the result
                trigResult = parseFloat(trigResult.toFixed(10));
                result = trigResult.toString();
                expression = `${action}(${currentInput}) =`;
                currentInput = result;
            }
            break;

        case 'pi':
            if (currentInput === '0' || result !== '') {
                currentInput = Math.PI.toString();
                expression = 'π';
            } else {
                currentInput += Math.PI.toString();
                expression += 'π';
            }
            break;

        case 'equal':
            try {
                // Replace π with Math.PI and trigonometric functions
                let evalExpression = expression
                    .replace(/π/g, Math.PI.toString())
                    .replace(/sin\(/g, 'Math.sin(Math.PI/180*')
                    .replace(/cos\(/g, 'Math.cos(Math.PI/180*')
                    .replace(/tan\(/g, 'Math.tan(Math.PI/180*')
                    .replace(/÷/g, '/')
                    .replace(/×/g, '*');

                // Add closing parentheses for trig functions if missing
                const trigOpenCount = (evalExpression.match(/Math\.(sin|cos|tan)\(/g) || []).length;
                const trigCloseCount = (evalExpression.match(/\)/g) || []).length;
                if (trigOpenCount > trigCloseCount) {
                    evalExpression += ')'.repeat(trigOpenCount - trigCloseCount);
                }

                // Evaluate the expression
                const evalResult = eval(evalExpression);
                result = parseFloat(evalResult.toFixed(10)).toString();
                expression += ' =';
                currentInput = result;
            } catch (error) {
                result = 'Error';
                expression = 'Invalid expression';
            }
            break;
    }

    updateDisplay();
}

function updateDisplay() {
    displayElement.textContent = currentInput;
    expressionElement.textContent = expression || 'Enter your expression';
    resultElement.textContent = result || '';

    // Scroll display to the end if content is too long
    displayElement.scrollLeft = displayElement.scrollWidth;
    expressionElement.scrollLeft = expressionElement.scrollWidth;
}

function playClickSound() {
    // Create a simple click sound using the Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio context not supported, continue silently
    }
}

function highlightPressedButton(key) {
    // Map keyboard keys to button data attributes
    const keyMap = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '.': '.', '+': '+', '-': '-', '*': '*', '/': '/',
        '(': '(', ')': ')', 'Enter': 'equal', '=': 'equal',
        'Escape': 'clear', 'Backspace': 'backspace'
    };

    const mappedKey = keyMap[key];
    if (mappedKey) {
        let button;
        if (key === 'Enter' || key === '=') {
            button = document.querySelector(`[data-action="equal"]`);
        } else if (key === 'Escape') {
            button = document.querySelector(`[data-action="clear"]`);
        } else if (key === 'Backspace') {
            button = document.querySelector(`[data-action="backspace"]`);
        } else {
            button = document.querySelector(`[data-value="${mappedKey}"]`) ||
                document.querySelector(`[data-action="${mappedKey}"]`);
        }

        if (button) {
            button.classList.add('opacity-80', 'scale-95');
            setTimeout(() => {
                button.classList.remove('opacity-80', 'scale-95');
            }, 100);
        }
    }
}