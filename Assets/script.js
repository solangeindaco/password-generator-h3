
function generatePassword(includeLowercase, includeUppercase, includeNumbers, 
                          includeSpecialCharacters, passwordLength) {

  const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz"; 
  const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  

  var possibleCharacters = "";

  if (includeLowercase) {
    possibleCharacters += lowercaseCharacters;
  }
  if (includeUppercase) {
    possibleCharacters += uppercaseCharacters;
  }
  if (includeNumbers) {
    possibleCharacters += numbers;
  }
  if (includeSpecialCharacters) {
    possibleCharacters += specialCharacters;
  }
   
  let newPassword = "";

  for (let i = 0; i < passwordLength ; i++) {
    // Select a ramdonly an index inside the possibleCharacters.
    let characterSetIndex = Math.floor(Math.random()* possibleCharacters.length);
    // Concar the character in the position index selected randomly in the above sentence to the new password
    newPassword += possibleCharacters.charAt(characterSetIndex)
  }
  return newPassword;
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword(passwordLength) {
  let includeLowercase = false;
  let includeUppercase = false;
  let includeNumbers = true;
  let includeSpecialCharacters = false;
  var password = generatePassword(includeLowercase, includeUppercase, includeNumbers, 
    includeSpecialCharacters, passwordLength);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function askForPassowrdLength() {
  let passwordLength = window.prompt("Choose a password lenght between 8 and 128");
  writePassword(passwordLength);
}

// Add event listener to generate button
generateBtn.addEventListener("click", askForPassowrdLength);
