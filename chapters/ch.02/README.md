# Write Hello World with raw React APIs

We're going to create a new element that will append to the root that just says, "Hello world."

```html
<div id="root"></div>
<script type="text/javascript">
    const rootElement = document.getElementById('root')
    const element = document.createElement('div')

    element.textContent = 'Hello World'
    element.className = 'container'

    rootElement.appendChild(element)
</script>
```

We have our `hello world`. Most excellent. Now, with React, it's actually pretty similar. 

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

If we save this, we're going to get exactly the same 'Hello World'

### element
Let's go ahead and take a look at `what element is`.

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
    console.log(element)

    ReactDOM.render(element, rootElement)
</script>
```

<img width="736" alt="screen shot 2017-12-07 at 11 15 00 pm" src="https://user-images.githubusercontent.com/5876481/33755179-84738da2-dba4-11e7-92cf-97847f986e37.png">


`element` is just this `object` that has this weird type of property, a couple other properties here, and then this `props`.

`props` is actually pretty important. It has a `children prop`, and that's our hello world. Then it has a `className prop`, and that's the container.
 It looks like we've got a merge of `{className: 'container'}` here with whatever we pass here (`Hello World`).  
 
 ### pass more arguments
 We can actually pass any number of arguments for the rest of this API call. `Goodbye world`.
 
 ```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

<script type="text/javascript">
    const rootElement = document.getElementById('root')
    const element = React.createElement(
      'div',
      {className :'container'},
      'Hello World',
      'Goodbye World'
    )
    console.log(element)

    ReactDOM.render(element, rootElement)
</script>
```
 
 <img width="734" alt="screen shot 2017-12-07 at 11 21 44 pm" src="https://user-images.githubusercontent.com/5876481/33755406-74955e6e-dba5-11e7-986f-4936af15ee7f.png">
 
If we see in our `props`, we have children as an array that has both of those things (`Hello World` and `Goodbye World`).

### use children prop instead
What's interesting here is we could create a `children prop`.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

<script type="text/javascript">
    const rootElement = document.getElementById('root')
    const element = React.createElement(
      'div',
      {className :'container', children: ['Hello World', 'Goodbye World']}
    )
    console.log(element)

    ReactDOM.render(element, rootElement)
</script>
```

 <img width="734" alt="screen shot 2017-12-07 at 11 21 44 pm" src="https://user-images.githubusercontent.com/5876481/33755406-74955e6e-dba5-11e7-986f-4936af15ee7f.png">
 
 
### summary
 
 > React `createElement` API is as simple as the `element` that you want to create, and then `an object` that has `all of the props` that you want to have applied.
 
 > Just as a convenience, you can provide the `children as any number of arguments` after the props argument as well.

## Footnote

React installation: [using CDN](https://reactjs.org/docs/installation.html)
