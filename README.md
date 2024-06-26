# Introduction to The Beginner's Guide to ReactJS

In this course, we'll start from the very basics of React, and give you everything you need to know to start developing web applications with the hottest framework of the web. **By Kent C. Dodds**

Source: [link](https://egghead.io/lessons/react-introduction-to-the-beginner-s-guide-to-reactjs)

## Chapters

[02. Write Hello World with raw React APIs](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.02/chapters/ch.02)

In this lesson we'll learn how to use raw React APIs to create the most basic Hello World example. React defines it’s own `createElement` function that we will see works similar to `document.createElement`. And in place of `appendChild` we will use `ReactDOM's render` function.

We'll also learn a little bit about React props and the children prop.

[03. Use JSX with React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.03/chapters/ch.03)

In this lesson we'll learn the basics of using JSX with React. In addition to the noted className difference, there are a number of other [differences with attributes in JSX than those in React](https://reactjs.org/docs/dom-elements.html).


[04. Create Custom React Components](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.04/chapters/ch.04)

Just like in regular JavaScript, when you want to `reuse code`, you create a `function`. With React, you `create components`. In this lesson we'll walk through the process of creating custom React components and you'll walk away with a deep understanding of how to create and use basic components to `compose` a larger component you render.

[05. Validate Custom React Component Props with PropTypes](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.05/chapters/ch.05)

In this lesson we'll learn about how you can use the `prop-types` module to validate a custom React component's `props`.

[06. Conditionally Render A React Component](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.06/chapters/ch.06)
 
 In this lesson we explore JSX a little further and solidify in our minds that JSX is simply syntax sugar on top of a fairly simple React API: `React.createElement`.
 
[07. Re-render a React Application](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.07/chapters/ch.07)

In this lesson, we'll learn how we can `call ReactDOM.render repeatedly` with `brand new React Elements` and React will `preserve element focus` and only do the minimal required DOM operations for the re-render.

[08. Style React Components](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.08/chapters/ch.08)

In this lesson we'll learn about how you can style react components using the `style` prop and `className` prop. We'll create a component that composes these props together nicely and talk about some of the shortcomings of these as well.

[09. Use Event Handlers with React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.09/chapters/ch.09)

In this lesson we'll learn about React's synthetic event system which allows React to use the same event system regardless of the platform (whether you're using react-native or react-dom for example). We'll see how you `attach events directly to elements` and React takes care of `event delegatio`n and `optimization` for you.

[10. Use Component State with React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.10/chapters/ch.10)

In this lesson we'll build a stopwatch component that maintains its own `state`. We'll start by creating the static UI, then take the dynamic parts and accept them as props. After that we'll refactor that to state and add event handlers to update the state.

[11. Stop Memory Leaks with componentWillUnmount Lifecycle Method in React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.11/chapters/ch.11)
 
 In this lesson we'll take a stopwatch component we built in another lesson and identify and fix a memory leak.
 
[12. Use Class Components with React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.12/chapters/ch.12)

In this lesson we'll look at a few ways to deal with issues around **this** when writing class components with React. We'll eventually land at **Public Class Fields syntax** which is a stage 3 proposal in the ECMAScript standardization process.

[13. Manipulate the DOM with React refs](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.13/chapters/ch.13)

Often you'll find there's a jQuery plugin or JavaScript library `which needs access to DOM nodes to work in your application`. **Other times you need access to the DOM node directly to get the value of form fields or for other reasons**. In this lesson we'll learn how to do this using React's ref prop.

[14. Make Basic Forms with React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.14/chapters/ch.14)

In this lesson we'll take a look at how to make a `basic form with React`. We'll see how to use the `onSubmit event to prevent the default submit behavior of forms` with React and then how to use `that event to get the values from the form`. We'll also see how you can use the `React ref prop to get the value of form elements` as well.

[15. Make Dynamic Forms with React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.15/chapters/ch.15)

Let's talk about how to use the `onChange` prop on an input to do **dynamic and custom validation of a form** `as the user makes changes` to the input.

[16. Controlling Form Values with React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.16/chapters/ch.16)

In this lesson we'll talk about controlling the value for `inputs`, `textareas`, and `select` elements. We'll see `how to manage the state` ourselves `while still allowing the user to update the values themselves`.

[17. Use the key prop when Rendering a List with React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.17/chapters/ch.17)
      
In this lesson we're reminded that JSX is simply JavaScript and to render a list you can use the array method `.map` to map an array to React elements. However, if you don't use the `key` prop correctly, it can lead to unexpected results, so `we explore what can happen and how to use the key prop correctly`.

[18.  Make HTTP Requests with React](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.18/chapters/ch.18)
Often to get user data `you'll make an AJAX request using axios or the fetch API`. In this lesson we'll get a GitHub user's company using GitHub's GraphQL API using React's componentDidMount lifecycle method.

[19. Build and deploy a React Application](https://github.com/xgirma/intro-to-the-beginner-guid-to-ractjs/tree/ch.19/chapters/ch.19)

In this lesson we'll see how simple it is to **prototype** a React application right in your browser using **CodeSandbox.io**, then to **download** that application locally and use the **react-scripts** which are setup automatically to develop and build the application for production. We'll wrap up by deploying the application to **Netlify** (using a free account) for the world to see.

