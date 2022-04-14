(function(){
  function buildQuiz(){
    const output = [];
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        const answers = `<p>${currentQuestion.leftside}: <span class="sliderValLeft"></span> <span class="rightside">${currentQuestion.rightside}: <span class="sliderValRight"></span></span></p>
        <div class="slidecontainer">
          <input type="range" min="0" max="100" value="50" class="slider" name="question${questionNumber}">
        </div>`;
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers} </div>
          </div>`
        );
      }
    );
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){
    var container = document.getElementsByClassName("quiz-container")[0];
    container.remove();
    slides[currentSlide].classList.remove('active-slide');
    previousButton.style.display = 'none';
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
    const allianceAnswers = {
      "Sample AA 1": [30, 35, 42, 47, 54, 58, 59, 68, 72, 81],
      "Sample AA 2": [8, 30, 36, 42, 48, 64, 65, 66, 69, 98],
      "Sample AA 3": [6, 33, 47, 65, 71, 73, 83, 90, 91, 98],
      "Sample AA 4": [5, 8, 18, 22, 37, 59, 63, 66, 67, 74],
      "Sample AA 5": [9, 23, 25, 31, 32, 38, 61, 70, 94, 95]
    };
    const allianceDescriptions = {
      "Sample AA 1": `<div><img src="https://politicsandwar.com/uploads/44281a3850798414f684dd71788f77f00934c81a500x300138.png" class="flag"><span class="allianceDescription">Sample description 1</span></div>`,
      "Sample AA 2": `<div><img src="https://politicsandwar.com/uploads/1ab161553c17912765716fddd8da7ec96c4a93a5500x300173.png" class="flag"><span class="allianceDescription">Sample description 2</span></div>`,
      "Sample AA 3": `<div><img src="https://politicsandwar.com/uploads/4943f976375bf77cafa3a32b9df7772dd8d5da1a500x300258.png" class="flag"><span class="allianceDescription">Sample description 3</span></div>`,
      "Sample AA 4": `<div><img src="https://politicsandwar.com/uploads/116d84b394b17c1268802788270d33c81370a6ebx767.png" class="flag"><span class="allianceDescription">Sample description 4</span></div>`,
      "Sample AA 5": `<div><img src="https://politicsandwar.com/img/imgur-old/e615124b5ba48f1706ed7c822a749cdc89280a89711.png" class="flag"><span class="allianceDescription">Sample description 5</span></div>`,
    };
    const answerContainers = quizContainer.querySelectorAll('.slider');
    let allianceSimilarities = {};
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const userAnswer = answerContainer.value;
      for(var alliance in allianceAnswers){
        if(!(alliance in allianceSimilarities)){
          allianceSimilarities[alliance] = 0;
        }
        allianceSimilarities[alliance] += (allianceAnswers[alliance][questionNumber] - userAnswer)**2;
        if(questionNumber == myQuestions.length - 1){
          var distance = allianceSimilarities[alliance]**0.5;
          allianceSimilarities[alliance] = 100 - Math.round(distance / ((10000*myQuestions.length)**0.5) * 100);
        }
      }
    });
    var sortedSimilarities = Object.keys(allianceSimilarities).map(function(key){
      return [key, allianceSimilarities[key]];
    });
    sortedSimilarities.sort(function(first, second){
      return second[1] - first[1];
    });
    resultsContainer.innerHTML = '';
    for(var i = 0; i < 5; i++){
      resultsContainer.innerHTML += `<p>${i + 1}. Similarity match: ${sortedSimilarities[i][1]}%</p>`
      resultsContainer.innerHTML += allianceDescriptions[sortedSimilarities[i][0]];
    }
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "What sized alliance do you prefer?",
      leftside: "Smol bois",
      rightside: "Big bois"
    },
    {
      question: "How much do you prioritize an alliance's level of skill?",
      leftside: "Anyone can join",
      rightside: "Only the best can join"
    },
    {
      question: "Do you prefer an alliance that's more internally or externally focused?",
      leftside: "Internal",
      rightside: "External"
    },
    {
      question: "What crowd do you like to be around?",
      leftside: "Memes galore",
      rightside: "Periods and full sentences"
    },
    {
      question: "How active are you in game?",
      leftside: "*Heavy snoring*",
      rightside: "I refresh every 5 seconds"
    },
    {
      question: "How do you prefer your technology?",
      leftside: "Old school best school",
      rightside: "Bots are love, bots are life"
    },
    {
      question: "Do you like to roleplay?",
      leftside: "Ew, cringe",
      rightside: "*Nods aggressively*"
    },
    {
      question: "Do you like communities that focus more on the game or outside of it?",
      leftside: "Out of game",
      rightside: "In game"
    },
    {
      question: "Are you a peaceful farmer or a bloodthisty pirate?",
      leftside: "Even my crops grow crops",
      rightside: "Blood for the blood god"
    },
    {
      question: "How active in the game politics do you want to be?",
      leftside: "I don't care",
      rightside: "I'm a game changer"
    },
  ];

  buildQuiz();
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  showSlide(currentSlide);
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  var slider = document.getElementsByClassName("slider");
  var outputLeft = document.getElementsByClassName("sliderValLeft");
  var outputRight = document.getElementsByClassName("sliderValRight");
  const correspondingOutput = {};
  for(var i = 0; i < outputLeft.length; i++){
    outputLeft[i].innerHTML = slider[i].value + "%";
    outputRight[i].innerHTML = 100 - slider[i].value + "%";
    correspondingOutput[slider[i].name] = [outputLeft[i], outputRight[i]]
    slider[i].oninput = function(){
      correspondingOutput[this.name][0].innerHTML = this.value + "%";
      correspondingOutput[this.name][1].innerHTML = 100 - this.value + "%";
    }
  }
})();
