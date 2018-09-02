class Person{
    //gives a default name if the name is not provided
    constructor(name = 'Anonymous', age = 0){
        this.name=name;
        this.age=age
    }
    getGretting(){
         return `Hey! i am ${this.name}`;
    }
    getDescription(){
        return `${this.name} is ${this.age} years old`
    }
}

class Student extends Person{
    constructor(name, age, major){
        super(name, age);
        this.major=major;
    }

    hasMajor(){
        return !!this.major; 
    }

    getDescription(){
        let description = super.getDescription();
        if (this.hasMajor()){
             description += ` with major ${this.major}`;
        }
        return description; 
    }
}

class Traveler extends Person{
    constructor(name, age, location){
        super(name,age);
        this.location=location;
    }

    getGretting(){
        let greet = super.getGretting();
        if (this.location){
            greet += ` im from ${this.location}`
        }
        return greet;
    }
}

const me = new Traveler('Hila Epstein', 25, 'TLV');
console.log(me.getGretting());