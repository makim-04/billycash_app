import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import StatusBar from './StatusBar'
import TabBar from './TabBar'

const HIDE_TAB_PAGES = ['/login', '/signup', '/wallet', '/menu', '/search'];
const HIDE_TAB_PATTERNS = [/^\/invest\/\d+\/apply$/];

export default function AppShell() {
  const { isLoggedIn } = useAuth();
  const { pathname } = useLocation();
  const hideTabBar = !isLoggedIn || HIDE_TAB_PAGES.includes(pathname) || HIDE_TAB_PATTERNS.some(p => p.test(pathname));

  return (
    <div className="app-shell">
      <StatusBar />
      <div className={`app-content ${hideTabBar ? 'app-content--no-tab' : ''}`}>
        <Outlet />
      </div>
      {!hideTabBar && <TabBar />}
    </div>
  )
}
