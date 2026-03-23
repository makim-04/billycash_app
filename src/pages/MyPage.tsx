import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { MOCK_PORTFOLIO, INVEST_CARDS } from '../data';

const TX_FILTERS = ['전체', '투자', '매수', '만기', '입금', '출금'] as const;

function formatKRW(n: number) {
  return n.toLocaleString('ko-KR') + '원';
}

function formatDate(d: string) {
  return d.replace(/-/g, '.');
}

export default function MyPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isLoggedIn, logout } = useAuth();
  const [txFilter, setTxFilter] = useState<string>('전체');
  const [showHistory, setShowHistory] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showHoldings, setShowHoldings] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { replace: true });
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (searchParams.get('sheet') === 'holdings') {
      setShowHoldings(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (!user) return null;

  const p = MOCK_PORTFOLIO;
  const activeHoldings = p.holdings.filter(h => h.status === '투자중');
  const totalTokens = activeHoldings.reduce((s, h) => s + h.tokensOwned, 0);
  const totalInvested = activeHoldings.reduce((s, h) => s + h.purchasePrice, 0);
  const totalCurrentValue = activeHoldings.reduce((s, h) => s + h.currentValue, 0);
  const totalAsset = totalCurrentValue + p.totalDividends + p.tokenBalance;
  const changeAmount = totalCurrentValue - totalInvested;
  const changeRate = totalInvested > 0 ? (changeAmount / totalInvested * 100).toFixed(1) : '0.0';
  const isUp = changeAmount >= 0;

  // 대표 보유 상품 (토큰 발행된 상품 우선)
  const issuedHoldings = activeHoldings.filter(h => h.phase === '토큰 발행');
  const topHolding = issuedHoldings.length > 0
    ? issuedHoldings.sort((a, b) => b.currentValue - a.currentValue)[0]
    : activeHoldings.sort((a, b) => b.currentValue - a.currentValue)[0];
  const topCard = topHolding ? INVEST_CARDS.find(c => c.id === topHolding.investCardId) : null;
  const topProfit = topHolding ? topHolding.currentValue - topHolding.purchasePrice : 0;
  const topProfitRate = topHolding && topHolding.purchasePrice > 0 ? (topProfit / topHolding.purchasePrice * 100).toFixed(1) : '0.0';

  // 누적 수익률
  const cumulativeROI = totalInvested > 0 ? ((totalCurrentValue + p.totalDividends - totalInvested) / totalInvested * 100).toFixed(1) : '0.0';

  // 거래 내역 (날짜순 정렬)
  const allTx = [...p.transactions].sort((a, b) => b.date.localeCompare(a.date));
  const filteredTx = txFilter === '전체' ? allTx : allTx.filter(t => t.type === txFilter);

  return (
    <div className="mypage-v2">
      <PageHeader title="MY" />

      {/* Profile & Asset Hero */}
      <section className="mypage-hero">
        <div className="mypage-hero__profile">
          <div className="mypage-hero__greeting">
            <span className="mypage-hero__label">반가워요,</span>
            <span className="mypage-hero__name">{user.name}님</span>
          </div>
          <span className="mypage-hero__badge">VIP 등급</span>
        </div>

        <div className="mypage-asset-card">
          <div className="mypage-asset-card__glow" />
          <div className="mypage-asset-card__label">
            총 자산
            <span className="mypage-tooltip-wrap">
              <button className="mypage-tooltip__trigger" onClick={() => setShowTooltip(v => !v)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </button>
              {showTooltip && (
                <div className="mypage-tooltip" onClick={() => setShowTooltip(false)}>
                  총 자산 = 평가 금액 + 누적 배당 + 예수금 잔액
                </div>
              )}
            </span>
          </div>
          <div className="mypage-asset-card__value">{totalAsset.toLocaleString('ko-KR')}원</div>
          <div className="mypage-asset-card__change">
            <span>{isUp ? '+' : ''}{changeAmount.toLocaleString('ko-KR')}원</span>
            <span className={isUp ? 'up' : 'down'}>({isUp ? '+' : ''}{changeRate}%)</span>
            <span className="mypage-asset-card__vs">전월 대비</span>
          </div>
          <div className="mypage-asset-card__summary">
            <div className="mypage-asset-card__summary-row">
              <span className="mypage-asset-card__summary-label">총 입금</span>
              <span className="mypage-asset-card__summary-value">{allTx.filter(t => t.type === '입금').reduce((s, t) => s + t.amount, 0).toLocaleString('ko-KR')}원</span>
            </div>
            <div className="mypage-asset-card__summary-row">
              <span className="mypage-asset-card__summary-label">총 출금</span>
              <span className="mypage-asset-card__summary-value">-{allTx.filter(t => t.type === '출금').reduce((s, t) => s + t.amount, 0).toLocaleString('ko-KR')}원</span>
            </div>
            <div className="mypage-asset-card__summary-row">
              <span className="mypage-asset-card__summary-label">총 투자</span>
              <span className="mypage-asset-card__summary-value">-{allTx.filter(t => t.type === '투자').reduce((s, t) => s + t.amount, 0).toLocaleString('ko-KR')}원</span>
            </div>
            <div className="mypage-asset-card__summary-row">
              <span className="mypage-asset-card__summary-label">추가 매수</span>
              <span className="mypage-asset-card__summary-value">-{allTx.filter(t => t.type === '매수').reduce((s, t) => s + t.amount, 0).toLocaleString('ko-KR')}원</span>
            </div>
            <div className="mypage-asset-card__summary-row">
              <span className="mypage-asset-card__summary-label">누적 배당</span>
              <span className="mypage-asset-card__summary-value up">+{p.totalDividends.toLocaleString('ko-KR')}원</span>
            </div>
            <div className="mypage-asset-card__summary-divider" />
            <div className="mypage-asset-card__summary-row">
              <span className="mypage-asset-card__summary-label">평가 금액</span>
              <span className="mypage-asset-card__summary-value">{totalCurrentValue.toLocaleString('ko-KR')}원</span>
            </div>
            <div className="mypage-asset-card__summary-row">
              <span className="mypage-asset-card__summary-label">예수금 잔액</span>
              <span className="mypage-asset-card__summary-value">{p.tokenBalance.toLocaleString('ko-KR')}원</span>
            </div>
          </div>
          <div className="mypage-asset-card__actions">
            <button className="mypage-asset-card__btn mypage-asset-card__btn--invest" onClick={() => navigate('/invest')}>
              투자하기
            </button>
            <button className="mypage-asset-card__btn mypage-asset-card__btn--withdraw" onClick={() => navigate('/wallet')}>
              입출금
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Bento */}
      <section className="mypage-portfolio">
        <div className="mypage-portfolio__header">
          <h3 className="mypage-portfolio__title">포트폴리오</h3>
        </div>

        {/* Issued Holdings Cards */}
        {issuedHoldings.map(h => {
          const card = INVEST_CARDS.find(c => c.id === h.investCardId);
          if (!card) return null;
          const profit = h.currentValue - h.purchasePrice;
          const rate = h.purchasePrice > 0 ? (profit / h.purchasePrice * 100).toFixed(1) : '0.0';
          return (
            <div className="mypage-bento__large" key={h.investCardId} onClick={() => navigate(`/invest/${card.id}`)}>
              <div className="mypage-bento__large-top">
                <div className="mypage-bento__icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
                  </svg>
                </div>
                <span className="mypage-bento__phase-tag">토큰 발행</span>
              </div>
              <div className="mypage-bento__large-bottom">
                <div className="mypage-bento__large-label">{card.name}</div>
                <div className="mypage-bento__large-stats">
                  <div className="mypage-bento__large-stat">
                    <span className="mypage-bento__large-stat-label">투자 원금</span>
                    <span className="mypage-bento__large-stat-value">{h.purchasePrice.toLocaleString('ko-KR')}원</span>
                  </div>
                  <div className="mypage-bento__large-stat">
                    <span className="mypage-bento__large-stat-label">평가 금액</span>
                    <span className="mypage-bento__large-stat-value">{h.currentValue.toLocaleString('ko-KR')}원</span>
                  </div>
                  <div className="mypage-bento__large-stat">
                    <span className="mypage-bento__large-stat-label">수익률</span>
                    <span className={`mypage-bento__large-stat-value ${profit >= 0 ? 'up' : 'down'}`}>{profit >= 0 ? '+' : ''}{rate}%</span>
                  </div>
                </div>
                <div className="mypage-bento__large-period">
                  <span>투자 기간 {h.elapsedMonths}/{h.periodMonths}개월</span>
                  <span>월 배당 {h.monthlyYield}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Small Cards */}
        <div className="mypage-bento__row">
          <div className="mypage-bento__small" style={{ cursor: 'pointer' }} onClick={() => setShowHoldings(true)}>
            <div className="mypage-bento__icon-wrap">
              <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
            </div>
            <div className="mypage-bento__small-label">투자 상품 (보유 토큰)</div>
            <div className="mypage-bento__small-value">{activeHoldings.length}</div>
          </div>
          <div className="mypage-bento__small">
            <div className="mypage-bento__icon-wrap">
              <svg width="16" height="21" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div className="mypage-bento__small-label">누적 수익률</div>
            <div className="mypage-bento__small-value">{cumulativeROI}%</div>
          </div>
        </div>
      </section>

      {/* 투자 내역 */}
      <section className="mypage-tx">
        <h3 className="mypage-section-title">투자 내역</h3>
        <div className="mypage-tx__filters">
          {TX_FILTERS.map(f => (
            <button key={f} className={`notice-filter__btn ${txFilter === f ? 'notice-filter__btn--active' : ''}`} onClick={() => setTxFilter(f)}>
              {f}
            </button>
          ))}
        </div>
        <div className="mypage-tx__list">
          {filteredTx.length === 0 && <div className="mypage-empty">해당 거래 내역이 없습니다.</div>}
          {filteredTx.map(tx => {
            const isPlus = tx.type === '만기' || tx.type === '입금';
            const isMinus = tx.type === '투자' || tx.type === '출금';
            return (
              <div className="mypage-tx__item" key={tx.id}>
                <div className="mypage-tx__item-left">
                  <span className="mypage-tx__item-tag">{tx.type}</span>
                  <div>
                    <div className="mypage-tx__item-store">{tx.storeName}</div>
                    <div className="mypage-tx__item-date">{formatDate(tx.date)}</div>
                  </div>
                </div>
                <div className={`mypage-tx__item-amount ${isPlus ? 'plus' : ''} ${isMinus ? 'minus' : ''}`}>
                  {isPlus ? '+' : isMinus ? '-' : ''}{formatKRW(tx.amount)}
                </div>
              </div>
            );
          })}
        </div>

        {/* 만기 종료 상품 */}
        {(() => {
          const endedCards = p.holdings.filter(h => h.status === '투자 종료');
          if (endedCards.length === 0) return null;
          return (
            <div className="mypage-ended">
              <button className="mypage-ended__toggle" onClick={() => setShowHistory(prev => !prev)}>
                <span>만기 종료 상품</span>
                <span className="mypage-ended__count">{endedCards.length}</span>
                <svg className={`mypage-ended__arrow ${showHistory ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {showHistory && endedCards.map(h => {
                const card = INVEST_CARDS.find(c => c.id === h.investCardId);
                if (!card) return null;
                return (
                  <div className="mypage-ended__item" key={h.investCardId} onClick={() => navigate(`/invest/${h.investCardId}`)}>
                    <div>
                      <div className="mypage-ended__name">{card.name}</div>
                      <div className="mypage-ended__meta">{h.tokensOwned}개 · {h.monthlyYield}</div>
                    </div>
                    <span className="mypage-ended__badge">종료</span>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </section>

      {/* Preferences */}
      <section className="mypage-prefs">
        <h3 className="mypage-section-title">설정</h3>
        <div className="mypage-prefs__card">
          <button className="mypage-prefs__item" onClick={() => navigate('/account')}>
            <div className="mypage-prefs__item-left">
              <div className="mypage-bento__icon-wrap">
                <svg width="14" height="17" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <span>계정 관리</span>
            </div>
            <svg width="7" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
          <div className="mypage-prefs__divider" />
          <button className="mypage-prefs__item" onClick={() => navigate('/wallet')}>
            <div className="mypage-prefs__item-left">
              <div className="mypage-bento__icon-wrap">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><path d="M1 10h22"/>
                </svg>
              </div>
              <span>입출금 관리</span>
            </div>
            <svg width="7" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
          <div className="mypage-prefs__divider" />
          <button className="mypage-prefs__item" onClick={() => navigate('/faq')}>
            <div className="mypage-prefs__item-left">
              <div className="mypage-bento__icon-wrap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <span>고객센터 · FAQ</span>
            </div>
            <svg width="7" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
        </div>
      </section>

      {/* Sign Out */}
      <div className="mypage-signout">
        <button className="mypage-signout__btn" onClick={() => setShowLogout(true)}>로그아웃</button>
      </div>

      {/* 로그아웃 확인 */}
      {showLogout && (
        <div className="confirm-overlay" onClick={() => setShowLogout(false)}>
          <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
            <h3 className="confirm-dialog__title">로그아웃</h3>
            <p className="confirm-dialog__desc">정말 로그아웃 하시겠습니까?</p>
            <div className="confirm-dialog__actions">
              <button className="confirm-dialog__btn confirm-dialog__btn--cancel" onClick={() => setShowLogout(false)}>취소</button>
              <button className="confirm-dialog__btn confirm-dialog__btn--confirm" onClick={() => { logout(); navigate('/login'); }}>확인</button>
            </div>
          </div>
        </div>
      )}

      {/* 투자 상품 내역 */}
      {showHoldings && (
        <div className="holdings-overlay" onClick={() => setShowHoldings(false)}>
          <div className="holdings-sheet" onClick={e => e.stopPropagation()}>
            <div className="holdings-sheet__handle" />
            <h3 className="holdings-sheet__title">내 투자 상품</h3>
            <div className="holdings-sheet__list">
              {[...activeHoldings].sort((a, b) => (b.phase === '토큰 발행' ? 1 : 0) - (a.phase === '토큰 발행' ? 1 : 0)).map(h => {
                const card = INVEST_CARDS.find(c => c.id === h.investCardId);
                if (!card) return null;
                const isIssued = h.phase === '토큰 발행';
                const profit = isIssued ? h.currentValue - h.purchasePrice : 0;
                const profitRate = isIssued && h.purchasePrice > 0 ? (profit / h.purchasePrice * 100).toFixed(1) : '0.0';
                return (
                  <div className="holdings-sheet__item" key={h.investCardId}>
                    <div className="holdings-sheet__item-top">
                      <span className="holdings-sheet__item-name">{card.name}</span>
                      <span className={`holdings-sheet__item-phase ${isIssued ? 'issued' : ''}`}>
                        {h.phase}
                      </span>
                    </div>
                    <div className="holdings-sheet__item-row">
                      <div className="holdings-sheet__item-col">
                        <span className="holdings-sheet__item-label">{isIssued ? '투자 원금' : '신청 금액'}</span>
                        <span className="holdings-sheet__item-value">{formatKRW(h.purchasePrice)}</span>
                      </div>
                      <div className={`holdings-sheet__item-col ${!isIssued ? 'disabled' : ''}`}>
                        <span className="holdings-sheet__item-label">평가 금액</span>
                        <span className="holdings-sheet__item-value">{isIssued ? formatKRW(h.currentValue) : '-'}</span>
                      </div>
                      <div className="holdings-sheet__item-col">
                        <span className="holdings-sheet__item-label">투자 기간</span>
                        <span className="holdings-sheet__item-value">
                          {h.periodMonths ? (isIssued ? `${h.elapsedMonths}/${h.periodMonths}개월` : `${h.periodMonths}개월`) : '-'}
                        </span>
                      </div>
                    </div>
                    <div className="holdings-sheet__item-footer">
                      <div className="holdings-sheet__item-sub">
                        <span>{h.tokensOwned}개 {isIssued ? '보유' : '신청'}</span>
                        <span>·</span>
                        <span className={isIssued ? 'holdings-sheet__profit' : ''}>{isIssued ? `+${profitRate}%` : `예상 ${h.monthlyYield}`}</span>
                      </div>
                      <button className="holdings-sheet__item-link" onClick={() => { setShowHoldings(false); navigate('/my?sheet=holdings', { replace: true }); setTimeout(() => navigate(`/invest/${h.investCardId}`), 0); }}>
                        상세보기
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 6 15 12 9 18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
