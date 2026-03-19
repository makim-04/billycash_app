import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomeTopBar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home-topbar">
      {/* 왼쪽: 로고 + 유저 */}
      <div className="home-topbar__left">
        <img src="/images/logo-symbol.png" alt="빌리캐시" className="home-topbar__logo" />
        <button className="home-topbar__user" onClick={() => navigate('/my')}>
          <span className="home-topbar__name">{user?.name}님</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* 오른쪽: 알림, 검색, 메뉴 */}
      <div className="home-topbar__right">
        <button className="home-topbar__icon" aria-label="입출금" onClick={() => navigate('/wallet')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M12 10v4" />
            <path d="M10 12h4" />
          </svg>
        </button>
        <button className="home-topbar__icon" aria-label="검색">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="home-topbar__icon" aria-label="메뉴" onClick={() => navigate('/menu')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
