import { useNavigate } from 'react-router-dom';
import { MOCK_PORTFOLIO } from '../data';

function krw(n: number) { return n.toLocaleString('ko-KR'); }

export default function AssetDetailPage() {
  const navigate = useNavigate();
  const p = MOCK_PORTFOLIO;

  const activeHoldings = p.holdings.filter(h => h.status === '투자중');
  const totalInvested = activeHoldings.reduce((s, h) => s + h.purchasePrice, 0);
  const totalCurrentValue = activeHoldings.reduce((s, h) => s + h.currentValue, 0);
  const totalAsset = totalCurrentValue + p.totalDividends + p.tokenBalance + p.cashBalance;
  const changeAmount = totalCurrentValue - totalInvested;
  const changeRate = totalInvested > 0 ? (changeAmount / totalInvested * 100).toFixed(1) : '0.0';
  const isUp = changeAmount >= 0;

  const allTx = [...p.transactions].sort((a, b) => b.date.localeCompare(a.date));
  const totalDeposit = allTx.filter(t => t.type === '입금').reduce((s, t) => s + t.amount, 0);
  const totalWithdraw = allTx.filter(t => t.type === '출금').reduce((s, t) => s + t.amount, 0);
  const totalInvestTx = allTx.filter(t => t.type === '투자').reduce((s, t) => s + t.amount, 0);
  const totalBuyTx = allTx.filter(t => t.type === '매수').reduce((s, t) => s + t.amount, 0);
  const totalDividends = p.holdings
    .filter(h => h.dividendHistory)
    .reduce((s, h) => s + h.dividendHistory!.reduce((ds, d) => ds + d.amount, 0), 0);

  return (
    <div className="subpage">
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

        {/* 입출금 내역 */}
        <div className="asset-detail__section">
          <h3 className="asset-detail__section-title">입출금 내역</h3>
          <div className="asset-detail__rows">
            <div className="asset-detail__row">
              <span className="asset-detail__row-label">총 입금</span>
              <span className="asset-detail__row-value">{krw(totalDeposit)}원</span>
            </div>
            <div className="asset-detail__row">
              <span className="asset-detail__row-label">총 출금</span>
              <span className="asset-detail__row-value">-{krw(totalWithdraw)}원</span>
            </div>
          </div>
        </div>

        {/* 투자 내역 */}
        <div className="asset-detail__section">
          <h3 className="asset-detail__section-title">투자 내역</h3>
          <div className="asset-detail__rows">
            <div className="asset-detail__row">
              <span className="asset-detail__row-label">총 투자</span>
              <span className="asset-detail__row-value">-{krw(totalInvestTx)}원</span>
            </div>
            <div className="asset-detail__row">
              <span className="asset-detail__row-label">추가 매수</span>
              <span className="asset-detail__row-value">-{krw(totalBuyTx)}원</span>
            </div>
            <div className="asset-detail__row">
              <span className="asset-detail__row-label">누적 배당</span>
              <span className="asset-detail__row-value up">+{krw(totalDividends)}원</span>
            </div>
          </div>
        </div>

        {/* 자산 현황 */}
        <div className="asset-detail__section">
          <h3 className="asset-detail__section-title">자산 현황</h3>
          <div className="asset-detail__rows">
            <div className="asset-detail__row">
              <span className="asset-detail__row-label">평가 금액</span>
              <span className="asset-detail__row-value">{krw(totalCurrentValue)}원</span>
            </div>
            <div className="asset-detail__row">
              <span className="asset-detail__row-label">토큰 잔액</span>
              <span className="asset-detail__row-value">{krw(p.tokenBalance)}원</span>
            </div>
            <div className="asset-detail__row">
              <span className="asset-detail__row-label">출금 가능 현금</span>
              <span className="asset-detail__row-value">{krw(p.cashBalance)}원</span>
            </div>
            <div className="asset-detail__divider" />
            <div className="asset-detail__row">
              <span className="asset-detail__row-label" style={{ fontWeight: 500 }}>누적 수익률</span>
              <span className={`asset-detail__row-value ${isUp ? 'up' : 'down'}`} style={{ fontWeight: 600 }}>{isUp ? '+' : ''}{changeRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
