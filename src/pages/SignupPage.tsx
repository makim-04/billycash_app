import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = () => {
    if (!email || !email.includes("@")) { setError("올바른 이메일을 입력해주세요."); return; }
    setError(""); setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  const handleVerify = () => {
    if (code.length < 6) { setError("6자리 인증번호를 입력해주세요."); return; }
    setError(""); setVerified(true);
    setTimeout(() => setStep(2), 500);
  };

  const handleSubmit = () => {
    if (!name.trim()) { setError("이름을 입력해주세요."); return; }
    if (password.length < 8) { setError("비밀번호는 8자 이상이어야 합니다."); return; }
    if (password !== passwordConfirm) { setError("비밀번호가 일치하지 않습니다."); return; }
    if (!agreed) { setError("이용약관에 동의해주세요."); return; }
    setError(""); setStep(3);
  };

  return (
    <div>
      <div className="page-hero-app">
        <div className="page-hero-app__glow" />
        <div className="page-hero-app__label">✦ Sign Up</div>
        <h1 className="page-hero-app__title">빌리캐시 <span className="yellow">회원가입</span></h1>
        <p className="page-hero-app__desc">이메일 인증으로 간편하게 가입하세요.</p>
      </div>
      <div className="auth-section">
        <div className="signup-progress">
          <div className={`signup-progress__step ${step >= 1 ? "active" : ""}`}><span>1</span>인증</div>
          <div className="signup-progress__line" />
          <div className={`signup-progress__step ${step >= 2 ? "active" : ""}`}><span>2</span>정보</div>
          <div className="signup-progress__line" />
          <div className={`signup-progress__step ${step >= 3 ? "active" : ""}`}><span>3</span>완료</div>
        </div>

        {step === 1 && (
          <div className="auth-card">
            <h2 className="auth-card__title">이메일 인증</h2>
            <p className="auth-card__desc">가입에 사용할 이메일을 입력하세요.</p>
            <div className="auth-field">
              <label className="auth-label">이메일</label>
              <div className="auth-input-row">
                <input className="auth-input" type="email" placeholder="example@email.com" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} disabled={sent} />
                <button className="btn-primary btn-sm" type="button" onClick={handleSendCode} disabled={sending || sent}>
                  {sending ? "전송 중..." : sent ? "완료" : "발송"}
                </button>
              </div>
            </div>
            {sent && (
              <div className="auth-field">
                <label className="auth-label">인증번호 6자리</label>
                <div className="auth-input-row">
                  <input className="auth-input" type="text" placeholder="000000" maxLength={6} value={code} onChange={e => { setCode(e.target.value.replace(/\D/g, "")); setError(""); }} disabled={verified} />
                  <button className="btn-primary btn-sm" type="button" onClick={handleVerify} disabled={verified}>
                    {verified ? "✓" : "확인"}
                  </button>
                </div>
              </div>
            )}
            {error && <div className="auth-error">{error}</div>}
          </div>
        )}

        {step === 2 && (
          <div className="auth-card">
            <h2 className="auth-card__title">기본 정보 입력</h2>
            <p className="auth-card__desc">서비스 이용을 위한 정보를 입력하세요.</p>
            <div className="auth-field">
              <label className="auth-label">이메일</label>
              <input className="auth-input" type="email" value={email} disabled />
            </div>
            <div className="auth-field">
              <label className="auth-label">이름</label>
              <input className="auth-input" type="text" placeholder="홍길동" value={name} onChange={e => { setName(e.target.value); setError(""); }} />
            </div>
            <div className="auth-field">
              <label className="auth-label">비밀번호</label>
              <input className="auth-input" type="password" placeholder="8자 이상" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} />
            </div>
            <div className="auth-field">
              <label className="auth-label">비밀번호 확인</label>
              <input className="auth-input" type="password" placeholder="재입력" value={passwordConfirm} onChange={e => { setPasswordConfirm(e.target.value); setError(""); }} />
            </div>
            <label className="auth-checkbox">
              <input type="checkbox" checked={agreed} onChange={e => { setAgreed(e.target.checked); setError(""); }} />
              <span>이용약관에 동의합니다.</span>
            </label>
            {error && <div className="auth-error">{error}</div>}
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} type="button" onClick={handleSubmit}>가입하기</button>
          </div>
        )}

        {step === 3 && (
          <div className="auth-card" style={{ textAlign: "center" }}>
            <div className="signup-done-icon">✓</div>
            <h2 className="auth-card__title">가입 완료!</h2>
            <p className="auth-card__desc">빌리캐시에 오신 것을 환영합니다.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
              <button className="btn-primary" onClick={() => navigate("/login")}>로그인</button>
              <button className="btn-outline" onClick={() => navigate("/")}>홈으로</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
