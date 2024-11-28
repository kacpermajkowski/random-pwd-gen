export class GenerationSettings{
    constructor(length = 64, lowercase = true, uppercase = true, numbers = true, special = true){
        this.length = length;
        this.lowercase = lowercase;
        this.uppercase = uppercase;
        this.numbers = numbers;
        this.special = special;
    }
}

export class PasswordGenerator{
    #gs;
    constructor(gs){
        this.#gs = gs;
    }
    
    #getPasswordGeneratorCharPool(){
        let lowercaseChars = "abcdefghijklmnoprstuvxyz";
        let uppercaseChars = lowercaseChars.toUpperCase();
        let numberChars = "0123456789";
        let specialChars = "!@#$%^&*()_+"
    
        let pool = (this.#gs.lowercase ? lowercaseChars : "") + 
               (this.#gs.uppercase ? uppercaseChars : "") +
               (this.#gs.numbers ? numberChars : "") +
               (this.#gs.special ? specialChars : "");
    
        return pool == "" ? lowercaseChars : pool;
    }

    generate(){
        let charPool = this.#getPasswordGeneratorCharPool();
        let pass = "";
        for(let i = 0; i < this.#gs.length; i++){
            let charNumber = Math.floor(Math.random() * charPool.length);
            pass += charPool.at(charNumber);
        }
        return pass;
    }
}
