# Controlling Form Values with React

In this lesson we'll talk about controlling the value for `inputs`, `textareas`, and `select` elements. We'll see `how to manage the state` ourselves `while still allowing the user to update the values themselves`.

Here, we have my fancy form, and it renders an `input`, a `text`, and a `select box` that allows us to `select multiple values`. On each one of these, we have an `onChange` handler that's hooked up to its own **onChange** handler here.

```html
<script type="text/babel">
  class MyFancyForm extends React.Component {
    static availableOptions = [
      'apple',
      'grape',
      'cherry',
      'orange',
      'pear',
      'peach',
    ]

    handleCommaSeparatedChange = event => {
      console.log('handleCommaSeparatedChange')
    }

    handleMultilineChange = event => {
      console.log('handleMultilineChange')
    }

    handleMultiSelectChange = event => {
      console.log('handleMultiSelectChange')
    }

    render() {
      return (
        <form>
          <div>
            <label>
              comma separated values:
              <br />
              <input
                type="text"
                onChange={
                  this.handleCommaSeparatedChange
                }
              />
            </label>
          </div>
          <div>
            <label>
              multiline values:
              <br />
              <textarea
                rows={MyFancyForm.availableOptions.length}
                onChange={
                  this.handleMultilineChange
                }
              />
            </label>
          </div>
          <div>
            <label>
              multiSelect values:
              <br />
              <select
                multiple
                size={MyFancyForm.availableOptions.length}
                onChange={
                  this.handleMultiSelectChange
                }
              >
                {MyFancyForm.availableOptions.map(
                  optionValue => (
                    <option
                      key={optionValue}
                      value={optionValue}
                    >
                      {optionValue}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>
        </form>
      )
    }
  }

  ReactDOM.render(
    <MyFancyForm />,
    document.getElementById('root'),
  )
</script>
```

What we want to do is we want to **synchronize the state of all of these things**. For example, if I were to type apple, pear, then the multi-line values would automatically add apple and pear, and then the multi-select would automatically select apple and pear.

<img width="215" alt="screen shot 2017-12-13 at 1 33 56 am" src="https://user-images.githubusercontent.com/5876481/33931800-ffbff086-dfa5-11e7-9287-c01db146c19e.png">

:monkey: To be able to do this, we need to control the state of the value of each of these inputs, and then update that state ourselves. :key:

### controlling input and text values
**[1.]** Let's start out by `controlling the input and the text area values`. To do that, `we need to keep that state somewhere ourselves`.

```javascript
state = {commaSeparated: '', multiline: ''}
```

**[2.]** We need to explicitly set the value on these input fields. 1.1 `const {commaSeparated, multiline} = this.state` 1.2. `value={commaSeparated}` 1.3. `value={multiline}`

```html
<script type="text/babel">
  class MyFancyForm extends React.Component {
    // ..

    state = {commaSeparated: '', multiline: ''}

    // ..

    render() {
      const {commaSeparated, multiline} = this.state
      return (
        <form>
          <div>
            <label>
              comma separated values:
              <br />
              <input
                type="text"
                value={commaSeparated}
                onChange={
                  this.handleCommaSeparatedChange
                }
              />
            </label>
          </div>
          <div>
            <label>
              multiline values:
              <br />
              <textarea
                rows={MyFancyForm.availableOptions.length}
                value={multiline}
                onChange={
                  this.handleMultilineChange
                }
              />
            </label>
          </div>
          <div>
            // ...
          </div>
        </form>
      )
    }
  }

  ReactDOM.render(<MyFancyForm />,document.getElementById('root'),)
</script>
```

Let's go ahead and try things out.

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/5876481/33981459-da52c500-e061-11e7-9116-c613dabf6bf5.gif)

I am typing, and nothing's happening. What happens is, the moment that `you put a value prop on an input or a text area, it now becomes impossible for the user to update` that value themselves.

You're telling React that I don't really care what the user is doing. :joy: I am in control of this value. :joy:

**[03.]** define onChange

You have to use this `onChange prop` to handle any time the `user is making a change`, and then you're in control of taking that change into account, to `update the value of the input`.

```javascript
handleCommaSeparatedChange = event => {
  console.log('handleCommaSeparatedChange')
  console.log(event.target.value)
}
```

If we `console.log` the **event.target.value**, and then look at our developer console, then we can type a bunch of letters, and we're seeing that those letters are being updated, 

