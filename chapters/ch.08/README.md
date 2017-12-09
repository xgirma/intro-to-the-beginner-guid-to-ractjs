# Style React Components

In this lesson we'll learn about how you can style react components using the `style` prop and `className` prop. We'll create a component that composes these props together nicely and talk about some of the shortcomings of these as well.

### JSX and HTML differences
This is one of the handful of differences you'll find with JSX and HTML. Rather than a string which you would use in normal HTML, we're using an object here. The property keys are camel cased rather than combop cased as you would have in CSS. The property values are strings.

HTML
```html
<style>
    .box--small {
        width: 60px;
        hight: 60px
    }
</style>
```
JSX
```html
  const element = (
    <div>
        <Box style={{paddingLeft: '20px'}}>
            box
        </Box>
    </div>
  )
```
 
        1. **we're using an object here**. {}
        2. **The property keys are camel cased** paddingLeft
        3. **The property values are strings**. '20px'
        
This is nice because :raised_hands: `objects are much easier to compose together` :raised_hands: than `strings of CSS`.

Because the padding left `value` is pixels, we can `change it to a number` of 20 instead of a string. `React will treat that as a pixel value`.

```html
const element = (
    <div>
        <Box style={{paddingLeft: 20}}>
            box
        </Box>
    </div>
  )
```

This is another one of the differences with JSX and HTML. In HTML, we'd use the attribute `class` whereas here we're using `className`.

```html
<script type="text/babel">
  const element = (
    <div>
      <div
        className="box box--small"
        style={{paddingLeft: 20}}>
        box
      </div>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```

### spread {...props}
If we were to extract these `props` `into an object` like this then `spread` them out on the `div`, we'd get the same result.

```html
<script type="text/babel">
  const props = {
    className: "box box--small",
    style: {paddingLeft: 20}
  }

  const element = (
    <div>
      <div {...props}>box</div>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```
### object shorthand
Now, let's extract the `className` value into a variable called `className` and use `object shorthand` to add it to the `props`.

```html
<script type="text/babel">
  const className = "box box--small"
  const props = {
    className,
    style: {paddingLeft: 20}
  }

  const element = (
    <div>
      <div {...props}>box</div>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```

### function component 
Let's go ahead and turn this into a functioning component called box. We'll `accept all the props and spread them across the div` we rendered, so you can pass other props to the box component.

```html
<script type="text/babel">
  function Box(props) {
    return (
      <div>
        <div
          className = "box box--small"
          style = {{paddingLeft: 20}}
          {...props}
        >box</div>
      </div>
    )
  }

  const element = (
    <div>
        <Box style={{backgroundColor: 'lightblue'}}>small box</Box>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```
Now, we've lost our padding on the box. This is because `object spread does a shallow merge` of the objects given, so the style prop given to the box component is `overriding its own style prop`.

Solution

```html
<script type="text/babel">
  function Box({style, ...rest}) {
    return (
      <div>
        <div
          className = "box box--small"
          style = {{paddingLeft: 20, ...style}}
          {...rest}
        >box</div>
      </div>
    )
  }

  const element = (
    <div>
        <Box style={{backgroundColor: 'lightblue'}}>small box</Box>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```

Let's `destructure` `the props`, `pull out the style prop, and call the rest of the props rest`. `Then we'll spread the rest props onto the div. Then we'll merge the style prop with our own styles`. Awesome, that works. **These things are composing super well**. This would be much more difficult to do if the style prop accepted a _string of CSS_. 

        I'm glad that it's an object instead.
        
Let's do the same for `className` so we can have different sized boxes.

We'll remove the box--small and instead pass that into where we're rendering the box. We'll say class name equals box--small. We're going to have the same problem we had before, so we'll `need to merge these two props` together ourselves.

Let's `destructure` className out and assign the className on the div to a template literal instead. We'll say box and then interpolate the className that we're given. Cool, that's working.

```html
<script type="text/babel">
  function Box({style, className, ...rest}) {
    return (
      <div>
        <div
          className={`box ${className}`}
          style = {{paddingLeft: 20, ...style}}
          {...rest}
        >box</div>
      </div>
    )
  }

  const element = (
    <div>
        <Box className = "box--small"
             style={{backgroundColor: 'lightblue'}}>small box</Box>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```

