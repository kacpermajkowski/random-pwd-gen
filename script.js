function getPasswordGeneratorCharPool(lowercase, uppercase, numbers, special){
    let lowercaseChars = "abcdefghijklmnoprstuvxyz";
    let uppercaseChars = lowercaseChars.toUpperCase();
    let numberChars = "0123456789";
    let specialChars = "!@#$%^&*()_+"

    let pool = (lowercase ? lowercaseChars : "") + 
           (uppercase ? uppercaseChars : "") +
           (numbers ? numberChars : "") +
           (special ? specialChars : "");

    return pool == "" ? lowercaseChars : pool;
}

function generatePassword(length = 64, lowercase = true, uppercase = true, numbers = true, special = true){
    let charPool = getPasswordGeneratorCharPool(lowercase, uppercase, numbers, special);
    let pass = "";
    for(let i = 0; i < length; i++){
        let charNumber = Math.floor(Math.random() * charPool.length);
        pass += charPool.at(charNumber);
    }
    return pass;
}

onload = () => {
       document.getElementById("password").textContent = generatePassword(16, true, false, true, false);
}