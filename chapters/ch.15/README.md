# Make Dynamic Forms with React
  
Let's talk about how to use the `onChange` prop on an input to do **dynamic and custom validation of a form** `as the user makes changes` to the input.

Here, we have a name form. If I say hi in the name form, I'm going to get an error that the value must be at least three characters, but it's only two. Then I say hey, and then it says it must include S. OK, fine, I'll do heys, and now I have success.

```html
<script type="text/babel">
  class NameForm extends React.Component {
    handleSubmit = event => {
      event.preventDefault()
      const value = event.target.elements.username.value
      const error = this.props.getErrorMessage(value,)
      if (error) {
        alert(`error: ${error}`)
      } else {
        alert(`success: ${value}`)
      }
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="username"/>
          </label>

          <button type="submit">Submit</button>
        </form>
      )
    }
  }

  ReactDOM.render(
    <NameForm
      getErrorMessage={value => {
        if (value.length < 3) {
          return `Value must be at least 3 characters, but is only ${value.length}`
        }
        if (!value.includes('s')) {
          return `Value does not include "s" but it should!`
        }
        return null
      }}
    />,
    document.getElementById('root'),
  )
</script>
```

This kind of experience is not really super awesome, because I have to keep on trying and hitting submit. What would be much better is if the submit button were disabled or something, not even rendered, and `I get an error message as I'm typing`.

> If we want to validate this thing in **real time**, then **we're going to need to keep some state around that tells us whether or not this is valid**.

### init state

```javascript
 class NameForm extends React.Component {
    state = {error: null}
    handleSubmit = event => {
      event.preventDefault()
      const value = event.target.elements.username.value
      const error = this.props.getErrorMessage(value,)
      if (error) {
        alert(`error: ${error}`)
      } else {
        alert(`success: ${value}`)
      }
    }

    render() {
      return (
        // ...
    }
  }
```

### handleChange public class field
```javascript
  class NameForm extends React.Component {
    state = {error: null}

    handleSubmit = event => {
      event.preventDefault()
      const value = event.target.elements.username.value
      const error = this.props.getErrorMessage(value,)
      if (error) {
        alert(`error: ${error}`)
      } else {
        alert(`success: ${value}`)
      }
    }

    handleChange = event => {
      const {value} = event.target
      this.setState({
        error: this.props.getErrorMessage(value)
      })
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="username" onChange={this.handleChange}/>
          </label>

          <button type="submit">Submit</button>
        </form>
      )
    }
  }
```

### disable button if there is error

```javascript
class NameForm extends React.Component {
    state = {error: null}

    // ...

    render() {
      const {error} = this.state
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="username" onChange={this.handleChange}/>
          </label>

          <button disabled={Boolean(error)} type="submit">Submit</button>
        </form>
      )
    }
  }
```

### initialized with a disabled button

We also initialize our state in `componentDidMount`. Instead of setting state in componentDidMount, we could also just move this directly into the initialization of our state, **because at the time that this runs, this.props will already exist**, and we'll be able to get that error message.

```html
<script type="text/babel">
  class NameForm extends React.Component {
    state = {error: null}

    // ...

    componentDidMount() {
      this.setState({
        error: this.props.getErrorMessage('')
      })
    }

    render() {
      const {error} = this.state
      return (
        // ...
      )
    }
  }
```

### Render error message
```html
<script type="text/babel">
  class NameForm extends React.Component {
    // ...

    render() {
      const {error} = this.state
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="username" onChange={this.handleChange}/>
          </label>
          { error ? <div style={{color:'red'}}>{error}</div> : null}
          <button disabled={Boolean(error)} type="submit">Submit</button>
        </form>
      )
    }
  }
```

### move initialization to setState
We also initialize our state in _componentDidMount_. Instead of setting state in componentDidMount, we could also just move this directly into the initialization of our state, because at the time that this runs, this.props will already exist, and we'll be able to get that error message.

```javascript
  class NameForm extends React.Component {
    state = {error: this.props.getErrorMessage('')}

    // ...

    // componentDidMount() {
    //   this.setState({
    //     error: this.props.getErrorMessage('')
    //   })
    // }

    render() {
      const {error} = this.state
      return (
        // ...
      )
    }
  }
```

everything will work exactly as it had before.

:high_brightness: In addition, **we've also avoided an unnecessary rerender**, because we're not actually setting state, we're just initializing the state properly. :key:

## Summary
In review, to make this work, we didn't actually have to control the value of the input. **We just needed to make sure we knew when that input was changing**, and **we handle that change**.

When that happens, we say, "Hey, get me the error message," and **that sets our error state**, which will **cause a rerender**. If that _error does exist_, then we're going to `render the error message`, and we'll `also disable the button`.
