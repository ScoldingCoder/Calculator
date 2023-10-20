// Add actions for each button of calculator
// For each button pressed, add conditions and the expected function(s) for each condition
let lastKeyPressed = "";
let firstNum = "";
let secondNum = "";
let result = "";
let numHasDecimal = false;
let firstNumDone = false;
let operatorSelected = ""

// Screen HTML Elements

const lower = document.querySelector('.lower')
const upper = document.querySelector('.upper')


const buttons = document.querySelectorAll('button');

//functions go here

function backSpace(num) {
  // extract the last element of num
  let toDelete = num.substr(num.length - 1, 1)
  if (toDelete == ".") {
    numHasDecimal = false;
  }
  return num.substr(0, num.length - 1)

}

function runOperation() {
  switch (operatorSelected) {

    case '+':
      result = Number(firstNum) + Number(secondNum);
      break;

    case '-':
      result = Number(firstNum) - Number(secondNum);
      break;

    case 'x':
      result = Number(firstNum) * Number(secondNum);
      break;

    case '÷':
      if (secondNum == "0") {
        alert("This text stays here until I add an image to the alert");
        lastKeyPressed = "";
        firstNum = "";
        secondNum = "";
        result = "";
        numHasDecimal = false;
        firstNumDone = false;
        operatorSelected = "";
        lower.innerText = "";
        upper.innerText = "";

      } else {
        result = Number(firstNum) / Number(secondNum)
      }
  }
}

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {

  // and for each one we add a 'click' listener
  button.addEventListener('click', () => {
    // Memory Clear is always active
    if (button.classList.contains("memoryClear")) {
      //reset all parameter and clear both screens
      lastKeyPressed = "";
      firstNum = " ";
      secondNum = "";
      result = "";
      numHasDecimal = false;
      firstNumDone = false;
      operatorSelected = ""

      upper.innerText = "";
      lower.innerText = "";

    }

    //Clear Screen
    (button.classList.contains("clearScreen") || button.id == "Hello")

    {
      alert("I was triggered by the Keyboard!");
      lower.innerText = "";

      //clears firstNum if user was entering the first number
      if (firstNumDone == false) {
        firstNum = "";
        numHasDecimal = false;
      }
      // Otherwise, clear secondNum
      else {
        secondNum = "";
        numHasDecimal = false;
      }
    }

    // Backspace 
    if (button.classList.contains("backspace")) {
      lower.innerText = backSpace(lower.innerText);

      if (firstNumDone == false) {
        firstNum = lower.innerText;
      } else {
        secondNum = lower.innerText;
      }

    }
    //number key Pressed
    if (button.classList.contains("number")) {
      if (lastKeyPressed == "equal") {
        firstNumDone = false;
        result = "";
        upper.innerText = "";
        numHasDecimal = false;

      }
      if (((lower.innerText.charAt(0) == "-" && lower.innerText.length < 11) || (lower.innerText.length <
          10)) && (firstNumDone == false)) {
        lastKeyPressed = "num";
        lower.innerText = lower.innerText + button.innerText;
        firstNum = lower.innerText;
      }

      if (((lower.innerText.charAt(0) == "-" && lower.innerText.length < 11) || (lower.innerText.length <
          10)) && (firstNumDone == true)) {
        lastKeyPressed = "num";
        lower.innerText = lower.innerText + button.innerText;
        secondNum = lower.innerText;
      }

    }

    //decimal key pressed
    if (button.classList.contains("decimal")) {
      if (((lower.innerText.charAt(0) == "-" && lower.innerText.length < 10) || (lower.innerText.length < 9)) &&
        (lastKeyPressed == "num") && (numHasDecimal == false)) {
        lastKeyPressed = "decimal";
        lower.innerText = lower.innerText + button.innerText;
        numHasDecimal = true;

      }
      if (firstNumDone == false) {
        firstNum = lower.innerText;
      } else {
        secondNum = lower.innerText;
      }
    }

    //Change sign
    if (button.classList.contains("changeSign")) {
      if (lower.innerText.charAt(0) == "-") {
        lower.innerText = lower.innerText.substr(1, lower.innerText.length - 1);
      } else {
        lower.innerText = "-" + lower.innerText;
      }
      if (firstNumDone == false) {
        firstNum = lower.innerText;
      } else {
        secondNum = lower.innerText;
      }
    }

    //operator key
    if (button.classList.contains("operator")) {
      if (lastKeyPressed == "equal") {
        firstNum = result;
      }

      if (!isNaN(lower.innerText.charAt(lower.innerText.length - 1))) {
        lastKeyPressed = "operator"
        numHasDecimal = false;

        if (firstNumDone == true) {
          runOperation();
          if (operatorSelected != "") {
            operatorSelected = button.innerText;

          }

          if (result.toString().length > 9) {
            result = result.toExponential(5);
          }

          upper.innerText = result + " " + operatorSelected;
          firstNum = result;
          lower.innerText = "";

        } else if (firstNumDone == false) {
          operatorSelected = button.innerText;
          upper.innerText = lower.innerText + " " + operatorSelected;
          firstNum = lower.innerText;
          firstNumDone = true;
          lower.innerText = "";
        }

      }
    }

    //Equal key
    if (button.classList.contains("equal")) {
      //!isNaN is an alternative method to checking lastKeyPressed
      if (firstNumDone = true & !isNaN(lower.innerText.charAt(lower.innerText.length - 1))) {
        lastKeyPressed = "equal"
        runOperation()
        upper.innerText = result;
        lower.innerText = "";
        secondNum = "";
      }

    }

  });
});


//adding keyboard support -link the keys pressed to buttons

addEventListener("keypress", (event) => {
  event.preventDefault();
  document.getElementById("Hello").click();

  //for next session, check if event is a number, if it is, get the element by the ID value of event  -That way, i wont have to code the click event for each number


});
