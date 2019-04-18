import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Guide from './components/Guide'
import Dashboard from './components/Dashboard'
import About from './components/About'
import { Snake, Pong, Breakout } from './components/Play'
import './tracker'
// import { stop } from './tracker'
import { Provider } from 'react-redux'
import { store } from './store'
import Home from './Home'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/guide" component={Guide} />
        <Route path="/dashboard" component={() => <Dashboard />} />
        <Route path="/about" component={About} />
        <Route path="/snake" component={Snake} />
        <Route path="/Pong" component={Pong} />
        <Route path="/breakout" component={Breakout} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App
