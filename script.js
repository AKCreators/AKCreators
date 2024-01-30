document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
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
                break;
            case 'backspace':
                display.innerText = display.innerText.slice(0, -1);
                break;
            case 'equal':
                try {
                    const result = Function(`return ${display.innerText}`)();
                    display.innerText = result;
                } catch (error) {
                    display.innerText = 'Error';
                    setTimeout(() => (display.innerText = ''), 2000);
                }
                break;
            case 'sin':
                display.innerText += 'Math.sin(';
                break;
            case 'cos':
                display.innerText += 'Math.cos(';
                break;
            case 'tan':
                display.innerText += 'Math.tan(';
                break;
            case 'pi':
                display.innerText += 'pi';
                break;
            default:
                display.innerText += buttonId;
        }
    }
});
