function getRandomCharacter(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
}

function generatePassword() {
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeLowercase = document.getElementById("includeLowercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSpecialChars = document.getElementById("includeSpecialChars").checked;
    const passwordLength = parseInt(document.getElementById("passwordLength").value);

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";

    let availableChars = "";
    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSpecialChars) availableChars += specialChars;

    if (availableChars === "") {
        alert("Please select at least one character type.");
        return;
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        password += getRandomCharacter(availableChars);
    }

    document.getElementById("password").textContent = password;
    alert("Password Generated!");
}

function copyPassword() {
    const password = document.getElementById("password").textContent;
    if (password) {
        navigator.clipboard.writeText(password).then(() => {
            alert("Password copied to clipboard!");
        }).catch(err => {
            alert("Failed to copy password.");
            console.error(err);
        });
    } else {
        alert("No password to copy.");
    }
}

 // Function to encrypt the generated password
 function encryptPassword() {
    const password = document.getElementById("password").textContent;
    if (password) {
        const encryptedPassword = CryptoJS.AES.encrypt(password, "secret-key-123").toString();
        document.getElementById("password").textContent = encryptedPassword;
        alert("Password encrypted!");
    } else {
        alert("No password to encrypt.");
    }
}

// Function to decrypt the password (optional)
function decryptPassword(encrypted) {
    const bytes = CryptoJS.AES.decrypt(encrypted, "secret-key-123");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword;
}

function correctPassword() {
    let password = document.getElementById("password").textContent;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeLowercase = document.getElementById("includeLowercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSpecialChars = document.getElementById("includeSpecialChars").checked;

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";

    if (includeUppercase && !/[A-Z]/.test(password)) {
        password += getRandomCharacter(uppercaseChars);
    }

    if (includeLowercase && !/[a-z]/.test(password)) {
        password += getRandomCharacter(lowercaseChars);
    }

    if (includeNumbers && !/[0-9]/.test(password)) {
        password += getRandomCharacter(numberChars);
    }

    if (includeSpecialChars && !/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>?/`~]/.test(password)) {
        password += getRandomCharacter(specialChars);
    }

    if (password.length < parseInt(document.getElementById("passwordLength").value)) {
        password = password.slice(0, parseInt(document.getElementById("passwordLength").value));
    }

    document.getElementById("password").textContent = password;
    alert("Password Corrected!");
}