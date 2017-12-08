# Create Custom React Components

Just like in regular JavaScript, when you want to `reuse code`, you create a `function`. With React, you `create components`. In this lesson we'll walk through the process of creating custom React components and you'll walk away with a deep understanding of how to create and use basic components to `compose` a larger component you render.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const element = (
    <div className="container">
        <div>Hello World</div>
        <div>Hello World</div>
    </div>
  )

  ReactDOM.render(element, rootElement)
</script>
```
Here, I have a div with a child that has hello world in it. We're going to go ahead and duplicate these, and we'll see we have two. `I don't want to repeat myself`, so I'm going to actually extract this to a variable called hello world. Then I can just interpolate that directly in my JSX. I refresh. I see exactly the same thing.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const helloWorld = <div>Hello World</div>
  const element = (
    <div className="container">
      {helloWorld}
      {helloWorld}
    </div>
  )

  ReactDOM.render(element, rootElement)
</script>
```

### wrap JSX in a function
Now, let's say that I wanted one of them to say `Hello World` and the other to say `Goodbye World`.

`In JavaScript, when we want to reuse code and parameterize that code, we use a function`. I'm going to use an arrow function here. This arrow function is going to take an argument. I'm going to call that props.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const message = (props) => (<div>{props.msg}</div>)
  const element = (
    <div className="container">
      {message({msg: 'Hello World'})}
      {message({msg: 'Goodbye World'})}
    </div>
  )

  ReactDOM.render(element, rootElement)
</script>
```

:raised_hands: Sweet. :raised_hands: `We've been able to take some JSX, wrap it in a function`, and `make a function call` to message there.

<img width="743" alt="screen shot 2017-12-08 at 1 26 01 am" src="https://user-images.githubusercontent.com/5876481/33759343-cfbbf6ca-dbb6-11e7-813b-445b31eac184.png">

### React.createElement(function, props-object)

:facepunch: Unfortunately, :facepunch: `function calls don't really compose quite as well as JSX does`, so let's see how we can turn this into JSX to make it compose a little bit better. `JSX compiles down to React.createElement call`. Let's `start out with React.createElement` and see how we can convert that to JSX.

One :open_mouth: neat :open_mouth: thing about the `React.createElement API` is that it cannot only take a string indicating what element we want to have rendered, like div or span, but **it can also take a function**.

        React.createElement API can take a function. 
        
It will `pass the props to the function`, and that function presumably will render some more elements. 

In our case, the `message` function is rendering a `div`. With that in mind, the function that we want to create an element out of is this message function. The props we're going to pass is this object that has the message property for hello world.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const message = (props) => (<div>{props.msg}</div>)
  const element = (
    <div className="container">
      {React.createElement(message, {msg: 'Hello World'})}
      {React.createElement(message, {msg: 'Goodbye World'})}
    </div>
  )

  ReactDOM.render(element, rootElement)
</script>
```

### JSX div
When we wanted to switch from "`React.createElement` div" to `JSX div`, we simply wrote `open caret div`. Let's go ahead and do open caret message here and see what happens with that. 

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const message = (props) => (<div>{props.msg}</div>)
  const element = (
    <div className="container">
        <message />
      {React.createElement(message, {msg: 'Hello World'})}
      {React.createElement(message, {msg: 'Goodbye World'})}
    </div>
  )

  ReactDOM.render(element, rootElement)
</script>
```

We're going to see a warning that says that the tag message is unrecognized in the browser. 

<img width="985" alt="screen shot 2017-12-08 at 1 43 18 am" src="https://user-images.githubusercontent.com/5876481/33760022-37db07e4-dbb9-11e7-8a08-b5b3f677d7f0.png">

If I go here, I'm going to see that :flushed: `message is actually being rendered` :flushed:.

<img width="734" alt="screen shot 2017-12-08 at 1 44 55 am" src="https://user-images.githubusercontent.com/5876481/33760087-6dc91594-dbb9-11e7-9ea4-5c5565f299a9.png">

