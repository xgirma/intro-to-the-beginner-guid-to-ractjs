# Validate Custom React Component Props with PropTypes

In this lesson we'll learn about how you can use the `prop-types` module to validate a custom React component's `props`.

When other people start using your components, `sometimes they'll make mistakes when passing props`.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const SayHello = (props) => {
    return (
      <div>
          Hello {props.firstName} {props.lastName}
      </div>
    )
  }

  const element =(<SayHello firstName={true}/>)

  ReactDOM.render(element, rootElement)
</script>
```
Simplify the code. 

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const SayHello = (props) => {
    return (
      <div>
          Hello {props.firstName} {props.lastName}
      </div>
    )
  }

  ReactDOM.render(
    <SayHello firstName={true}/>,
    document.getElementById('root')
  )

</script>
```

<img width="730" alt="screen shot 2017-12-08 at 2 44 42 am" src="https://user-images.githubusercontent.com/5876481/33762560-cbf34d3a-dbc1-11e7-9f7f-b954b416a97d.png">

For example, here we're passing the value of true for first name which we're expecting to be a string in our component. We're not passing a last name prop at all. `What is being rendered is not what we'd expect`.

To use PropTypes on a function component like `SayHello` here, we'll say `SayHello.propTypes` is an object and validate as follows.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const SayHello = (props) => {
    return (
      <div>
          Hello {props.firstName} {props.lastName} !!!
      </div>
    )
  }

  SayHello.propTypes = {
    firstName(props, propName, componentName){
      if(typeof props[propName] !== 'string'){
        return new Error(`Hey, you should pass a string for ${propName} in ${componentName}
        but you passed a ${typeof props[propName]}`)
      }
    }
  }

  ReactDOM.render(
    <SayHello firstName={true}/>,
    document.getElementById('root')
  )

</script>
```
With that, we'll see our `error message being logged to the console`. :cherry_blossom: Awesome. :cherry_blossom:

<img width="908" alt="screen shot 2017-12-08 at 2 55 55 am" src="https://user-images.githubusercontent.com/5876481/33762926-5a080ed4-dbc3-11e7-97e5-0080c685605b.png">

`We need the same thing for the last name`, so we'll `pull this function out` to an object that we'll call PropTypes and put it in a property called string.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const SayHello = (props) => {
    return (
      <div>
          Hello {props.firstName} {props.lastName} !!!
      </div>
    )
  }

  const PropTypes = {
    string(props, propName, componentName){
      if(typeof props[propName] !== 'string'){
        return new Error(`Hey, you should pass a string for ${propName} in ${componentName}
        but you passed a ${typeof props[propName]}`)
      }
    }
  }

  SayHello.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }

  ReactDOM.render(
    <SayHello firstName={true}/>,
    document.getElementById('root')
  )

</script>
```

<img width="903" alt="screen shot 2017-12-08 at 3 00 23 am" src="https://user-images.githubusercontent.com/5876481/33763100-f90e437c-dbc3-11e7-97eb-f90bc82a03b2.png">

:tropical_fish: Super. :tropical_fish: Now, we're getting the error message for both of them.

##$ prop-types package

Because this and other PropTypes are so `common`, the React team has built a package called `PropTypes` which we can use just like the one we just built ourselves.

```html
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>
```

We can go ahead and remove our own implementation of PropTypes, and everything should work pretty much the same.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  const SayHello = (props) => {
    return (
      <div>
          Hello {props.firstName} {props.lastName} !!!
      </div>
    )
  }

  SayHello.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }

  ReactDOM.render(
    <SayHello firstName={true}/>,
    document.getElementById('root')
  )

</script>
```

<img width="907" alt="screen shot 2017-12-08 at 3 06 01 am" src="https://user-images.githubusercontent.com/5876481/33763300-c8c58756-dbc4-11e7-90f2-51e12827ff24.png">

There's one difference here now though. We're `no longer getting the warning for the last name prop`. 

> The issue here is that all of the `validators` in the PropTypes module `consider props to be optional by default`, so `if a prop is not provided`, then the `validator doesn't run`. 

That's useful in some cases like where we provide a **default value**, like if were to add or `unknown` here for the last name.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  const SayHello = (props) => {
    return (
      <div>
          Hello {props.firstName} {props.lastName || 'Unknown'} !!!
      </div>
    )
  }

  SayHello.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }

  ReactDOM.render(
    <SayHello firstName={true}/>,
    document.getElementById('root')
  )

</script>
```

<img width="737" alt="screen shot 2017-12-08 at 3 10 23 am" src="https://user-images.githubusercontent.com/5876481/33763428-5dde741a-dbc5-11e7-809b-d3082fd41cfb.png">

### isRequired

If we want it to specify a prop as required, we can simply `.isRequired`.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  const SayHello = (props) => {
    return (
      <div>
          Hello {props.firstName} {props.lastName || 'Unknown'} !!!
      </div>
    )
  }

  SayHello.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }

  ReactDOM.render(
    <SayHello firstName={true}/>,
    document.getElementById('root')
  )

</script>
```

<img width="905" alt="screen shot 2017-12-08 at 3 12 28 am" src="https://user-images.githubusercontent.com/5876481/33763521-acef0970-dbc5-11e7-821c-6efe67f66ee0.png">

### class component and Static propTypes
For components declared as classes like this, we can continue to specify our PropTypes the same way, but it's more common to do this by making PropTypes a static property of the class like this. 

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  class SayHello extends React.Component {
    static propTypes = {
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }

    render () {
      const {firstName, lastName} = this.props
      return (
        <div>
          Hello {firstName} {lastName || 'Unknown'} !!!
        </div>
      )
    }
  }

  ReactDOM.render(
    <SayHello firstName={true}/>,
    document.getElementById('root')
  )

</script>
```
It works exactly the same way.

### production version React
Let's swap the development version of react to the production version.

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.0/prop-types.js"></script>

<script type="text/babel">
  class SayHello extends React.Component {
    static propTypes = {
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }

    render () {
      const {firstName, lastName} = this.props
      return (
        <div>
          Hello {firstName} {lastName || 'Unknown'} !!!
        </div>
      )
    }
  }

  ReactDOM.render(
    <SayHello firstName={true}/>,
    document.getElementById('root')
  )

</script>
```

<img width="917" alt="screen shot 2017-12-08 at 3 20 10 am" src="https://user-images.githubusercontent.com/5876481/33763807-bfc39434-dbc6-11e7-9497-ddf79923d124.png">

You'll notice now that our **PropTypes validation is totally gone**. This is because PropTypes is great for development, but it does `slow things down a bit in an unnecessary way for production`. _The production version of react does not use PropTypes_.


### remove prop-types when you are in production
This is great. If you want to improve things further, you can use `babel-plugin-transform-react-remove-prop-types` to automatically remove PropTypes from your code when you're building it for production, which will `make things even faster` for you.

## Summary
In review, to add PropTypes validation to your component, you add a `PropTypes property to the function component` or a `static property to call PropTypes to the class component`.

The keys of that object map to the props of your component. You then provide functions to validate the props.