There's one more consideration here. Let's remove the classname from where we're rendering the box and check out the DOM.

```html
<script type="text/babel">
  function Box({style, className, ...rest}) {
    return (
      <div>
        <div
          className={`box ${className}`}
          style = {{paddingLeft: 20, ...style}}
          {...rest}
        >box</div>
      </div>
    )
  }

  const element = (
    <div>
        <Box 
             style={{backgroundColor: 'lightblue'}}>small box</Box>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```

You'll see that we're `getting the className of undefined`. That's probably OK, but let's go ahead and clean it up.

This is happening because the `className` prop does not exist, so it's undefined. We'll `add a default value for the className` to be an empty string.

<img width="756" alt="screen shot 2017-12-09 at 2 18 51 am" src="https://user-images.githubusercontent.com/5876481/33794774-5f64ba8e-dc87-11e7-9d01-45becee82829.png">

```html
<script type="text/babel">
  function Box({style, className='', ...rest}) {
    return (
      <div>
        <div
          className={`box ${className}`}
          style = {{paddingLeft: 20, ...style}}
          {...rest}
        >box</div>
      </div>
    )
  }

  const element = (
    <div>
        <Box
             style={{backgroundColor: 'lightblue'}}>small box</Box>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```
Now, that's gone and there's an empty space there. We could add a `trim` to this template literal like this to get rid of that space, but I don't really think that's necessary.

<img width="738" alt="screen shot 2017-12-09 at 2 21 48 am" src="https://user-images.githubusercontent.com/5876481/33794794-c040f23c-dc87-11e7-8f35-1ef91413a4e8.png">

### more boxes
Now, let's go ahead and render a couple other boxes, each with a different color and size. We'll do medium, we'll make that pink, and then we'll do large, and we'll make that orange. This is composing together really nicely.

```html
<script type="text/babel">
  function Box({style, className='', ...rest}) {
    return (
      <div>
        <div
          className={`box ${className}`}
          style = {{paddingLeft: 20, ...style}}
          {...rest}
        >box</div>
      </div>
    )
  }

  const element = (
    <div>
        <Box className='box--small' style={{backgroundColor: 'lightblue'}}>small box</Box>
        <Box className='box--medium' style={{backgroundColor: 'pink'}}>small box</Box>
        <Box className='box--large' style={{backgroundColor: 'orange'}}>small box</Box>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```

One :persevere: concern :persevere: I have with this is that the `className to get these different sizes has to be known by the users of the box component`.

It'd be much better `if the users could tell the box what size it should be and then the box could apply the right className itself`. 

        That way, all of the styling logic for the box resides in the box component.
        
Instead of a `className prop`, let's use a `size prop` where we can pass a string for the size like small.

    Let's destructure out the size prop and calculate className based on that value. 

We'll say const size className equals size ternary box--size or empty string. Then we'll interpolate that into our className prop.

```html
<script type="text/babel">
  function Box({style, size, className='', ...rest}) {
    const sizeClassName = size ? `box--${size}`: ''
    return (
      <div>
        <div
          className={`box ${className}${sizeClassName}`}
          style = {{paddingLeft: 20, ...style}}
          {...rest}
        >box</div>
      </div>
    )
  }

  const element = (
    <div>
        <Box size='small' style={{backgroundColor: 'lightblue'}}>small box</Box>
        <Box className='box--medium' style={{backgroundColor: 'pink'}}>small box</Box>
        <Box className='box--large' style={{backgroundColor: 'orange'}}>small box</Box>
    </div>
  )

  ReactDOM.render(element, document.getElementById('root'))
</script>
```

Now, this box works exactly as it had before only now the relevant styling information is entirely contained in the box component. 

We can still `pass overrides` for the in-line styles and classNames. This makes it really `nicely composable`.

## Summary
In review, to style a React component, you can use the `className` prop to assign classNames used in regular CSS styles. 

And you can use the `style prop` `style={{paddingLeft: 20}}`which accepts an `object of CSS`. 

One more important thing to note about the` style prop` is that t**he values are not vendor prefixed for you, so you'll have to do that yourself**.

There are a couple other problems within in-line styles as well. There are a couple libraries to overcome some of these problems. Popular libraries include **styled components, emotion, and glamorous**. I highly recommend you give these a look if you're planning on building a serious React application.


