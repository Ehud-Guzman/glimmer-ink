import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Portfolio from './pages/Portfolio';

import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './components/NotFound';


export default function App() {
  return (
    
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<Portfolio />} />
          
            <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="/privacypolicy" element={<PrivacyPolicy />} />
             <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