![ezgif com-video-to-gif 1](https://user-images.githubusercontent.com/5876481/33981846-40120508-e063-11e7-8931-7182890baaf3.gif)

_but the value of the input is never being updated_, because we're in control of that. We're going to use **this.setState**

```javascript
handleCommaSeparatedChange = event => {
  this.setState({
    commaSeparated: event.target.value
  })
}
```

Now, I can type.

What's happening is, `every single time this change event happens`, we update the `commaSeparated state`, and when we call `setState`, that's going to `force a re-render`, and now, we are updating this commaSeparated state with whatever value the user typed in, and so `we're passing that back into the input value`, so React is updating that for us.

[04.] update `multiline` based on `commaSeparated` state

```javascript
handleCommaSeparatedChange = event => {
  const {value} = event.target
  this.setState({
    commaSeparated: value,
    multiline: value
      .split(',')             // split on the comma
      .map(v => v.trim())     // map these values to value.trim, to trim any whitespace
      .filter(Boolean)        // filter any that are empty strings
      .join('\n'),            // join them all back together with a new line
  })
}
```

![ezgif com-video-to-gif 2](https://user-images.githubusercontent.com/5876481/33982618-fd74e71c-e065-11e7-877c-5d23f1455862.gif)

[04.] update `commaSeparated` based on `multiline` state

Now, let's do the opposite. If I type grape, looks like I'm typing in here, and nothing's happening. That's because we're in control of the text area, and we're not doing anything when the text area change event is happening. Let's go ahead and do that here.

```javascript
handleMultilineChange = event => {
  const {value} = event.target
  this.setState({
    multiline: value,
    commaSeparated: value
      .split('\n')
      .map(v => v.trim())
      .filter(Boolean)
      .join(','),
  })
}
```

![ezgif com-video-to-gif 3](https://user-images.githubusercontent.com/5876481/33983300-811b5fae-e068-11e7-8cc6-803e3b10bb8b.gif)

## controlling OnSelect

OnSelect element, it's a **little bit unique**, in that we set the value here, and the **value that you set on a multiple select will be an array** `value={[]}`. If it's not multiple, then you can simply put the `string value` of the option based on the value `value={"""}`. For us, we are doing multiple, so we will do an array here. 

Let's store that in state.

```html
<div>
    <label>
      multiSelect values:
      <br />
      <select
        multiple
        value={multiSelect}
        size={MyFancyForm.availableOptions.length}
        onChange={
          this.handleMultiSelectChange
        }
      >
        {MyFancyForm.availableOptions.map(
          optionValue => (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionValue}
            </option>
          ),
        )}
      </select>
    </label>
</div>
```
We'll do multi-select, and then in our de-structuring of the state

```javascript
{commaSeparated, multiline, multiSelect} = this.state
```
Then we will initialize that right here with an empty array.
```html
state = {commaSeparated: '', multiline: '', multiSelect: []}
```

before.
```javascript
handleCommaSeparatedChange = event => {
  const {value} = event.target
  
  this.setState({
    commaSeparated: value,
    multiline: value
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)
      .join('\n'),
  })
}
```

after.
```javascript
handleCommaSeparatedChange = event => {
  const {value} = event.target
  const allValls = value
    .split(',')
    .map(v => v.trim())
    .filter(Boolean)

  this.setState({
    commaSeparated: value,
    multiline: allValls
      .join('\n'),
    multiSelect: allValls
      .filter(v => MyFancyForm.availableOptions.includes(v))
  })
}
```

 We're going to say filter each value to be one that is contained in our `availableOptions`. We'll say `.filter(v => MyFancyForm.availableOptions.includes(v))`.
 
### updating the state
 
 ![ezgif com-video-to-gif 4](https://user-images.githubusercontent.com/5876481/33984060-2cd0d778-e06b-11e7-9ef5-382f7731b199.gif)
 
 :rotating_light: That doesn't work, :rotating_light: because when the `multiline values change`, `we're not updating the state of the multiselect`. Let's go ahead and do that.
 
 ```javascript
handleMultilineChange = event => {
  const {value} = event.target
  const allValls = value
    .split('\n')
    .map(v => v.trim())
    .filter(Boolean)
  this.setState({
    multiline: value,
    commaSeparated: allValls
      .join(','),
    multiSelect: allValls
      .filter(v => MyFancyForm.availableOptions.includes(v)),
  })
}
```

### select using the multiSelect