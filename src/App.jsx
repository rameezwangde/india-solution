import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-navy-900 text-white font-sans selection:bg-magenta selection:text-white overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Will add other routes later */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
