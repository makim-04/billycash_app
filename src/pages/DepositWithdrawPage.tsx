import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_PORTFOLIO } from '../data';

type Tab = 'deposit' | 'withdraw';

const bankName = '하나은행';
const accountNo = '110-490-123456';

export default function DepositWithdrawPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>('deposit');

  const txList = MOCK_PORTFOLIO.transactions
    .filter(t => t.type === '입금' || t.type === '출금')
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNo.replace(/-/g, ''));
  };

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        <button className="subpage-topbar__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="subpage-topbar__title">입출금</span>
        <span className="subpage-topbar__spacer" />
      </div>

      <div className="dw">
        {/* 탭 */}
        <div className="dw__tabs">
          <button className={`dw__tab ${tab === 'deposit' ? 'dw__tab--active' : ''}`} onClick={() => setTab('deposit')}>입금하기</button>
          <button className={`dw__tab ${tab === 'withdraw' ? 'dw__tab--active' : ''}`} onClick={() => setTab('withdraw')}>출금하기</button>
        </div>

        {/* 연결 계좌 */}
        <div className="dw__section">
          <p className="dw__section-label">연결 계좌</p>
          <div className="dw__account-card">
            <div className="dw__account-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="10" width="18" height="11" rx="2" />
                <path d="M12 3L2 10h20L12 3z" />
                <line x1="7" y1="14" x2="7" y2="17" />
                <line x1="12" y1="14" x2="12" y2="17" />
                <line x1="17" y1="14" x2="17" y2="17" />
              </svg>
            </div>
            <div className="dw__account-info">
              <span className="dw__account-bank">{bankName}</span>
              <span className="dw__account-num">{accountNo}</span>
            </div>
            <button className="dw__copy-btn" onClick={handleCopy}>복사</button>
          </div>
        </div>

        {/* 안내 */}
        <div className="dw__section">
          <p className="dw__section-label">{tab === 'deposit' ? '입금' : '출금'} 안내</p>
          <ul className="dw__notice-list">
            {tab === 'deposit' ? (
              <>
                <li>반드시 본인 명의 계좌에서 입금해주세요.</li>
                <li>입금 확인까지 최대 10분 소요됩니다.</li>
                <li>예금주: {user?.name}</li>
              </>
            ) : (
              <>
                <li>출금은 본인 명의 등록 계좌로만 가능합니다.</li>
                <li>출금 처리까지 영업일 기준 1~2일 소요됩니다.</li>
                <li>예금주: {user?.name}</li>
              </>
            )}
          </ul>
        </div>

        {/* 최근 내역 */}
        <div className="dw__section">
          <h3 className="dw__history-title">최근 내역</h3>
          <div className="dw__history-list">
            {txList.map(tx => (
              <div className="dw__history-item" key={tx.id}>
                <div className={`dw__history-icon ${tx.type === '출금' ? 'dw__history-icon--out' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {tx.type === '출금'
                      ? <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>
                      : <><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></>
                    }
                  </svg>
                </div>
                <div className="dw__history-content">
                  <span className="dw__history-type">계좌 {tx.type}</span>
                  <span className="dw__history-date">{tx.date.replace(/-/g, '.')}</span>
                </div>
                <div className="dw__history-right">
                  <span className={`dw__history-amount ${tx.type === '출금' ? 'dw__history-amount--out' : ''}`}>
                    {tx.type === '출금' ? '-' : '+'}{tx.amount.toLocaleString('ko-KR')}
                  </span>
                  <span className="dw__history-status">완료</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
