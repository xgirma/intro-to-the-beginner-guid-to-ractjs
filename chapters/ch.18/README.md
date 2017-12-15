# Make HTTP Requests with React
Often to get user data `you'll make an AJAX request using axios or the fetch API`. In this lesson we'll get a GitHub user's company using GitHub's GraphQL API using React's componentDidMount lifecycle method.

```javascript
<script type="text/babel">
  class UserCompany extends React.Component {
    state = {
      company: undefined,
      loaded: false
    }

    componentDidMount(){
      axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        data: {
          query: `{
          user(login: "${this.props.username}") {
            company
          }
        }`,
        },
        headers: {
          Authorization: `bearer 2043df0521b10eb609c578c0b0d9150c590cec3b`,
        },
      }).then( response => {
        this.setState({
          loaded: true,
          company: response.data.data.user.company
        })
      })
    }

    render () {
      return this.state.loaded? this.state.company || ' Unknown company' : '...'
    }
  }

  const username = 'kentcdodds'
  const element = (
    <div>
      <div>
        {`@${username} works at `}
        <UserCompany username={username}/>
      </div>
    </div>
  )

  ReactDOM.render(
    element,
    document.getElementById('root'),
  )
</script>
```

# Summary
In review, to make an **asynchronous request**, you're going to use **componentDidMount**. 

You can use a library like **Axios** to make a **request**,

and when that **request resolves**, you **setState**.

Then you render that **state** in your **render method**.


```javascript
componentDidMount(){
  axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    data: {
      query: `{
      user(login: "${this.props.username}") {
        company
      }
    }`,
    },
    headers: {
      Authorization: `bearer 2043df0521b10eb609c578c0b0d9150c590cec3b`,
    },
  }).then( response => {
    this.setState({
      loaded: true,
      company: response.data.data.user.company
    })
  }, error => {
    this.setState({
      error,
      loaded: true
    })
  })
}

render () {
  return this.state.error? 'Error occur' 
    : this.state.loaded? this.state.company || ' Unknown company' : '...'
}
```


