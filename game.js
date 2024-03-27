function startGame() {
  const gameArea = document.getElementById('gameArea');
  let haraboji = document.getElementById('haraboji'); // Check if haraboji already exists

  // If haraboji doesn't exist, create it and append to gameArea
  if (!haraboji) {
    haraboji = document.createElement('div');
    haraboji.id = 'haraboji';
    gameArea.appendChild(haraboji);
    // Apply initial styles, including the Haraboji image
    haraboji.style.position = 'absolute';
    haraboji.style.bottom = '10px';
    haraboji.style.width = '50px'; // Adjust size as needed
    haraboji.style.height = '100px'; // Adjust size as needed
    haraboji.style.backgroundImage = "url('https://i.ibb.co/WV2YcC3/hrb.webp')"; // Haraboji image
    haraboji.style.backgroundSize = 'cover';
    haraboji.style.left = '50%';
  }

  const scoreDisplay = document.getElementById('score');
  let score = 0;

  document.addEventListener('mousemove', (e) => {
    const gameAreaLeft = gameArea.getBoundingClientRect().left;
    haraboji.style.left = `${e.clientX - gameAreaLeft - haraboji.offsetWidth / 2}px`; // Center haraboji under mouse
  });

  function dropBeerMug() {
    const beerMug = document.createElement('div');
    beerMug.classList.add('beerMug');
    beerMug.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
    beerMug.style.position = 'absolute';
    beerMug.style.top = '0px';
    beerMug.style.width = '50px'; // Adjust size as needed
    beerMug.style.height = '50px'; // Adjust size as needed
    beerMug.style.backgroundImage = "url('https://i.ibb.co/H7Zm1g0/mug.webp')"; // Beer mug image
    beerMug.style.backgroundSize = 'cover';
    gameArea.appendChild(beerMug);

    function moveBeerMug() {
      const harabojiLeft = haraboji.offsetLeft;
      const harabojiRight = harabojiLeft + haraboji.offsetWidth;
      const beerMugLeft = beerMug.offsetLeft;
      const beerMugBottom = beerMug.offsetTop + beerMug.offsetHeight;

      if (beerMugBottom > gameArea.offsetHeight) {
        alert("Game Over!");
        clearInterval(dropInterval);
        location.reload(); // Restart the game
      } else if (beerMugLeft + beerMug.offsetWidth > harabojiLeft && beerMugLeft < harabojiRight && beerMugBottom >= gameArea.offsetHeight - haraboji.offsetHeight) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        beerMug.remove();
      } else {
        beerMug.style.top = `${beerMug.offsetTop + 2}px`;
      }
    }

    let moveInterval = setInterval(moveBeerMug, 20);
  }

  let dropInterval = setInterval(dropBeerMug, 2000);
}

document.getElementById('startGame').addEventListener('click', function() {
  document.getElementById('gameContainer').classList.remove('hidden'); // Show the game area
  startGame(); // Start the game
});
