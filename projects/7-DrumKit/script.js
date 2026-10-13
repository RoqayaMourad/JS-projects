window.addEventListener('keydown', handleKeydown);
const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener('transitionend', removeTransition))
keys.forEach(key => key.addEventListener('click', () => playSound(key.dataset.key))) //mouse click and touch

function handleKeydown(e) {
  if (e.repeat) return; //holding a key down counts as one press
  const focusedKey = e.target.closest ? e.target.closest('.key') : null;
  if (focusedKey && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault(); //stop space from scrolling the page
    playSound(focusedKey.dataset.key);
    return;
  }
  playSound(e.keyCode);
};

function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key='${keyCode}']`);
  const key = document.querySelector(`.key[data-key='${keyCode}']`);
  if (!audio) return; //stop the function from running all together
  audio.currentTime = 0; //rewind to the start when i press ex:fffffff
  audio.play();
  key.classList.add('playing'); //add te animation 
  clearTimeout(key.playingTimer); //clear the highlight even if transitionend does not fire
  key.playingTimer = setTimeout(() => key.classList.remove('playing'), 150);
};

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
};
