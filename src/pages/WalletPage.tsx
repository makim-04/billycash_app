import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_PORTFOLIO } from '../data';

type View = 'main' | 'withdraw-input' | 'withdraw-done';

export default function WalletPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [view, setView] = useState<View>('main');
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const balance = MOCK_PORTFOLIO.tokenBalance;
  const balanceKRW = balance * 1000;
  const accountNo = '123-456-789012';
  const bankName = '하나은행';

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNo.replace(/-/g, ''));
  };

  const addWithdraw = (v: number) => setWithdrawAmount(prev => Math.min(prev + v, balanceKRW));

  const handleWithdraw = () => {
    if (withdrawAmount < 10000) return;
    setView('withdraw-done');
  };

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        <button className="subpage-topbar__back" onClick={() => {
          if (view === 'main') navigate(-1);
          else { setView('main'); setWithdrawAmount(0); }
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="subpage-topbar__title">
          {view === 'main' ? '입출금' : view === 'withdraw-input' ? '출금' : ''}
        </span>
        <span className="subpage-topbar__spacer" />
      </div>

      {/* 메인: 잔액 + 입금 안내 + 출금 버튼 */}
      {view === 'main' && (
        <div className="deposit-content">
          <div className="deposit-balance">
            <span className="deposit-balance__label">내 토큰 잔액</span>
            <span className="deposit-balance__value">{balance.toLocaleString('ko-KR')} 토큰</span>
            <span className="deposit-balance__sub">≈ ₩{balanceKRW.toLocaleString('ko-KR')}</span>
          </div>

          {/* 입금 영역 */}
          <div className="wallet-section">
            <div className="wallet-section__header">
              <span className="wallet-section__title">입금</span>
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
          </div>

          {/* 출금 영역 */}
          <div className="wallet-section">
            <div className="wallet-section__header">
              <span className="wallet-section__title">출금</span>
            </div>
            <div className="wallet-withdraw-info">
              <div className="wallet-withdraw-info__row">
                <span>출금 가능 금액</span>
                <span>₩{balanceKRW.toLocaleString('ko-KR')}</span>
              </div>
              <div className="wallet-withdraw-info__row">
                <span>출금 계좌</span>
                <span>{bankName} 987-654-321098</span>
              </div>
            </div>
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setView('withdraw-input')}
            >
              출금하기
            </button>
          </div>
        </div>
      )}

      {/* 출금 금액 입력 */}
      {view === 'withdraw-input' && (
        <div className="deposit-content">
          <div className="deposit-section">
            <label className="auth-label">출금 금액</label>
            <div className="deposit-amount-display">
              ₩{withdrawAmount.toLocaleString('ko-KR')}
            </div>
            <div className="deposit-amount-min">출금 가능: ₩{balanceKRW.toLocaleString('ko-KR')}</div>
            <div className="deposit-quick-btns">
              <button className="deposit-quick-btn" onClick={() => addWithdraw(50000)}>+5만</button>
              <button className="deposit-quick-btn" onClick={() => addWithdraw(100000)}>+10만</button>
              <button className="deposit-quick-btn" onClick={() => setWithdrawAmount(balanceKRW)}>전액</button>
              <button className="deposit-quick-btn" onClick={() => setWithdrawAmount(0)}>초기화</button>
            </div>
          </div>

          <div className="wallet-withdraw-info">
            <div className="wallet-withdraw-info__row">
              <span>출금 계좌</span>
              <span>{bankName} 987-654-321098</span>
            </div>
            <div className="wallet-withdraw-info__row">
              <span>예금주</span>
              <span>{user?.name}</span>
            </div>
          </div>

          <div className="deposit-notice">
            ⚠️ 출금은 본인 명의 등록 계좌로만 가능합니다. 영업일 기준 1~2일 소요됩니다.
          </div>

          <div className="subpage-footer">
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={withdrawAmount < 10000}
              onClick={handleWithdraw}
            >
              출금 신청하기
            </button>
          </div>
        </div>
      )}

      {/* 출금 완료 */}
      {view === 'withdraw-done' && (
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
          <p className="deposit-done__amount">₩{withdrawAmount.toLocaleString('ko-KR')}</p>
          <p className="deposit-done__desc">영업일 기준 1~2일 내 입금됩니다.</p>
          <div className="deposit-done__balance">
            <span>출금 후 잔액</span>
            <span>{(balance - withdrawAmount / 1000).toLocaleString('ko-KR')} 토큰</span>
          </div>
          <div className="deposit-done__actions">
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setView('main'); setWithdrawAmount(0); }}>
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
