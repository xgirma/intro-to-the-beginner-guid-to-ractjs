# Make Basic Forms with React

In this lesson we'll take a look at how to make a `basic form with React`. We'll see how to use the `onSubmit event to prevent the default submit behavior of forms` with React and then how to use `that event to get the values from the form`. We'll also see how you can use the `React ref prop to get the value of form elements` as well.

```html
<div id="root"></div>
<script type="text/babel">
  class NameForm extends React.Component {
    render () {
      return (
        <form>
          <label>
            Name:
            <input type="text" />
          </label>
          <button type="submit">Submit</button>
        </form>
      )
    }
  }

  ReactDOM.render(<NameForm/>, document.getElementById('root'))
</script>
</body>
```

### full-page refresh

Clicking **Submit** going to do a :rage1: `full page refresh` :rage1:, so to prevent that, `we need to prevent the default behavior`.

![ezgif com-video-to-gif 12](https://user-images.githubusercontent.com/5876481/33879296-e1d86350-dee2-11e7-9774-3449bbe726be.gif)

Let's go ahead and add an `onSubmit` event handler to <form>. We'll say `this.handleSubmit`, and then we'll add that as a class property here. This is going to get us our event. We'll say `event.preventDefault`.

```html
<script type="text/babel">
  class NameForm extends React.Component {
    handleSubmit = (event) => {
      event.preventDefault()
    }

    render () {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name: <input type="text" />
          </label>
          <button type="submit">Submit</button>
        </form>
      )
    }
  }

  ReactDOM.render(<NameForm/>, document.getElementById('root'))
</script>
</body>
```

Now, if we input hi there and click submit, then we're not going to get that default behavior, and we can do our own behavior.

## Extract input value
Multiple ways

        1. event.target
        2. add name prop on <input> 
        3. add a ref prop
    
### target: event.target

If we want to get the `value that we type in the input to send` in an Ajax request or something, there are a couple ways that we can do that. Let's first **console.log({target: event.target})**.

```html
<script type="text/babel">
  class NameForm extends React.Component {
    handleSubmit = (event) => {
      event.preventDefault()
      console.log({target: event.target}) // { target: form }
      console.log(event.target[0].value) // test
    }

    render () {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name: <input type="text" /> 
          </label>
          <button type="submit">Submit</button>
        </form>
      )
    }
  }

  ReactDOM.render(<NameForm/>, document.getElementById('root'))
</script>
```

### add name prop on <input>

Another thing we could do is add a `name` prop on our `<input>`, and call this "userInput".

```html
<script type="text/babel">
  class NameForm extends React.Component {
    handleSubmit = (event) => {
      event.preventDefault()
      console.log({target: event.target}) // { target: form }
      console.log(event.target[0].value) // test
      console.log(event.target.elements.username.value) // test
    }

    render () {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name: <input type="text" name="username"/>
          </label>
          <button type="submit">Submit</button>
        </form>
      )
    }
  }

  ReactDOM.render(<NameForm/>, document.getElementById('root'))
</script>
</body>
```
### add a ref prop

Then finally, `the most direct way that we could do is using the ref prop`.

Here, we'd say the `{node => this.inputNode = node}`. Then in our handler here, we'll say `console.log(this.inputNode.value)`.

```html
<script type="text/babel">
  class NameForm extends React.Component {
    handleSubmit = (event) => {
      event.preventDefault()
      console.log({target: event.target}) // { target: form }
      console.log(event.target[0].value) // test
      console.log(event.target.elements.username.value) // test
      console.log(this.inputNode.value) // test
    }

    render () {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name: <input type="text"
                         name="username"
                         ref={node => this.inputNode = node}
          />
          </label>
          <button type="submit">Submit</button>
        </form>
      )
    }
  }

  ReactDOM.render(<NameForm/>, document.getElementById('root'))
</script>
</body>
```

# Summary
Now, these first two methods of getting the value of the <input> are actually just `regular HTML`. If you have an event handler on a `<form> using just raw DOM APIs`.

Then this `ref` **prop is definitely just a React thing**. It makes things a little bit `more direct`, because here, we see we're assigning the `inputNode`, and then we're `referencing that inputNode` to get the value.

However you do it, all three of these work just as well. I like using the `ref`, because it makes things a little bit more `explicit`, but **if you have a really big <form>, using something like the name attributes works really nicely**, too, so you don't have to have a whole bunch of refs to keep track of.
