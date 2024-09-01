import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import About from './pages/About';
import AddPlot from './pages/AddPlot';
import Disease from './pages/Disease';
import Crop from './pages/Crop';
import DetectDisease from './pages/DetectDisease';
import Community from './pages/Community';
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
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/add-plot' element={<AddPlot />} />
          <Route path='/disease' element={<Disease />} />
          <Route path='/crop' element={<Crop />} />
          <Route path='/detect' element={<DetectDisease />} />     
          <Route path='/community' element={<Community />} />     
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />     
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/about' element={<About />} />
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
