import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate('/my', { replace: true });
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { setError('올바른 이메일을 입력해주세요.'); return; }
    if (password.length < 8) { setError('비밀번호는 8자 이상입니다.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      navigate('/my');
    }, 800);
  };

  return (
    <div>
      <div className="page-hero-app">
        <div className="page-hero-app__glow" />
        <div className="page-hero-app__label">✦ Login</div>
        <h1 className="page-hero-app__title">빌리캐시 <span className="yellow">로그인</span></h1>
      </div>
      <div className="auth-section">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2 className="auth-card__title">로그인</h2>
          <p className="auth-card__desc">투자 현황과 토큰 잔고를 확인하세요.</p>
          <div className="auth-field">
            <label className="auth-label">이메일</label>
            <input
              className="auth-input"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">비밀번호</label>
            <input
              className="auth-input"
              type="password"
              placeholder="8자 이상"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              autoComplete="current-password"
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
          <div className="auth-links">
            아직 회원이 아니신가요? <Link to="/signup">회원가입 →</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
