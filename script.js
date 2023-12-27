let startTime;
  let timerInterval;
  let currentEmotion;
  let emotionCounts = JSON.parse(localStorage.getItem('emotionCounts')) || {};

  function startTracker() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
    currentEmotion = getEmotion(); // Assume you have a function to get the current emotion\
    let quizContainer= document.querySelector(".quiz-container")
    quizContainer.style.transform="translateX(0px)"
    quizContainer.style.transition="all .2s ease-in"
  }

  function stopTracker() {
    clearInterval(timerInterval);
    const elapsedTime = calculateElapsedTime();
    updateEmotionTracker(currentEmotion, elapsedTime);
    resetTimer();
  }

  function resetTracker() {
    clearInterval(timerInterval);
    localStorage.removeItem('emotionCounts');
    document.getElementById('timer').textContent = '0 seconds';
    emotionCounts = {};
    updateEmotionResults();
  }

  function updateTimer() {
    const elapsedTime = calculateElapsedTime();
    document.getElementById('timer').textContent = `${elapsedTime} seconds`;

    const newEmotion = getEmotion(); // Assume you have a function to get the current emotion
    if (newEmotion !== currentEmotion) {
      const duration = calculateElapsedTime();
      updateEmotionTracker(currentEmotion, duration);
      currentEmotion = newEmotion;
      startTime = new Date().getTime();
    }
  }

  function calculateElapsedTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    return elapsedTime;
  }

  function updateEmotionTracker(emotion, duration) {
    if (!emotionCounts[emotion]) {
      emotionCounts[emotion] = 0;
    }
    emotionCounts[emotion]++;
    updateEmotionResults();
    localStorage.setItem('emotionCounts', JSON.stringify(emotionCounts));
  }

  function updateEmotionResults() {
    const emotionList = document.getElementById('emotionList');
    emotionList.innerHTML = '';

    for (const emotion in emotionCounts) {
      const count = emotionCounts[emotion];
      const listItem = document.createElement('li');
      listItem.textContent = `${emotion}: ${count} times`;
      emotionList.appendChild(listItem);
    }
  }

  // Replace this with your actual logic to get the current emotion
  function getEmotion() {
    // Replace this with your logic to get the current emotion
    return document.querySelector(".emotions").textContent.toLowerCase();
  }
  function getResult() {
    if (localStorage.getItem("emotionCounts")) {
      let result = localStorage.getItem("emotionCounts");
      let emotionList = document.querySelector("#emotionList");
      let parsedResult = JSON.parse(result);
  
      for (let emotion in parsedResult) {
        const count = parsedResult[emotion];
        const listItem = document.createElement('li');
        listItem.textContent = `${emotion}: ${count} times`;
        emotionList.appendChild(listItem);
      }
    } else {
      console.log("No emotions recorded");
    }
  }
  
  getResult();
  