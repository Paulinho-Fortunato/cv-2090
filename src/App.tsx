import { HashRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { BuilderPage } from './pages/BuilderPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
