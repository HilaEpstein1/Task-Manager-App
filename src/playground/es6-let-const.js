var nameVar = 'Andrew';
console.log('nameVar',nameVar);

var fullname = 'Andrew Mead';


// will work
if (fullname)
{
    var firstName = fullname.split(' ')[0];
    console.log(firstName);
}
console.log(firstName);

//wont work. also with let
if (fullname)
{
    const firstName = fullname.split(' ')[0];
    console.log(firstName);
}
console.log(firstName);