# Manipulate the DOM with React refs

Often you'll find there's a jQuery plugin or JavaScript library `which needs access to DOM nodes to work in your application`. **Other times you need access to the DOM node directly to get the value of form fields or for other reasons**. In this lesson we'll learn how to do this using React's ref prop.

`<div ref={node => (this.rootNode = node)} className="tilt-root">`

```html
<script type="text/babel">
  class Tilt extends React.Component {
    componentDidMount() {
      console.log(this.rootNode)
    }
    render() {
      return (
        <div ref={node => (this.rootNode = node)} className="tilt-root">
          <div className="tilt-child">
            <div {...this.props} />
          </div>
        </div>
      )
    }
  }
  const element = (
    <div className="totally-centered">
      <Tilt>
        <div className="totally-centered">
          vanilla-tilt.js
        </div>
      </Tilt>
    </div>
  )

  ReactDOM.render(
    element,
    document.getElementById('root'),
  )
</script>
```
`console.log(this.rootNode)`
<img width="716" alt="screen shot 2017-12-12 at 1 34 46 am" src="https://user-images.githubusercontent.com/5876481/33877269-bcf48092-dedc-11e7-8b9e-5a361d192e22.png">

... Now, we can use this node with vanilla-tilt.

```html
<script type="text/babel">
  class Tilt extends React.Component {
    componentDidMount() {
      VanillaTilt.init(this.rootNode, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      })
    }
    render() {
      return (
        <div ref={node => (this.rootNode = node)} className="tilt-root">
          <div className="tilt-child">
            <div {...this.props} />
          </div>
        </div>
      )
    }
  }
  const element = (
    <div className="totally-centered">
      <Tilt>
        <div className="totally-centered">
          vanilla-tilt.js
        </div>
      </Tilt>
    </div>
  )

  ReactDOM.render(
    element,
    document.getElementById('root'),
  )
</script>
```

Now, if we hover over it, we get that vanilla tilt.

## Summary
In review, to be able to manipulate the DOM directly, you need to pass a ref onto your element that you're rendering. When you pass a `ref` to an element, we're going to get a `reference to the DOM node`.

If we were to pass a ref to `<Tilt ref{}>`, then what we're going to get is a `reference to the instance`. It would be the same thing as `this`. We'll get `this as a reference in our ref on a composite component`, but because we're putting it on the `<div>`, we get `access to the DOM node`.
