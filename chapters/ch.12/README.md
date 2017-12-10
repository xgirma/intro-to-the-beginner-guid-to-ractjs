# Use Class Components with React

In this lesson we'll look at a few ways to deal with issues around **this** when writing class components with React. We'll eventually land at **Public Class Fields syntax** which is a stage 3 proposal in the ECMAScript standardization process.

### Arrow function performance bottleneck
```html
<script type="text/babel">
    class Counter extends React.Component {
      constructor(...args){
        super(...args)
        this.state = {
          count: 0,
          color: 'red'
        }
      }

      render() {
        const buttonStyles = {
          border: '1px solid #ccc',
          background: '#fff',
          fontSize: '1em',
          padding: 15,
          margin: 5,
          width: 100,
        }

        console.log(this.state.count)

        return(
          <button style={buttonStyles}
                  onClick={
                    () => this.setState(
                      ( {count}) => ( {count: count + 1, } )
                    )
          }>
            {this.state.count}
          </button>
        )
      }
    }

    const element = <Counter/>
    ReactDOM.render(element, document.getElementById('root'))
</script>
```

This is totally fine to have an arrow function on our **onClick**, but sometimes it can get a `little bit big`. In some cases, `it can actually be a performance bottleneck`.

![ezgif com-video-to-gif 10](https://user-images.githubusercontent.com/5876481/33802417-bbb41e52-dd2b-11e7-98f1-7f1c37096c35.gif)

### Use handleClick
So we're going to go ahead and extract that. We'll call this handleClick() on our class here. We're just going to pull `this.setState` out to our handleClick. Then we'll say `this.handleClick`.

```html
<script type="text/babel">
  class Counter extends React.Component {
    constructor(...args){
      super(...args)
      this.state = {
        count: 0,
        color: 'red'
      }
    }

    handleClick() {
      this.setState(
        ( {count}) => ( {count: count + 1, } )
      )
    }

    render() {
      const buttonStyles = {border: '1px solid #ccc', background: '#fff', fontSize: '1em', padding: 15, margin: 5, width: 100,}

      console.log(this.state.count)

      return(
        <button style={buttonStyles}
                onClick={this.handleClick}>
          {this.state.count}
        </button>
      )
    }
  }

  const element = <Counter/>
  ReactDOM.render(element, document.getElementById('root'))
</script>
```

We'll see that it actually is broken. If I pop open my developer tools, we're going to get this error message every single time saying, :fire: :fire: "_`Cannot read property. Set state of undefined.`_" :fire: :fire:

![ezgif com-video-to-gif 11](https://user-images.githubusercontent.com/5876481/33802482-0bbfbb12-dd2d-11e7-950b-93780b9764b4.gif)



