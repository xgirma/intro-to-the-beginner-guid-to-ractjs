var bob = {
  name: 'Bob',
  greet(name) {
    return `Hi ${name}, my name is ${this.name}!`
  }
}

console.log(bob.greet('Girma'))
// Hi Girma, my name is Bob!