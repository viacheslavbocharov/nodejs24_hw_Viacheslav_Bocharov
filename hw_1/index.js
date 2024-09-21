// Дана строка "Node.js course". Виведіть в консоль довжину цієї строки.
let str = "Node.js course"
console.log(`Quantatu on symbols in sting "Node.js course" is ${str.length}`)

// Дано число 33. 
// Напишіть функції що приймає на вхід дане число та видає це число помножене на 2 стільки разів, 
// з скількох символів складається число.

function multiplyAndCountDigits(number) {
    let res = number;

    if (typeof res === 'number') {

        for (let index = 0; index < number.toString().length; index++) {
            res *= 2;
        }

    } else {
        console.log("Error. Not a number")
        res = null
    }

    return res
}

console.log(multiplyAndCountDigits(33));
console.log(multiplyAndCountDigits("33"));