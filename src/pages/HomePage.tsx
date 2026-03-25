import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INVEST_CARDS, MOCK_PORTFOLIO } from '../data';
import InvestCard from '../components/InvestCard';
import type { ProductStatus } from '../types/domain';

const STATUS_LABEL: Record<ProductStatus, string> = {
  pending: '모집중',
  ready: '모집완료',
  live: '투자중',
  expired: '만기 상환',
  done: '완제됨',
  delay: '연체',
};

const FEATURED_CARD = INVEST_CARDS.find(c => c.id === 7)!;
const SECONDARY_1 = INVEST_CARDS.find(c => c.id === 2)!;  // 연남동 뮤트커피
const SECONDARY_2 = INVEST_CARDS.find(c => c.id === 4)!;  // 망원동 키친베이스

const totalAsset = MOCK_PORTFOLIO.currentValue + MOCK_PORTFOLIO.cashBalance;
const growthRate = ((MOCK_PORTFOLIO.currentValue - MOCK_PORTFOLIO.totalInvested) / MOCK_PORTFOLIO.totalInvested * 100).toFixed(1);

export default function HomePage() {
  const navigate = useNavigate();
  const [showAssetTooltip, setShowAssetTooltip] = useState(false);

  return (
    <div className="home-v2">
      {/* Hero Portfolio Section */}
      <section className="home-portfolio">
        <div className="home-portfolio__top">
          <div className="home-portfolio__label">
            총 투자 자산
            <span className="home-portfolio__tooltip-wrap">
              <button className="home-portfolio__tooltip-trigger" onClick={() => setShowAssetTooltip(v => !v)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </button>
              {showAssetTooltip && (
                <div className="home-portfolio__tooltip" onClick={() => setShowAssetTooltip(false)}>
                  전체 자산 = 투자 평가액 + 모집중 + 만기 상환 + 현금
                </div>
              )}
            </span>
          </div>
          <div className="home-portfolio__actions">
            <button className="home-portfolio__icon" onClick={() => navigate('/search')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="10.5" cy="10.5" r="7" />
                <line x1="21" y1="21" x2="15.8" y2="15.8" />
              </svg>
            </button>
            <button className="home-portfolio__icon" onClick={() => navigate('/menu')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="home-portfolio__amount">
          <span className="home-portfolio__num">{totalAsset.toLocaleString()}</span>
          <span className="home-portfolio__unit">원</span>
        </div>
        <div className="home-portfolio__growth">
          <span className="home-portfolio__badge">+{growthRate}%</span>
          <span className="home-portfolio__growth-label">투자 대비 성장</span>
        </div>
      </section>

      {/* Quick Actions Bento */}
      <section className="home-bento">
        <button className="home-bento__card home-bento__card--charge" onClick={() => navigate('/wallet')}>
          <svg className="home-bento__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BED475" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="3" x2="7" y2="21" />
            <polyline points="3 7 7 3 11 7" />
            <line x1="17" y1="21" x2="17" y2="3" />
            <polyline points="13 17 17 21 21 17" />
          </svg>
          <span className="home-bento__label">입출금</span>
        </button>
        <button className="home-bento__card home-bento__card--dashboard" onClick={() => navigate('/my')}>
          <svg className="home-bento__icon" width="22" height="22" viewBox="0 0 17 17" fill="none">
            <path d="M3.96312 13.2812H5.02562V6.90625H3.96312V13.2812ZM7.96875 13.2812H9.03125V3.71875H7.96875V13.2812ZM11.9744 13.2812H13.0369V10.0937H11.9744V13.2812ZM1.71594 17C1.22648 17 0.818125 16.8364 0.490875 16.5091C0.163625 16.1819 0 15.7732 0 15.283V1.717C0 1.22754 0.163979 0.819187 0.491937 0.491937C0.819896 0.164687 1.22825 0.000708333 1.717 0H15.2841C15.7728 0 16.1812 0.163979 16.5091 0.491937C16.8371 0.819896 17.0007 1.22825 17 1.717V15.2841C17 15.7728 16.8364 16.1812 16.5091 16.5091C16.1819 16.8371 15.7732 17.0007 15.283 17H1.71594ZM1.71594 15.9375H15.283C15.4459 15.9375 15.5957 15.8695 15.7324 15.7335C15.8691 15.5975 15.9371 15.4473 15.9364 15.283V1.717C15.9364 1.55338 15.8684 1.40321 15.7324 1.2665C15.5964 1.12979 15.4466 1.06179 15.283 1.0625H1.717C1.55338 1.0625 1.40321 1.1305 1.2665 1.2665C1.12979 1.4025 1.06179 1.55267 1.0625 1.717V15.2841C1.0625 15.447 1.1305 15.5968 1.2665 15.7335C1.4025 15.8702 1.55231 15.9382 1.71594 15.9375Z" fill="#494949"/>
          </svg>
          <span className="home-bento__label">MY 대시보드</span>
        </button>
      </section>

      {/* Featured STO Section */}
      <section className="home-featured">
        <div className="home-featured__header">
          <h2 className="home-featured__title">주목할 만한<br/>조각투자 상품</h2>
          <button className="home-featured__more" onClick={() => navigate('/invest')}>모두 보기</button>
        </div>

        <InvestCard card={FEATURED_CARD} onClick={() => navigate(`/invest/${FEATURED_CARD.id}`)} />

        {/* Small Secondary Cards */}
        <div className="home-secondary">
          <div className="home-secondary__card" onClick={() => navigate(`/invest/${SECONDARY_1.id}`)}>
            <div className="home-secondary__icon-wrap">
              <span style={{ fontSize: 20 }}>{SECONDARY_1.emoji}</span>
            </div>
            <div className="home-secondary__text">
              <p className="home-secondary__name">{SECONDARY_1.name}</p>
              <p className="home-secondary__info">{STATUS_LABEL[SECONDARY_1.productStatus]} • {SECONDARY_1.rate}</p>
            </div>
          </div>
          <div className="home-secondary__card" onClick={() => navigate(`/invest/${SECONDARY_2.id}`)}>
            <div className="home-secondary__icon-wrap">
              <span style={{ fontSize: 20 }}>{SECONDARY_2.emoji}</span>
            </div>
            <div className="home-secondary__text">
              <p className="home-secondary__name">{SECONDARY_2.name}</p>
              <p className="home-secondary__info">{STATUS_LABEL[SECONDARY_2.productStatus]} • {SECONDARY_2.rate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 투자중 상품 대시보드 */}
      {(() => {
        const p = MOCK_PORTFOLIO;
        const liveCards = INVEST_CARDS.filter(c => c.productStatus === 'live');
        const liveHoldings = liveCards.map(c => ({
          card: c,
          holding: p.holdings.find(h => h.investCardId === c.id),
        })).filter(x => x.holding);
        if (liveHoldings.length === 0) return null;
        return (
          <section className="home-live">
            <div className="home-live__header">
              <h2 className="home-live__title">내 보유 토큰</h2>
            </div>
            <div className="home-live__list">
              {liveHoldings.map(({ card, holding }) => {
                const h = holding!;
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
                  <div className="home-live__row" key={card.id} onClick={() => navigate(`/invest/${card.id}`)}>
                    <div className="home-live__row-left">
                      <div className="home-live__row-name">{card.name}</div>
                      <div className="home-live__row-meta">
                        {h.tokensOwned}토큰 · 만기 {maturityLabel}
                      </div>
                    </div>
                    <div className="home-live__row-right">
                      <div className={`home-live__row-rate ${isUp ? 'up' : 'down'}`}>{isUp ? '+' : ''}{rate}%</div>
                      <div className="home-live__row-amount">{h.currentValue.toLocaleString('ko-KR')}원</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })()}

      {/* 빠른 설정 */}
      <section className="home-quick">
        <button className="home-quick__item" onClick={() => navigate('/account')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>계정 관리</span>
        </button>
        <button className="home-quick__item" onClick={() => {}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>약관 관리</span>
        </button>
        <button className="home-quick__item" onClick={() => navigate('/faq')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span>고객센터</span>
        </button>
      </section>
    </div>
  );
}
