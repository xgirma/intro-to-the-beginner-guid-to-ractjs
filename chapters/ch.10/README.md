# Use Component State with React
In this lesson we'll build a stopwatch component that maintains its own `state`. We'll start by creating the static UI, then take the dynamic parts and accept them as props. After that we'll refactor that to state and add event handlers to update the state.

### `stopWatch` function

```html
<script type="text/babel">
    function StopWatch() {
      return (
        <div>
            <label>0 ms</label>
            <button>Start</button>
            <button>Clear</button>
        </div>
      )
    }

    const element = <StopWatch />
    ReactDOM.render(element, document.getElementById('root'))
</script>
```
### style

```html
function StopWatch() {
      const buttonStyles = {
        border: '1px solid #ccc',
        background: '#fff',
        fontSize: '1em',
        padding: 15,
        margin: 5,
        width: 100,
      }

      const labelStyles = {
        fontSize: '2em',
        display: 'block'
      }

      return (
        <div style={{textAlign: 'center'}} >
            <label style={labelStyles} > 0 ms </label>
            <button style={buttonStyles} > Start </button>
            <button style={buttonStyles} > Clear </button>
        </div>
      )
    }
```

### lapse from props
change hardcoded lapse using `props`.
```html
    function StopWatch({lapse}) {
      // ...

      return (
        <div style={{textAlign: 'center'}}>
            <label style={labelStyles}>{`${lapse} ms`}</label>
            <button style={buttonStyles}>Start</button>
            <button style={buttonStyles}>Clear</button>
        </div>
      )
    }

    const element = <StopWatch lapse={0}/>
    ReactDOM.render(element, document.getElementById('root'))
```

### start/stop dynamically
getting running from props.
```html
   function StopWatch({lapse, running}) {
      // ...

      return (
        <div style={{textAlign: 'center'}}>
            <label style={labelStyles}>{`${lapse} ms`}</label>
            <button style={buttonStyles}>{running? 'Stop' : 'Start'}</button>
            <button style={buttonStyles}>Clear</button>
        </div>
      )
    }

    const element = <StopWatch lapse={0} running={false}/>
    ReactDOM.render(element, document.getElementById('root'))
```

Doing things this way `makes it a lot easier to add dynamic capabilities` to the existing markup that we've created, because we've been able to `extract the specific parts of the state` that are in our render method. That makes it easier for us to take these things and `move them into state`.

### class
```html
class StopWatch extends React.Component {
      render() {
        // ...

        return (
          <div style={{textAlign: 'center'}}>
            <label style={labelStyles}>{`${lapse} ms`}</label>
            <button style={buttonStyles}>{running? 'Stop' : 'Start'}</button>
            <button style={buttonStyles}>Clear</button>
          </div>
        )
      }
    }
```

:eyes: instead of props being passed to our function, we're going to get it from `this.props`. :eyes:

```html
class StopWatch extends React.Component {
      render() {
        const {lapse, running} = this.props
        // ...

        return (
          <div style={{textAlign: 'center'}}>
            <label style={labelStyles}>{`${lapse} ms`}</label>
            <button style={buttonStyles}>{running? 'Stop' : 'Start'}</button>
            <button style={buttonStyles}>Clear</button>
          </div>
        )
      }
    }
```

### add state
:honeybee: add state and pull value from the state. :honeybee:
```html
class StopWatch extends React.Component {
      state = {lapse: 0, running: false}
      render() {
        const {lapse, running} = this.state
        // ...

        return (
          <div style={{textAlign: 'center'}}>
            <label style={labelStyles}>{`${lapse} ms`}</label>
            <button style={buttonStyles}>{running? 'Stop' : 'Start'}</button>
            <button style={buttonStyles}>Clear</button>
          </div>
        )
      }
    }
```

### dynamically update the state
Now, we need to be able to make this `dynamic`. We need to dynamically update the `state` as we go. Let's go ahead and `make these buttons functional`. We'll add an `onClick handler` to our start and stop button. This will be `this.handleRunClick`.

We'll create that **member property** on our stopwatch instances with handleRunClick = () => {}.

```html
class StopWatch extends React.Component {
      state = {lapse: 0, running: false}

      handleRunClick = () => {
        this.setState({lapse: 10, running: true})
      }

      render() {
        const {lapse, running} = this.state
        // ...

        return (
          <div style={{textAlign: 'center'}}>
            <label style={labelStyles}>{`${lapse} ms`}</label>

            <button onClick={this.handleRunClick} style={buttonStyles}>{running? 'Stop' : 'Start'}</button>
            <button style={buttonStyles}>Clear</button>
          </div>
        )
      }
    }
```

With **handleClearClick**. We say **this.setState**, where _lapse: 0 and running: false_.

```html
class StopWatch extends React.Component {
      state = {lapse: 0, running: false}

      handleRunClick = () => {
        this.setState({lapse: 10, running: true})
      }

      handleClearClick = () => {
        this.setState({lapse: 0, running: false})
      }

      render() {
        const {lapse, running} = this.state
        // ...

        return (
          <div style={{textAlign: 'center'}}>
            <label style={labelStyles}>{`${lapse} ms`}</label>

            <button onClick={this.handleRunClick}
                    style={buttonStyles}>{running? 'Stop' : 'Start'}</button>

            <button onClick={this.handleClearClick}
                    style={buttonStyles}>Clear</button>
          </div>
        )
      }
    }
```

```html
class StopWatch extends React.Component {
      state = {lapse: 0, running: false}

      handleRunClick = () => {
        this.setState(state => {
          if (state.running) {
            clearInterval(this.timer)
          } else {
            const startTime =
              Date.now() - this.state.lapse
            this.timer = setInterval(() => {
              this.setState({
                lapse: Date.now() - startTime,
              })
            })
          }
          return {running: !state.running}
        })
      }

      handleClearClick = () => {
        clearInterval(this.timer)
        this.setState({lapse: 0, running: false})
      }

      render() {
        const {lapse, running} = this.state
        // ...

        return (
          <div style={{textAlign: 'center'}}>
            <label style={labelStyles}>{`${lapse} ms`}</label>

            <button onClick={this.handleRunClick}
                    style={buttonStyles}>{running? 'Stop' : 'Start'}</button>

            <button onClick={this.handleClearClick}
                    style={buttonStyles}>Clear</button>
          </div>
        )
      }
    }

```

## Summary
We're going to review the way that we made our StopWatch component stateful.

> 1. We started out by making a static render method that just `rendered statically the information that we wanted to have rendered`.

> 2. That made it easier for us to extract the `pieces that are stateful`, like the lapse and running. We accepted those as `props to make sure that those were wired` up properly.

> 3. We moved those `props to state`, and then, `instead of pulling those from props`, we `pulled them from state`.

> 4. We added this onClick to each <button>, and added the logic for those things here.

> 5. To update the state, you use **setState**, and if you need to reference some existing state as you're updating the state, then `you use an updater function that accepts our state and returns the new state`.

> 5.1 Otherwise, you can simply call setState with an object `if your new state doesn't depend on some old state`.

This implementation actually has a **memory leak** in it, but I'll fix that in another lesson.

