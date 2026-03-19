import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', icon: '🏠', label: '홈' },
  { to: '/invest', icon: '📊', label: '투자' },
  { to: '/notice', icon: '📢', label: '공지' },
  { to: '/my', icon: '👤', label: 'MY' },
]

export default function TabBar() {
  return (
    <nav className="tab-bar">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}
          end={tab.to === '/'}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
