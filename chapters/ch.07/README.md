# Re-render a React Application

In this lesson, we'll learn how we can `call ReactDOM.render repeatedly` with `brand new React Elements` and React will `preserve element focus` and only do the minimal required DOM operations for the re-render.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  const time = new Date().toLocaleTimeString()
  const element = <div>It is {time}</div>

  ReactDOM.render(element, rootElement)
</script>
```

What we have here is a little app that's going to show us the current time. Unfortunately, it's only showing us the time since the last refresh. I refresh the page and I'm going to get the new time.

> I want that to update automatically every second.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  function tick() {
    const time = new Date().toLocaleTimeString()
    const element = <div>It is {time}</div>
    ReactDOM.render(element, rootElement)
  }
  tick()
    setInterval(tick, 1000)
</script>
```

Great, now we have this thing working just perfectly. If I right-click here, going to inspect that in particular. The browser is going to highlight the changes in purple here, and that's what we're getting right here is the seconds are updating.

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/5876481/33794089-918c3cac-dc79-11e7-844b-9b1cd2d052de.gif)

> This is actually a little bit more important than you might think. 

This is actually a little bit more important than you might think. To illustrate this, I'm going to change this to be an input that has the value of that time. If I refresh here, I'm going to get that in an input, and what's neat here is, every single time this is updating, my `focus remains in the same input`.

![ezgif com-video-to-gif 1](https://user-images.githubusercontent.com/5876481/33794141-758ed05e-dc7a-11e7-8cd8-b2e46dc706c5.gif)

If I go ahead and we'll just duplicate this input once here, I'm going to have two inputs here now. I can tab between the two and my focus is going to stay on the correct input.

![ezgif com-video-to-gif 2](https://user-images.githubusercontent.com/5876481/33794175-7b8333aa-dc7b-11e7-968c-34ed48a1fb68.gif)

Let's see why this is kind of neat.

I'm going to change this from JSX to a template string. Instead of ReactDOM render, I'm going to say `rootelement.innerhtml` equals that element, so that string. Of course I'm going to need to have this `interpolated`, because this is a template string.

```html
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>

<script type="text/babel">
  const rootElement = document.getElementById('root')
  function tick() {
    const time = new Date().toLocaleTimeString()
    const element = `<div> It is <input value=${time} /> It is <input value=${time}/></div>`
    rootElement.innerHTML = element
    // ReactDOM.render(element, rootElement)
  }
  tick()
  setInterval(tick, 1000)
</script>
```

![ezgif com-video-to-gif 4](https://user-images.githubusercontent.com/5876481/33794224-789c93c4-dc7c-11e7-9309-44908b0c3c7f.gif)

Now, I'm getting an `update of the entire DOM structure every single time this second tics`. :-1: :-1: :-1: If I click on here, I'm going to lose focus. I click on here, I lose focus.

> What's really neat about the way that React is doing this for us is, **we have a re-render every single second, re-render our entire application, and it's only updating the parts that actually matter, and it's maintaining focus for us**.

It makes sure that when I'm focused on the input and it re-renders, it's going to keep me focused in that input. This has really great implications for `accessibility` as well as `performance`, that it's only doing the DOM operations that are absolutely critical and necessary for React to do its updating.

## Summary
Normally, you're not going to do a full-application re-render every second, or whenever any state in your application changes, there are other ways that React exposes for you to re-render certain parts of your application `based off of state changes`.

I wanted to show you this to illustrate to you that whenever you re-render on the same element or whenever React is doing a re-rendering, it is only going to be updating the part of the `DOM that's necessary for it to re-render`.





