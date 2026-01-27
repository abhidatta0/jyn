import { number,checkbox } from '@inquirer/prompts';

const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
);

function arrayFromLowToHigh(low:number, high:number) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}
export default async function passwordGenerator(){
    const charsCount = await number({message:'Enter number of characters'});

    const configs = await checkbox({
        message: 'Select a package manager',
        choices: [
            { name: 'Include Uppercase', value: 'uppercase' },
            { name: 'Include Numbers', value: 'numbers' },
            { name: 'Include Symbols', value: 'symbols' },
        ],
        });

    const output = generatePassword(charsCount ?? 0, configs.includes('uppercase'), configs.includes('numbers'), configs.includes('symbols'));

    return output;

}


function generatePassword(charCount: number, includeUppercase:boolean, includeNumbers:boolean, includeSymbols:boolean){
   let charCodes = LOWERCASE_CHAR_CODES;
   if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
   if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
   if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
  
   const passwordChars = [];
   for(let i=0;i<charCount;i++){
    const characterCode = charCodes[Math.floor(Math.random()*charCodes.length)];
    if(characterCode){
      passwordChars.push(String.fromCharCode(characterCode)); 
    }
   }

   return passwordChars.join('');
}