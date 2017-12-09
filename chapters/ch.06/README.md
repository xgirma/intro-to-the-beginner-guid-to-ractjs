# Conditionally Render A React Component

In this lesson we explore JSX a little further and solidify in our minds that JSX is simply syntax sugar on top of a fairly simple React API: `React.createElement`

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  function Message({message}){
    return <div>{message}</div>
  }

  ReactDOM.render(
    <Message message={"Hello World"}/>,
    document.getElementById('root')
  )
</script>
```

### if no message?
Here, we have a handy message component that renders a message inside of a `div`. What if `we don't actually pass a message at all`? What if that message `were to be null`, for example? That's not going to render anything.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  function Message({message}){
    return <div>{message}</div>
  }

  ReactDOM.render(
    <Message message={null}/>,
    document.getElementById('root')
  )
</script>
```

<img width="732" alt="screen shot 2017-12-08 at 7 09 35 pm" src="https://user-images.githubusercontent.com/5876481/33792039-66cc3b58-dc4b-11e7-9808-6661f1b3eec3.png">

In our case, we want to have it render no message.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  function Message({message}){
    if(!message){
      return <div>No Message</div>
    }
    return <div>{message}</div>
  }

  ReactDOM.render(
    <Message message={null}/>,
    document.getElementById('root')
  )
</script>
```

Renders "No Message".

### JSX an abstraction on top of React.createElement()
Now, the :fire: key :fire: takeaway here is that `JSX is simply an abstraction on top of React.createElement`

We'll say `React.createElement`, `div`, **null for the props**, and then `No Message` will be a string for the `children`. 

````html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  function Message({message}){
    if(!message){
      return React.createElement('div', null, 'No Message')
    }
    return React.createElement('div', null, message)
  }

  ReactDOM.render(
    <Message message={null}/>,
    document.getElementById('root')
  )
</script>
````

This is functionally equivalent to what we had before. `This is just what the JSX would be transpiled down to`. 

With it like this, we can see that this is really just JavaScript. 

### ternary
Instead of this if statement, `we could do a ternary` where we'd say return message?, and then if there is a message, then we'll do React.createElement with that message.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  function Message({message}){
    return message
      ? React.createElement('div', null, message)
      : React.createElement('div', null, 'No Message')
  }

  ReactDOM.render(
    <Message message={null}/>,
    document.getElementById('root')
  )
</script>
```

### inside a <div/>
When you start into JSX, you need to `open up some interpolation` to do any of the JavaScript stuff. This is why very often in React code in the `render method`, `you'll see the use of ternaries`, because the curly braces must accept an expression in there.

> That's why you'll see ternaries, because **you can't have an if statement in here**.

Using ternaries to conditionally render different components is a really nice way to compose these components together.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  function Message({message}){
   return (
     <div>{
       message
         ? React.createElement('div', null, message)
         : React.createElement('div', null, 'No Message')
     }</div>
   )
  }

  ReactDOM.render(
    <Message message={null}/>,
    document.getElementById('root')
  )
</script>
```

### back to JSX
Let's go ahead and refactor this back to JSX, `because it looks a little bit nicer`. I'll say div with message, and then div with no message. Then we can change this to null to get our no message.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  function Message({message}){
   return (
     <div>{
       message
         ? (<div>message</div>)
         : (<div>No Message</div>)
     }</div>
   )
  }

  ReactDOM.render(
    <Message message={null}/>,
    document.getElementById('root')
  )
</script>
```

