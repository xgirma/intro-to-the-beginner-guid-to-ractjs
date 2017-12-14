# Use the key prop when Rendering a List with React

In this lesson we're reminded that JSX is simply JavaScript and to render a list you can use the array method `.map` to map an array to React elements. However, if you don't use the `key` prop correctly, it can lead to unexpected results, so `we explore what can happen and how to use the key prop correctly`.

```html
<script type="text/babel">
  class App extends React.Component {
    static allItems = [
      {id: 'a', value: 'apple'},
      {id: 'o', value: 'orange'},
      {id: 'g', value: 'grape'},
      {id: 'p', value: 'pear'},
    ]

    render() {
      return (
        <div>
          {App.allItems.map(item => (
            <div>{item.value}</div>
          ))}
        </div>
      )
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  )
</script>
```

If we open up the developer tools, we're going to get this warning from React, saying `_each child in an array or iterator should have a unique key prop_`.

<img width="726" alt="screen shot 2017-12-14 at 2 20 51 am" src="https://user-images.githubusercontent.com/5876481/33987380-8b580fe6-e075-11e7-83fd-20a586418113.png">

The problem is that what **this expression evaluates to is an array**. As we re-render and re-render, React needs to be `able to check the old array from the new array`, _to know which items are removed, which items are added to_. To do this, it **needs to keep track using a key**.

```javascript
render() {
  return (
    <div>
      {App.allItems.map(item => (
        <div key={item.id}>{item.value}</div>
      ))}
    </div>
  )
}
```

## Serious matters 
It doesn't actually really matter all that much in this scenario. We're going to add a little bit of code here to demonstrate a scenario where it really does matter.

> What I added was some state to keep track of some items, because we're going to make that dynamic. We can now add and remove items from that state, and then we render the items based on that state.

```html
<script type="text/babel">
  class App extends React.Component {
    static allItems = [
      {id: 'a', value: 'green'},
      {id: 'o', value: 'blue'},
      {id: 'g', value: 'white'},
      {id: 'p', value: 'black'},
    ]
    state = {items: []}
    addItem = () => {
      this.setState(({items}) => ({
        items: [
          ...items,
          App.allItems.find(
            i => !items.includes(i),
          ),
        ],
      }))
    }
    removeItem = item => {
      this.setState(({items}) => ({
        items: items.filter(i => i !== item),
      }))
    }

    render() {
      const {items} = this.state
      return (
        <div>
          <button
            disabled={
              items.length >= App.allItems.length
            }
            onClick={this.addItem}
          >
            +
          </button>
          {items.map((i, index) => (
            <div>
              <button
                onClick={() => this.removeItem(i)}
              >
                -
              </button>
              {i.value}:
              <input />
            </div>
          ))}
        </div>
      )
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  )
</script>
```

![ezgif com-video-to-gif 7](https://user-images.githubusercontent.com/5876481/33987879-57b4cc7c-e077-11e7-8c94-7f07bff9bbe4.gif)

Things are really messed up.

:lock: :lock: The reason is that `this input is not actually associated to these items directly`, `because we haven't shown React how to keep track of these items and the associated elements`. That's why we need to have a key. :key: :key: :key:

### using index
Here, we could try to do an `index. Sometimes, that'll work OK`, but in our scenario, that won't work.

```javascript
render() {
  const {items} = this.state
  return (
    <div>
      <button
        disabled={
          items.length >= App.allItems.length
        }
        onClick={this.addItem}
      >
        +
      </button>
      {items.map((i, index) => (
        <div key={index}>
          <button
            onClick={() => this.removeItem(i)}
          >
            -
          </button>
          {i.value}:
          <input />
        </div>
      ))}
    </div>
  )
}
```
`Sometimes, you'll be forced to use an index`. You don't have anything else that's unique. Sometimes, if you just have an array of strings, then you can use the identity of that item itself. 

### use id
```javascript
render() {
  const {items} = this.state
  return (
    <div>
      <button
        disabled={
          items.length >= App.allItems.length
        }
        onClick={this.addItem}
      >
        +
      </button>
      {items.map((item, index) => (
        <div key={item.id}>
          <button
            onClick={() => this.removeItem(item)}
          >
            -
          </button>
          {item.value}:
          <input />
        </div>
      ))}
    </div>
  )
}
```

![ezgif com-video-to-gif 9](https://user-images.githubusercontent.com/5876481/33988295-d26c06fa-e078-11e7-821e-f3d639311e8c.gif)

## element focus

There's one other scenario where not using a key properly can cause real problems, and that's with element focus.

```javascript
render() {
  return (
    <div>
      <div>
        <h1>Without Key</h1>
        <p>{'key='}</p>
        {this.state.items.map(item => (
          <input value={item.value} />
        ))}
      </div>
      <div>
        <h1>With Index as Key</h1>
        <p>{'key={index}'}</p>
        {this.state.items.map((item, index) => (
          <input
            key={index}
            value={item.value}
          />
        ))}
      </div>
      <div>
        <h1>With Proper Key</h1>
        <p>{'key={item.id}'}</p>
        {this.state.items.map(item => (
          <input
            key={item.id}
            value={item.value}
          />
        ))}
      </div>
    </div>
  )
}
```

### with proper key
![ezgif com-video-to-gif 10](https://user-images.githubusercontent.com/5876481/33988825-759a2a36-e07a-11e7-9e63-94cb796f05c5.gif)

when we use the key properly will our focus be taken to the right place, keeping track with the input that is associated with the item that we are rendering.

:key: :key: **Even if I select all the text, or if I move anywhere in that input, React will make sure that the user's focus and their selection remains in the right place**, because we have the key properly set. :key: :key:

### with index as a key
![ezgif com-video-to-gif 11](https://user-images.githubusercontent.com/5876481/33988996-d8413d82-e07a-11e7-979b-2ae100ae6425.gif)

If I click in here, you'll notice my focus is staying in the same input. It's not following the item that it should be. If I highlight the text, every single time it's updated, that isn't going to get un-highlighted.

### with out a key
![ezgif com-video-to-gif 12](https://user-images.githubusercontent.com/5876481/33989150-4caf8908-e07b-11e7-9743-54e72cdb9d35.gif)

We actually have the exact same problem when we use index as a key, _because it's not a proper identifier_.