# Use Event Handlers with React

In this lesson we'll learn about React's synthetic event system which allows React to use the same event system regardless of the platform (whether you're using react-native or react-dom for example). We'll see how you `attach events directly to elements` and React takes care of `event delegatio`n and `optimization` for you.

```html
<body>
<div id="root"></div>
<script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script type="text/babel">

  const state = {
    eventCount: 0, 
    username: ''
  }

  function App() {
    return (
      <div>
        <p>
          There have been {state.eventCount} events
        </p>
        <p>
          <button>click event</button>
        </p>
        <p>You typed: {state.username}</p>
        <p>
          <input />
        </p>
      </div>
    )
  }

  function setState(newState) {
    Object.assign(state, newState)
    renderApp()
  }

  function renderApp() {
    ReactDOM.render(
      <App/>,
      document.getElementById('root'),
    )
  }

  renderApp()
</script>
</body>
```

Here, we have this `App componen`t that's rendering some UI for us. It's rendering some `state` based off of a variable that we have. Then we have this handy function called `setState` that will assign `newState` to this `state` object.

Then we have this `renderApp` function, which will rerender our App. Every time we call `setState`, we render the app.

```html
  setState({
    eventCount: 10,
    username: 'Girma'
  })
```

<img width="228" alt="screen shot 2017-12-09 at 3 44 57 am" src="https://user-images.githubusercontent.com/5876481/33795288-818ff4fa-dc93-11e7-93fb-845e28354d17.png">

 Now, with that knowledge, let's go ahead and wire up some events. Every time we click on this button, we increment how many events have taken place.
### button
```html
function App() {
    return (
      <div>
        <p>
          There have been {state.eventCount} events
        </p>
        <p>
          <button onClick={() => setState({ eventCount: state.eventCount + 1 })}>click event</button>
        </p>
        <p>You typed: {state.username}</p>
        <p>
          <input />
        </p>
      </div>
    )
  }
```

Let's go ahead, and I'm just going to pull out the function for the `onClick` just to make things a little more clear.

```html
  function App() {
    return (
      <div>
        <p>
          There have been {state.eventCount} events
        </p>
        <p>
          <button onClick={increment}>click event</button>
        </p>
        <p>You typed: {state.username}</p>
        <p>
          <input />
        </p>
      </div>
    )
  }
  function increment() {
    setState({ eventCount: state.eventCount + 1 })
  }
```

There's `onClick`, but there's also a `whole bunch of other events` that we could use here. e. g. `onMouseOver`, We could do onMouseOver. We save that, and every time I mouse over the button, we're going to increment that event.

```html
  function App() {
    return (
      <div>
        <p>
          There have been {state.eventCount} events
        </p>
        <p>
          <button onMouseOver={increment}>click event</button>
        </p>
        <p>You typed: {state.username}</p>
        <p>
          <input />
        </p>
      </div>
    )
  }
  
  function increment() {
    setState({ eventCount: state.eventCount + 1 })
  }
```
### input

Inputs are a little bit **unique** in that they provide an `onChange` event. _Every single time the input changes, immediately we'll get this function called_. If we want to `update the state.username`, then we're going to need what the value of the input is.

        We're going to say onChange={event => setState({username: event.target.value})}. 
        
That'll be referencing the `inputNode.value`. That'll get the value from the input node.

```html
  function App() {
    return (
      <div>
        <p>
          There have been {state.eventCount} events
        </p>
        <p>
          <button onClick={increment}>click event</button>
        </p>
        <p>You typed: {state.username}</p>
        <p>
          <input onChange={event => setState({username: event.target.value})}/>
        </p>
      </div>
    )
  }
```
As we type, say, Girma, and we get that username state updating.

![ezgif com-video-to-gif 5](https://user-images.githubusercontent.com/5876481/33795422-cea889b2-dc95-11e7-9674-95b034bbb6c5.gif)

We could also, instead of `onChange`, we could use `onBlur`. We could type something in here like Sarah, and then tab out, and we'll get that update at that time.

![ezgif com-video-to-gif 6](https://user-images.githubusercontent.com/5876481/33795449-4bc0222a-dc96-11e7-8e1e-d804c5fa4c78.gif)

```html
  function App() {
    return (
      <div>
        <p>
          There have been {state.eventCount} events
        </p>
        <p>
          <button onClick={increment}>click event</button>
        </p>
        <p>You typed: {state.username}</p>
        <p>
          <input onChange={updateUsername}/>
        </p>
      </div>
    )
  }

  function updateUsername(event) {
    setState({username: event.target.value})
  }
```

Now, let's go ahead and actually, really quick, we'll `console.log(event)` here.

```html
function updateUsername(event) {
    console.log(event)
    setState({username: event.target.value})
  }
```

### proxy (event)
We're going to see is a `proxy` here. What React is doing is it's `synthesizing an event system`.

<img width="924" alt="screen shot 2017-12-09 at 4 11 15 am" src="https://user-images.githubusercontent.com/5876481/33795486-0c3ee0cc-dc97-11e7-8adf-8e24b7931344.png">

### native/original event (event.nativeEvent)
We do have access to the `original event` if we say `console.log(event.nativeEvent)`.

```html
  function updateUsername(event) {
    console.log(event.nativeEvent)
    setState({username: event.target.value})
  }
```

<img width="896" alt="screen shot 2017-12-09 at 4 14 45 am" src="https://user-images.githubusercontent.com/5876481/33795499-86914d9c-dc97-11e7-8def-ce7850ace39c.png">

**We get the actual native event here**. Most of the time, you don't actually need the native event.

## Summary

One nice thing about this is that **React is optimizing things for us, so it's using event delegation**. There's really **only one event handler for each type on the entire document**. Then it manages `calling your event handlers`.

One thing that I really like about the way that React does events is that `it's directly on the element that you're rendering`, and you're **passing is a direct reference to the function that you want to have called**. It's pretty easy to follow the code path of the events that you have wired up.
