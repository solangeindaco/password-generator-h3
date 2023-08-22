const includeLowercaseIndex = 0; // Index in the Array to store the user's choice to include lowercase characters to the new password
const includeUppercaseIndex = 1; // Index in the Array to store the user's choice to include uppercase characters to the new password
const includeNumbersIndex = 2 // Index in the Array to store the user's choice to include digits to the new password
const includeSpecialCharactersIndex = 3;  // Index in the Array to store the user's choice to include special characters to the new password


/* Function to generate a new password using the user's choices*/
function generatePassword(characterTypesOptions, passwordLength) {

  const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz"; 
  const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  

  let possibleCharacters = "";
  /* Concat all lowercase characters to the possible characters that could be on the password */
  if (characterTypesOptions[includeLowercaseIndex]) {
    possibleCharacters += lowercaseCharacters;
  }
  /* Concat all uppercase characters to the possible characters that could be on the password */
  if (characterTypesOptions[includeUppercaseIndex]) {
    possibleCharacters += uppercaseCharacters;
  }
  /* Concat all digits to the possible characters that could be on the password */
  if (characterTypesOptions[includeNumbersIndex]) {
    possibleCharacters += numbers;
  }
  /* Concat all special charecters to the possible characters that could be on the password */
  if (characterTypesOptions[includeSpecialCharactersIndex]) {
    possibleCharacters += specialCharacters;
  }
   
  let newPassword = "";

  for (let i = 0; i < passwordLength ; i++) {
    // Select ramdonly an index inside the possibleCharacters.
    let characterSetIndex = Math.floor(Math.random()* possibleCharacters.length);
    /*Concat to the new password the character that it is in the position 'charaterSetIndex' in the string of possible characters 
    selected randomly in the above sentence */
    newPassword += possibleCharacters.charAt(characterSetIndex);
  }
  return newPassword;
}


/*Check if the password length is at least 8 characters and no more than 128 characters*/
function isPasswordLengthValid(passwordLength) {
    return (passwordLength>=8) && (passwordLength<=128);
}

/* Display a Dialog asking the user how long the password should be, 
with a restriction that it should be between 8 and 128*/
function askUserPasswordLength(){
  let passwordLength = window.prompt("Choose a password length", "Value should be between 8 and 128");
  if (!isPasswordLengthValid(passwordLength)){
      window.alert("The password length should be between 8 and 128.");
      // Display a dialog asking the user if he/she wants to try again, and to wait until the user either confirms or cancels the dialog.
      let tryAgain = window.confirm("Do you want to try again?");
      // if the user confirm the dialog, then it will ask again for the password length
      if (tryAgain){
        passwordLength = askUserPasswordLength();
      } // if the user doesn't want to try again, the function will return an invalid password length
  }
  return passwordLength;
}

// Check whether the user chose at least one character type to include in the password
function userChoseAtLeastCharacterType(characterTypesOptions){
  return (characterTypesOptions[includeLowercaseIndex] || characterTypesOptions[includeUppercaseIndex]
    || characterTypesOptions[includeNumbersIndex] ||  characterTypesOptions[includeSpecialCharactersIndex]);
}

/* Ask the user to choose at least one character type for the password, and return an array with his/her options
  If she/he doesn't want to select at least one option the function return all false values*/
function askUserForCharacterTypesToInclude(){
  /* Initialized the characterTypes as if the user choosed any of them */
  let characterTypesOptions = [false,false,false,false];
  characterTypesOptions[includeLowercaseIndex]= window.confirm("Do you want to include lowercase characters?");
  characterTypesOptions[includeUppercaseIndex] = window.confirm("Do you want to include uppercase characters?");
  characterTypesOptions[includeNumbersIndex] = window.confirm("Do you want to include numbers?");
  characterTypesOptions[includeSpecialCharactersIndex] = window.confirm("Do you want to include special characters?");
  
  if (!userChoseAtLeastCharacterType(characterTypesOptions)){
    //Display a dialog with a message, and wait until the user dismisses the dialog.
    window.alert("The password should have at least a Character type.");
    // Display a dialog asking the user if he/she wants to try again, and to wait until the user either confirms or cancels the dialog.
    let tryAgain = window.confirm("Do you want to try again?");
    if (tryAgain){
      characterTypesOptions = askUserForCharacterTypesToInclude();
    }
  }
  return characterTypesOptions;
}

// Write password to the #password input
function writePassword() {
  // Get references to the #password element
  let passwordText = document.querySelector("#password");
  // Initialize the value of the #password element to an empty string
  passwordText.value = "";
  let passwordLength = askUserPasswordLength();

  if (isPasswordLengthValid(passwordLength)) {
    let characterTypesOptions = askUserForCharacterTypesToInclude();
    if (userChoseAtLeastCharacterType(characterTypesOptions)){
      // The password is generated with the user's choices
      password = generatePassword(characterTypesOptions, passwordLength);
      passwordText.value = password;
    }else {
      //// The password is not generated and a dialog is display with a message, and wait until the user dismisses the dialog.
      window.alert("The password length should be at least 8 and no more than 128 \n and have at least one character type.");
    }
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
