Calculator Design:

List of keys:
number keys
negative key
operator keys
backspace
clear screen
clear all
eqaul operator



How to handle key presses:


Always listen for clear memory and clear screen

Listen for numeric characters, backspace and negative sign only 

Listen for operation character (excluding the eqaul operator),backspace negative sign after a numeric key is pressed

Stop listening for all operation characters until a numeric character or backspace is pressed 

Listen for numeric characters, backspace or equal operator

If equal operator is pressed, stop listening for equal operator and listen for all other keys 


NB Treat the decimal point like a numeric character



Data Processing after a button press (assumimg that it is being listened for):

When a number key is pressed: {

Append the number character to a string which is intially empty
Display the new number on the lower portion of the screen
Add number to data array (only stores the numbers, not operators)
return data array

}


When backspace is pressed:{

read the last value of the data array
delete last character in read value
update last value of data array with new value
display new value on lower screen
return data array


}

when clear screen is pressed: {

Delete last value in data array
display 0 on lower screen
return data array


}


when the negative key is pressed:{

read last value of data array
multiply value by -1
dispaly new value on lower screen
update last value of data array
return data array


}



when an operation key (not eqaul) is pressed:{

read the last value of the data array 
append that value to process string which is initally empty
add value to process array
add operator to process array 
display sting on upper portion of screen
return process array

}


when equal key is pressed:{

append equal sign to the process string
display process string on upper screen

while not at the end of the process array[

read the first 3 elements of the process array (should be 2 numbers and an operator in the middle)

call the function appropiate operation function based on operator , update and return the result variable

read the next 3 elemets of the process array, go back to top of loop

]

display result on lower screen 

clear data array

add result to data array

clear process array

clear process string


}


