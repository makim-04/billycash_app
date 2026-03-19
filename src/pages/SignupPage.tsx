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
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
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
    setTimeout(() => setStep(2), 1500);
  };

  const handleSubmit = () => {
    if (!name.trim()) { setError("이름을 입력해주세요."); return; }
    if (password.length < 8) { setError("비밀번호는 8자 이상이어야 합니다."); return; }
    if (password !== passwordConfirm) { setError("비밀번호가 일치하지 않습니다."); return; }
    if (!agreeTerms || !agreePrivacy) { setError("이용약관과 개인정보처리방침에 동의해주세요."); return; }
    setError(""); setStep(3);
  };

  const handleBack = () => {
    if (step === 1) navigate('/login');
    else if (step === 2) { setStep(1); setError(""); }
  };

  return (
    <div className="signup-page">
      {/* 상단 네비게이션 */}
      <div className="signup-topbar">
        {step < 3 && (
          <button className="signup-topbar__back" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <span className="signup-topbar__title">회원가입</span>
        <span className="signup-topbar__spacer" />
      </div>

      {/* 프로그레스 */}
      <div className="signup-progress">
        <div className={`signup-progress__step ${step >= 1 ? "active" : ""}`}><span>1</span>인증</div>
        <div className="signup-progress__line" />
        <button
          className={`signup-progress__step ${step >= 2 ? "active" : ""} ${verified && step === 1 ? "clickable" : ""}`}
          disabled={!verified || step >= 2}
          onClick={() => verified && setStep(2)}
        ><span>2</span>정보</button>
        <div className="signup-progress__line" />
        <div className={`signup-progress__step ${step >= 3 ? "active" : ""}`}><span>3</span>완료</div>
      </div>

      {/* 폼 영역 */}
      <div className="auth-section">
        {step === 1 && (
          <div className="auth-card">
            <h2 className="auth-card__title">이메일 인증</h2>
            <p className="auth-card__desc">가입에 사용할 이메일을 입력하세요.</p>
            <div className="auth-field">
              <label className="auth-label">이메일</label>
              <div className="auth-input-row">
                <input className="auth-input" type="email" placeholder="example@email.com" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} disabled={sent} />
                {!sent && (
                  <button className="btn-primary btn-sm" type="button" onClick={handleSendCode} disabled={sending}>
                    인증하기
                  </button>
                )}
              </div>
            </div>
            {sent && (
              <div className="auth-field">
                <label className="auth-label">인증번호 6자리</label>
                <div className="auth-input-row">
                  <input className="auth-input" type="text" placeholder="000000" maxLength={6} value={code} onChange={e => { setCode(e.target.value.replace(/\D/g, "")); setError(""); }} disabled={verified} />
                  {verified ? (
                    <span className="verify-done">
                      <svg className="verify-done__circle" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" />
                      </svg>
                      <svg className="verify-done__check" viewBox="0 0 24 24">
                        <polyline points="6 12 10 16 18 8" />
                      </svg>
                    </span>
                  ) : (
                    <button className="btn-primary btn-sm" type="button" onClick={handleVerify}>확인</button>
                  )}
                </div>
              </div>
            )}
            {error && <div className="auth-error">{error}</div>}
          </div>
        )}

        {step === 2 && (
          <>
            <div className="auth-card">
                <h2 className="auth-card__title">기본 정보 입력</h2>
                <p className="auth-card__desc">서비스 이용을 위한 정보를 입력하세요.</p>
                <div className="auth-field">
                  <label className="auth-label">이메일</label>
                  <input className="auth-input" type="email" value={email} disabled />
                </div>
                <div className="auth-field">
                  <label className="auth-label">이름</label>
                  <input className="auth-input" type="text" placeholder="입력" value={name} onChange={e => { setName(e.target.value); setError(""); }} />
                </div>
                <div className="auth-field">
                  <label className="auth-label">비밀번호</label>
                  <input className="auth-input" type="password" placeholder="8자 이상" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} />
                </div>
                <div className="auth-field">
                  <label className="auth-label">비밀번호 확인</label>
                  <input className="auth-input" type="password" placeholder="재입력" value={passwordConfirm} onChange={e => { setPasswordConfirm(e.target.value); setError(""); }} />
                </div>
            <div className="agree-section">
              <label className="auth-checkbox agree-all">
                <input
                  type="checkbox"
                  checked={agreeTerms && agreePrivacy}
                  onChange={e => { setAgreeTerms(e.target.checked); setAgreePrivacy(e.target.checked); setError(""); }}
                />
                <span>전체 동의</span>
              </label>
              <div className="agree-items">
                <div className="agree-row">
                  <label className="auth-checkbox">
                    <input type="checkbox" checked={agreeTerms} onChange={e => { setAgreeTerms(e.target.checked); setError(""); }} />
                    <span>[필수] 이용약관 동의</span>
                  </label>
                  <button type="button" className="agree-view" onClick={() => setShowTerms(true)}>보기</button>
                </div>
                <div className="agree-row">
                  <label className="auth-checkbox">
                    <input type="checkbox" checked={agreePrivacy} onChange={e => { setAgreePrivacy(e.target.checked); setError(""); }} />
                    <span>[필수] 개인정보처리방침 동의</span>
                  </label>
                  <button type="button" className="agree-view" onClick={() => setShowPrivacy(true)}>보기</button>
                </div>
              </div>
            </div>

            {/* 이용약관 모달 */}
            {showTerms && (
              <div className="agree-modal-overlay" onClick={() => setShowTerms(false)}>
                <div className="agree-modal" onClick={e => e.stopPropagation()}>
                  <div className="agree-modal__header">
                    <span className="agree-modal__title">이용약관</span>
                    <button className="agree-modal__close" onClick={() => setShowTerms(false)}>✕</button>
                  </div>
                  <div className="agree-modal__body">
                    <p>제1조 (목적)</p>
                    <p>본 약관은 빌리캐시(이하 "회사")가 제공하는 조각투자 서비스의 이용 조건 및 절차에 관한 사항을 규정합니다.</p>
                    <p>제2조 (서비스 내용)</p>
                    <p>회사는 소상공인 매장에 대한 조각투자 중개, 토큰 발행 및 배당금 정산 서비스를 제공합니다.</p>
                    <p>제3조 (이용자의 의무)</p>
                    <p>이용자는 본인 명의로만 가입할 수 있으며, 타인의 정보를 도용하여 가입할 수 없습니다.</p>
                    <p>제4조 (투자 위험 고지)</p>
                    <p>투자에는 원금 손실 위험이 있으며, 과거 수익률이 미래 수익을 보장하지 않습니다.</p>
                  </div>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={() => { setAgreeTerms(true); setShowTerms(false); }}>동의하기</button>
                </div>
              </div>
            )}

            {/* 개인정보처리방침 모달 */}
            {showPrivacy && (
              <div className="agree-modal-overlay" onClick={() => setShowPrivacy(false)}>
                <div className="agree-modal" onClick={e => e.stopPropagation()}>
                  <div className="agree-modal__header">
                    <span className="agree-modal__title">개인정보처리방침</span>
                    <button className="agree-modal__close" onClick={() => setShowPrivacy(false)}>✕</button>
                  </div>
                  <div className="agree-modal__body">
                    <p>1. 수집하는 개인정보 항목</p>
                    <p>이메일, 이름, 비밀번호(암호화 저장), 연락처</p>
                    <p>2. 수집 및 이용 목적</p>
                    <p>회원 식별, 투자 서비스 제공, 배당금 정산, 고객 문의 응대</p>
                    <p>3. 보유 및 이용 기간</p>
                    <p>회원 탈퇴 시까지. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간까지 보관합니다.</p>
                    <p>4. 개인정보의 제3자 제공</p>
                    <p>이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p>
                  </div>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={() => { setAgreePrivacy(true); setShowPrivacy(false); }}>동의하기</button>
                </div>
              </div>
            )}
                {error && <div className="auth-error">{error}</div>}
            </div>
            <div className="signup-step2__footer">
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} type="button" onClick={handleSubmit}>가입하기</button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="auth-card" style={{ textAlign: "center" }}>
            <div className="signup-done-icon">✓</div>
            <h2 className="auth-card__title">가입 완료!</h2>
            <p className="auth-card__desc">빌리캐시에 오신 것을 환영합니다.</p>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={() => navigate("/login")}>로그인하기</button>
          </div>
        )}
      </div>
    </div>
  );
}
