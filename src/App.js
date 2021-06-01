import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import About from './components/common/About'
import Error from './components/common/Error'
import AllMemories from './components/memories/AllMemories'
import SingleMemory from './components/memories/SingleMemory'
import MemoryMap from './components/memories/MemoryMap'
import NewMemory from './components/memories/NewMemory'
import SecureRoute from './components/common/SecureRoute'
import EditMemory from './components/memories/EditMemory'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <SecureRoute Route path="/newmemory" component={NewMemory} />
        <Route path="/memories/map" component={MemoryMap} />
        <Route path="/memories/:memoryId/edit" component={EditMemory} />
        <Route path="/memories/:memoryId" component={SingleMemory} />
        <Route path="/memories" component={AllMemories} />
        <Route path="/*" component={Error} />

      </Switch>
    </BrowserRouter>
  )
}

export default App