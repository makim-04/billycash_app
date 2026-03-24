import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import InvestCard from '../components/InvestCard';
import { INVEST_CARDS, MOCK_PORTFOLIO } from '../data';
import type { ProductStatus } from '../types/domain';

const STATUS_LABEL: Record<ProductStatus, string> = {
  pending: '모집중',
  ready: '모집완료',
  live: '투자중',
  expired: '만기 상환',
  done: '완제됨',
  delay: '연체',
};

const CATS = [
  { key: "all", label: "전체" },
  { key: "meal", label: "급식" },
  { key: "fnb", label: "F&B" },
  { key: "cafe", label: "카페" },
  { key: "stay", label: "스테이" },
  { key: "kitchen", label: "공유주방" },
];

const MY_STATUS_FILTERS: { key: ProductStatus | 'all'; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'pending', label: '모집중' },
  { key: 'live', label: '투자중' },
  { key: 'expired', label: '만기 상환' },
  { key: 'delay', label: '연체' },
];

// 사용자 보유 내역 (investCardId → holding)
const holdingMap = new Map(MOCK_PORTFOLIO.holdings.map(h => [h.investCardId, h]));
const myInvestedIds = new Set(holdingMap.keys());

export default function InvestPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'all' | 'my'>('all');
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<ProductStatus | 'all'>('all');

  const publicCards = INVEST_CARDS.filter(c => c.productStatus === 'pending' || c.productStatus === 'ready');
  const allFiltered = catFilter === "all"
    ? publicCards
    : publicCards.filter(c => c.cat === catFilter);

  const myCards = INVEST_CARDS.filter(c => myInvestedIds.has(c.id));
  const myCardsList = myCards.filter(c => c.productStatus !== 'done');
  const myDoneCards = myCards.filter(c => c.productStatus === 'done');
  const myFiltered = statusFilter === "all"
    ? myCardsList
    : myCards.filter(c => c.productStatus === statusFilter);

  const cards = tab === 'all' ? allFiltered : myFiltered;

  const p = MOCK_PORTFOLIO;
  // 투자중(live/delay) 상품의 토큰 평가액 합계
  const activeCards = new Set(INVEST_CARDS.filter(c => ['live', 'delay'].includes(c.productStatus)).map(c => c.id));
  const activeHoldings = p.holdings.filter(h => activeCards.has(h.investCardId));
  const tokenValue = activeHoldings.reduce((s, h) => s + h.currentValue, 0);
  const tokenCount = activeHoldings.reduce((s, h) => s + h.tokensOwned, 0);
  const cashAsset = p.cashBalance + tokenValue;

  return (
    <div>
      <PageHeader title="투자" />

      {/* 탭 스위처 */}
      <div className="invest-tab-bar">
        <button className={`invest-tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>
          전체 상품
        </button>
        <button className={`invest-tab ${tab === 'my' ? 'active' : ''}`} onClick={() => setTab('my')}>
          내 투자
          {myCards.length > 0 && <span className="invest-tab__count">{myCards.length}</span>}
        </button>
      </div>

      {/* 히어로: 탭에 따라 다르게 */}
      {tab === 'all' ? (
        <div className="page-hero-app" style={{ backgroundImage: 'url(/images/invest/hero-invest.webp)' }}>
          <div className="page-hero-app__label">INVESTMENT</div>
          <h1 className="page-hero-app__title">지금 신청할 수 있는<br />투자 상품들</h1>
          <p className="page-hero-app__desc">투명한 매출 데이터와 리워드 혜택까지.</p>
        </div>
      ) : (
        <div className="my-invest-hero">
          <div className="my-invest-hero__main">
            <div className="my-invest-hero__label">현금성 자산</div>
            <div className="my-invest-hero__amount">{cashAsset.toLocaleString('ko-KR')}원</div>
          </div>
          <div className="my-invest-hero__stats">
            <div className="my-invest-hero__stat">
              <span className="my-invest-hero__stat-label">출금 가능 현금</span>
              <span className="my-invest-hero__stat-value">{p.cashBalance.toLocaleString('ko-KR')}원</span>
            </div>
            <div className="my-invest-hero__divider" />
            <div className="my-invest-hero__stat">
              <span className="my-invest-hero__stat-label">보유 토큰</span>
              <span className="my-invest-hero__stat-value">{tokenCount}개</span>
            </div>
            <div className="my-invest-hero__divider" />
            <div className="my-invest-hero__stat">
              <span className="my-invest-hero__stat-label">토큰 환산액</span>
              <span className="my-invest-hero__stat-value">{tokenValue.toLocaleString('ko-KR')}원</span>
            </div>
          </div>
        </div>
      )}

      {/* 필터 */}
      <div className="invest-filter-bar">
        {tab === 'all'
          ? CATS.map(c => (
              <button key={c.key} className={`filter-pill ${catFilter === c.key ? 'active' : ''}`} onClick={() => setCatFilter(c.key)}>
                {c.label}
              </button>
            ))
          : MY_STATUS_FILTERS.map(f => (
              <button key={f.key} className={`filter-pill ${statusFilter === f.key ? 'active' : ''}`} onClick={() => setStatusFilter(f.key)}>
                {f.label}
                {f.key !== 'all' && (() => {
                  const count = myCards.filter(c => c.productStatus === f.key).length;
                  return count > 0 ? <span className="filter-pill__count">{count}</span> : null;
                })()}
              </button>
            ))
        }
      </div>

      {/* 상품 리스트 */}
      <div className="invest-list">
        {cards.length > 0
          ? cards.map(card => (
              <InvestCard key={card.id} card={card} holding={tab === 'my' ? holdingMap.get(card.id) : undefined} onClick={() => navigate(`/invest/${card.id}`)} />
            ))
          : (
            <div className="invest-empty">
              <p className="invest-empty__text">
                {tab === 'my' ? '해당 상태의 투자 상품이 없습니다.' : '해당 카테고리의 상품이 없습니다.'}
              </p>
            </div>
          )
        }

        {/* 완제됨 텍스트 리스트 (내 투자 전체 필터에서만) */}
        {tab === 'my' && statusFilter === 'all' && myDoneCards.length > 0 && (
          <div className="mypage-ended">
            <button className="mypage-ended__toggle" onClick={() => { /* toggle handled by state */ }}>
              <span>완제됨</span>
              <span className="mypage-ended__count">{myDoneCards.length}</span>
            </button>
            {myDoneCards.map(c => {
              const h = holdingMap.get(c.id);
              return (
                <div className="mypage-ended__item" key={c.id} onClick={() => navigate(`/invest/${c.id}`)}>
                  <div>
                    <div className="mypage-ended__name">{c.name}</div>
                    <div className="mypage-ended__meta">{h ? `${h.tokensOwned}개 · ${h.monthlyYield}` : c.sub}</div>
                  </div>
                  <span className="mypage-ended__badge">완제</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
