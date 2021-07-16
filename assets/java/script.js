/** Order of what options are available */
const deck = [

    {
      image: "/../../assets/img/paper.png",
      name: "Paper",
    },
    {
      image: "/../../assets/img/rock.png",
      name: "Rock",
    },
    {
      image: "/../../assets/img/scissor.png",
      name: "Scissor",
    },
    {
      image: "/../../assets/img/spock.png",
      name: "Spock",
    },
    {
      image: "/../../assets/img/lizard.png",
      name: "Lizard",
    },
  ];
  
  /** This is rules of what can beat whom */
  const rule = {
    Lizard: ["Spock", "Paper"],
  
    Paper: ["Rock", "Spock"],
  
    Rock: ["Lizard", "Scissor"],
  
    Scissor: ["Paper", "Lizard"],
  
    Spock: ["Scissor", "Rock"],
  };
  /** Folder where images are stored */
  const imageFolderPath = "./assets/img";
  
  /** All the options of user */
  var userOptions;
  
  /** All the options of bot */
  var computerOptions;
  
  /** Where selected option of user will be shown */
  var userChoiceArea;
  
  /** Where selected option of bot will be shown */
  var computerChoiceArea;
  
  /** Aser and bot score */
  var userScore;
  var computerScore;
  var gameLimit = 0;
  var isGameLimited = false;
  var gameMode = '';
  /** Where message will be shown*/
  var roundMessage;
  
  
  
  const play = (e) => {
    /** Get the index of the option selected by player*/
    const user = e.getAttribute("data-index");
  
    /** Number of options available*/
    const length = deck.length;
  
    /** Generate a random number between number of options available for bot*/
    var computer;
    if (gameMode == 'modern') {
      computer = Math.floor(Math.random() * length);
    } else {
      computer = Math.floor(Math.random() * length - 2);
    }
    /** Show the users selected option and highlight it*/
    showUserOption(user, userChoiceArea);
    highlightSelectedOption(user, userOptions);
  
    /** Show the bot selected option*/
    showUserOption(computer, computerChoiceArea);
    highlightSelectedOption(computer, computerOptions);
  
    /** Calculate the result*/
    calculateScore(user, computer);
  
  };
  
  /** Generate an image element*/
  const generateImgElement = (index) => {
    const { image, name } = deck[index];
    const imgElement = document.createElement("img");
    imgElement.src = `${imageFolderPath}/${assets}/${image}`;
    imgElement.alt = name;
    imgElement.title = name;
    return imgElement;
  };
  
  /** Show selected option*/
  const showUserOption = (index, showArea) => {
    /** Append the generated image to the show area*/
    const imgElement = generateImgElement(index);
    showArea.innerHTML = "";
    showArea.append(imgElement);
  };
  
  const highlightSelectedOption = (index, options) => {
    /** Remove the active class from all options*/
    options.forEach((e) => {
      e.classList.remove("active");
    });
  
    /** Add the active class to the selected option*/
    options[index].classList.add("active");
  };
  
  /** Change the score*/
  const addScore = (player) => {
    const { innerHTML } = player;
    player.innerHTML = Number(innerHTML) + 1;
  };
  
  /** Show the message*/
  const showMessage = (msg) => {
    roundMessage.innerHTML = "";
    roundMessage.innerHTML = msg;
  };
  
  const calculateScore = (user, computer) => {
  
    /** User choice*/
    const userChoice = deck[user].name;
  
    /** Bot choice*/
    const computerChoice = deck[computer].name;
  
    /** Get user selected choice rule*/
    const userStronger = rule[userChoice];
  
    /** Check the case and who wins the round*/
    if (userChoice === computerChoice) {
      showMessage("Tie");
    } else if (userStronger.includes(computerChoice)) {
      /** Update the score and show message who won the round "USER" */
      addScore(userScore);
      showMessage("you won this round!");
    } else {
      /** Update the score and show message who won the round "COMPUTER" */
      addScore(computerScore);
      showMessage("you lost this round!");
    }
    /** Check if game is limited */
    if (isGameLimited == true) {
      /** Check for User score is reached the game limit */
      if (userScore.innerHTML == gameLimit) {
        showMessage('Congratulations You won the game!')
      }
      /** Check for computer score is reached the game limit */
      if (computerScore.innerHTML == gameLimit) {
        showMessage('Oops You lost the game!')
      }
    }
  };
  
  /** Reset the game */
  const reset = () => {
    computerChoiceArea.innerHTML = "";
    userChoiceArea.innerHTML = "";
    roundMessage.innerHTML = "Choose your Move";
    computerScore.innerHTML = "0";
    userScore.innerHTML = "0";
    userOptions.forEach((e) => {
      e.classList.remove("active");
    });
    computerOptions.forEach((e) => {
      e.classList.remove("active");
    });
  };
  
  function startGame(numberOfRounds, gameMode) {
    this.gameMode = gameMode;
    if (gameMode == 'classic') {
      launchClassicGame();
    } else {
      launchModernGame();
    }
  
    userOptions = document.querySelectorAll(
      "#user .available-options .option"
    );
    userOptions.forEach((e) => {
      e.addEventListener("click", () => {
        play(e);
      });
    });
  
    computerOptions = document.querySelectorAll(
      "#computer .available-options .option"
    );
  
    userChoiceArea = document.querySelector(
      "#user .selected-option .option"
    );
  
    computerChoiceArea = document.querySelector("#computer .selected-option .option");
  
    userScore = document.querySelector("#user-score");
    computerScore = document.querySelector("#computer-score");
    roundMessage = document.querySelector("#round-message");
  
    var startScreen = document.getElementById("startScreen");
    var gameScreen = document.getElementById("gameScreen");
    if (startScreen.style.display === "none") {
      startScreen.style.display = "block";
      gameScreen.style.display = "none";
    } else {
      startScreen.style.display = "none";
      gameScreen.style.display = "block";
      /** check if numberOfRounds is -1 the isGameLimiter is false */
      if (numberOfRounds != -1) {
        isGameLimited = true;
      }
      gameLimit = numberOfRounds;
  
    }
  
    function launchModernGame() {
      document.getElementById("gameScreen").innerHTML = `
      <div id="modern">
        <!-- Result -->
        <section id="result">
          <div id="score">
            <span id="user-score" class="points">0</span>
            :
            <span id="computer-score" class="points">0</span>
          </div>
          <p id="round-message">Choose your move</p>
        </section>
        <!-- Player / User deck -->
        <section id="user" class="players">
          <span class="name">You!</span>
          <div class="selected-option">
            <span class="option" data-index="0"> </span>
          </div>
          <div class="available-options">
           
            <span class="option" data-index="0">
              <img src="./assets/img/paper.png" alt="Paper" title="Paper" />
            </span>
            <span class="option" data-index="1">
              <img src="./assets/img/rock.png" alt="Rock" title="Rock" />
            </span>
            <span class="option" data-index="2">
              <img src="./assets/img/scissor.png" alt="Scissor" title="Scissor" />
            </span>
            <span class="option" data-index="3">
              <img src="./assets/img/spock.png" alt="Spock" title="Spock" />
            </span>
            <span class="option" data-index="4">
              <img src="./assets/img/lizard.png" alt="Lizard" title="Lizard" />
            </span>
          </div>
        </section>
  
        <!-- Computer deck -->
        <section id="computer" class="players">
          <span class="name">Robot!</span>
          <div class="selected-option">
            <span class="option" data-index="0"> </span>
          </div>
          <div class="available-options">
           
            <span class="option" data-index="0">
              <img src="./assets/img/paper.png" alt="Paper" title="Paper" />
            </span>
            <span class="option" data-index="1">
              <img src="./assets/img/rock.png" alt="Rock" title="Rock" />
            </span>
            <span class="option" data-index="2">
              <img src="./assets/img/scissor.png" alt="Scissor" title="Scissor" />
            </span>
            <span class="option" data-index="3">
              <img src="./assets/img/spock.png" alt="Spock" title="Spock" />
            </span>
            <span class="option" data-index="4">
              <img src="./assets/img/lizard.png" alt="Lizard" title="Lizard" />
            </span>
          </div>
        </section>
      </div>`;
    }
  
    function launchClassicGame() {
      document.getElementById("gameScreen").innerHTML = `    <div id="classic">
      <!-- Result -->
      <section id="result">
        <div id="score">
          <span id="user-score" class="points">0</span>
          :
          <span id="computer-score" class="points">0</span>
        </div>
        <p id="round-message">Choose your move</p>
      </section>
      <!-- Player / User deck -->
      <section id="user" class="players">
        <span class="name">You!</span>
        <div class="selected-option">
          <span class="option" data-index="0"> </span>
        </div>
        <div class="available-options">
          <span class="option" data-index="0">
            <img src="./assets/img/paper.png" alt="Paper" title="Paper" />
          </span>
          <span class="option" data-index="1">
            <img src="./assets/img/rock.png" alt="Rock" title="Rock" />
          </span>
          <span class="option" data-index="2">
            <img src="./assets/img/scissor.png" alt="Scissor" title="Scissor" />
          </span>
        </div>
      </section>
  
      <!-- Computer deck -->
      <section id="computer" class="players">
        <span class="name">Robot!</span>
        <div class="selected-option">
          <span class="option" data-index="0"> </span>
        </div>
        <div class="available-options">
          <span class="option" data-index="0">
            <img src="./assets/img/paper.png" alt="Paper" title="Paper" />
          </span>
          <span class="option" data-index="1">
            <img src="./assets/img/rock.png" alt="Rock" title="Rock" />
          </span>
          <span class="option" data-index="2">
            <img src="./assets/img/scissor.png" alt="Scissor" title="Scissor" />
          </span>
        </div>
      </section>
    </div>`;
    }
  }