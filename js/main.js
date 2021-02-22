var overlay = document.getElementById('startpage--overlay'),
    startpageSubmit = document.getElementById('startpage--submit');
var currentUser;
var btn = document.getElementById('top-button');
var header = document.getElementById('header');
var scrsvrbtn = document.getElementById('scrennsaver--button');
var screensaver = document.getElementById('screensaver-wrapper');
var date = new Date();
var scrollPos = 0;
var array = [];

window.onload = () => {
    currentUser = sessionStorage.getItem('currentUser');

    if (currentUser == null) {

        overlay.style.display = 'flex';
        header.style.display = 'none';
        document.body.style.overflowY = 'hidden';
        document.getElementById('wrapper').style.display = 'none';
    }
    else {

        overlay.style.display = 'none';
        header.style.display = 'flex';
        document.body.style.overflowY = 'visible';
        document.getElementById('wrapper').style.display = 'block';
        showUsername();
        setTimeout(() => {
            fillTest();
        }, 2000);
    };

}

startpageSubmit.addEventListener('click',
    () => {
        var value = document.getElementById('startpage--input').value;
        if (value.length == 0) return;
        sessionStorage.setItem('currentUser', value);
        currentUser = value;
        overlay.style.display = 'none';

        header.style.display = 'flex';
        document.body.style.overflowY = 'visible';
        document.getElementById('wrapper').style.display = 'block';
        showUsername();
    })

function showUsername() {
    var block = document.getElementById('greetings');
    var span = document.createElement('span');
    span.textContent = `Привет, ${currentUser}!`;
    block.appendChild(span);
}

window.onscroll = () => {
    var blockHeight = document.getElementById('main-info').clientHeight + document.getElementById('secondary-info').clientHeight + document.getElementById('activities').clientHeight;
    if (window.pageYOffset >= blockHeight) btn.style.display = 'flex';
    else btn.style.display = 'none';
}

btn.addEventListener('click', () => {
    document.getElementById('activities').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
})


function triangleSquare(a, h) {
    return 0.5 * a * h;
}

var sqbtn = document.getElementById('triangle--count-square__btn');

sqbtn.addEventListener('click', () => {
    var a = "", h = "";
    var res = document.getElementById('tr-res');
    a = document.getElementById('triangle_a').value;
    h = document.getElementById('triangle_h').value;
    if (a.length != 0 && h.length != 0 && Number(a) > 0 && Number(h) > 0) {
        res.innerHTML = triangleSquare(Number(a), Number(h));
    } else {
        res.innerHTML = '0';
    }
})


scrsvrbtn.addEventListener('click', showScreensaver);

