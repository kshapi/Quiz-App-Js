//Importing Question list
import que from './question.js';


const radio = document.querySelectorAll('input');
const label = document.querySelectorAll('label');
const question = document.getElementById('question');
const timer = document.querySelector('#timer span');
const questionLenght = document.getElementById('question-count');
const [start, quiz, end] = document.querySelectorAll('section');
const [startBtn, nextBtn, restartBtn] = document.querySelectorAll('.screen .btn');


let answer = null;
let secends = 10;
let i = 0;
let right = 0;
let wrong = 0;
let skip = 0;
let interval;
let deg = 360;


//Animation -- KeyFrames
const myAnimation = (element) => {
  const effect = new KeyframeEffect(element, {
     opacity: [1, 0.7, 0.4, 0.1, 0]
    }, {
    duration: 250,
    iterations: 1
  });
  return new Animation(effect, document.timeline);
};



//Starting Of Quiz
const startQuiz = () => {
  //Animation
  const animation = myAnimation(start);
  animation.play();
  
  //When Animation will finish
  animation.onfinish = () => {
    start.style.display = 'none';
    quiz.style.display = 'flex';
    load();
    //Time Interval
   interval = setInterval(time, 1000);
  };
  
};
startBtn.addEventListener('click', startQuiz);


//Load frist Question On Page load
const load = () => {
  if (i === que.length) {
     quizEnd();
     return;
  };
  
  unCheckAllRadioBtns(nextBtn.disabled);
  //Fetch Questions And Options
  question.innerText = que[i].Q;
  label[0].innerText = que[i].A;
  label[1].innerText = que[i].B;
  label[2].innerText = que[i].C;
  label[3].innerText = que[i].D;
  
  //Fetch Values Of Options
  radio[0].setAttribute('value', que[i].A);
  radio[1].setAttribute('value', que[i].B);
  radio[2].setAttribute('value', que[i].C);
  radio[3].setAttribute('value', que[i].AD);
  
  nextBtn.disabled = true;
  questionLenght.innerHTML = `${i}/${que.length}`;
  timer.innerText = `${secends}s`;
  timer.parentElement.style.background = null;
  
};


//Check Answer
const checkAnswer = () => {
  radio.forEach( btn => {
    if (btn.checked) {
      answer = btn.value;
    };
  });
};


//Go On Next Question 
const nextQuestion = () => {
   checkAnswer();
   if (answer) {
     if (answer == que[i].Ans) {
        right++;
       }else {
        wrong++;
      };
   }else {
     skip++;
   }
  
  i++;
  deg = 360;
  secends = 10;
  answer = null;
  load();
  unCheckAllRadioBtns();
  
};
nextBtn.addEventListener('click', nextQuestion);


//UnCheck All Radio Buttons
function unCheckAllRadioBtns(dis) {
  radio.forEach(btn => {
    btn.checked = false;

    btn.addEventListener('change', () => {
      if (dis == true) {
        nextBtn.disabled = false;
      };
    });

  });

};



//Time function 
const time = () => {
  
  if (secends == 0) {
    nextQuestion();
    answer = null;
    secends = 10;
    deg = 360;
    return;
  };
  
  deg -=36;
  secends--;
  timer.innerText = `${secends}s`;
  timer.parentElement.style.background = `conic-gradient(red 0deg, red ${deg}deg, black ${deg}deg, black 360deg)`;
  
};


//End of Quiz 
const quizEnd = () => {
  const [rightAnwser, skipAnwser, wrongAnwser] = document.querySelectorAll('#result span');
  //Fetch Result
  rightAnwser.innerText = right;
  wrongAnwser.innerText = wrong;
  skipAnwser.innerText = skip;
  clearInterval(interval);
  //Animation
  const animation = myAnimation(quiz);
  animation.play();
  //When Animation Finish
  animation.onfinish = () => {
    quiz.style.display = 'none';
    end.style.display = 'flex';
  };
  
};


//Resatrt Quiz 
const restartQuiz = () => {
  //Animation
  const animation = myAnimation(end);
  animation.play();
  
  animation.onfinish = () => {
    quiz.style.opacity = null;
    end.style.display = 'none';
    quiz.style.display = 'flex';
    i = 0;
    right = 0, wrong = 0, skip = 0;
    secends = 10;
    deg = 360;
    load();
    interval = setInterval(time, 1000);
  };
  
};
restartBtn.addEventListener('click', restartQuiz);

//Kshapii