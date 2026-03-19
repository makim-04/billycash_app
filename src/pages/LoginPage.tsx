import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true });
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { setError('올바른 이메일을 입력해주세요.'); return; }
    if (password.length < 8) { setError('비밀번호는 8자 이상입니다.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      login(email, password, autoLogin);
      setLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <div>
      <div className="login-hero-app">
        <img src="/images/logo-symbol.png" alt="빌리캐시" className="login-hero-app__logo" />
        <h1 className="login-hero-app__title">빌리캐시</h1>
        <p className="login-hero-app__desc">소상공인 조각투자 플랫폼</p>
      </div>
      <div className="auth-section">
        <form className="auth-card" onSubmit={handleSubmit}>
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
          <label className="auth-checkbox">
            <input
              type="checkbox"
              checked={autoLogin}
              onChange={e => setAutoLogin(e.target.checked)}
            />
            <span>자동 로그인</span>
          </label>
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