function showScreensaver() {
    screensaver.style.display = 'flex';
    document.body.style.overflowY = 'hidden';
    if (date.getHours() < 10) document.getElementById('hours').innerHTML = '0' + date.getHours();
    else
        document.getElementById('hours').innerHTML = date.getHours();
    if (date.getMinutes() < 10) document.getElementById('mins').innerHTML = '0' + date.getMinutes();
    else
        document.getElementById('mins').innerHTML = date.getMinutes();
    document.getElementById('name').innerHTML = `${currentUser}, сегодня ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    if (screensaver.style.display == 'flex') {
        screensaver.addEventListener('click', hideScreensaver);
    }
}

function hideScreensaver() {
    screensaver.style.display = 'none';
    document.body.style.overflowY = 'visible';
}


document.getElementById('strings--count__btn').addEventListener('click', () => {
    var str1 = document.getElementById('str1').value,
        str2 = document.getElementById('str2').value;
    var span = document.getElementById('stringsres');

    if (str1.length == 0) return;

    if (str1.length == str2.length) {
        span.innerHTML = 'Длины строк равны';
    } else {
        span.innerHTML = 'Длины строк не равны';
    }
})

document.getElementById('menu-button').addEventListener('click', () => {
    document.getElementById('activities').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
})


document.getElementsByClassName('activity--triangle')[0].addEventListener('click', () => {
    document.getElementById('triangle-page__container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
})

document.getElementsByClassName('activity--strings')[0].addEventListener('click', () => {
    document.getElementById('strings-page__container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
})

document.getElementsByClassName('activity--array')[0].addEventListener('click', () => {
    document.getElementById('array-page__container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
})

document.getElementsByClassName('activity--timer')[0].addEventListener('click', () => {
    document.getElementById('timer-page__container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
})

document.getElementsByClassName('activity--test')[0].addEventListener('click', () => {
    document.getElementById('test-page-content').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
})


function addArrEl() {
    regArray();
    var len = document.getElementsByClassName('array-element').length;

    if (len > 10) return;

    var block = document.getElementById('array--elements');
    var el = document.createElement('input');
    el.type = 'number';
    el.className = 'array-element';
    block.appendChild(el);
}

function removeArrEl() {
    regArray();
    var len = document.getElementsByClassName('array-element').length;

    if (len < 3) return;

    var block = document.getElementById('array--elements');
    block.removeChild(document.getElementsByClassName('array-element')[len - 1]);
}


function regArray() {
    array = [];
    var arr = document.getElementsByClassName('array-element');
    for (let i = 0; i < arr.length; i++) {
        array.push(arr[i].value);
    }
}

document.getElementById('array--button').addEventListener('click', () => {
    regArray();
    var max, min;
    if (array.length > 0) {
        max = array[0];
        min = array[0];
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i] > max) max = array[i];
    }

    for (let i = 0; i < array.length; i++) {
        if (min > array[i] && array[i] != '') min = array[i];
        console.log(min);
    }
    console.log(array);

    if (max == '') max = 'Нет данных';
    if (min == '') min = 'Нет данных';

    document.getElementById('array--min').innerHTML = min;
    document.getElementById('array--max').innerHTML = max;

})

var timerValue = 0;
var ttimer;

var isTimerGo = false;

function startTimer() {
    let timer = document.getElementById('timer');

    var v = '', secs, mins;
    isTimerGo = true;
    document.getElementById('timer--start-stop__btn').innerHTML = 'Пауза';

    if (timerValue == 0 || timerValue < 60) {
        mins = 0;
        secs = timerValue;
    }
    else {
        mins = Math.floor(timerValue / 60);
        secs = timerValue % 60;
    }
    if (ttimer) clearInterval(ttimer);
    ttimer = setInterval(
        function () {
            secs++;
            if (secs == 60) {
                mins++;
                secs = 0;
            }

            if (mins < 10) v = `0${mins}:`;
            else v = `${mins}:`;
            if (secs < 10) v += `0${secs}`;
            else v += secs;
            timer.innerHTML = v;
            timerValue = secs;
        },
        1000);
}

function pauseTimer() {
    clearInterval(ttimer);
    if (timerValue > 0) document.getElementById('timer--start-stop__btn').innerHTML = 'Продолжить';
    isTimerGo = false;
}

function clearTimer() {
    document.getElementById('timer--start-stop__btn').innerHTML = 'Запустить';
    timerValue = 0;
    clearInterval(ttimer);
    document.getElementById('timer').innerHTML = '00:00';
}


document.getElementById('array--plus').addEventListener('click', addArrEl)
document.getElementById('array--minus').addEventListener('click', removeArrEl);
document.getElementById('timer--clear__btn').addEventListener('click', clearTimer);

document.getElementById('timer--start-stop__btn').addEventListener('click', () => {
    if (isTimerGo) pauseTimer();
    else startTimer();
});

// ================================= Тест =======================================

var currentQuestion = 1;

// if (sessionStorage.getItem('curQuestion') == null) {
//     currentQuestion = 1;
// } else {
//     currentQuestion = Number(sessionStorage.getItem('curQuestion'));
// }
var radios = document.getElementsByClassName('test-radio');
var userAnswers = [];
var rightAnswers = ["2",
    "3",
    "3",
    "1",
    "1",
    "4",
    "1",
    "1",
    "3",
    "4"
]
var wrongAnswers = {
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false,
    "10": false,
};
var lastChecked;
var countofwrong;

var answers;
var questions;


getJSONArray('js/answers.json').then(json => answers = json.data);
getJSONArray('js/questions.json').then(json => questions = json.data);



function fillTest() {
    if (currentQuestion == 10) {
        document.getElementById('test-submit-button').style.visibility = 'visible';
        document.getElementById('next-question-button').style.display = 'none';
    }
    document.getElementsByClassName('test-question')[0].innerHTML = currentQuestion + '. ' + questions[currentQuestion - 1];
    let labels = document.getElementsByClassName('test-label');
    let values = answers[`q${currentQuestion}`];
    for (let i = 0; i < labels.length; i++) {
        labels[i].innerHTML = values[i];
    }
}


function undisable(radio) {
    document.getElementById('next-question-button').removeAttribute('disabled');
    lastChecked = radio.id;
}

document.getElementById('next-question-button').addEventListener('click', () => {
    currentQuestion++;
    userAnswers.push(lastChecked);
    sessionStorage.setItem('userAnswers', userAnswers);
    document.getElementById('next-question-button').setAttribute('disabled', '');
    fillTest();
    uncheck();
})

document.getElementById('test-submit-button').addEventListener('click', () => {
    document.getElementById('test-page-text').style.display = 'none';
    document.getElementById('test-btns').style.display = 'none';
    document.getElementsByClassName('test-question--wrapper')[0].style.display = 'none';
    document.getElementById('test-results--wrapper').style.display = 'flex';
    compareAnswers();
    fillAnswers();
})

function fillAnswers() {
    document.getElementById('count-answers').innerHTML = 'Правильных ответов: ' + (rightAnswers.length - countofwrong);
    var q;
    var uaspan;
    var rightspan;
    

    for (let i = 0; i < rightAnswers.length; i++) {
        var newdiv;
        newdiv = document.createElement('div');
        newdiv.className = 'test-result';
        q = document.createElement('span');
        q.innerHTML = (i + 1) + '. ' + questions[i];
        q.className = 'test-question';
        uaspan = document.createElement('span');
        uaspan.innerHTML = 'Ваш ответ: ' + userAnswers[i];
        rightspan = document.createElement('span');
        if (rightAnswers[i] == userAnswers[i]) {
            rightspan.innerHTML = 'Ваш ответ - правильный';
        } else{
            rightspan.innerHTML = `Правильный ответ - ${answers['q' + i + 1][rightAnswers[i]]}`;
        }
        newdiv.appendChild(q);
        newdiv.appendChild(uaspan);
        newdiv.appendChild(rightspan);
        document.getElementsByClassName('test-results--wrapper')[0].appendChild(newdiv);
    }
}

function compareAnswers() {
    let wrong = 0;
    for (let i = 0; i < rightAnswers.length; i++) {
        if (rightAnswers[i] != userAnswers[i]) {
            wrongAnswers[i + 1] = true;
            wrong++;
        }
    }

    countofwrong = wrong;
}

function uncheck() {
    for (let i = 0; i < radios.length; i++) radios[i].checked = false;
}

function getJSONArray(src) {
    return fetch(
        src,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
    ).then(response => response.json());
}
