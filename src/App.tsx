import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import InvestPage from './pages/InvestPage'
import InvestDetailPage from './pages/InvestDetailPage'
import InvestApplyPage from './pages/InvestApplyPage'
import WalletPage from './pages/WalletPage'
import NoticePage from './pages/NoticePage'
import FAQPage from './pages/FAQPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import MyPage from './pages/MyPage'
import MenuPage from './pages/MenuPage'
import SearchPage from './pages/SearchPage'
import PinSetupPage from './pages/PinSetupPage'
import AccountPage from './pages/AccountPage'
import AssetDetailPage from './pages/AssetDetailPage'
import TxHistoryPage from './pages/TxHistoryPage'
import HoldingsListPage from './pages/HoldingsListPage'

function RequireAuth() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          {/* 인증 불필요 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 인증 필요 */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/invest" element={<InvestPage />} />
            <Route path="/invest/:id" element={<InvestDetailPage />} />
            <Route path="/invest/:id/apply" element={<InvestApplyPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/pin-setup" element={<PinSetupPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/asset" element={<AssetDetailPage />} />
            <Route path="/tx-history" element={<TxHistoryPage />} />
            <Route path="/holdings" element={<HoldingsListPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