That's not exactly what I'm really going for here. I want to render my component. I want to have this function called using `React.createElement`. Let's go ahead and take a look at what's happening here. We're going to go to the `Babel REPL` because, remember, `it's Babel that's transpiling this JSX` statement into a `React.createElement`.

<img width="670" alt="screen shot 2017-12-08 at 1 48 38 am" src="https://user-images.githubusercontent.com/5876481/33760263-f681ecd0-dbb9-11e7-8c96-353bc65a5952.png">

If I copy this over, then we're going to see it's `React.createElement` with **quotes** `message`, that is why `const message = (props) => (<div>{props.msg}</div>)` is not being referenced. 
 
If I add `const message = (props) => (<div>{props.msg}</div>)` to the top.
 
 <img width="848" alt="screen shot 2017-12-08 at 1 52 13 am" src="https://user-images.githubusercontent.com/5876481/33760462-8cd8d2a2-dbba-11e7-86a3-3f6c6a2bbe32.png">
 
The reason is that we have this `variable message` at `line 3`, but it's using the **string** `message`.
 
### capitalize
:punch: :punch:
For JSX to differentiate whether you're talking about a `variable that's in scope` or a `raw DOM element`, you need to **capitalize** your component.
:punch: :punch:

<img width="845" alt="screen shot 2017-12-08 at 2 01 21 am" src="https://user-images.githubusercontent.com/5876481/33760773-c2b4cad8-dbbb-11e7-8d5f-c238a363a2ac.png">

I'll capitalize the `M`. Now, this Message (`var Message = ..`) is being referenced in this create element call (`React.createElement(Message, null);`).

If we apply that to our scenario, we'll remove some of this JavaScript syntax in favor of JSX.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const Message = (props) => (<div>{props.msg}</div>)
  const element = (
    <div className="container">
      <Message msg='Hello World' />
      <Message msg='Goodbye World' />
    </div>
  )

  ReactDOM.render(element, rootElement)
</script>
```

<img width="734" alt="screen shot 2017-12-08 at 1 44 55 am" src="https://user-images.githubusercontent.com/5876481/33760087-6dc91594-dbb9-11e7-9ea4-5c5565f299a9.png">

Then we have exactly what we're looking for. We have this "Hello World" and "Goodbye World" referencing the "Message component" that we created. Now, `we can reuse this all over the place`. We can **compose** these things together.

### children prop
:anguished: Particularly :anguished:, if we were to change the `msg prop` to the `children prop`, then we can `change msg to children`.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const Message = (props) => (<div>{props.children}</div>)
  const element = (
    <div className="container">
      <Message children='Hello World' />
      <Message children='Goodbye World' />
    </div>
  )

  ReactDOM.render(element, rootElement)
</script>
```

The nice thing about the `children prop` is we can use it just like we would `regular HTML` as part of the child of this Message component.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const Message = (props) => (<div>{props.children}</div>)
  const element = (
    <div className="container">
      <Message> Hello World </Message>
      <Message> Goodbye World </Message>
    </div>
  )

  ReactDOM.render(element, rootElement)
</script>
```

### composition
Now we can compose these things together quite nicely. I could even put message within a message.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const Message = (props) => (<div>{props.children}</div>)
  const element = (
    <div className="container">
      <Message>
        Hello World
        <Message> Goodbye World </Message>
      </Message>
    </div>
  )

  ReactDOM.render(element, rootElement)
</script>
```

<img width="731" alt="screen shot 2017-12-08 at 2 19 07 am" src="https://user-images.githubusercontent.com/5876481/33761533-35e37d36-dbbe-11e7-9068-67d3e10c600b.png">

## Summary
To review, to create a component that is reusable throughout your application and as composable as any other of the JSX that you have available to you is you `create a function that has a capital letter as the first character`.

Then that will `receive props`. You can `use those props in whatever` it is that you return. Then you're going to `return some React elements`. Then you can `use those` just like you do with the `div` or `span` or anything that you do with JSX.