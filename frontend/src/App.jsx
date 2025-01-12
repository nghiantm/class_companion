//import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import NavBar from './components/NavBar/NavBar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Companion from './routes/Companion'
import Practice from './routes/Practice'
import Archive from './routes/Archive'
import AuthGuard from './components/AuthGuard'

function App() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={AuthGuard(user, loading, <Home />)} />
        <Route path="/archive" element={AuthGuard(user, loading, <Archive />)} />
        <Route path="/companion/:sessionName" element={AuthGuard(user, loading, <Companion />)} />
        <Route path="/practice" element={AuthGuard(user, loading, <Practice />)} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App;
