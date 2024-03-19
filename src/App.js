import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import CoursesItem from './components/CoursesItem'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CoursesItem} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
