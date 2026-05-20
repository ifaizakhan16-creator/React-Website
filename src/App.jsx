import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Component Imports
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About'; 
import Browse from './components/Browse'; 
import UserProfile from './components/UserProfile'; 
import FAQ from './components/FAQ'; 
import Requests from './components/Requests';
import RequestHistory from './components/RequestHistory';
import ReviewReport from './components/ReviewReport';
import Chatroom from './components/Chatroom';
import ProfileSettings from './components/ProfileSettings';
import Auth from './components/Auth';
import NotFound from './components/NotFound';
import Offline from './components/Offline'; // Import the new Offline component

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [processedRequests, setProcessedRequests] = useState([]);
  
  // State to track internet connection
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const [pendingRequests, setPendingRequests] = useState([
    { id: 101, username: "dev_architect", skillHave: "React", skillWant: "UI Design", name: "Sarah Chen" },
    { id: 102, username: "optic_master", skillHave: "Photography", skillWant: "Marketing", name: "James Wilson" }
  ]);

  useEffect(() => {
    // Check local storage for session
    const session = localStorage.getItem('user_active');
    if (session === 'true') setIsLoggedIn(true);

    // Event listeners for internet connection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleAuthSuccess = () => setIsLoggedIn(true);
  
  const handleLogout = () => {
    localStorage.removeItem('user_active');
    setIsLoggedIn(false);
  };

  const addToHistory = (req, status) => {
    setPendingRequests(prev => prev.filter(item => item.id !== req.id));
    const newEntry = { ...req, status, processedAt: Date.now() };
    setProcessedRequests(prev => [newEntry, ...prev]);
  };

  const onRestore = (id) => {
    const requestToRestore = processedRequests.find(req => req.id === id);
    if (requestToRestore) {
      setProcessedRequests(prev => prev.filter(req => req.id !== id));
      setPendingRequests(prev => [
        { ...requestToRestore, status: undefined }, 
        ...prev
      ]);
    }
  };

  // If the user is offline, we render the Offline component instead of the Router
  if (!isOnline) {
    return <Offline />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} /> 
          <Route path="browse" element={<Browse />} />
          <Route path="user/:id" element={<UserProfile />} /> 
          <Route path="faqs" element={<FAQ />} />
          
          <Route 
            path="requests" 
            element={<Requests requests={pendingRequests} addToHistory={addToHistory} />} 
          />
          
          <Route 
            path="request-history" 
            element={<RequestHistory history={processedRequests} onRestore={onRestore} />} 
          />
          
          <Route path="review-report/:id" element={<ReviewReport />} />
          <Route path="chatroom" element={<Chatroom />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />

          {/* 404 NOT FOUND - This must be the last route in the list */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;