import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';

// Bind the modal to the root element
Modal.setAppElement('#root');

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <ErrorBoundary>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />     
        <Route path='/sign-up' element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/about' element={<About />} />
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
