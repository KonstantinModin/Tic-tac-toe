let a1 = document.querySelector('#a1'),
    a2 = document.querySelector('#a2'),
    a3 = document.querySelector('#a3'),
    b1 = document.querySelector('#b1'),
    b2 = document.querySelector('#b2'),
    b3 = document.querySelector('#b3'),
    c1 = document.querySelector('#c1'),
    c2 = document.querySelector('#c2'),
    c3 = document.querySelector('#c3'),
    main = document.querySelector('.main'),
    winScore = loseScore = drawScore = 0,
    flag = false;

let popup = document.querySelector('.popup'),
    win = document.querySelector('#win'),
    lose = document.querySelector('#lose'),
    draw = document.querySelector('#draw');

function computerTurn() {
    function putZero(cell) {
        cell.textContent = 'O';
        cell.classList.add('zero');
        cell.classList.remove('h', 'available');
        return true; 
    }

    function checkTwo(a, b, c, sign) {
             if (a.textContent == sign && b.textContent == sign 
            && c.textContent == "") return putZero(c);
        else if (a.textContent == sign && c.textContent == sign 
            && b.textContent == "") return putZero(b);
        else if (b.textContent == sign && c.textContent == sign
            && a.textContent == "") return putZero(a);
    }
    
    function checking() {
        if (checkTwo(a1, a2, a3, 'O')) return true       // проверка 2 ноликов (своих)
        else if (checkTwo(b1, b2, b3, 'O')) return true
        else if (checkTwo(c1, c2, c3, 'O')) return true
        else if (checkTwo(a1, b1, c1, 'O')) return true
        else if (checkTwo(a2, b2, c2, 'O')) return true
        else if (checkTwo(a3, b3, c3, 'O')) return true
        else if (checkTwo(a1, b2, c3, 'O')) return true
        else if (checkTwo(a3, b2, c1, 'O')) return true
                
        if (checkTwo(a1, a2, a3, 'X')) return true         // проверка 2 крестиков
        else if (checkTwo(b1, b2, b3, 'X')) return true
        else if (checkTwo(c1, c2, c3, 'X')) return true
        else if (checkTwo(a1, b1, c1, 'X')) return true
        else if (checkTwo(a2, b2, c2, 'X')) return true
        else if (checkTwo(a3, b3, c3, 'X')) return true
        else if (checkTwo(a1, b2, c3, 'X')) return true
        else if (checkTwo(a3, b2, c1, 'X')) return true
        return false;
    }
        
    function putRandom() {
        if (b2.textContent == "") putZero(b2) 
        else if (a1.textContent == "") putZero(a1)
        else if (a3.textContent == "") putZero(a3)
        else if (c1.textContent == "") putZero(c1)
        else if (c3.textContent == "") putZero(c3)
        else if (a2.textContent == "") putZero(a2)
        else if (b1.textContent == "") putZero(b1)
        else if (b3.textContent == "") putZero(b3)
        else if (c2.textContent == "") putZero(c2)
        else finishGame('D');
    }
    if (checking()) {} else putRandom();
    checkEnd();
}

function checkThree(a, b, c) {
    if (((a.textContent == b.textContent) && (b.textContent == c.textContent) &&
    (c.textContent == 'X')) || ((a.textContent == b.textContent) && 
    (b.textContent == c.textContent) && (c.textContent == 'O'))) return true;
} 

function finishGame (cell) {
    if (cell.textContent == 'X') {
        popup.classList.add('display');
        popup.textContent = 'You win!!!';
        win.textContent = ++winScore;
        flag = true;
    } else if (cell.textContent == 'O') {
        popup.classList.add('display');
        popup.textContent = 'You lost!!!';
        lose.textContent = ++loseScore;
        flag = true;            
    } else {
        popup.classList.add('display');
        popup.textContent = 'Draw!!!';
        draw.textContent = ++drawScore;            
    }       
}

function putWinBG(x, y, z) {
    x.classList.add('winBG');
    y.classList.add('winBG');
    z.classList.add('winBG');
    finishGame(x);
}

function checkEnd() {
    if (checkThree(a1, a2, a3)) putWinBG(a1, a2, a3)
else if (checkThree(b1, b2, b3)) putWinBG(b1, b2, b3)
else if (checkThree(c1, c2, c3)) putWinBG(c1, c2, c3)
else if (checkThree(a1, b1, c1)) putWinBG(a1, b1, c1)
else if (checkThree(a2, b2, c2)) putWinBG(a2, b2, c2)
else if (checkThree(a3, b3, c3)) putWinBG(a3, b3, c3)
else if (checkThree(a1, b2, c3)) putWinBG(a1, b2, c3)
else if (checkThree(a3, b2, c1)) putWinBG(a3, b2, c1);        
}

main.addEventListener('click', function selectCell(event) {
    let target = event.target;
    if (target && target.classList.contains('cell') &&
        target.classList.contains('available')) {
        target.textContent = 'X';
        target.classList.add('cross');
        target.classList.remove('h', 'available');
        checkEnd();
        if (!flag) computerTurn();        
    }
});
document.querySelector('#refresh').addEventListener('click', () => window.location.reload());

let newGame = document.querySelector('#newGame');
newGame.addEventListener('click', () => {
    popup.classList.remove('display');
    let arr = [a1, a2, a3, b1, b2, b3, c1, c2, c3];
    for (let i = 0; i < arr.length; i++) {
        arr[i].textContent = '';
        arr[i].classList.remove('cross', 'zero', 'winBG');
        arr[i].classList.add('h', 'available');
        flag = false;
    }
});
popup.addEventListener('click', () => newGame.click());
document.querySelector('#about').addEventListener('click', () => 
    alert('Game developer: Konstantin Modin ©2010. Native JS'));