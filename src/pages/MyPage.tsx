import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { MOCK_PORTFOLIO, INVEST_CARDS } from '../data';
import InvestCard from '../components/InvestCard';

type SectionId = 'overview' | 'holdings' | 'token' | 'invest-tx' | 'account';

const TABS: { id: SectionId; label: string }[] = [
  { id: 'overview', label: '투자 요약' },
  { id: 'holdings', label: '내 투자 상품' },
  { id: 'token', label: '토큰 현황' },
  { id: 'invest-tx', label: '투자 내역' },
  { id: 'account', label: '계정 정보' },
];

const TX_FILTERS = ['전체', '투자', '매수', '만기'] as const;

function formatKRW(n: number) {
  return n.toLocaleString('ko-KR') + '원';
}

function formatDate(d: string) {
  return d.replace(/-/g, '.');
}

function statusTagClass(status: string) {
  switch (status) {
    case '발행': return 'tag-status-issued';
    case '모집중': return 'tag-status-recruiting';
    default: return 'tag-gray';
  }
}

export default function MyPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const [section, setSection] = useState<SectionId>('overview');
  const [holdingTab, setHoldingTab] = useState<'토큰 발행' | '모집중'>('토큰 발행');
  const [txFilter, setTxFilter] = useState<string>('전체');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { replace: true });
  }, [isLoggedIn, navigate]);

  if (!user) return null;

  const p = MOCK_PORTFOLIO;
  const activeHoldings = p.holdings.filter(h => h.status === '투자중');
  const totalTokens = activeHoldings.reduce((s, h) => s + h.tokensOwned, 0);
  const recruitingTokens = activeHoldings.filter(h => h.phase === '모집중').reduce((s, h) => s + h.tokensOwned, 0);
  const issuedTokens = activeHoldings.filter(h => h.phase === '토큰 발행').reduce((s, h) => s + h.tokensOwned, 0);
  const totalInvested = activeHoldings.reduce((s, h) => s + h.purchasePrice, 0);
  const totalCurrentValue = activeHoldings.reduce((s, h) => s + h.currentValue, 0);
  const changeRate = totalInvested > 0 ? ((totalCurrentValue - totalInvested) / totalInvested * 100).toFixed(1) : '0.0';
  const isUp = totalCurrentValue >= totalInvested;

  const filteredTx = txFilter === '전체' ? p.transactions : p.transactions.filter(t => t.type === txFilter);

  return (
    <div>
      <PageHeader title="MY" />
      {/* Header */}
      <div className="my-header">
        <div className="my-header__name">{user.name}님</div>
        <div className="my-header__email">{user.email}</div>
      </div>

      {/* Tabs */}
      <div className="my-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`my-tab ${section === tab.id ? 'active' : ''}`}
            onClick={() => setSection(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="my-section">

        {/* 투자 요약 */}
        {section === 'overview' && (
          <div>
            <h2 className="my-block-title">투자 요약</h2>
            <div className="overview-token-card">
              <div className="overview-token-card__label">보유 토큰</div>
              <div className="overview-token-card__value">{totalTokens.toLocaleString('ko-KR')} 토큰</div>
              <div className="overview-token-card__bar">
                <div className="token-viz__bar-fill--issued" style={{ width: `${totalTokens > 0 ? (issuedTokens / totalTokens * 100) : 0}%` }} />
                <div className="token-viz__bar-fill--recruit" style={{ width: `${totalTokens > 0 ? (recruitingTokens / totalTokens * 100) : 0}%` }} />
              </div>
              <div className="overview-token-card__legend">
                <span><span className="token-dot token-dot--issued" />발행 {issuedTokens}</span>
                <span><span className="token-dot token-dot--recruit" />모집중 {recruitingTokens}</span>
              </div>
            </div>
            <div className="overview-table">
              <div className="overview-table__row">
                <span className="overview-table__label">총 투자금액</span>
                <span className="overview-table__value">{formatKRW(totalInvested)}</span>
              </div>
              <div className="overview-table__row">
                <span className="overview-table__label">현재 평가금액</span>
                <span>
                  <span className="overview-table__value">{formatKRW(totalCurrentValue)}</span>
                  <span className={`overview-table__change ${isUp ? 'up' : 'down'}`}>
                    {isUp ? '▲' : '▼'} {formatKRW(Math.abs(totalCurrentValue - totalInvested))} ({isUp ? '+' : ''}{changeRate}%)
                  </span>
                </span>
              </div>
              <div className="overview-table__row">
                <span className="overview-table__label">누적 배당금</span>
                <span className="overview-table__value">{formatKRW(p.totalDividends)}</span>
              </div>
            </div>

            <h3 className="my-block-subtitle">보유 토큰 내역</h3>
            <div className="token-table">
              <div className="token-row header">
                <span>투자 상품</span>
                <span style={{ textAlign: 'center' }}>상태</span>
                <span style={{ textAlign: 'right' }}>토큰</span>
                <span style={{ textAlign: 'right' }}>매입가</span>
                <span style={{ textAlign: 'right' }}>현재가</span>
              </div>
              {activeHoldings.map(h => {
                const card = INVEST_CARDS.find(c => c.id === h.investCardId);
                if (!card) return null;
                const isIssued = h.phase === '토큰 발행';
                const tokenPrice = h.tokensOwned > 0 ? Math.round(h.purchasePrice / h.tokensOwned) : 0;
                const currentTokenPrice = isIssued && h.tokensOwned > 0 ? Math.round(h.currentValue / h.tokensOwned) : 0;
                return (
                  <div className="token-row" key={h.investCardId}>
                    <span style={{ fontWeight: 700, fontSize: 12 }}>{card.name}</span>
                    <span style={{ textAlign: 'center' }}>
                      <span className={`tag ${statusTagClass(isIssued ? '발행' : '모집중')}`} style={{ fontSize: 10 }}>
                        {isIssued ? '발행' : '모집중'}
                      </span>
                    </span>
                    <span style={{ textAlign: 'right', fontWeight: 700 }}>{h.tokensOwned}개</span>
                    <span style={{ textAlign: 'right', fontSize: 11, color: 'var(--mid)' }}>{formatKRW(tokenPrice)}</span>
                    <span style={{ textAlign: 'right', fontWeight: 700, color: isIssued ? 'var(--green)' : 'var(--light)', fontSize: 11 }}>
                      {isIssued ? formatKRW(currentTokenPrice) : '-'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 내 투자 상품 */}
        {section === 'holdings' && (() => {
          const allActive = p.holdings.filter(h => h.status === '투자중');
          const investingCards = allActive.filter(h => h.phase === holdingTab);
          const tabCounts = {
            '모집중': allActive.filter(h => h.phase === '모집중').length,
            '토큰 발행': allActive.filter(h => h.phase === '토큰 발행').length,
          };
          return (
            <div>
              <h2 className="my-block-title">내 투자 상품</h2>
              <div className="my-holding-tabs">
                {(['토큰 발행', '모집중'] as const).map(tab => (
                  <button key={tab} className={`filter-btn ${holdingTab === tab ? 'active' : ''}`} onClick={() => setHoldingTab(tab)}>
                    {tab}<span className="my-holding-tabs__count">{tabCounts[tab]}</span>
                  </button>
                ))}
              </div>
              <div className="my-card-grid">
                {investingCards.length === 0 && <div className="empty-state">해당 상품이 없습니다.</div>}
                {investingCards.map(h => {
                  const baseCard = INVEST_CARDS.find(c => c.id === h.investCardId);
                  if (!baseCard) return null;
                  const card = holdingTab === '토큰 발행' ? {
                    ...baseCard, pct: 100, progCls: 'prog-bar-black', pctLabel: '모집 완료', pctLabelCls: 'ps-closed',
                    status: '토큰 발행', statusCls: 'status-complete', investors: `${h.totalTokens}명 완료`,
                  } : baseCard;
                  const actualYield = h.purchasePrice > 0 ? ((h.currentValue - h.purchasePrice) / h.purchasePrice * 100).toFixed(1) : '0.0';
                  return (
                    <InvestCard
                      key={h.investCardId}
                      card={card}
                      onClick={() => navigate(`/invest/${h.investCardId}`)}
                      {...(holdingTab === '모집중' ? {
                        investorMeta: [
                          { label: '투자 신청 금액', value: formatKRW(h.purchasePrice) },
                          { label: '환산 토큰', value: `${h.tokensOwned}개` },
                        ],
                      } : {
                        extraMeta: [
                          { label: '투자 기간', value: `${h.elapsedMonths}/${h.periodMonths}개월` },
                          { label: '실제 수익률', value: `+${actualYield}%`, accent: true },
                        ],
                        investorMeta: [
                          { label: '보유 토큰', value: `${h.tokensOwned}개` },
                          { label: '투자 원금', value: formatKRW(h.purchasePrice) },
                          { label: '평가금액', value: formatKRW(h.currentValue) },
                          { label: '손익', value: `+${formatKRW(h.currentValue - h.purchasePrice)}`, accent: true },
                        ],
                      })}
                    />
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* 토큰 보유 현황 */}
        {section === 'token' && (
          <div>
            <h2 className="my-block-title">토큰 보유 현황</h2>
            <div className="token-viz">
              <div className="token-viz__header">
                <span className="token-viz__label">총 보유 토큰</span>
                <span className="token-viz__value">{totalTokens.toLocaleString('ko-KR')}개</span>
              </div>
              <div className="token-viz__bar">
                <div className="token-viz__bar-fill--issued" style={{ width: `${totalTokens > 0 ? (issuedTokens / totalTokens * 100) : 0}%` }} />
                <div className="token-viz__bar-fill--recruit" style={{ width: `${totalTokens > 0 ? (recruitingTokens / totalTokens * 100) : 0}%` }} />
              </div>
              <div className="token-viz__legend">
                <span className="token-viz__legend-item"><span className="token-dot token-dot--issued" />발행 {issuedTokens}개</span>
                <span className="token-viz__legend-item"><span className="token-dot token-dot--recruit" />모집중 {recruitingTokens}개</span>
              </div>
            </div>

            <h3 className="my-block-subtitle">보유 토큰 내역</h3>
            <div className="token-table">
              <div className="token-row header">
                <span>투자 상품</span>
                <span style={{ textAlign: 'center' }}>상태</span>
                <span style={{ textAlign: 'right' }}>토큰</span>
                <span style={{ textAlign: 'right' }}>매입가</span>
                <span style={{ textAlign: 'right' }}>현재가</span>
              </div>
              {activeHoldings.map(h => {
                const card = INVEST_CARDS.find(c => c.id === h.investCardId);
                if (!card) return null;
                const isIssued = h.phase === '토큰 발행';
                const tokenPrice = h.tokensOwned > 0 ? Math.round(h.purchasePrice / h.tokensOwned) : 0;
                const currentTokenPrice = isIssued && h.tokensOwned > 0 ? Math.round(h.currentValue / h.tokensOwned) : 0;
                return (
                  <div className="token-row" key={h.investCardId}>
                    <span style={{ fontWeight: 700, fontSize: 12 }}>{card.name}</span>
                    <span style={{ textAlign: 'center' }}>
                      <span className={`tag ${statusTagClass(isIssued ? '발행' : '모집중')}`} style={{ fontSize: 10 }}>
                        {isIssued ? '발행' : '모집중'}
                      </span>
                    </span>
                    <span style={{ textAlign: 'right', fontWeight: 700 }}>{h.tokensOwned}개</span>
                    <span style={{ textAlign: 'right', fontSize: 11, color: 'var(--mid)' }}>{formatKRW(tokenPrice)}</span>
                    <span style={{ textAlign: 'right', fontWeight: 700, color: isIssued ? 'var(--green)' : 'var(--light)', fontSize: 11 }}>
                      {isIssued ? formatKRW(currentTokenPrice) : '-'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 투자 내역 */}
        {section === 'invest-tx' && (
          <div>
            <h2 className="my-block-title">투자 내역</h2>
            <div className="tx-dash">
              <div className="tx-dash__item">
                <div className="tx-dash__label">투자</div>
                <div className="tx-dash__value">-{formatKRW(p.transactions.filter(t => t.type === '투자').reduce((s, t) => s + t.amount, 0))}</div>
              </div>
              <div className="tx-dash__item">
                <div className="tx-dash__label">매수</div>
                <div className="tx-dash__value">{formatKRW(p.transactions.filter(t => t.type === '매수').reduce((s, t) => s + t.amount, 0))}</div>
              </div>
              <div className="tx-dash__item">
                <div className="tx-dash__label">만기</div>
                <div className="tx-dash__value" style={{ color: '#16a34a' }}>+{formatKRW(p.transactions.filter(t => t.type === '만기').reduce((s, t) => s + t.amount, 0))}</div>
              </div>
            </div>
            <div className="tx-filters">
              {TX_FILTERS.map(f => (
                <button key={f} className={`filter-btn ${txFilter === f ? 'active' : ''} ${f !== '전체' ? 'filter-btn--billy' : ''}`} onClick={() => setTxFilter(f)}>
                  {f}
                </button>
              ))}
            </div>
            <div className="tx-table">
              {filteredTx.length === 0 && <div className="empty-state">해당 거래 내역이 없습니다.</div>}
              {filteredTx.map(tx => {
                const isPlus = tx.type === '만기' || tx.type === '매수';
                const typeClass = tx.type === '투자' ? 'tag-type-invest' : tx.type === '매수' ? 'tag-type-buy' : tx.type === '만기' ? 'tag-type-maturity' : 'tag-gray';
                return (
                  <div className="tx-row" key={tx.id}>
                    <div className="tx-row__left">
                      <div className="tx-row__date">
                        <span className={`tag ${typeClass} tx-row__tag`}>{tx.type}</span>
                        {formatDate(tx.date)}
                      </div>
                      <div className="tx-row__store">{tx.storeName}</div>
                    </div>
                    <div className="tx-row__right">
                      <div className={`tx-row__amount ${isPlus ? 'plus' : ''}`}>
                        {isPlus ? '+' : '-'}{formatKRW(tx.amount)}
                      </div>
                      {tx.tokenCount && <div className="tx-row__meta">{tx.tokenCount}개 토큰</div>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 만기 종료 상품 */}
            {(() => {
              const endedCards = p.holdings.filter(h => h.status === '투자 종료');
              return (
                <div className="my-history">
                  <button className="my-history__toggle" onClick={() => setShowHistory(prev => !prev)}>
                    <span>만기 종료 상품</span>
                    <span className="my-history__count">{endedCards.length}</span>
                    <span style={{ transform: showHistory ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', display: 'inline-block' }}>▾</span>
                  </button>
                  {showHistory && (
                    <div className="my-history__list">
                      {endedCards.length === 0 && <div className="empty-state">만기 종료된 상품이 없습니다.</div>}
                      {endedCards.map(h => {
                        const card = INVEST_CARDS.find(c => c.id === h.investCardId);
                        if (!card) return null;
                        return (
                          <div className="my-history__item" key={h.investCardId} onClick={() => navigate(`/invest/${h.investCardId}`)}>
                            <div className="my-history__name">
                              <span className="tag tag-gray">종료</span>
                              {card.name}
                            </div>
                            <div className="my-history__meta">
                              <span>{h.tokensOwned}개</span>
                              <span className="accent">{h.monthlyYield}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* 계정 정보 */}
        {section === 'account' && (
          <div>
            <h2 className="my-block-title">계정 정보</h2>
            <div className="my-account">
              <div className="my-account__row">
                <span className="my-account__label">이름</span>
                <span className="my-account__value">{user.name}</span>
              </div>
              <div className="my-account__row">
                <span className="my-account__label">이메일</span>
                <span className="my-account__value">{user.email}</span>
              </div>
              <div className="my-account__row">
                <span className="my-account__label">연락처</span>
                <span className="my-account__value">{user.phone}</span>
              </div>
              <div className="my-account__row">
                <span className="my-account__label">본인인증</span>
                <span className="my-account__value">
                  <span className={`tag ${user.kycLevel >= 2 ? 'tag-verified' : 'tag-gray'}`}>
                    {user.kycLevel >= 2 ? '인증 완료' : '기본 인증'}
                  </span>
                </span>
              </div>
            </div>
            <button
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
              onClick={() => { logout(); navigate('/login'); }}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
