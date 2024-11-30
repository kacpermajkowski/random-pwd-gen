export class GenerationSettings{
    length: number;
    useLowercase: boolean;
    useUppercase: boolean;
    useNumbers: boolean;
    useSpecialCharacters: boolean;

    constructor(length = 64, useLowercase = true, useUppercase = true, useNumbers = true, useSpecialCharacters = true){
        this.length = length;
        this.useLowercase = useLowercase;
        this.useUppercase = useUppercase;
        this.useNumbers = useNumbers;
        this.useSpecialCharacters = useSpecialCharacters;
    }
}

export class PasswordGenerator{
    private gs: GenerationSettings;

    constructor(gs: GenerationSettings){
        this.gs = gs;
    }
    
    private getPasswordGeneratorCharPool(){
        let lowercaseChars = "abcdefghijklmnoprstuvxyz";
        let uppercaseChars = lowercaseChars.toUpperCase();
        let numberChars = "0123456789";
        let specialChars = "!@#$%^&*()_+"

        const {useLowercase, useUppercase, useNumbers, useSpecialCharacters} = this.gs;
    
        let pool = (useLowercase ? lowercaseChars : "").concat(
            (useUppercase ? uppercaseChars : ""),
            (useNumbers ? numberChars : ""),
            (useSpecialCharacters ? specialChars : "")
        )

        return pool == "" ? lowercaseChars : pool;
    }

    public generate(){
        let charPool = this.getPasswordGeneratorCharPool();
        let pass = "";
        for(let i = 0; i < this.gs.length; i++){
            let charNumber = Math.floor(Math.random() * charPool.length);
            pass += charPool.at(charNumber);
        }
        return pass;
    }
}
