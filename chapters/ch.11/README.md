# Stop Memory Leaks with componentWillUnmount Lifecycle Method in React

In this lesson we'll take a stopwatch component we built in another lesson and identify and fix a memory leak.

I added this `checkbox` to show and hide our stopwatch so that we can reveal this bug.
```javascript
class App extends React.Component {
  state = {showStopWatch: true}
  render() {
    const {showStopWatch} = this.state
    return (
      <div>
        <label>
          Show Stop Watch{' '}
          <input
            type="checkbox"
            checked={showStopWatch}
            onChange={() =>
              this.setState(s => ({
                showStopWatch: !s.showStopWatch,
              }))}
          />
        </label>
        <hr />
        {showStopWatch ? <StopWatch /> : null}
      </div>
    )
  }
}

const element = <App />
ReactDOM.render( element, document.getElementById('root'),
)
```

If I go ahead and add a callback here inside of `setState` call and I `console.log(this.state.lapse)`.

```javascript
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
              }, () => {
                console.log(this.state.lapse)
              })
            })
          }
          return {running: !state.running}
        })
      }
```

:warning: Then if I click on `Show Stop Watch to un-show it, we're actually going to get this `warning`. :warning:

![ezgif com-video-to-gif 7](https://user-images.githubusercontent.com/5876481/33801854-7178a4d8-dd1d-11e7-8c73-8250d383d990.gif)

It actually isn't doing anything wrong in our application, but it is indicative of a **memory leak**. That's exactly what's happening here.

The problem is that the **setInterval** is never cleared, so we need to go ahead and clear that.
 
 Let's go ahead and do that with **componentWillUnmount**. Right before React removes the component from the page, it's going to call this function.

We'll simply say **clearInterval(this.timer)**.

```javascript
      componentWillUnmount() {
        clearInterval(this.timer)
      }
```

Now, we can start, and then remove the stopwatch, and it's totally gone. We don't see the logs anymore and we don't get that warning.