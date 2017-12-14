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
[1.] Let's start out by `controlling the input and the text area values`. To do that, `we need to keep that state somewhere ourselves`.

```javascript
state = {commaSeparated: '', multiline: ''}
```

[2.] We need to explicitly set the value on these input fields. 1.1 `const {commaSeparated, multiline} = this.state` 1.2. `value={commaSeparated}` 1.3. `value={multiline}`

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


