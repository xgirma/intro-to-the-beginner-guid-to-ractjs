var bob = {
  name: 'Bob',
  greet(name) {
    return `Hi ${name}, my name is ${this.name}!`
  }
}

var greetFn = bob.greet;

console.log(greetFn('Girma'))
// Hi Girma, my name is undefined!