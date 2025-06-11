const prompts = [
      "I know what covenant means",
      "I have or I am Worthy of a temple recommend",
      "Read no. 6 in some ways we can create a home to prepare our children to make & keep Temple covenants",
      "I will make and keep temple covenants",
      "I know the milestones of covenant path",
      "Read What Pres. Joseph Fielding smith taught about covenant",
      "Read no. 2 in some ways we can create a home to prepare our children to make & keep Temple covenants",
      "I know what priesthood is",
      "Read Nephi 14:14",
      "Read no. 3 in some ways we can create a home to prepare our children to make & keep Temple covenants",
      "Read no. 5 in some ways we can create a home to prepare our children to make & keep Temple covenants",
      "I can Recite D&C 82:10",
      "I know why my body is sacred",
      "Read no. 8 in  some ways we can create a home to prepare our children to make & keep Temple covenants",
      "I keep my covenants because I love Jesus Christ",
      "Read John 3:16",
      "Read no. 1 in  some ways we can create a home to prepare our children to make & keep Temple covenants",
      "Read John 14:21",
      "I know the steps of repentance",
      "I keep the sabbath day holy",
      "Read What Elder Jeffrey R. Holland taught about covenant",
      "Read no. 7 in  some ways we can create a home to prepare our children to make & keep Temple covenants",
      "Read Mosiah 27: 14",
      "Read no. 4 in  some ways we can create a home to prepare our children to make & keep Temple covenants",
      "BONUS"
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