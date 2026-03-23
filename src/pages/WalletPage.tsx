import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_PORTFOLIO } from '../data';

type Tab = 'deposit' | 'withdraw';
type View = 'main' | 'pin' | 'withdraw-done';

const BANKS = ['하나은행', '신한은행', '국민은행', '우리은행', '카카오뱅크', '토스뱅크', '기업은행', '농협은행'];

export default function WalletPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('deposit');
  const [view, setView] = useState<View>('main');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [wdBank, setWdBank] = useState('');
  const [wdAccount, setWdAccount] = useState('');
  const [showBankSelect, setShowBankSelect] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  const balance = MOCK_PORTFOLIO.tokenBalance;
  const accountNo = '110-490-123456';
  const bankName = '하나은행';

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNo.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const withdrawNum = parseInt(withdrawAmount.replace(/,/g, '')) || 0;

  const handleWithdrawInput = (val: string) => {
    const num = val.replace(/[^\d]/g, '');
    setWithdrawAmount(num ? parseInt(num).toLocaleString('ko-KR') : '');
  };

  const addWithdraw = (v: number) => {
    const current = withdrawNum;
    const next = Math.min(current + v, balance);
    setWithdrawAmount(next.toLocaleString('ko-KR'));
  };

  const handleWithdraw = () => {
    if (withdrawNum < 10000 || !wdBank || !wdAccount) return;
    setView('pin');
    setPin('');
    setPinError('');
  };

  const handlePinKey = (num: string) => {
    if (pin.length >= 6) return;
    const next = pin + num;
    setPin(next);
    setPinError('');
    if (next.length === 6) {
      setTimeout(() => {
        if (next === '123456') {
          setView('withdraw-done');
          setPin('');
        } else {
          setPinError('비밀번호가 일치하지 않습니다');
          setTimeout(() => { setPin(''); setPinError(''); }, 800);
        }
      }, 200);
    }
  };

  const handlePinDelete = () => {
    setPinError('');
    setPin(pin.slice(0, -1));
  };

  // 최근 입출금 내역
  const recentTx = MOCK_PORTFOLIO.transactions
    .filter(t => t.type === '입금' || t.type === '출금')
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  if (view === 'withdraw-done') {
    return (
      <div className="subpage">
        <div className="subpage-topbar">
          <button className="subpage-topbar__back" onClick={() => { setView('main'); setWithdrawAmount(''); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="subpage-topbar__title" />
          <span className="subpage-topbar__spacer" />
        </div>
        <div className="deposit-done">
          <div className="verify-done" style={{ width: 52, height: 52, margin: '0 auto 16px' }}>
            <svg className="verify-done__circle" viewBox="0 0 36 36" style={{ width: 52, height: 52 }}>
              <circle cx="18" cy="18" r="16" />
            </svg>
            <svg className="verify-done__check" viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
              <polyline points="6 12 10 16 18 8" />
            </svg>
          </div>
          <h2 className="deposit-done__title">출금 완료</h2>
          <p className="deposit-done__amount">{withdrawNum.toLocaleString('ko-KR')}원</p>
          <p className="deposit-done__desc">{wdBank} {wdAccount}로 출금되었습니다.</p>
          <div className="deposit-done__balance">
            <span>출금 후 예수금 잔액</span>
            <span>{(balance - withdrawNum).toLocaleString('ko-KR')}원</span>
          </div>
          <div className="deposit-done__actions">
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { setView('main'); setWithdrawAmount(''); setWdBank(''); setWdAccount(''); }}>
              돌아가기
            </button>
            <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => navigate('/')}>
              홈으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        <button className="subpage-topbar__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="subpage-topbar__title">입출금</span>
        <span className="subpage-topbar__spacer" />
      </div>

      <div className="wallet-v2">
        {/* Tab Switcher */}
        <div className="wallet-switcher">
          <button className={`wallet-switcher__btn ${tab === 'deposit' ? 'active' : ''}`} onClick={() => setTab('deposit')}>
            입금하기
          </button>
          <button className={`wallet-switcher__btn ${tab === 'withdraw' ? 'active' : ''}`} onClick={() => setTab('withdraw')}>
            출금하기
          </button>
        </div>

        {/* 입금 탭 */}
        {tab === 'deposit' && (
          <>
            {/* 계좌 정보 */}
            <section className="wallet-section-v2">
              <div className="wallet-section-v2__label">연결 계좌</div>
              <div className="wallet-bank-card">
                <div className="wallet-bank-card__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18"/><path d="M3 10h18"/><path d="M12 3l9 7H3l9-7z"/>
                    <path d="M5 10v11"/><path d="M19 10v11"/><path d="M9 10v11"/><path d="M15 10v11" />
                  </svg>
                </div>
                <div className="wallet-bank-card__info">
                  <div className="wallet-bank-card__name">{bankName}</div>
                  <div className="wallet-bank-card__num">{accountNo}</div>
                </div>
                <button className="wallet-bank-card__copy" onClick={handleCopy}>
                  {copied ? '복사됨' : '복사'}
                </button>
              </div>
            </section>

            {/* 입금 안내 */}
            <section className="wallet-section-v2">
              <div className="wallet-section-v2__label">입금 안내</div>
              <div className="wallet-notice">
                <div className="wallet-notice__row">
                  <span className="wallet-notice__dot" />
                  반드시 본인 명의 계좌에서 입금해주세요.
                </div>
                <div className="wallet-notice__row">
                  <span className="wallet-notice__dot" />
                  입금 확인까지 최대 10분 소요됩니다.
                </div>
                <div className="wallet-notice__row">
                  <span className="wallet-notice__dot" />
                  예금주: {user?.name}
                </div>
              </div>
            </section>
          </>
        )}

        {/* 출금 탭 */}
        {tab === 'withdraw' && view === 'main' && (
          <>
            {/* 은행 선택 */}
            <section className="wallet-section-v2">
              <div className="wallet-section-v2__label">출금 계좌</div>
              <button className="wallet-select" onClick={() => setShowBankSelect(true)}>
                <span className={wdBank ? '' : 'wallet-select__placeholder'}>{wdBank || '은행 선택'}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <input
                className="wallet-input"
                type="text"
                inputMode="numeric"
                placeholder="계좌번호 입력"
                value={wdAccount}
                onChange={e => setWdAccount(e.target.value.replace(/[^\d-]/g, ''))}
              />
            </section>

            {/* 금액 입력 */}
            <section className="wallet-section-v2">
              <div className="wallet-section-v2__label">출금 금액</div>
              <div className="wallet-amount">
                <input
                  className="wallet-amount__input"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={withdrawAmount}
                  onChange={e => handleWithdrawInput(e.target.value)}
                />
                <span className="wallet-amount__unit">원</span>
              </div>
              <div className="wallet-amount__bottom">
                <span className="wallet-amount__balance">잔액: {balance.toLocaleString('ko-KR')}원</span>
                <div className="wallet-amount__quick">
                  <button className="wallet-amount__quick-btn" onClick={() => addWithdraw(100000)}>+10만</button>
                  <button className="wallet-amount__quick-btn" onClick={() => addWithdraw(1000000)}>+100만</button>
                  <button className="wallet-amount__quick-btn wallet-amount__quick-btn--max" onClick={() => setWithdrawAmount(balance.toLocaleString('ko-KR'))}>최대</button>
                </div>
              </div>
            </section>

            {/* 출금 버튼 */}
            <button
              className="btn-primary wallet-submit"
              disabled={withdrawNum < 10000 || !wdBank || !wdAccount}
              onClick={handleWithdraw}
            >
              출금하기
            </button>

            <div className="wallet-notice" style={{ marginTop: 16 }}>
              <div className="wallet-notice__row">
                <span className="wallet-notice__dot" />
                출금은 본인 명의 계좌로만 가능합니다.
              </div>
            </div>

            {/* 은행 선택 바텀시트 */}
            {showBankSelect && (
              <div className="confirm-overlay" onClick={() => setShowBankSelect(false)}>
                <div className="wallet-bank-sheet" onClick={e => e.stopPropagation()}>
                  <div className="holdings-sheet__handle" />
                  <h3 className="holdings-sheet__title">은행 선택</h3>
                  <div className="wallet-bank-sheet__list">
                    {BANKS.map(bank => (
                      <button
                        key={bank}
                        className={`wallet-bank-sheet__item ${wdBank === bank ? 'active' : ''}`}
                        onClick={() => { setWdBank(bank); setShowBankSelect(false); }}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* PIN 입력 - 별도 보안 화면 */}
        {view === 'pin' && (
          <div className="wallet-pin">
            <div className="subpage-topbar">
              <button className="subpage-topbar__back" onClick={() => { setView('main'); setPin(''); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <span className="subpage-topbar__title">비밀번호 확인</span>
              <span className="subpage-topbar__spacer" />
            </div>
            <div className="pin-content">
              <div className="pin-header">
                <h2 className="pin-header__title">비밀번호 입력</h2>
                <p className="pin-header__sub">{withdrawNum.toLocaleString('ko-KR')}원을 {wdBank}으로 출금합니다</p>
              </div>
              <div className="pin-dots">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`pin-dot ${pinError ? 'pin-dot--error' : i < pin.length ? 'pin-dot--filled' : ''}`} />
                ))}
              </div>
              {pinError && <p className="pin-error">{pinError}</p>}
              <div className="pin-keypad">
                {['1','2','3','4','5','6','7','8','9','','0','del'].map(key => (
                  <button
                    key={key}
                    className={`pin-key ${key === '' ? 'pin-key--empty' : ''} ${key === 'del' ? 'pin-key--del' : ''}`}
                    onClick={() => {
                      if (key === 'del') handlePinDelete();
                      else if (key !== '') handlePinKey(key);
                    }}
                    disabled={key === ''}
                  >
                    {key === 'del' ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                        <line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
                      </svg>
                    ) : key}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 최근 내역 */}
        <section className="wallet-history">
          <div className="wallet-history__header">
            <h3 className="wallet-history__title">최근 내역</h3>
          </div>
          <div className="wallet-history__list">
            {recentTx.length === 0 && <div className="mypage-empty">내역이 없습니다.</div>}
            {recentTx.map(tx => {
              const isDeposit = tx.type === '입금';
              return (
                <div className="wallet-history__item" key={tx.id}>
                  <div className="wallet-history__item-left">
                    <div className={`wallet-history__item-icon ${isDeposit ? 'deposit' : 'withdraw'}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {isDeposit
                          ? <><path d="M12 19V5"/><polyline points="5 12 12 19 19 12"/></>
                          : <><path d="M12 5v14"/><polyline points="19 12 12 5 5 12"/></>
                        }
                      </svg>
                    </div>
                    <div>
                      <div className="wallet-history__item-title">{isDeposit ? '계좌 입금' : '계좌 출금'}</div>
                      <div className="wallet-history__item-date">{tx.date.replace(/-/g, '.')}</div>
                    </div>
                  </div>
                  <div className="wallet-history__item-right">
                    <div className="wallet-history__item-amount">{isDeposit ? '+' : '-'}{tx.amount.toLocaleString('ko-KR')}</div>
                    <div className="wallet-history__item-status">완료</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
