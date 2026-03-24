import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ACCOUNT_INFO = [
  { label: '이름', value: '김민수' },
  { label: '이메일', value: 'minsu.kim@example.com' },
  { label: '연락처', value: '010-1234-5678' },
  { label: '가상계좌', value: '하나 110-490-123456' },
  { label: '본인인증', value: '인증 완료', accent: true },
];

export default function AccountPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const goBack = () => searchParams.get('from') === 'settings' ? navigate('/menu?view=settings') : navigate(-1);

  const info = user
    ? [
        { label: '이름', value: user.name },
        { label: '이메일', value: user.email },
        { label: '연락처', value: user.phone },
        { label: '가상계좌', value: '하나 110-490-123456' },
        { label: '본인인증', value: '인증 완료', accent: true },
      ]
    : ACCOUNT_INFO;

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        <button className="subpage-topbar__back" onClick={goBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="subpage-topbar__title">계정 관리</span>
        <span className="subpage-topbar__spacer" />
      </div>

      <div className="account-content">
        {/* 프로필 아바타 */}
        <div className="account-avatar">
          <div className="account-avatar__circle">
            {(user?.name || '김')[0]}
          </div>
          <div className="account-avatar__name">{user?.name || '김민수'}</div>
          <div className="account-avatar__date">가입일 {user?.joinDate || '2025-09-15'}</div>
        </div>

        {/* 계정 정보 */}
        <div className="account-card">
          <h3 className="account-card__title">계정 정보</h3>
          {info.map((item, i) => (
            <div key={i} className="account-row">
              <span className="account-row__label">{item.label}</span>
              <span className={`account-row__value ${item.accent ? 'account-row__value--accent' : ''}`}>
                {item.accent && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3ABF47" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}>
                    <polyline points="6 12 10 16 18 8" />
                  </svg>
                )}
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* 보안 */}
        <div className="account-card">
          <h3 className="account-card__title">보안</h3>
          <div className="account-row">
            <span className="account-row__label">간편 비밀번호</span>
            <span className="account-row__value">설정됨</span>
          </div>
          <div className="account-row">
            <span className="account-row__label">2단계 인증</span>
            <span className="account-row__value">
              <span className="account-row__badge">KYC</span>
              Lv.{user?.kycLevel || 2}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
