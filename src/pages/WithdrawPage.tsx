import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_PORTFOLIO } from '../data';

type Step = 'input' | 'done';

export default function WithdrawPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>('input');
  const [amount, setAmount] = useState(0);

  const balance = MOCK_PORTFOLIO.tokenBalance;
  const maxKRW = balance * 1000;

  const addAmount = (v: number) => setAmount(prev => Math.min(prev + v, maxKRW));

  const handleSubmit = () => {
    if (amount < 10000 || amount > maxKRW) return;
    setStep('done');
  };

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        {step !== 'done' && (
          <button className="subpage-topbar__back" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <span className="subpage-topbar__title">{step === 'input' ? '출금' : ''}</span>
        <span className="subpage-topbar__spacer" />
      </div>

      {step === 'input' && (
        <div className="deposit-content">
          <div className="deposit-balance">
            <span className="deposit-balance__label">출금 가능 잔액</span>
            <span className="deposit-balance__value">{balance.toLocaleString('ko-KR')} 토큰</span>
            <span className="deposit-balance__sub">≈ ₩{maxKRW.toLocaleString('ko-KR')}</span>
          </div>

          <div className="deposit-section">
            <label className="auth-label">출금 금액</label>
            <div className="deposit-amount-display">
              ₩{amount.toLocaleString('ko-KR')}
            </div>
            <div className="deposit-quick-btns">
              <button className="deposit-quick-btn" onClick={() => addAmount(50000)}>+5만</button>
              <button className="deposit-quick-btn" onClick={() => addAmount(100000)}>+10만</button>
              <button className="deposit-quick-btn" onClick={() => setAmount(maxKRW)}>전액</button>
              <button className="deposit-quick-btn" onClick={() => setAmount(0)}>초기화</button>
            </div>
          </div>

          <div className="deposit-account-card">
            <div className="deposit-account-card__header">출금 계좌</div>
            <div className="deposit-account-card__bank">하나은행</div>
            <div className="deposit-account-card__number">
              <span>987-654-321098</span>
            </div>
            <div className="deposit-account-card__info">
              <span>예금주</span><span>{user?.name}</span>
            </div>
          </div>

          <div className="deposit-notice">
            ⚠️ 출금은 본인 명의 등록 계좌로만 가능합니다. 출금 처리까지 영업일 기준 1~2일 소요됩니다.
          </div>

          <div className="subpage-footer">
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={amount < 10000}
              onClick={handleSubmit}
            >
              출금 신청하기
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
          <h2 className="deposit-done__title">출금 신청 완료!</h2>
          <p className="deposit-done__amount">₩{amount.toLocaleString('ko-KR')}</p>
          <p className="deposit-done__desc">영업일 기준 1~2일 내 입금됩니다.</p>
          <div className="deposit-done__actions">
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('/')}>
              홈으로
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
