import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PORTFOLIO, INVEST_CARDS } from '../data';

const TX_FILTERS = ['전체', '투자', '매수', '만기', '입금', '출금'] as const;

function krw(n: number) { return n.toLocaleString('ko-KR'); }
function fmtDate(d: string) { return d.replace(/-/g, '.'); }

const DATE_FILTERS = ['전체', '1개월', '3개월', '6개월', '1년'] as const;

function getDateThreshold(filter: string): string | null {
  const now = new Date();
  if (filter === '1개월') now.setMonth(now.getMonth() - 1);
  else if (filter === '3개월') now.setMonth(now.getMonth() - 3);
  else if (filter === '6개월') now.setMonth(now.getMonth() - 6);
  else if (filter === '1년') now.setFullYear(now.getFullYear() - 1);
  else return null;
  return now.toISOString().slice(0, 10);
}

export default function TxHistoryPage() {
  const navigate = useNavigate();
  const [txFilter, setTxFilter] = useState<string>('전체');
  const [dateFilter, setDateFilter] = useState<string>('전체');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const p = MOCK_PORTFOLIO;

  const dateThreshold = getDateThreshold(dateFilter);
  const allTx = [...p.transactions].sort((a, b) => b.date.localeCompare(a.date));
  const dateFiltered = dateThreshold ? allTx.filter(t => t.date >= dateThreshold) : allTx;
  const filteredTx = txFilter === '전체' ? dateFiltered : dateFiltered.filter(t => t.type === txFilter);

  // 대시보드 집계
  const totalDeposit = allTx.filter(t => t.type === '입금').reduce((s, t) => s + t.amount, 0);
  const totalWithdraw = allTx.filter(t => t.type === '출금').reduce((s, t) => s + t.amount, 0);
  const totalInvest = allTx.filter(t => t.type === '투자').reduce((s, t) => s + t.amount, 0);
  const totalBuy = allTx.filter(t => t.type === '매수').reduce((s, t) => s + t.amount, 0);
  const totalDividend = allTx.filter(t => t.type === '만기').reduce((s, t) => s + t.amount, 0);

  // 만기 종료
  const endedCards = p.holdings.filter(h => h.status === '투자 종료');

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        <button className="subpage-topbar__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="subpage-topbar__title">투자 내역</span>
        <div style={{ width: 32 }} />
      </div>

      <div className="txh-content">
        {/* 대시보드 */}
        <div className="txh-dashboard">
          <div className="txh-dashboard__row">
            <div className="txh-dashboard__card">
              <span className="txh-dashboard__label">총 입금</span>
              <span className="txh-dashboard__value">{krw(totalDeposit)}원</span>
            </div>
            <div className="txh-dashboard__card">
              <span className="txh-dashboard__label">총 출금</span>
              <span className="txh-dashboard__value">-{krw(totalWithdraw)}원</span>
            </div>
          </div>
          <div className="txh-dashboard__row">
            <div className="txh-dashboard__card">
              <span className="txh-dashboard__label">총 투자</span>
              <span className="txh-dashboard__value">-{krw(totalInvest)}원</span>
            </div>
            <div className="txh-dashboard__card">
              <span className="txh-dashboard__label">추가 매수</span>
              <span className="txh-dashboard__value">-{krw(totalBuy)}원</span>
            </div>
          </div>
          <div className="txh-dashboard__row">
            <div className="txh-dashboard__card txh-dashboard__card--wide">
              <span className="txh-dashboard__label">누적 배당</span>
              <span className="txh-dashboard__value txh-dashboard__value--accent">+{krw(totalDividend)}원</span>
            </div>
          </div>
        </div>

        {/* 내역 헤더 + 필터 메뉴 */}
        <div className="txh-list-header">
          <span className="txh-list-header__title">거래 내역</span>
          <div className="txh-filter-menu-wrap">
            <button className="txh-filter-menu__trigger" onClick={() => setShowFilterMenu(!showFilterMenu)}>
              {dateFilter === '전체' && txFilter === '전체' ? '필터' : `${dateFilter} · ${txFilter}`}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showFilterMenu && (
              <>
                <div className="txh-filter-menu__backdrop" onClick={() => setShowFilterMenu(false)} />
                <div className="txh-filter-menu">
                  <div className="txh-filter-menu__section">
                    <div className="txh-filter-menu__label">기간</div>
                    <div className="txh-filter-menu__options">
                      {DATE_FILTERS.map(f => (
                        <button key={f} className={`txh-filter-menu__option ${dateFilter === f ? 'active' : ''}`} onClick={() => setDateFilter(f)}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="txh-filter-menu__section">
                    <div className="txh-filter-menu__label">유형</div>
                    <div className="txh-filter-menu__options">
                      {TX_FILTERS.map(f => (
                        <button key={f} className={`txh-filter-menu__option ${txFilter === f ? 'active' : ''}`} onClick={() => setTxFilter(f)}>
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="txh-filter-menu__done" onClick={() => setShowFilterMenu(false)}>적용</button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 거래 리스트 */}
        <div className="txh-list">
          {filteredTx.length === 0 && <div className="invest-empty"><p className="invest-empty__text">해당 거래 내역이 없습니다.</p></div>}
          {filteredTx.map(tx => {
            const isPlus = tx.type === '만기' || tx.type === '입금';
            const isMinus = tx.type === '투자' || tx.type === '출금' || tx.type === '매수';
            return (
              <div className="txh-item" key={tx.id}>
                <div className="txh-item__left">
                  <span className="txh-item__tag">{tx.type}</span>
                  <div>
                    <div className="txh-item__store">{tx.storeName}</div>
                    <div className="txh-item__date">{fmtDate(tx.date)}</div>
                  </div>
                </div>
                <div className={`txh-item__amount ${isPlus ? 'plus' : ''} ${isMinus ? 'minus' : ''}`}>
                  {isPlus ? '+' : isMinus ? '-' : ''}{krw(tx.amount)}원
                </div>
              </div>
            );
          })}
        </div>

        {/* 만기 종료 */}
        {endedCards.length > 0 && (
          <div className="txh-ended">
            <div className="txh-ended__title">만기 종료 상품</div>
            {endedCards.map(h => {
              const card = INVEST_CARDS.find(c => c.id === h.investCardId);
              if (!card) return null;
              return (
                <div className="txh-ended__item" key={h.investCardId} onClick={() => navigate(`/invest/${h.investCardId}`)}>
                  <div>
                    <div className="txh-ended__name">{card.name}</div>
                    <div className="txh-ended__meta">{h.tokensOwned}토큰 · {h.monthlyYield}</div>
                  </div>
                  <span className="txh-ended__badge">종료</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
