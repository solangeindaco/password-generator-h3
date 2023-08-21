
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

function isPasswordLengthValid(passwordLength) {
    return (passwordLength>8) && (passwordLength<128);
}

function askUserPasswordLength(){
  let passwordLength = window.prompt("Choose a password length", "Value should be between 8 and 128");
  if (!isPasswordLengthValid(passwordLength)){
      window.alert("The password length should be between 8 and 128")
      passwordLength = window.prompt("Choose a password length", "Value should be between 8 and 128");
  }
  return passwordLength;
}

// Write password to the #password input
function writePassword() {
  let passwordLength = askUserPasswordLength();

  let includeLowercase = window.confirm("Do you want to include lowercase characters?");
  let includeUppercase = window.confirm("Do you want to include uppercase characters?");
  let includeNumbers = window.confirm("Do you want to include numbers?");
  let includeSpecialCharacters = window.confirm("Do you want to include special characters");

  if (!(includeLowercase || includeUppercase ||  includeNumbers || includeSpecialCharacters)){
    window.alert("The password should have at least one type of character. Please choose at least one type of character.")
    includeLowercase = window.confirm("Do you want to include lowercase characters?");
    includeUppercase = window.confirm("Do you want to include uppercase characters?");
    includeNumbers = window.confirm("Do you want to include numbers?");
    includeSpecialCharacters = window.confirm("Do you want to include special characters");
  }

  if (isPasswordLengthValid(passwordLength) && (includeLowercase || includeUppercase ||  includeNumbers || includeSpecialCharacters)){
    password = generatePassword(includeLowercase, includeUppercase, includeNumbers, includeSpecialCharacters, passwordLength);
    var passwordText = document.querySelector("#password");
    passwordText.value = password;
  } else {
    window.alert("Please try again, the password length should be more than 8 and less than 128 and have at least one character.");
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
