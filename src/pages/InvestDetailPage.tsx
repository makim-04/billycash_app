import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { INVEST_CARDS, MOCK_PORTFOLIO } from '../data';
import type { ProductStatus, TokenHolding, MonthlyRecord } from '../types/domain';

const STATUS_LABEL: Record<ProductStatus, string> = {
  pending: '모집중', ready: '모집완료', live: '투자중',
  expired: '만기 상환', done: '완제됨', delay: '연체',
};
const STATUS_CLS: Record<ProductStatus, string> = {
  pending: 'status-pending', ready: 'status-ready', live: 'status-live',
  expired: 'status-expired', done: 'status-done', delay: 'status-delay',
};
const PROG_CLS: Record<ProductStatus, string> = {
  pending: 'prog-bar-green', ready: 'prog-bar-gray', live: 'prog-bar-green',
  expired: 'prog-bar-black', done: 'prog-bar-gray', delay: 'prog-bar-red',
};

function krw(n: number) { return n.toLocaleString('ko-KR'); }
function monthLabel(m: string) { return m.split('-')[1] + '월'; }

function conicGradient(pct: number, color: string) {
  const clamped = Math.max(0, Math.min(100, pct));
  return { background: `conic-gradient(${color} 0% ${clamped}%, #F3F4F6 ${clamped}% 100%)` };
}

// --- Live Detail Sections ---

function YieldHero({ holding }: { holding: TokenHolding }) {
  const profit = holding.currentValue - holding.purchasePrice;
  const rate = holding.purchasePrice > 0 ? (profit / holding.purchasePrice * 100) : 0;
  const isUp = rate >= 0;
  const color = isUp ? '#3ABF47' : '#EB5757';

  return (
    <div className="live-yield">
      <div className="yield-donut" style={conicGradient(Math.abs(rate) * 5, color)}>
        <div className="yield-donut__text">
          <span className="yield-donut__pct" style={{ color }}>{isUp ? '+' : ''}{rate.toFixed(1)}%</span>
          <span className="yield-donut__label">수익률</span>
        </div>
      </div>
      <div className="yield-info">
        <div className="yield-info__row">
          <span className="yield-info__label">투자금</span>
          <span className="yield-info__value">{krw(holding.purchasePrice)}원</span>
        </div>
        <div className="yield-info__row">
          <span className="yield-info__label">평가액</span>
          <span className="yield-info__value">{krw(holding.currentValue)}원</span>
        </div>
        <div className="yield-info__row">
          <span className="yield-info__label">수익금</span>
          <span className={`yield-info__value ${isUp ? 'yield-info__value--up' : 'yield-info__value--down'}`}>
            {isUp ? '+' : ''}{krw(profit)}원
          </span>
        </div>
        <div className="yield-info__row">
          <span className="yield-info__label">보유 토큰</span>
          <span className="yield-info__value">{holding.tokensOwned}개</span>
        </div>
      </div>
    </div>
  );
}

