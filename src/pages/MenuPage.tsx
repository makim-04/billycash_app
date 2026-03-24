import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type View = 'menu' | 'settings';

interface NavChild {
  label: string;
  to: string;
}
interface NavGroup {
  label: string;
  to?: string;
  children?: NavChild[];
}

const NAV_GROUPS: NavGroup[] = [
  { label: '홈', to: '/' },
  {
    label: '투자 상품',
    children: [
      { label: '모집중 상품', to: '/invest' },
      { label: '내 투자', to: '/invest?tab=my' },
    ],
  },
  {
    label: '자산',
    children: [
      { label: '자산 상세', to: '/asset' },
      { label: '입출금', to: '/wallet' },
      { label: '투자 내역', to: '/tx-history' },
    ],
  },
  {
    label: '공지 · 안내',
    children: [
      { label: '공지사항', to: '/notice' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    label: '마이페이지',
    children: [
      { label: '포트폴리오', to: '/my' },
      { label: '계정 관리', to: '/account' },
    ],
  },
];

export default function MenuPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const [view, setView] = useState<View>(searchParams.get('view') === 'settings' ? 'settings' : 'menu');
  const [search, setSearch] = useState('');
  const [autoLogin, setAutoLogin] = useState(() => localStorage.getItem('billycash_app_auto_login') === 'true');
  const [notiOn, setNotiOn] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAutoLoginToggle = () => {
    const next = !autoLogin;
    setAutoLogin(next);
    localStorage.setItem('billycash_app_auto_login', next ? 'true' : 'false');
  };

  const filteredGroups = search
    ? NAV_GROUPS.map(g => ({
        ...g,
        children: g.children?.filter(c => c.label.includes(search)),
      })).filter(g => g.label.includes(search) || (g.children && g.children.length > 0))
    : NAV_GROUPS;

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        <button className="subpage-topbar__back" onClick={() => {
          if (view === 'settings') { setView('menu'); }
          else { navigate(-1); }
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="subpage-topbar__title">{view === 'settings' ? '설정' : ''}</span>
        {view === 'menu' ? (
          <button className="subpage-topbar__action" onClick={() => setView('settings')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        ) : (
          <span className="subpage-topbar__spacer" />
        )}
      </div>

      {view === 'menu' && (
        <div className="menu-content">
          {/* 프로필 */}
          <div className="menu-profile">
            <div className="menu-profile__avatar">
              {user?.name.charAt(0)}
            </div>
            <div className="menu-profile__info">
              <div className="menu-profile__name">{user?.name}님</div>
              <div className="menu-profile__email">{user?.email}</div>
            </div>
            <button className="menu-profile__logout" onClick={() => setShowLogoutConfirm(true)}>
              로그아웃
            </button>
          </div>

          {/* 검색 */}
          <div className="menu-search">
            <svg className="menu-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="menu-search__input"
              type="text"
              placeholder="메뉴 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* 네비게이션 */}
          <div className="menu-nav">
            {filteredGroups.map(group => (
              <div key={group.label} className="menu-nav__group">
                {group.to ? (
                  <button className="menu-nav__group-title menu-nav__group-title--link" onClick={() => navigate(group.to!)}>
                    {group.label}
                  </button>
                ) : (
                  <div className="menu-nav__group-title">{group.label}</div>
                )}
                {group.children && (
                  <div className="menu-nav__children">
                    {group.children.map(child => (
                      <button key={child.label} className="menu-nav__child" onClick={() => navigate(child.to)}>
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {filteredGroups.length === 0 && (
              <div className="menu-nav__empty">검색 결과가 없습니다</div>
            )}
          </div>

          {/* 로그아웃 확인 팝업 */}
          {showLogoutConfirm && (
            <div className="confirm-overlay" onClick={() => setShowLogoutConfirm(false)}>
              <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
                <h3 className="confirm-dialog__title">로그아웃</h3>
                <p className="confirm-dialog__desc">정말 로그아웃 하시겠습니까?</p>
                <div className="confirm-dialog__actions">
                  <button className="confirm-dialog__btn confirm-dialog__btn--cancel" onClick={() => setShowLogoutConfirm(false)}>취소</button>
                  <button className="confirm-dialog__btn confirm-dialog__btn--confirm" onClick={handleLogout}>확인</button>
                </div>
              </div>
            </div>
          )}

          {/* 하단 정보 */}
          <div className="menu-footer">
            <div className="menu-footer__version">빌리캐시 v1.0.0</div>
            <div className="menu-footer__copyright">© 2026 BillyCrew Inc. All rights reserved.</div>
          </div>
        </div>
      )}

      {view === 'settings' && (
        <div className="menu-content">
          <div className="settings-group">
            <div className="settings-group__title">계정</div>
            <button className="settings-item" onClick={() => navigate('/account?from=settings', { replace: true })}>
              <span>계정 관리</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <button className="settings-item" onClick={() => navigate('/pin-setup?from=settings', { replace: true })}>
              <span>간편 비밀번호 설정/변경</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>

          <div className="settings-group">
            <div className="settings-group__title">앱 설정</div>
            <div className="settings-item">
              <span>자동 로그인</span>
              <button className={`settings-toggle ${autoLogin ? 'on' : ''}`} onClick={handleAutoLoginToggle}>
                <span className="settings-toggle__thumb" />
              </button>
            </div>
            <div className="settings-item">
              <span>알림 수신</span>
              <button className={`settings-toggle ${notiOn ? 'on' : ''}`} onClick={() => setNotiOn(!notiOn)}>
                <span className="settings-toggle__thumb" />
              </button>
            </div>
            <div className="settings-item">
              <span>마지막 접속</span>
              <span className="settings-item__value">2026.03.19 14:32</span>
            </div>
          </div>

          <div className="settings-group">
            <div className="settings-group__title">약관 및 정보</div>
            <button className="settings-item">
              <span>약관 및 동의 관리</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>

          <div className="settings-group">
            <button className="settings-danger" onClick={() => setShowWithdrawConfirm(true)}>
              탈퇴하기
            </button>
          </div>

          {/* 탈퇴 확인 팝업 */}
          {showWithdrawConfirm && (
            <div className="confirm-overlay" onClick={() => setShowWithdrawConfirm(false)}>
              <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
                <h3 className="confirm-dialog__title">회원 탈퇴</h3>
                <p className="confirm-dialog__desc">탈퇴 시 모든 투자 정보와 자산이 삭제됩니다. 정말 탈퇴하시겠습니까?</p>
                <div className="confirm-dialog__actions">
                  <button className="confirm-dialog__btn confirm-dialog__btn--cancel" onClick={() => setShowWithdrawConfirm(false)}>취소</button>
                  <button className="confirm-dialog__btn confirm-dialog__btn--danger" onClick={() => { logout(); navigate('/login'); }}>탈퇴</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
