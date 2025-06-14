const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clear = document.querySelector('.clear');
    const del = document.querySelector('.del');

    let current = '';
    let resetOnNextInput = false;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.textContent;

        if (resetOnNextInput && !['+', '-', '*', '/'].includes(value)) {
          current = '';
          resetOnNextInput = false;
        }

        if (value === '=') {
          try {
            if (current.includes('/0')) {
              current = 'nope.';
            } else {
              let result = eval(current);
              result = Math.round(result * 1000) / 1000; // round to 3 decimals
              current = result.toString();
            }
          } catch {
            current = 'Error';
          }
          resetOnNextInput = true;
        } else {
          current += value;
        }
        display.value = current;
      });
    });

    clear.addEventListener('click', () => {
      current = '';
      display.value = '';
    });

    del.addEventListener('click', () => {
      current = current.slice(0, -1);
      display.value = current;
    });