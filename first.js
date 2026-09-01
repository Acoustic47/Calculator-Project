const display = document.querySelector('.aaa');
const buttons = document.querySelectorAll('.aa button');
const historyDrawer = document.getElementById('history-drawer');
const historyList = document.getElementById('history-list');
const historyToggleBtn = document.getElementById('history-toggle');
const closeHistoryBtn = document.getElementById('close-history');
const clearHistoryBtn = document.getElementById('clear-history');

let currentInput = '';
let history = [];

function updateDisplay(val) {
  display.value = val;
}

function renderHistory() {
  historyList.innerHTML = '';
  
  if (history.length === 0) {
    historyList.innerHTML = '<li class="empty-msg">No calculations yet</li>';
    return;
  }

  history.slice().reverse().forEach((item) => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
      <span class="history-expr">${item.expression} =</span>
      <span class="history-res">${item.result}</span>
    `;
    li.onclick = () => {
      currentInput = String(item.result);
      updateDisplay(currentInput);
      historyDrawer.classList.remove('open');
    };
    historyList.appendChild(li);
  });
}

function handleInput(buttonText) {
  const operators = ['+', '-', '*', '/'];
  const lastChar = currentInput.slice(-1);

  if (buttonText === 'H') {
    historyDrawer.classList.add('open');
    return;
  }

  if (buttonText === 'C') {
    currentInput = '';
    updateDisplay('');
    return;
  }

  if (buttonText === 'CE') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
    return;
  }

  if (buttonText === '=') {
    if (!currentInput) return;
    try {
      const sanitized = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
      const result = Function(`'use strict'; return (${sanitized})`)();
      
      if (!isFinite(result)) {
        updateDisplay('Error');
        currentInput = '';
      } else {
        const resultString = String(result);
        history.push({ expression: currentInput, result: resultString });
        renderHistory();

        currentInput = resultString;
        updateDisplay(currentInput);
      }
    } catch (error) {
      updateDisplay('Error');
      currentInput = '';
    }
    return;
  }

  if (operators.includes(buttonText) && operators.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + buttonText;
    updateDisplay(currentInput);
    return;
  }

  if (buttonText === '.' && currentInput.split(/[\+\-\*\/]/).pop().includes('.')) {
    return;
  }

  currentInput += buttonText;
  updateDisplay(currentInput);
}

buttons.forEach((item) => {
  item.onclick = () => {
    const buttonText = item.dataset.button;
    handleInput(buttonText);
  };
});

closeHistoryBtn.onclick = () => {
  historyDrawer.classList.remove('open');
};

clearHistoryBtn.onclick = () => {
  history = [];
  renderHistory();
};

document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    handleInput(key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    handleInput('=');
  } else if (key === 'Backspace') {
    handleInput('CE');
  } else if (key === 'Escape') {
    if (historyDrawer.classList.contains('open')) {
      historyDrawer.classList.remove('open');
    } else {
      handleInput('C');
    }
  } else if (key.toLowerCase() === 'h') {
    historyDrawer.classList.toggle('open');
  }
});