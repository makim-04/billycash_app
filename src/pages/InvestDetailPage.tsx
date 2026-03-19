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
        <button className="btn-primary" onClick={() => navigate("/invest")}>목록으로 →</button>
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
        <button className="detail-hero__back" onClick={() => navigate(-1)}>← 뒤로</button>
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
        <div className="detail-card">
          <h3 className="detail-section-title">모집 현황</h3>
          <div className="detail-prog-section">
            <div className="detail-prog-num">{card.pct}<span>% 모집 완료</span></div>
            <div className="prog-bg"><div className={`prog-bar ${card.progCls}`} style={{ width: `${card.pct}%` }} /></div>
          </div>
        </div>
        <div className="detail-card">
          <div className="detail-stats">
            <div className="detail-stat-item">
              <div className="detail-stat-num accent">{card.rate}</div>
              <div className="detail-stat-label">예상 수익률</div>
            </div>
            <div className="detail-stat-item">
              <div className="detail-stat-num">{card.minInvest}</div>
              <div className="detail-stat-label">최소 투자금</div>
            </div>
            <div className="detail-stat-item">
              <div className="detail-stat-num" style={{ fontSize: 13 }}>{card.investors || "완료"}</div>
              <div className="detail-stat-label">현재 투자자</div>
            </div>
          </div>
        </div>
        {isClosed ? (
          <div className="detail-card">
            <div className="detail-closed-cta">
              <div className="detail-closed-cta__text">투자 종료</div>
              <div className="detail-closed-cta__sub">이 상품은 모집이 완료되었습니다.</div>
            </div>
          </div>
        ) : (
          <div className="detail-cta">
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate(`/invest/${card.id}/apply`)}>
              투자하기 →
            </button>
            <div className="detail-cta-note">⚠️ 투자에는 원금 손실 위험이 있습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
