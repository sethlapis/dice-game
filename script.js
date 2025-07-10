const colorMap = {
  A: 'RED',
  B: 'BLUE',
  C: 'WHITE',
  D: 'GREEN',
  E: 'YELLOW',
  F: 'PINK'
};

let pressedKeys = [];
const maxDice = 3;
const diceIds = ['die1', 'die2', 'die3'];

window.onload = () => {
  const rollSound = document.getElementById('roll-sound');

  document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();
    if (colorMap[key] && pressedKeys.length < maxDice) {
      pressedKeys.push(key);
    }
  });

  window.revealDice = function () {
    rollSound.currentTime = 0;
    rollSound.play().then(() => {
      console.log("Sound played!");
    }).catch(err => {
      console.warn("Browser blocked sound. Try clicking the page first.", err);
    });

    diceIds.forEach((id, i) => {
      const die = document.getElementById(id);
      die.style.animation = 'rollAnim 1s ease';
      die.textContent = '?';
      die.style.backgroundColor = '#555';
    });

    const finalColors = pressedKeys.map(k => colorMap[k] || null);

    setTimeout(() => {
      diceIds.forEach((id, i) => {
        const die = document.getElementById(id);
        const color = finalColors[i];
        if (color) {
          die.style.backgroundColor = color.toLowerCase();
          die.textContent = color;
        } else {
          die.style.backgroundColor = '#555';
          die.textContent = '?';
        }
        die.style.animation = '';
      });

      pressedKeys = [];
    }, 1000);
  };
};
