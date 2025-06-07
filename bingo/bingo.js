const prompts = [
      "Reads the Book of Mormon daily",
      "Has been to the temple this year",
      "Shares the gospel on social media",
      "Fasted for someone else",
      "Has served someone this week",
      "Has a patriarchal blessing",
      "Said a prayer today",
      "Invited someone to church for tomorrow’s conference",
      "Brought a physical scripture tonight",
      "Testified this month",
      "Watches Book of Mormon videos",
      "Writes a journal",
      "FREE SPACE (Christ is at the center!)",
      "Studied Come, Follow Me",
      "Can recite Moroni 10:32",
      "Has a temple recommend",
      "Invited someone to FHE tonight",
      "Has taught a primary class",
      "Attended seminary or institute",
      "Can name a General Authority",
      "Believes in personal revelation",
      "Has seen prayers answered",
      "Served a mission (Bonus!)",
      "Can recite an Article of Faith",
      "Felt the Spirit this week"
    ];

    const board = document.getElementById("bingo-board");
    const message = document.getElementById("win-message");

    let hasWon = false;

    window.speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.getVoices(); // preload
    };

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function createBoard() {
      board.innerHTML = "";
      message.style.display = "none";
      hasWon = false;
      const cells = prompts.slice();
      shuffle(cells);

      for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;

        if (i === 12) {
          cell.textContent = "FREE SPACE";
          cell.classList.add("center", "marked");
        } else {
          cell.textContent = cells[i];
          cell.addEventListener("click", () => {
            cell.classList.toggle("marked");
            checkWin();
          });
        }

        board.appendChild(cell);
      }
    }

    function checkWin() {
      if (hasWon) return; // prevent multiple wins

      const marked = Array.from(board.children).map(cell =>
        cell.classList.contains("marked")
      );

      const lines = [
        [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14],
        [15,16,17,18,19], [20,21,22,23,24],
        [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22],
        [3,8,13,18,23], [4,9,14,19,24],
        [0,6,12,18,24], [4,8,12,16,20]
      ];

      for (const line of lines) {
        if (line.every(i => marked[i])) {
          hasWon = true;
          message.style.display = "block";
          speakCongratulations();
          launchConfetti();
          return;
        }
      }
    }

    function speakCongratulations() {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance("Congratulations! You win the Come Unto Christ Bingo Game!");
        utterance.lang = 'en-US';
        const voices = speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang === 'en-US' && v.name.includes("Google")) || voices[0];
        if (voice) utterance.voice = voice;
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
      }
    }

    function launchConfetti() {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    function resetBoard() {
      createBoard();
    }

    createBoard();