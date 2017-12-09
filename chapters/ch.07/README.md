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
