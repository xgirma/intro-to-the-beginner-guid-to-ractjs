# Use JSX with React

In this lesson we'll learn the basics of using JSX with React. In addition to the noted className difference, there are a number of other [differences with attributes in JSX than those in React](https://reactjs.org/docs/dom-elements.html).

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

<script type="text/javascript">
    const rootElement = document.getElementById('root')
    const element = React.createElement(
      'div',
      {className :'container'},
      'Hello World'
    )
    ReactDOM.render(element, rootElement)
</script>
```
Writing our entire app using `React.createElement` is totally possible, but it's `not entirely ergonomic`. The React team created JSX to allow us to write our UI in a way that's a little bit more familiar to us. This is `JSX`, and it looks similar to HTML and behaves in similar ways. We're going to convert the above to use `JSX`.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

<script type="text/javascript">
  const rootElement = document.getElementById('root')
  const element = <div className="container">Hello World</div>

  ReactDOM.render(element, rootElement)
</script>
```

When we refresh, we're going to get a syntax error.

<img width="738" alt="screen shot 2017-12-07 at 11 51 33 pm" src="https://user-images.githubusercontent.com/5876481/33756283-9d2a194c-dba9-11e7-8628-786f95b63738.png">

**This is actually not JavaScript syntax at all**. 

This `JSX`, so it needs to be `transpiled` into this `React.createElement` call. We can use `Babel standalone` to do this.

Change from `<script text/JavaScript>` to `<script text/Babel>` to make it work. 

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const element = <div className="container">Hello World</div>

  ReactDOM.render(element, rootElement)
</script>
```

<img width="901" alt="screen shot 2017-12-08 at 12 00 42 am" src="https://user-images.githubusercontent.com/5876481/33756554-dfd52844-dbaa-11e7-93d3-286744ef02aa.png">

It all looks exactly the same. `The HTML output is exactly the same as we had before with the class container`. Now, with this new syntax, it's **easier to compose** these things together.

<img width="735" alt="screen shot 2017-12-08 at 12 05 30 am" src="https://user-images.githubusercontent.com/5876481/33756718-9f4f8e94-dbab-11e7-9b06-b47049431240.png">

<img width="927" alt="screen shot 2017-12-08 at 12 06 39 am" src="https://user-images.githubusercontent.com/5876481/33756736-b2e95408-dbab-11e7-9c19-ae63ed204001.png">

## JSX

Let's learn a couple of things about JSX. There are a couple of things that are different. For example, in HTML, you use `<div class="container"`, and in JSX, you use `<div className="container"`. 

### interpolation
```html
<div className="container">Hello World</div>
```
Let's say we wanted to take this "Hello World" and `externalize` it to variable. Interpolation.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const content = 'Hello World'
  const element = <div className="container">{content}</div>

  ReactDOM.render(element, rootElement)
</script>
```
        Interpolation = Exit JSX land => Enter JavaScript land
    
> This interpolation is denoted by these curly braces. When you do this, you're exiting JSX land and entering JavaScript land. `You can do any JavaScript that you want to as long as it evaluates to an expression`.

Now, inside of these curly braces can **literally be anything**. I'm going to make an immediately invoked arrow function. We'll refresh and we get exactly the same thing.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const content = 'Hello World'
  const element = <div className="container">{ (() => content)() }</div>

  ReactDOM.render(element, rootElement)
</script>
```

That's one of the really nice things about JSX is that once you put in these curly braces, you are in JavaScript land and you can do anything that you want to inside of this JSX.

That also counts for the `class name prop` or `any props` that you're passing to these components.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const content = 'Hello World'
  const myClassName = 'container'
  const element = <div className={myClassName}>{ (() => content)() }</div>

  ReactDOM.render(element, rootElement)
</script>
```

:raised_hands: view logic as part of my markup :raised_hands:
        
> JSX allows me to do any kind of interpolation. That gives me a lot of power and flexibility to have my view logic as part of my markup.

### props
One other thing that is pretty common to do with JSX is we're going to create a `props object`.

```html
<script type="text/babel">
  const rootElement = document.getElementById('root')
  const props = {
    className: 'container',
    children: 'Hello Wold'
  }
  const element = <div {...props}/>

  ReactDOM.render(element, rootElement)
</script>
```

This is similar to `object spread` in JavaScript. We are spreading these `props`, `className` and `children`, across the `div`.

### overriding 
Now, let's say that this object is `coming to us from some other place`. We're going to want `to override it` or have the props `override some of our things`.

1. If they don't give override: className given 

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const props = {
    className: 'container',
    children: 'Hello Wold'
  }
  const element = <div className="my-class" {...props}/>

  ReactDOM.render(element, rootElement)
</script>
```

<img width="736" alt="screen shot 2017-12-08 at 12 37 02 am" src="https://user-images.githubusercontent.com/5876481/33757667-003814de-dbb0-11e7-9834-1b1c2cbafcb9.png">

2. If they don't give override: className not given

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const props = {
    children: 'Hello Wold'
  }
  const element = <div className="my-class" {...props}/>

  ReactDOM.render(element, rootElement)
</script>
```

<img width="730" alt="screen shot 2017-12-08 at 12 39 08 am" src="https://user-images.githubusercontent.com/5876481/33757719-3e1d297e-dbb0-11e7-8fc3-b17f2f94105c.png">

3. Override regardless
```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const props = {
    className: 'container',
    children: 'Hello Wold'
  }
  const element = <div {...props} className="my-class"/>

  ReactDOM.render(element, rootElement)
</script>
```

<img width="726" alt="screen shot 2017-12-08 at 12 41 42 am" src="https://user-images.githubusercontent.com/5876481/33757801-9923805c-dbb0-11e7-81af-e659d075ff2e.png">

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const props = {
    children: 'Hello Wold'
  }
  const element = <div {...props} className="my-class"/>

  ReactDOM.render(element, rootElement)
</script>
```

<img width="726" alt="screen shot 2017-12-08 at 12 41 42 am" src="https://user-images.githubusercontent.com/5876481/33757801-9923805c-dbb0-11e7-81af-e659d075ff2e.png">

The same kind of thing happens with the children prop `const element = <div {...props} children="Goodbye World"/>`. Or we can use the `regular children` either, and that will also override whatever is in props.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const props = {
    children: 'Hello Wold'
  }
  const element = <div {...props} className="my-class">Goodbye World</div>

  ReactDOM.render(element, rootElement)
</script>
```

<img width="739" alt="screen shot 2017-12-08 at 12 47 19 am" src="https://user-images.githubusercontent.com/5876481/33758004-62ca3aa4-dbb1-11e7-92e9-6fc259fa2d02.png">

We get "Goodbye World" output. 

## Summary
Those are a couple of the tricks that you can do with JSX. `The basic idea is you enter JSX land with the caret, {}`. 

        1. You specify the element that you want to have rendered, and 
        2. then you specify any props just like you would attributes on HTML.
        
There are some differences here like I noted with `className`, and there are some others as well. Then you can `pass your children`. In addition, you can do a `self-closing tag` as well if you don't want to put any children inside of the JSX element.
