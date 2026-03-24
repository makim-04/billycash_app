import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { INVEST_CARDS, MOCK_PORTFOLIO } from '../data';

type View = 'input' | 'confirm' | 'done';

export default function InvestApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = INVEST_CARDS.find(c => c.id === Number(id));

  const [view, setView] = useState<View>('input');
  const [amountStr, setAmountStr] = useState('');
  const [tokenStr, setTokenStr] = useState('');
  const [lastEdited, setLastEdited] = useState<'amount' | 'token'>('amount');
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [riskRead, setRiskRead] = useState(false);
  const [agreeRisk, setAgreeRisk] = useState(false);
  const [riskWarning, setRiskWarning] = useState('');

  if (!card) {
    return (
      <div className="section-pad" style={{ textAlign: 'center', paddingTop: 60 }}>
        <p>상품을 찾을 수 없습니다.</p>
        <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/invest')}>목록으로</button>
      </div>
    );
  }

  const tokenPrice = parseInt(card.minInvest.replace(/[^\d]/g, ''));
  const rateNum = parseFloat(card.rate.replace(/[^\d.]/g, ''));
  const balance = MOCK_PORTFOLIO.cashBalance;

  const amount = lastEdited === 'amount'
    ? (parseInt(amountStr.replace(/,/g, '')) || 0)
    : (parseInt(tokenStr) || 0) * tokenPrice;
  const tokens = lastEdited === 'token'
    ? (parseInt(tokenStr) || 0)
    : Math.floor((parseInt(amountStr.replace(/,/g, '')) || 0) / tokenPrice);
  const monthlyReturn = Math.round(amount * rateNum / 100);
  const isValid = tokens > 0 && amount <= balance * 1000;

  const handleAmountChange = (val: string) => {
    const num = val.replace(/[^\d]/g, '');
    setAmountStr(num ? parseInt(num).toLocaleString('ko-KR') : '');
    setTokenStr(num ? String(Math.floor(parseInt(num) / tokenPrice)) : '');
    setLastEdited('amount');
  };

  const handleTokenChange = (val: string) => {
    const num = val.replace(/[^\d]/g, '');
    setTokenStr(num);
    setAmountStr(num ? (parseInt(num) * tokenPrice).toLocaleString('ko-KR') : '');
    setLastEdited('token');
  };

  const handleBuy = () => {
    if (!isValid) return;
    setView('confirm');
  };

  const handleExecute = () => {
    if (!agreeRisk) {
      setRiskWarning('투자 위험 고지에 동의해 주세요.');
      return;
    }
    if (!riskRead) {
      setRiskWarning('투자 위험 고지를 먼저 확인해 주세요.');
      setAgreeRisk(false);
      return;
    }
    setRiskWarning('');
    setView('done');
  };

  return (
    <div className="subpage">
      {view === 'input' && (
        <>
          <div className="subpage-topbar">
            <button className="subpage-topbar__back" onClick={() => navigate(-1)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="subpage-topbar__title">투자 신청</span>
            <div style={{ width: 32 }} />
          </div>

          <div className="trade-content">
            {/* 상품 정보 카드 */}
            <div className="trade-product">
              <div className="trade-product__info">
                <div className="trade-product__name">{card.name}</div>
                <div className="trade-product__sub">{card.sub}</div>
              </div>
              <div className="trade-product__stats">
                <div className="trade-product__stat">
                  <span className="trade-product__stat-value trade-product__stat-value--accent">{card.rate}</span>
                  <span className="trade-product__stat-label">예상 수익률</span>
                </div>
                <div className="trade-product__divider" />
                <div className="trade-product__stat">
                  <span className="trade-product__stat-value">{tokenPrice.toLocaleString('ko-KR')}원</span>
                  <span className="trade-product__stat-label">토큰 단가</span>
                </div>
              </div>
            </div>

            <div className="trade-balance-info">
              <span className="trade-balance-info__label">내 보유 잔액</span>
              <span className="trade-balance-info__value">{balance.toLocaleString('ko-KR')}원</span>
            </div>

            {/* 주문 입력 */}
            <div className="trade-form">
              <div className="trade-input-card">
                <div className="trade-input-row">
                  <label className="trade-input-label">금액</label>
                  <div className="trade-input-field">
                    <input
                      className="trade-input"
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={amountStr}
                      onChange={e => handleAmountChange(e.target.value)}
                    />
                    <span className="trade-input-unit">원</span>
                  </div>
                </div>
                <div className="trade-input-swap">
                  <div className="trade-input-swap__line" />
                  <div className="trade-input-swap__icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="7 3 7 21" /><polyline points="3 17 7 21 11 17" />
                      <polyline points="17 21 17 3" /><polyline points="13 7 17 3 21 7" />
                    </svg>
                  </div>
                  <div className="trade-input-swap__line" />
                </div>

                <div className="trade-input-row">
                  <label className="trade-input-label">수량</label>
                  <div className="trade-input-field">
                    <input
                      className="trade-input"
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={tokenStr}
                      onChange={e => handleTokenChange(e.target.value)}
                    />
                    <span className="trade-input-unit">토큰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 예상 수익 */}
            <div className="trade-estimate">
              <div className="trade-estimate__row">
                <span>예상 월 배당</span>
                <span className="trade-estimate__value">{monthlyReturn.toLocaleString('ko-KR')}원</span>
              </div>
              <div className="trade-estimate__row">
                <span>예상 연 수익</span>
                <span className="trade-estimate__value">{(monthlyReturn * 12).toLocaleString('ko-KR')}원</span>
              </div>
            </div>

            {/* 잔액 부족 경고 */}
            {amount > balance * 1000 && amount > 0 && (
              <div className="trade-warning">
                잔액이 부족합니다 · <button onClick={() => navigate('/wallet')}>입금하기</button>
              </div>
            )}
          </div>

          {/* 신청 버튼 */}
          <div className="trade-footer">
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={!isValid}
              onClick={handleBuy}
            >
              신청하기
            </button>
          </div>

        </>
      )}

      {view === 'confirm' && (
        <>
          <div className="subpage-topbar">
            <button className="subpage-topbar__back" onClick={() => setView('input')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <span className="subpage-topbar__title">신청 확인</span>
            <div style={{ width: 32 }} />
          </div>

          <div className="trade-content">
            <div className="trade-confirm-page__product">{card.name}</div>
            <div className="trade-confirm-page__sub">{card.sub}</div>

            <div className="trade-confirm-page__summary">
              <div className="trade-confirm__row">
                <span>수량</span><span>{tokens} 토큰</span>
              </div>
              <div className="trade-confirm__row">
                <span>금액</span><span>{amount.toLocaleString('ko-KR')}원</span>
              </div>
              <div className="trade-confirm__row">
                <span>토큰 단가</span><span>{tokenPrice.toLocaleString('ko-KR')}원</span>
              </div>
              <div className="trade-confirm__row">
                <span>예상 월 배당</span><span>{monthlyReturn.toLocaleString('ko-KR')}원</span>
              </div>
              <div className="trade-confirm__row">
                <span>예상 연 수익</span><span>{(monthlyReturn * 12).toLocaleString('ko-KR')}원</span>
              </div>
            </div>

            <div className="agree-row" style={{ marginBottom: riskWarning ? 8 : 16 }}>
              <label className="auth-checkbox" style={{ marginTop: 0 }}>
                <input type="checkbox" checked={agreeRisk} onChange={e => { setAgreeRisk(e.target.checked); setRiskWarning(''); }} />
                <span>투자 위험 고지를 확인했습니다</span>
              </label>
              <button type="button" className="agree-view" onClick={() => setShowRiskModal(true)}>보기</button>
            </div>
            {riskWarning && <div className="trade-risk-warning">{riskWarning}</div>}
          </div>

          <div className="trade-footer">
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleExecute}
            >
              신청하기
            </button>
          </div>

          {/* 투자 위험 고지 모달 */}
          {showRiskModal && (
            <div className="agree-modal-overlay" onClick={() => setShowRiskModal(false)}>
              <div className="agree-modal" onClick={e => e.stopPropagation()}>
                <div className="agree-modal__header">
                  <span className="agree-modal__title">투자 위험 고지</span>
                  <button className="agree-modal__close" onClick={() => setShowRiskModal(false)}>✕</button>
                </div>
                <div className="agree-modal__body">
                  <p>1. 원금 손실 위험</p>
                  <p>조각투자는 원금이 보장되지 않으며, 투자한 매장의 영업 실적에 따라 원금 손실이 발생할 수 있습니다.</p>
                  <p>2. 수익률 변동</p>
                  <p>제시된 예상 수익률은 과거 실적 기반의 추정치이며, 실제 수익률은 매장 매출 변동에 따라 달라질 수 있습니다. 과거 수익률이 미래 수익을 보장하지 않습니다.</p>
                  <p>3. 유동성 제한</p>
                  <p>투자금은 모집 완료 후 토큰 발행 전까지 출금이 제한될 수 있으며, 2차 시장이 개설되기 전까지 즉시 매도가 어려울 수 있습니다.</p>
                  <p>4. 매장 폐업 위험</p>
                  <p>투자 대상 매장이 폐업할 경우 잔존 가치 보증 시스템을 통해 일부 원금을 보전하나, 전액 회수가 보장되지 않습니다.</p>
                  <p>5. 법규 변경 위험</p>
                  <p>STO 관련 법률 및 규제 변경에 따라 서비스 운영 방식이 변경되거나 제한될 수 있습니다.</p>
                </div>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={() => { setRiskRead(true); setAgreeRisk(true); setRiskWarning(''); setShowRiskModal(false); }}>확인했습니다</button>
              </div>
            </div>
          )}
        </>
      )}

      {view === 'done' && (
        <div className="deposit-done">
          <div className="verify-done" style={{ width: 52, height: 52, margin: '0 auto 16px' }}>
            <svg className="verify-done__circle" viewBox="0 0 36 36" style={{ width: 52, height: 52 }}>
              <circle cx="18" cy="18" r="16" />
            </svg>
            <svg className="verify-done__check" viewBox="0 0 24 24" style={{ width: 28, height: 28 }}>
              <polyline points="6 12 10 16 18 8" />
            </svg>
          </div>
          <h2 className="deposit-done__title">신청 완료!</h2>
          <p className="deposit-done__amount">{card.name}</p>
          <p className="deposit-done__desc">{tokens} 토큰 · {amount.toLocaleString('ko-KR')}원</p>
          <div className="deposit-done__balance">
            <span>토큰 발행 예정일</span>
            <span>{MOCK_PORTFOLIO.holdings.find(h => h.investCardId === card.id)?.expectedIssueDate?.replace(/-/g, '.') || '-'}</span>
          </div>
          <div className="deposit-done__actions">
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate(`/invest/${card.id}`)}>
              내 투자 보기
            </button>
            <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => navigate('/')}>
              홈으로
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
