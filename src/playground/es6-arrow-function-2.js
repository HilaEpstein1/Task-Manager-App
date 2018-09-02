const add = function (a,b) {
    console.log(arguments); //prints all the arguments of the function
    // If we use arrow function we have no access to these arguments
    return a+b;
};

const multiplier = {
    numbers: [1,2,3],
    multiplyBy: 2,
    multiply (){
        return this.numbers.map((num) => num * this.multiplyBy);
    }
    //we need to use this.numbers to reach to numbers array because we are in a function
    //of an object. a functions reaches only to its argument or its parent arguments by "this"
};

console.log(multiplier.multiply());