
var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var input3 = document.getElementById('input3');
var input4 = document.getElementById('input4');
var input5 = document.getElementById('input5');
var input6 = document.getElementById('input6');

var inputt1 = document.getElementById('inputt1');
var inputt2 = document.getElementById('inputt2');
var inputt3 = document.getElementById('inputt3');
var inputt4 = document.getElementById('inputt4');
var inputt5 = document.getElementById('inputt5');
var inputt6 = document.getElementById('inputt6');


var button = document.getElementById('getMoney');
var results = document.getElementById('results');
var digits = document.getElementById('setDigits');


var inputs = [input1, input2, input3, input4, input5, input6];
var inputts = [inputt1, inputt2, inputt3, inputt4, inputt5, inputt6];

button.addEventListener('click', function (e) {
  e.preventDefault();


  if (isItFull()) {
    if (isItDigit()) {
      if (isItInRange()) {
        if (isItRedundant()) {
          var shuffledDigits = shuffle();
          var hits = checkHits(shuffledDigits);
          showResults(hits);
          
        }
      }
    }
  }

});

digits.addEventListener('click', function (e) {
  e.preventDefault();
  setDigits();
    for (var i = 0; i < inputs.length; i++) 
     cleanResults(inputs[i]);
    
});

function setDigits() {
  var shuffledDigits = shuffle();
  for (var i = 0; i < shuffledDigits.length; i++) {
    inputs[i].value = shuffledDigits[i];
    inputts[i].value= '';
    
  }
}
function cleanResults(element){
  results.innerText = '';
  element.style.fontSize = '48px';
  element.style.color= 'black'; 
}
function showValidation(element, message) {
  element.style.borderColor = 'red';
  results.innerText = message;
}
function showHits(element){
  element.style.fontSize = '88px';
  element.style.color= 'rgb(68, 15, 15)'; 
  
}

function showResults(hits) {

  var message = '';

  switch (hits.length) {
    case 3:
      message= 'Wygrałeś 1.000 PLN';
    break;
    case 4:
      message = 'Wygrałeś 5.000PLN';
      break;
    case 5:
      message = 'Wygrałeś 25.000PLN';
      break;
    case 6:
      message = 'Wygrałeś 10.000.000PLN';
      break;
    default:
      message = 'Nic nie wygrałeś, spróbuj jeszcze raz.'
  }

  results.innerText = 'Twoje trafienia: ' + hits.length + ' ' + message;
}


function isItFull() {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      showValidation(inputs[i], 'Pole jest puste');
      return false;
    }
  }
  return true;
}


function isItDigit() {
  for (var i = 0; i < inputs.length; i++) {
    if (isNaN(inputs[i].value)) {
      showValidation(inputs[i], 'Wartość nie jest cyfrą');
      return false;
    }
  }
  return true;
}


function isItInRange() {
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value < 0 || inputs[i].value > 49) {
      showValidation(inputs[i], 'Wartość nie jest w przedziale 1-49');
      return false;
    }
  }
  return true;
}

function isItRedundant() {
  for (var i = 0; i < inputs.length; i++) {
    for (var j = 0; j < inputs.length; j++) {
      if (inputs[i].value === inputs[j].value && i !== j) {
        showValidation(inputs[i], 'Liczby się powtarzają');
        return false;
      }
    }
  }
  return true;
}


function shuffle() {
  var shuffledDigits = [];

  for (var i = 0; i < 6; i++) {
    var shuffledDigit = Math.round(Math.random() * 48 + 1);

    if (shuffledDigits.indexOf(shuffledDigit) === -1) { //If array doesn't have this digit, then push
      shuffledDigits.push(shuffledDigit);

    } else {
      i--;
    }

  }

  return shuffledDigits;
}

function checkHits(shuffledDigits) {

  var hits = [];

  for (var i = 0; i < inputs.length; i++) {
    inputts[i].value =shuffledDigits[i];
    for (var z = 0; z < inputs.length; z++) {    
      if (parseInt(inputs[i].value, 10) === shuffledDigits[z]) {
        hits.push(inputs[i].value);
        showHits(inputs[i]);
      }
    }
  }
  return hits;

}