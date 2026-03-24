import { useNavigate, useSearchParams } from 'react-router-dom';
import { MOCK_PORTFOLIO, INVEST_CARDS } from '../data';

function krw(n: number) { return n.toLocaleString('ko-KR'); }

export default function HoldingsListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'live';

  const title = status === 'delay' ? '연체 상품' : '투자중 상품';

  const holdings = MOCK_PORTFOLIO.holdings.filter(h => {
    const card = INVEST_CARDS.find(c => c.id === h.investCardId);
    return card && card.productStatus === status && h.phase === '투자중';
  });

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        <button className="subpage-topbar__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="subpage-topbar__title">{title}</span>
        <div style={{ width: 32 }} />
      </div>

      <div className="holdings-list-content">
        {holdings.length === 0 ? (
          <div className="invest-empty"><p className="invest-empty__text">해당 상품이 없습니다.</p></div>
        ) : (
          <div className="holdings-list">
            {holdings.map(h => {
              const card = INVEST_CARDS.find(c => c.id === h.investCardId);
              if (!card) return null;
              const profit = h.currentValue - h.purchasePrice;
              const rate = h.purchasePrice > 0 ? (profit / h.purchasePrice * 100).toFixed(1) : '0.0';
              const isUp = profit >= 0;
              let maturityLabel = '-';
              if (h.issuedDate && h.periodMonths) {
                const d = new Date(h.issuedDate);
                d.setMonth(d.getMonth() + h.periodMonths);
                maturityLabel = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
              }
              return (
                <div className="holdings-list__card" key={h.investCardId} onClick={() => navigate(`/invest/${card.id}`)}>
                  <div className="holdings-list__card-top">
                    <div className="holdings-list__card-name">{card.name}</div>
                    <span className={`holdings-list__card-badge ${status === 'delay' ? 'delay' : 'live'}`}>
                      {status === 'delay' ? '연체' : '투자중'}
                    </span>
                  </div>
                  <div className="holdings-list__card-stats">
                    <div className="holdings-list__card-stat">
                      <span className="holdings-list__card-stat-label">투자금</span>
                      <span className="holdings-list__card-stat-value">{krw(h.purchasePrice)}원</span>
                    </div>
                    <div className="holdings-list__card-stat">
                      <span className="holdings-list__card-stat-label">평가액</span>
                      <span className="holdings-list__card-stat-value">{krw(h.currentValue)}원</span>
                    </div>
                    <div className="holdings-list__card-stat">
                      <span className="holdings-list__card-stat-label">수익률</span>
                      <span className={`holdings-list__card-stat-value ${isUp ? 'up' : 'down'}`}>{isUp ? '+' : ''}{rate}%</span>
                    </div>
                  </div>
                  <div className="holdings-list__card-meta">
                    <span>{h.tokensOwned}토큰 · {h.elapsedMonths}/{h.periodMonths}개월</span>
                    <span>만기 {maturityLabel}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
