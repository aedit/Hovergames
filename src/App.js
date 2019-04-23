import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Guide from './components/Guide'
import Dashboard from './components/Dashboard'
import About from './components/About'
import { Snake, Pong, Breakout, Dodge } from './components/Play'
import './tracker'
import { Provider } from 'react-redux'
import { store } from './store'
import Home from './Home'
import Instructions from './components/Instruction'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/guide" component={() => <Guide />} />
          <Route path="/dashboard" component={() => <Dashboard />} />
          <Route path="/about" component={() => <About />} />
          <Route path="/snake" component={() => <Snake />} />
          <Route path="/Pong" component={() => <Pong />} />
          <Route path="/breakout" component={() => <Breakout />} />
          <Route path="/Dodge" component={() => <Dodge />} />
          <Route
            path="/instruction/Snake"
            component={() => <Instructions game="Snake" />}
          />
          <Route
            path="/instruction/Pong"
            component={() => <Instructions game="Pong" />}
          />
          <Route
            path="/instruction/Breakout"
            component={() => <Instructions game="Breakout" />}
          />
          <Route
            path="/instruction/Dodge"
            component={() => <Instructions game="Dodge" />}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
