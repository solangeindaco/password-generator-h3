
function generatePassword(includeLowercase, includeUppercase, includeNumbers, 
includeSpecialCharacters, passwordLength) {

  const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz"; 
  const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  

  var characterSet = "";

  if (includeLowercase) {
    characterSet += lowercaseCharacters;
  }
  if (includeUppercase) {
    characterSet += uppercaseCharacters;
  }
  if (includeNumbers) {
    characterSet += numbers;
  }
  if (includeSpecialCharacters) {
    characterSet += specialCharacters;
  }
   
  let newPassword = "";

  for (let i = 0; i <= passwordLength ; i++) {
    let characterSetIndex = Math.floor(Math.random()* characterSet.length);
    newPassword += characterSet.charAt(characterSetIndex)
  }
  return newPassword;
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  let includeLowercase = false;
  let includeUppercase = false;
  let includeNumbers = true;
  let includeSpecialCharacters = false;
  let passwordLength =10;
  var password = generatePassword(includeLowercase, includeUppercase, includeNumbers, 
    includeSpecialCharacters, passwordLength);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
