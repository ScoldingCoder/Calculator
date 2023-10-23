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

  if (firstNum== NaN || secondNum ==NaN ){

    console.log(ERROR)


  }

  else 
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
      if (secondNum == "0"||secondNum =="-0") {
        alert("DIVIDED BY ZERO\n Congratulation! Your math just destroyed a city");
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
    if (button.classList.contains("clearScreen") )

    {
     
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
    if (button.classList.contains("back")) {
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
        operatorSelected = button.innerText
        upper.innerText = result + " " + operatorSelected;
       
      }

      if (!isNaN(lower.innerText.charAt(lower.innerText.length - 1))) {
       
        lastKeyPressed = "operator"
        numHasDecimal = false;

        if (firstNumDone == true && secondNum !="") {

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
      if (firstNumDone = true && !isNaN(lower.innerText.charAt(lower.innerText.length - 1))) {
        lastKeyPressed = "equal"
        runOperation()
        if (result.toString().length > 9) {
          result = result.toExponential(5);
        }
        upper.innerText = result;
        lower.innerText = "";
        secondNum = "";
    
      }

    }
     
  });
});


//adding keyboard support -link the keys pressed to buttons

addEventListener("keydown", (event) => {
    
//check if the events which the key pressed and the button id is the same
   for (const value of document.querySelectorAll('[id]').values()) {
      if (event.key == value.id){

       event.preventDefault(); 
       
       document.getElementById(event.key).click();
      
      }
    }

// add key event for pressing Enter key which functions like the equal key

if(event.key == 'Enter'){

   event.preventDefault(); 
   document.getElementById('=').click();


}


});