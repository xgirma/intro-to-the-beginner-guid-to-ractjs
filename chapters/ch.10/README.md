# Use Component State with React
In this lesson we'll build a stopwatch component that maintains its own `state`. We'll start by creating the static UI, then take the dynamic parts and accept them as props. After that we'll refactor that to state and add event handlers to update the state.

Let's get started by making a function called StopWatch. 

Now, I'm going to add `{lapse}` to label. We'll `pull the {lapse} from our props`. We also need to have this `start to be dynamic` as well. `We'll get running from our props as well`.

```html
<script type="text/babel">

    function StopWatch({lapse, running}) {
      const buttonStyles = {
        border: '1px solid #ccc',
        background: '#fff',
        fontSize: '2em',
        padding: 15,
        margin: 5,
        width: 200,
      }

      return (
        <div style={{textAlign: 'center'}}>
            <label style={{fontSize: '5em', display: 'block'}}>`${lapse}ms`</label>
            <button style={buttonStyles}>{ running ? 'Stop' : 'Start'}</button>
            <button style={buttonStyles}>Clear</button>
        </div>
      )
    }

    const element = <StopWatch lapse={0} running={false}/>

    ReactDOM.render(
      element,
      document.getElementById('root')
    )

</script>
```
<img width="433" alt="screen shot 2017-12-09 at 4 44 38 am" src="https://user-images.githubusercontent.com/5876481/33795743-bae32fd0-dc9b-11e7-9f8d-7f1b0e3e6704.png">

### class
The next thing we're going to do is we're going to make a `class` called StopWatch. That `extends React.Component`.

```html
<script type="text/babel">
    class StopWatch extends React.Component {
      state = {lapse: 0, running: false}

      render() {
        const { lapse, running } = this.props
        const buttonStyles = {
          border: '1px solid #ccc',
          background: '#fff',
          fontSize: '2em',
          padding: 15,
          margin: 5,
          width: 200,
        }

        return (
          <div style={{textAlign: 'center'}}>
            <label style={{fontSize: '5em', display: 'block'}}>{`${lapse} ms`}</label>
            <button style={buttonStyles}>{ running ? 'Stop' : 'Start'}</button>
            <button style={buttonStyles}>Clear</button>
          </div>
        )
      }
    }

    const element = <StopWatch lapse={0} running={true}/>

    ReactDOM.render(
      element,
      document.getElementById('root')
    )

</script>
```

### dynamic
Now, we need to be able to make this **dynamic**. `We need to dynamically update the state as we go`.