# Password Generator

This project is a **password generator website** that dynamically creates secure passwords based on user-defined settings. The password is generated through customizable options.

## Features

- Customizable Password Options:
  - Password length (default: 64).
  - Include lowercase letters, uppercase letters, numbers and special characters.


## Usage

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kacpermajkowski/random-pwd-gen.git
   cd random-pwd-gen
   ```

2. **Install TypeScript compiler using NPM**
   ```
   npm i -g typescript
   ```

    You can download Node.js along with NPM [here](https://nodejs.org/en) if you don't already have it installed.

3. **Compile the TypeScript files**
   ```
    tsc -t es2022 passwordGenerator.ts script.ts
   ```
   
4. **Copy all `.html`, `.css` and `.ts` files into location of choice**
   
   After which you can open `index.html` in a browser or enter an adress of a web server you hosted the files **and enjoy :)**

5. **License**

   This project is open-source and available under the MIT License.