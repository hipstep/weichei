import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Gallery from './pages/Gallery'

function App() {
 return (
    <HashRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery/:articleId" element={<Gallery />} />
      </Routes>
    </HashRouter>
  )
}

export default App
