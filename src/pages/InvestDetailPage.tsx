import { useParams, useNavigate } from 'react-router-dom';
import { INVEST_CARDS } from '../data';

export default function InvestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = INVEST_CARDS.find(c => c.id === Number(id));
  const isClosed = card?.statusCls === 'status-closed';

  if (!card) {
    return (
      <div className="section-pad" style={{ textAlign: 'center', paddingTop: 60 }}>
        <h2 style={{ fontSize: 16, marginBottom: 12 }}>상품을 찾을 수 없습니다</h2>
        <button className="btn-primary" onClick={() => navigate("/invest")}>목록으로</button>
      </div>
    );
  }

  return (
    <div>
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
            <div className={`thumb-status ${card.statusCls}`}>{card.status}</div>
          </div>
          <h1 className="detail-hero__title">{card.name}</h1>
          <p className="detail-hero__sub">{card.sub}</p>
          {isClosed && <div className="detail-closed-badge">투자 종료 상품입니다</div>}
        </div>
      </div>
      <div className="detail-body">
        {/* 모집 현황 */}
        <div className="detail-card">
          <h3 className="detail-section-title">모집 현황</h3>
          <div className="detail-prog-inline">
            <span className="detail-prog-inline__pct">{card.pct}</span>
            <span className="detail-prog-inline__label">% 모집 완료</span>
          </div>
          <div className="prog-bg"><div className={`prog-bar ${card.progCls}`} style={{ width: `${card.pct}%` }} /></div>
        </div>

        {/* 스탯 카드 3개 */}
        <div className="detail-stats-row">
          <div className="detail-stat-card">
            <div className="detail-stat-card__value detail-stat-card__value--accent">{card.rate}</div>
            <div className="detail-stat-card__label">예상 수익률</div>
          </div>
          <div className="detail-stat-card">
            <div className="detail-stat-card__value">{card.minInvest?.replace('₩', '') || '50,000'}원</div>
            <div className="detail-stat-card__label">최소 투자금</div>
          </div>
          <div className="detail-stat-card">
            <div className="detail-stat-card__value">{card.investors || '완료'}</div>
            <div className="detail-stat-card__label">현재 투자자</div>
          </div>
        </div>

        {/* CTA */}
        {isClosed ? (
          <div className="detail-card">
            <div className="detail-closed-cta">
              <div className="detail-closed-cta__text">투자 종료</div>
              <div className="detail-closed-cta__sub">이 상품은 모집이 완료되었습니다.</div>
            </div>
          </div>
        ) : (
          <div className="detail-cta-section">
            <button className="btn-primary detail-cta-btn" onClick={() => navigate(`/invest/${card.id}/apply`)}>
              투자하기
            </button>
            <div className="detail-cta-risk">
              <span className="detail-cta-risk__dot" />
              투자에는 원금 손실 위험이 있습니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
