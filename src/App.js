import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import StateSpecificRoute from './components/StateSpecificRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode" component={StateSpecificRoute} />
    <Route component={NotFound} />
  </Switch>
)

export default App
