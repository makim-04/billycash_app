import { useNavigate } from 'react-router-dom';
import { MOCK_PORTFOLIO } from '../data';

function krw(n: number) { return n.toLocaleString('ko-KR'); }

export default function AssetDetailPage() {
  const navigate = useNavigate();
  const p = MOCK_PORTFOLIO;

  const activeHoldings = p.holdings.filter(h => h.status === '투자중');
  const totalInvested = activeHoldings.reduce((s, h) => s + h.purchasePrice, 0);
  const totalCurrentValue = activeHoldings.reduce((s, h) => s + h.currentValue, 0);
  const totalDividends = p.totalDividends;
  const totalAsset = totalCurrentValue + p.cashBalance;
  const changeAmount = totalCurrentValue - totalInvested;
  const changeRate = totalInvested > 0 ? (changeAmount / totalInvested * 100).toFixed(1) : '0.0';
  const isUp = changeAmount >= 0;


  return (
    <div className="subpage" style={{ background: '#F9F9FE' }}>
      <div className="subpage-topbar">
        <button className="subpage-topbar__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="subpage-topbar__title">자산 상세</span>
        <div style={{ width: 32 }} />
      </div>

      <div className="asset-detail">
        {/* 총 자산 */}
        <div className="asset-detail__hero">
          <div className="asset-detail__hero-label">총 자산</div>
          <div className="asset-detail__hero-value">{krw(totalAsset)}원</div>
          <div className="asset-detail__hero-change">
            <span className={isUp ? 'up' : 'down'}>{isUp ? '+' : ''}{krw(changeAmount)}원 ({isUp ? '+' : ''}{changeRate}%)</span>
            <span className="asset-detail__hero-vs">전월 대비</span>
          </div>
        </div>

        {/* 자산 현황 */}
        <div className="asset-detail__section">
          <h3 className="asset-detail__section-title">자산 현황</h3>
          <div className="asset-detail__rows">
            <div className="asset-detail__divider" />
            <div className="asset-detail__row">
              <span className="asset-detail__row-label" style={{ fontWeight: 500 }}>보유 토큰 원금</span>
              <span className="asset-detail__row-value">{krw(totalInvested)}원</span>
            </div>
            <div className="asset-detail__row">
              <span className="asset-detail__row-label" style={{ fontWeight: 500 }}>현금</span>
              <span className="asset-detail__row-value">{krw(totalDividends + p.cashBalance)}원</span>
            </div>
            <div className="asset-detail__row asset-detail__row--sub">
              <span className="asset-detail__row-label">예수금</span>
              <span className="asset-detail__row-value">{krw(p.cashBalance)}원</span>
            </div>
            <div className="asset-detail__row asset-detail__row--sub">
              <span className="asset-detail__row-label">배당금</span>
              <span className="asset-detail__row-value up">+{krw(totalDividends)}원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
