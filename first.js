const display = document.querySelector('.aaa');
const buttons = document.querySelectorAll('button');

buttons.forEach((item) => {
  item.onclick = () => {
    const buttonText = item.dataset.button;

    if (buttonText === 'C') {
      display.value = ''; // Clear display
    } else if (buttonText === 'CE') {
      display.value = display.value.slice(0, -1); // Clear last entry
    } else if (buttonText === '=') {
      try {
        display.value = eval(display.value); // Evaluate expression
      } catch (error) {
        display.value = 'Error';
      }
    } else {
      display.value += buttonText; // Append button value
    }
  };
});