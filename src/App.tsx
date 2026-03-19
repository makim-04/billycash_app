import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import InvestPage from './pages/InvestPage'
import InvestDetailPage from './pages/InvestDetailPage'
import NoticePage from './pages/NoticePage'
import FAQPage from './pages/FAQPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/invest" element={<InvestPage />} />
          <Route path="/invest/:id" element={<InvestDetailPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/my" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
