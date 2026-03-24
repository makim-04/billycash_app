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
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M1.81818 14.2222C1.31818 14.2222 0.890303 14.0483 0.534546 13.7004C0.178788 13.3526 0.000606061 12.9339 0 12.4444V1.77778C0 1.28889 0.178182 0.870518 0.534546 0.522667C0.890909 0.174815 1.31879 0.000592593 1.81818 0H16.3636C16.8636 0 17.2918 0.174222 17.6482 0.522667C18.0045 0.871111 18.1824 1.28948 18.1818 1.77778V7.11111H1.81818V12.4444H10.9091V14.2222H1.81818ZM1.81818 3.55556H16.3636V1.77778H1.81818V3.55556ZM15.4545 16V13.3333H12.7273V11.5556H15.4545V8.88889H17.2727V11.5556H20V13.3333H17.2727V16H15.4545Z" fill="currentColor"/>
          </svg>
        </button>
        <button className="home-topbar__icon" aria-label="검색" onClick={() => navigate('/search')}>
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
