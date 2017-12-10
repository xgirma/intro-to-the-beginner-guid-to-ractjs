# Use Class Components with React

In this lesson we'll look at a few ways to deal with issues around **this** when writing class components with React. We'll eventually land at **Public Class Fields syntax** which is a stage 3 proposal in the ECMAScript standardization process.

### Arrow function performance bottleneck
```html
<script type="text/babel">
    class Counter extends React.Component {
      constructor(...args){
        super(...args)
        this.state = {
          count: 0
        }
      }

      render() {
        const buttonStyles = {
          border: '1px solid #ccc',
          background: '#fff',
          fontSize: '1em',
          padding: 15,
          margin: 5,
          width: 100,
        }

        console.log(this.state.count)

        return(
          <button style={buttonStyles}
                  onClick={
                    () => this.setState(
                      ( {count}) => ( {count: count + 1, } )
                    )
          }>
            {this.state.count}
          </button>
        )
      }
    }

    const element = <Counter/>
    ReactDOM.render(element, document.getElementById('root'))
</script>
```

This is totally fine to have an arrow function on our **onClick**, but sometimes it can get a `little bit big`. In some cases, `it can actually be a performance bottleneck`.

![ezgif com-video-to-gif 10](https://user-images.githubusercontent.com/5876481/33802417-bbb41e52-dd2b-11e7-98f1-7f1c37096c35.gif)

### Use handleClick
So we're going to go ahead and extract that. We'll call this handleClick() on our class here. We're just going to pull `this.setState` out to our handleClick. Then we'll say `this.handleClick`.

```html
<script type="text/babel">
  class Counter extends React.Component {
    constructor(...args){
      super(...args)
      this.state = {
        count: 0
      }
    }

    handleClick() {
      this.setState(
        ( {count}) => ( {count: count + 1, } )
      )
    }

    render() {
      const buttonStyles = {border: '1px solid #ccc', background: '#fff', fontSize: '1em', padding: 15, margin: 5, width: 100,}

      console.log(this.state.count)

      return(
        <button style={buttonStyles}
                onClick={this.handleClick}>
          {this.state.count}
        </button>
      )
    }
  }

  const element = <Counter/>
  ReactDOM.render(element, document.getElementById('root'))
</script>
```

We'll see that it actually is broken. If I pop open my developer tools, we're going to get this error message every single time saying, :fire: :fire: "_`Cannot read property. Set state of undefined.`_" :fire: :fire:

![ezgif com-video-to-gif 11](https://user-images.githubusercontent.com/5876481/33802482-0bbfbb12-dd2d-11e7-950b-93780b9764b4.gif)

The line that this is breaking on is `this.setState` where we're calling **setState** on **this**. The problem is pretty fundamental in JavaScript.

### this
Let's take an example here.

```javascript
var bob = {
  name: 'Bob',
  greet(name) {
    return `Hi ${name}, my name is ${this.name}!`
  }
}

console.log(bob.greet('Girma'))
// Hi Girma, my name is Bob!
```
What we're in the `render()` function is though is we're passing `onClick` **this** reference to `handleClick` function.

```javascript
handleClick() {
      this.setState(
        ( {count}) => ( {count: count + 1, } )
      )
    }

    render() {
      // ..
      return(
        <button style={buttonStyles}
                onClick={this.handleClick}>
          {this.state.count}
        </button>
      )
    }
```

So let's go ahead and get a reference to `bob.greet`.

```javascript
var bob = {
  name: 'Bob',
  greet(name) {
    return `Hi ${name}, my name is ${this.name}!`
  }
}

var greetFn = bob.greet;

console.log(greetFn('Girma'))
// Hi Girma, my name is undefined!
```

That's because when **this** function called, **this** is not referencing our object **bob**.

We can get around this problem in JavaScript by instead assigning **this** to `bind bob`. Now **this** will `always be referencing our bob` function.

```javascript
var bob = {
  name: 'Bob',
  greet(name) {
    return `Hi ${name}, my name is ${this.name}!`
  }
}

var greetFn = bob.greet.bind(bob);

console.log(greetFn('Girma'))
// Hi Girma, my name is Bob!
```

:mahjong: :mahjong: We can solve this problem by calling **.bind** with **this**. :mahjong: :mahjong:

```html
<script type="text/babel">
  class Counter extends React.Component {
    constructor(...args){
      super(...args)
      this.state = {
        count: 0
      }
    }

    handleClick() {
      this.setState(
        ( {count}) => ( {count: count + 1, } )
      )
    }

    render() {
      const buttonStyles = {border: '1px solid #ccc', background: '#fff', fontSize: '1em', padding: 15, margin: 5, width: 100,}

      console.log(this.state.count)

      return(
        <button style={buttonStyles}
                onClick={this.handleClick.bind(this)}>
          {this.state.count}
        </button>
      )
    }
  }

  const element = <Counter/>
  ReactDOM.render(element, document.getElementById('root'))
</script>
```

![ezgif com-video-to-gif 10](https://user-images.githubusercontent.com/5876481/33802417-bbb41e52-dd2b-11e7-98f1-7f1c37096c35.gif)

That's great. It cleans up our render function a little. But it's kind of annoying to have to call .bind. It also actually is still `performance bottleneck` in some situations which would be nice to avoid.

### constructor
 What we can do is, inside of our **constructor**, say `this.handleClick`. We reference this.handleClick which actually is **pointing to the prototypal method**. We're going to actually `reassign this` to `this.handleClick.bind(this)`.
 
```html
<script type="text/babel">
  class Counter extends React.Component {
    constructor(...args){
      super(...args)
      this.state = {count: 0}
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      this.setState(
        ( {count}) => ( {count: count + 1, } )
      )
    }

    render() {
      const buttonStyles = {border: '1px solid #ccc', background: '#fff', fontSize: '1em', padding: 15, margin: 5, width: 100,}

      console.log(this.state.count)

      return(
        <button style={buttonStyles}
                onClick={this.handleClick}>
          {this.state.count}
        </button>
      )
    }
  }

  const element = <Counter/>
  ReactDOM.render(element, document.getElementById('root'))
</script>
```

> We're creating new function inside of our constructor and overriding the function that we have reference to from our prototype to a pre-bound method. Now we can just pass this without the bind, and everything works perfectly.

That's better. We're getting rid of that performance bottleneck, but this is still super annoying, especially if you have a lot of these.

### public class fields
One really neat trick is we can actually use `public class fields`. 

Let's go ahead, and we'll remove **this.** from `state` and `handleClick` and move these down outside of the `constructor`.

Now our constructor looks exactly like the default constructor, so we can get rid of that.

```html
<script type="text/babel">
  class Counter extends React.Component {
    state = {count: 0}
    handleClick = this.handleClick.bind(this)

    handleClick() {
      this.setState(
        ( {count}) => ( {count: count + 1, } )
      )
    }

    render() {
      const buttonStyles = {border: '1px solid #ccc', background: '#fff', fontSize: '1em', padding: 15, margin: 5, width: 100,}

      console.log(this.state.count)

      return(
        <button style={buttonStyles}
                onClick={this.handleClick}>
          {this.state.count}
        </button>
      )
    }
  }

  const element = <Counter/>
  ReactDOM.render(element, document.getElementById('root'))
</script>
```

This is using public class fields where we have the name of the field and then the assignment and then the value that it'll be assigned to.

We've gotten rid of a little bit of boiler plate using public class fields.

### on the instance
We can actually do a little bit better by `not creating this handleClick method on the prototype` at all and just `having it on the instance`. Here we can say, handleClick = a function that we .bind(this).

```html
<script type="text/babel">
  class Counter extends React.Component {
    state = {count: 0}

    handleClick = function (){
      this.setState(
        ( {count}) => ( {count: count + 1, } )
      )
    }.bind(this)

    render() {
      const buttonStyles = {border: '1px solid #ccc', background: '#fff', fontSize: '1em', padding: 15, margin: 5, width: 100,}

      console.log(this.state.count)

      return(
        <button style={buttonStyles}
                onClick={this.handleClick}>
          {this.state.count}
        </button>
      )
    }
  }

  const element = <Counter/>
  ReactDOM.render(element, document.getElementById('root'))
</script>
```

Everything is working yet again, just perfect.

### lexical this
But having this **bind** on here is super annoying also. So we're going to get rid of that and just use the **lexical this that arrow functions give us**.

```html
<script type="text/babel">
  class Counter extends React.Component {
    state = {count: 0}

    handleClick = () => {
      this.setState(
        ( {count}) => ( {count: count + 1, } )
      )
    }

    render() {
      const buttonStyles = {border: '1px solid #ccc', background: '#fff', fontSize: '1em', padding: 15, margin: 5, width: 100,}

      console.log(this.state.count)

      return(
        <button style={buttonStyles}
                onClick={this.handleClick}>
          {this.state.count}
        </button>
      )
    }
  }

  const element = <Counter/>
  ReactDOM.render(element, document.getElementById('root'))
</script>
```

## Summary
Now we've been able to clean up our `render` method and avoid a potential performance bottleneck by moving our event handler `to the class body` and using public class fields. We got rid of that `constructor`. We're using this `public class field` syntax. Then we're using an `arrow function to avoid issues with using this` inside of our event handler.
 
 
 





