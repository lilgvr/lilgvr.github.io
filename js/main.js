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
    };
}

document.getElementById('cake').addEventListener('click', () => {
    document.getElementById('menu-button').classList.add('cake-transition');
    document.getElementById('main-info-content').style.justifyContent = 'space-between';
    document.getElementById('cake-img').classList.add('cake-transition');
    document.getElementById('cake-img').style.display = 'block';

})

startpageSubmit.addEventListener('click',
    () => {
        var value = document.getElementById('startpage--input').value;
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
        res.innerHTML = 'Необходимо ввести корректные данные';
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

function negColor(color) {
    // '#ffffff'
    let res = '';


}