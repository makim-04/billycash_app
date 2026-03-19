import { Outlet } from 'react-router-dom'
import StatusBar from './StatusBar'
import TabBar from './TabBar'

export default function AppShell() {
  return (
    <div className="app-shell">
      <StatusBar />
      <div className="app-content">
        <Outlet />
      </div>
      <TabBar />
    </div>
  )
}
