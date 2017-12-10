# Use Class Components with React

In this lesson we'll look at a few ways to deal with issues around **this** when writing class components with React. We'll eventually land at **Public Class Fields syntax** which is a stage 3 proposal in the ECMAScript standardization process.

### Arrow function performance bottleneck
```html
<script type="text/babel">
    class Counter extends React.Component {
      constructor(...args){
        super(...args)
        this.state = {count: 0}
      }

      render() {
        return(
          <button onClick={
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

This is totally fine to have an arrow function on our **onClick**, but sometimes it can get a `little bit big. In some cases, it can actually be a performance bottleneck`.

![ezgif com-video-to-gif 9](https://user-images.githubusercontent.com/5876481/33802238-6258278a-dd27-11e7-83a8-beedef6f150c.gif)

### Use handleClick
So we're going to go ahead and extract that. We'll call this handleClick() on our class here. We're just going to pull `this.setState` out to our handleClick. Then we'll say `this.handleClick`.