function DividendChart({ holding }: { holding: TokenHolding }) {
  const history = holding.dividendHistory || [];
  const max = Math.max(...history.map(d => d.amount), 1);

  return (
    <div className="live-dividend">
      <div className="live-dividend__header">
        <span className="live-dividend__title">배당 내역</span>
        <span className="live-dividend__highlight">최근 {krw(holding.lastDividend)}원</span>
      </div>
      <div className="dividend-bars">
        {history.map((d, i) => (
          <div className="dividend-bar" key={i}>
            <div className="dividend-bar__fill-wrap">
              <div className="dividend-bar__fill" style={{ height: `${(d.amount / max) * 100}%` }} />
            </div>
            <span className="dividend-bar__amount">{d.amount >= 10000 ? `${(d.amount / 10000).toFixed(1)}만` : krw(d.amount)}</span>
            <span className="dividend-bar__month">{monthLabel(d.month)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeriodProgress({ holding }: { holding: TokenHolding }) {
  const elapsed = holding.elapsedMonths || 0;
  const total = holding.periodMonths || 1;
  const pct = (elapsed / total) * 100;
  const remaining = total - elapsed;
  const issued = holding.issuedDate?.replace(/-/g, '.') || '';

  return (
    <div className="live-period">
      <div className="period-ring" style={conicGradient(pct, '#3ABF47')}>
        <div className="period-ring__text">
          <span className="period-ring__num">{elapsed}/{total}</span>
          <span className="period-ring__label">개월</span>
        </div>
      </div>
      <div className="period-detail">
        <div className="period-detail__header">
          <span className="period-detail__title">투자 기간</span>
          {issued && <span className="period-detail__issued">토큰 발행 {issued}</span>}
        </div>
        <div className="period-timeline">
          <div className="period-timeline__fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="period-timeline__labels">
          <span className="period-timeline__label">시작</span>
          <span className="period-timeline__label">만기</span>
        </div>
        <div className="period-timeline__remaining">만기까지 {remaining}개월 남음</div>
      </div>
    </div>
  );
}

function StoreStatus({ holding, isDelay }: { holding: TokenHolding; isDelay: boolean }) {
  const revenue = holding.storeRevenue || [];
  const max = Math.max(...revenue.map(r => r.amount), 1);

  return (
    <div className="live-store">
      <div className="live-store__header">
        <span className="live-store__title">매장 운영 현황</span>
        <span className={`store-badge ${isDelay ? 'store-badge--warn' : 'store-badge--ok'}`}>
          <span className="store-badge__dot" />
          {isDelay ? '주의' : '정상 운영'}
        </span>
      </div>
      <div className="store-bars">
        {revenue.map((r, i) => (
          <div className="store-bar-row" key={i}>
            <span className="store-bar-row__label">{monthLabel(r.month)}</span>
            <div className="store-bar-row__track">
              <div className="store-bar-row__fill" style={{ width: `${(r.amount / max) * 100}%` }} />
            </div>
            <span className="store-bar-row__value">{(r.amount / 10000).toFixed(0)}만</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokenTransactions({ storeName }: { storeName: string }) {
  const txns = MOCK_PORTFOLIO.transactions
    .filter(t => t.storeName === storeName)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  if (txns.length === 0) return null;

  const dotCls = (type: string) => {
    if (type === '만기') return 'txn-row__dot--dividend';
    if (type === '투자') return 'txn-row__dot--invest';
    return 'txn-row__dot--buy';
  };

  return (
    <div className="live-txn">
      <div className="live-txn__title">거래 내역</div>
      <div className="txn-list">
        {txns.map(t => (
          <div className="txn-row" key={t.id}>
            <span className={`txn-row__dot ${dotCls(t.type)}`} />
            <div className="txn-row__body">
              <div className="txn-row__desc">{t.type} · {t.tokenCount}토큰</div>
              <div className="txn-row__date">{t.date.replace(/-/g, '.')}</div>
            </div>
            <span className={`txn-row__amount ${t.type === '만기' ? 'txn-row__amount--plus' : 'txn-row__amount--minus'}`}>
              {t.type === '만기' ? '+' : '-'}{krw(t.amount)}원
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaturityEstimate({ holding }: { holding: TokenHolding }) {
  const elapsed = holding.elapsedMonths || 0;
  const total = holding.periodMonths || 1;
  const remaining = total - elapsed;
  const avgDividend = holding.dividendHistory && holding.dividendHistory.length > 0
    ? holding.dividendHistory.reduce((s, d) => s + d.amount, 0) / holding.dividendHistory.length
    : holding.lastDividend;
  const estimatedDividends = Math.round(avgDividend * remaining);
  const estimatedTotal = holding.purchasePrice + estimatedDividends;

  return (
    <div className="live-maturity">
      <div className="live-maturity__title">예상 만기 상환액</div>
      <div className="maturity-breakdown">
        <div className="maturity-row">
          <span className="maturity-row__label">투자 원금</span>
          <span className="maturity-row__value">{krw(holding.purchasePrice)}원</span>
        </div>
        <div className="maturity-row">
          <span className="maturity-row__label">누적 배당 (예상)</span>
          <span className="maturity-row__value">+{krw(estimatedDividends)}원</span>
        </div>
        <div className="maturity-divider" />
        <div className="maturity-row">
          <span className="maturity-row__label">예상 합계</span>
          <span className="maturity-row__value" style={{ fontWeight: 600 }}>{krw(estimatedTotal)}원</span>
        </div>
      </div>
    </div>
  );
}

function RiskAlert({ isDelay }: { isDelay: boolean }) {
  return (
    <div className={`live-risk ${isDelay ? 'live-risk--alert' : 'live-risk--ok'}`}>
      <svg className="live-risk__icon" viewBox="0 0 20 20" fill="none">
        {isDelay ? (
          <path d="M10 2L1 18h18L10 2zm0 12a1 1 0 110 2 1 1 0 010-2zm-1-6h2v5H9V8z" fill="#DC2626"/>
        ) : (
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.5-4.5l-3-3 1.06-1.06L8.5 11.38l4.94-4.94L14.5 7.5l-6 6z" fill="#16A34A"/>
        )}
      </svg>
      <div className="live-risk__text">
        <div className="live-risk__title">{isDelay ? '연체 발생' : '정상 — 연체 없음'}</div>
        <div className="live-risk__desc">
          {isDelay
            ? '상환이 지연되고 있습니다. 운영사에 확인 중입니다.'
            : '현재까지 정상적으로 배당이 이루어지고 있습니다.'}
        </div>
      </div>
    </div>
  );
}

// --- Expired Detail Sections ---

function ExpiredSummary({ holding }: { holding: TokenHolding }) {
  const totalDividends = holding.dividendHistory
    ? holding.dividendHistory.reduce((s, d) => s + d.amount, 0)
    : 0;
  const totalReturn = holding.purchasePrice + totalDividends;
  const profitRate = holding.purchasePrice > 0
    ? (totalDividends / holding.purchasePrice * 100).toFixed(1)
    : '0.0';

  return (
    <div className="expired-summary">
      <div className="expired-summary__header">
        <span className="expired-summary__title">상환 정산 내역</span>
        <span className="expired-summary__badge">상환 완료</span>
      </div>
      <div className="expired-summary__total">
        <span className="expired-summary__total-label">최종 정산액</span>
        <span className="expired-summary__total-value">{krw(totalReturn)}원</span>
      </div>
      <div className="expired-summary__grid">
        <div className="expired-summary__item">
          <span className="expired-summary__item-label">투자 원금</span>
          <span className="expired-summary__item-value">{krw(holding.purchasePrice)}원</span>
        </div>
        <div className="expired-summary__item">
          <span className="expired-summary__item-label">누적 배당</span>
          <span className="expired-summary__item-value expired-summary__item-value--up">+{krw(totalDividends)}원</span>
        </div>
        <div className="expired-summary__item">
          <span className="expired-summary__item-label">총 수익률</span>
          <span className="expired-summary__item-value expired-summary__item-value--up">+{profitRate}%</span>
        </div>
        <div className="expired-summary__item">
          <span className="expired-summary__item-label">투자 기간</span>
          <span className="expired-summary__item-value">{holding.periodMonths}개월</span>
        </div>
      </div>
    </div>
  );
}

function ExpiredTimeline({ holding }: { holding: TokenHolding }) {
  const issued = holding.issuedDate?.replace(/-/g, '.') || '-';
  const total = holding.periodMonths || 12;
  // 만기일 계산 (issuedDate + periodMonths)
  let maturityLabel = '-';
  if (holding.issuedDate && holding.periodMonths) {
    const d = new Date(holding.issuedDate);
    d.setMonth(d.getMonth() + holding.periodMonths);
    maturityLabel = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  }

  return (
    <div className="expired-timeline">
      <div className="expired-timeline__title">투자 타임라인</div>
      <div className="expired-timeline__bar">
        <div className="expired-timeline__fill" style={{ width: '100%' }} />
      </div>
      <div className="expired-timeline__labels">
        <div className="expired-timeline__point">
          <span className="expired-timeline__dot expired-timeline__dot--start" />
          <span className="expired-timeline__date">{holding.appliedDate?.replace(/-/g, '.') || '-'}</span>
          <span className="expired-timeline__desc">신청</span>
        </div>
        <div className="expired-timeline__point">
          <span className="expired-timeline__dot expired-timeline__dot--mid" />
          <span className="expired-timeline__date">{issued}</span>
          <span className="expired-timeline__desc">토큰 발행</span>
        </div>
        <div className="expired-timeline__point">
          <span className="expired-timeline__dot expired-timeline__dot--end" />
          <span className="expired-timeline__date">{maturityLabel}</span>
          <span className="expired-timeline__desc">만기 상환</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---

export default function InvestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = INVEST_CARDS.find(c => c.id === Number(id));
  const holding = MOCK_PORTFOLIO.holdings.find(h => h.investCardId === Number(id));
  const isClosed = card ? ['ready', 'done'].includes(card.productStatus) : false;
  const isLive = card ? card.productStatus === 'live' : false;
  const isDelay = card ? card.productStatus === 'delay' : false;
  const isPending = card ? card.productStatus === 'pending' : false;
  const isExpired = card ? card.productStatus === 'expired' : false;

  const [editMode, setEditMode] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<string | null>(null);
  const [cancelledIds, setCancelledIds] = useState<Set<string>>(new Set());

  if (!card) {
    return (
      <div className="section-pad" style={{ textAlign: 'center', paddingTop: 60 }}>
        <h2 style={{ fontSize: 16, marginBottom: 12 }}>상품을 찾을 수 없습니다</h2>
        <button className="btn-primary" onClick={() => navigate("/invest")}>목록으로</button>
      </div>
    );
  }

  const statusLabel = STATUS_LABEL[card.productStatus];
  const statusCls = STATUS_CLS[card.productStatus];
  const progCls = PROG_CLS[card.productStatus];

  return (
    <div>
      {/* Hero */}
      <div
        className={`detail-hero ${card.thumbCls}`}
        style={card.img ? { backgroundImage: `url(${card.img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <div className="detail-hero__overlay" />
        <button className="detail-hero__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="detail-hero__content">
          <div className="detail-hero__tags">
            <div className="detail-hero__cat">{card.catLabel}</div>
            <div className={`thumb-status ${statusCls}`}>{statusLabel}</div>
          </div>
          <h1 className="detail-hero__title">{card.name}</h1>
          <p className="detail-hero__sub">{card.sub}</p>
          {isClosed && <div className="detail-closed-badge">{statusLabel} 상품입니다</div>}
        </div>
      </div>

      <div className="detail-body">
        {/* 플로팅 스탯 카드 */}
        {!(isLive || isDelay || isExpired) && (
          <div className="detail-stats-float">
            <div className="detail-stat-card">
              <div className="detail-stat-card__value detail-stat-card__value--accent">{card.rate}</div>
              <div className="detail-stat-card__label">예상 수익률</div>
            </div>
            <div className="detail-stat-card">
              <div className="detail-stat-card__value">{card.minInvest?.replace('₩', '') || '50,000'}원</div>
              <div className="detail-stat-card__label">토큰 단가</div>
            </div>
            <div className="detail-stat-card">
              <div className="detail-stat-card__value">{card.investors || '완료'}</div>
              <div className="detail-stat-card__label">현재 투자자</div>
            </div>
          </div>
        )}

        {/* Live / Delay — 인포그래픽 레이아웃 */}
        {(isLive || isDelay) && holding ? (
          <div className="live-sections">
            <YieldHero holding={holding} />
            <DividendChart holding={holding} />
            <PeriodProgress holding={holding} />
            <StoreStatus holding={holding} isDelay={isDelay} />
            <TokenTransactions storeName={holding.storeName} />
            <MaturityEstimate holding={holding} />
            <RiskAlert isDelay={isDelay} />
          </div>
        ) : isExpired && holding ? (
          <div className="live-sections">
            <ExpiredSummary holding={holding} />
            <DividendChart holding={holding} />
            <ExpiredTimeline holding={holding} />
            <StoreStatus holding={holding} isDelay={false} />
            <TokenTransactions storeName={holding.storeName} />
          </div>
        ) : (
          <>
            {/* 모집 현황 */}
            <div className="detail-card">
              <h3 className="detail-section-title">모집 현황</h3>
              <div className="detail-prog-inline">
                <span className="detail-prog-inline__pct">{card.pct}</span>
                <span className="detail-prog-inline__label">% 모집 완료</span>
              </div>
              <div className="prog-bg"><div className={`prog-bar ${progCls}`} style={{ width: `${card.pct}%` }} /></div>
            </div>

            {/* 내 신청 정보 (pending + holding 있을 때) */}
            {card.productStatus === 'pending' && holding && (
              <div className="pending-my">
                <div className="pending-my__header">
                  <span className="pending-my__title">내 신청 현황</span>
                  <span className="pending-my__badge">신청 완료</span>
                </div>
                <div className="pending-my__grid">
                  <div className="pending-my__item">
                    <span className="pending-my__label">신청 금액</span>
                    <span className="pending-my__value">{krw(holding.purchasePrice)}원</span>
                  </div>
                  <div className="pending-my__item">
                    <span className="pending-my__label">신청 토큰</span>
                    <span className="pending-my__value">{holding.tokensOwned}개</span>
                  </div>
                  <div className="pending-my__item">
                    <span className="pending-my__label">신청일</span>
                    <span className="pending-my__value">{holding.appliedDate?.replace(/-/g, '.') || '-'}</span>
                  </div>
                  <div className="pending-my__item">
                    <span className="pending-my__label">발행 예정일</span>
                    <span className="pending-my__value pending-my__value--accent">{holding.expectedIssueDate?.replace(/-/g, '.') || '-'}</span>
                  </div>
                </div>
                {/* 신청 관련 거래 내역 */}
                {(() => {
                  const txns = MOCK_PORTFOLIO.transactions
                    .filter(t => t.storeName === holding.storeName && t.type === '투자')
                    .sort((a, b) => b.date.localeCompare(a.date));
                  if (txns.length === 0) return null;
                  const activeTxns = txns.filter(t => !cancelledIds.has(t.id));
                  if (activeTxns.length === 0) return (
                    <div className="pending-my__txns">
                      <div className="pending-my__txns-title">신청 내역</div>
                      <div className="pending-my__txn-empty">모든 신청이 취소되었습니다.</div>
                    </div>
                  );
                  return (
                    <div className="pending-my__txns">
                      <div className="pending-my__txns-title">신청 내역</div>
                      {activeTxns.map(t => (
                        <div className="pending-my__txn-row" key={t.id}>
                          <div className="pending-my__txn-info">
                            <span className="pending-my__txn-date">{t.date.replace(/-/g, '.')}</span>
                            <span className="pending-my__txn-detail">{t.tokenCount}토큰 · {krw(t.amount)}원</span>
                          </div>
                          {editMode && <button className="pending-my__txn-cancel" onClick={() => setCancelTarget(t.id)}>신청 취소</button>}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* CTA */}
            {isClosed ? (
              <div className="detail-card">
                <div className="detail-closed-cta">
                  <div className="detail-closed-cta__text">{statusLabel}</div>
                  <div className="detail-closed-cta__sub">이 상품은 {statusLabel} 상태입니다.</div>
                </div>
              </div>
            ) : (
              <div className="detail-cta-section">
                {isPending && holding ? (
                  <div className="detail-cta-row">
                    <button className="btn-outline detail-cta-btn" onClick={() => setEditMode(!editMode)}>
                      {editMode ? '취소' : '수정'}
                    </button>
                    <button className="btn-primary detail-cta-btn" onClick={() => navigate(`/invest/${card.id}/apply`)}>
                      추가 신청
                    </button>
                  </div>
                ) : (
                  <button className="btn-primary detail-cta-btn" onClick={() => navigate(`/invest/${card.id}/apply`)}>
                    투자하기
                  </button>
                )}
                <div className="detail-cta-risk">
                  <span className="detail-cta-risk__dot" />
                  투자에는 원금 손실 위험이 있습니다.
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 신청 취소 확인 다이얼로그 */}
      {cancelTarget && (() => {
        const tx = MOCK_PORTFOLIO.transactions.find(t => t.id === cancelTarget);
        if (!tx) return null;
        return (
          <div className="cancel-overlay" onClick={() => setCancelTarget(null)}>
            <div className="cancel-dialog" onClick={e => e.stopPropagation()}>
              <h3 className="cancel-dialog__title">신청 취소</h3>
              <p className="cancel-dialog__desc">
                {tx.date.replace(/-/g, '.')} 신청한 {tx.tokenCount}토큰 ({krw(tx.amount)}원)을 취소하시겠습니까?
              </p>
              <p className="cancel-dialog__notice">취소된 금액은 토큰 잔액으로 환불됩니다.</p>
              <div className="cancel-dialog__actions">
                <button className="cancel-dialog__btn cancel-dialog__btn--no" onClick={() => { setCancelTarget(null); setEditMode(false); }}>아니오</button>
                <button className="cancel-dialog__btn cancel-dialog__btn--yes" onClick={() => {
                  setCancelledIds(prev => new Set(prev).add(cancelTarget));
                  setCancelTarget(null);
                  setEditMode(false);
                }}>취소하기</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
