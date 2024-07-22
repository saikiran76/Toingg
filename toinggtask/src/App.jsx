import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Create from './components/Create';
// import Update from './components/Update';
import KnowledgeBase from './pages/KnowledgeBase';
import CallHandling from './pages/CallHandling';

function App() {

  const Token = 'tg_79b559e3-58cb-439e-87b5-3f1a7f8255c9-e2wMpo-qnpyBiKAeVcYCSg';
  return (
    <Router>
      <div className='flex bg-black'>
        <Sidebar />
        <Routes>
          <Route path="/create" element={<Create />} />
          {/* <Route path="/update" element={<Update />} /> */}
          <Route path="/knowledge-base" element={<KnowledgeBase authToken={Token} />} />
          <Route path="/call-handling" element={<CallHandling authToken={Token} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
