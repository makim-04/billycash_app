import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_PORTFOLIO } from '../data';

type Step = 'input' | 'waiting' | 'done';

export default function DepositPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>('input');
  const [amount, setAmount] = useState(0);

  const balance = MOCK_PORTFOLIO.tokenBalance;
  const accountNo = '123-456-789012';
  const bankName = '하나은행';

  const addAmount = (v: number) => setAmount(prev => prev + v);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNo.replace(/-/g, ''));
  };

  const handleRequest = () => {
    if (amount < 10000) return;
    setStep('waiting');
  };

  const handleConfirm = () => {
    setStep('done');
  };

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        {step !== 'done' && (
          <button className="subpage-topbar__back" onClick={() => step === 'input' ? navigate(-1) : setStep('input')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <span className="subpage-topbar__title">
          {step === 'input' ? '입금' : step === 'waiting' ? '입금 확인' : ''}
        </span>
        <span className="subpage-topbar__spacer" />
      </div>

      {step === 'input' && (
        <div className="deposit-content">
          <div className="deposit-balance">
            <span className="deposit-balance__label">내 토큰 잔액</span>
            <span className="deposit-balance__value">{balance.toLocaleString('ko-KR')} 토큰</span>
            <span className="deposit-balance__sub">≈ ₩{(balance * 1000).toLocaleString('ko-KR')}</span>
          </div>

          <div className="deposit-section">
            <label className="auth-label">입금 금액</label>
            <div className="deposit-amount-display">
              ₩{amount.toLocaleString('ko-KR')}
            </div>
            <div className="deposit-quick-btns">
              <button className="deposit-quick-btn" onClick={() => addAmount(50000)}>+5만</button>
              <button className="deposit-quick-btn" onClick={() => addAmount(100000)}>+10만</button>
              <button className="deposit-quick-btn" onClick={() => addAmount(500000)}>+50만</button>
              <button className="deposit-quick-btn" onClick={() => setAmount(0)}>초기화</button>
            </div>
          </div>

          <div className="deposit-account-compact">
            <div className="deposit-account-compact__top">
              <span className="deposit-account-compact__label">가상계좌</span>
              <span className="deposit-account-compact__name">{user?.name}</span>
            </div>
            <div className="deposit-account-compact__bottom">
              <span className="deposit-account-compact__num">{bankName} {accountNo}</span>
              <button className="deposit-account-compact__copy" onClick={handleCopy}>복사</button>
            </div>
          </div>

          <div className="deposit-notice">
            ⚠️ 반드시 본인 명의 계좌에서 입금해주세요. 입금 확인까지 최대 10분 소요됩니다.
          </div>

          <div className="subpage-footer">
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={amount < 10000}
              onClick={handleRequest}
            >
              입금 요청하기
            </button>
          </div>
        </div>
      )}

      {step === 'waiting' && (
        <div className="deposit-waiting">
          <div className="deposit-waiting__spinner" />
          <h2 className="deposit-waiting__title">입금 확인 중...</h2>
          <div className="deposit-waiting__info">
            <span>{bankName}</span>
            <span>{accountNo}</span>
            <span className="deposit-waiting__amount">₩{amount.toLocaleString('ko-KR')}</span>
          </div>
          <p className="deposit-waiting__desc">위 계좌로 입금 후 아래 버튼을 눌러주세요</p>
          <div className="deposit-waiting__actions">
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleConfirm}>
              입금 완료했어요
            </button>
            <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => setStep('input')}>
              취소
            </button>
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className="deposit-done">
          <div className="verify-done" style={{ width: 52, height: 52, margin: '0 auto 16px' }}>
            <svg className="verify-done__circle" viewBox="0 0 36 36" style={{ width: 52, height: 52 }}>
              <circle cx="18" cy="18" r="16" />
            </svg>
            <svg className="verify-done__check" viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
              <polyline points="6 12 10 16 18 8" />
            </svg>
          </div>
          <h2 className="deposit-done__title">입금 완료!</h2>
          <p className="deposit-done__amount">₩{amount.toLocaleString('ko-KR')} → {(amount / 1000).toLocaleString('ko-KR')} 토큰</p>
          <div className="deposit-done__balance">
            <span>잔액 {(balance + amount / 1000).toLocaleString('ko-KR')} 토큰</span>
            <span>≈ ₩{((balance + amount / 1000) * 1000).toLocaleString('ko-KR')}</span>
          </div>
          <div className="deposit-done__actions">
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate(-1)}>
              돌아가기
            </button>
            <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => navigate('/')}>
              홈으로
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
