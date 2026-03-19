import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeTopBar from '../components/HomeTopBar';
import InvestCard from '../components/InvestCard';
import { INVEST_CARDS } from '../data';

const OPEN_CARDS = INVEST_CARDS.filter(c => c.statusCls !== 'status-closed');

export default function HomePage() {
  const navigate = useNavigate();
  const [catFilter, setCatFilter] = useState("전체");

  const catMap: Record<string, string> = { "전체": "all", "급식": "meal", "F&B": "fnb", "카페": "cafe", "스테이": "stay" };
  const filtered = catFilter === "전체" ? OPEN_CARDS.slice(0, 3) : OPEN_CARDS.filter(c => c.cat === catMap[catFilter]).slice(0, 3);

  return (
    <div>
      <HomeTopBar />

      {/* Hero */}
      <section className="app-hero">
        <div className="app-hero__glow" />
        <div className="app-hero__badge">
          <span className="app-hero__badge-dot" />
          소상공인 조각투자 플랫폼
        </div>
        <h1 className="app-hero__title">
          내 동네 가게에<br /><span className="yellow">직접 투자하세요</span>
        </h1>
        <p className="app-hero__desc">
          단골 맛집, 좋아하는 카페에 조각투자하고<br />
          매달 수익 배당과 할인 혜택을 누리세요.<br />
          최소 <strong>₩10,000</strong>부터 시작할 수 있어요.
        </p>
      </section>

      {/* Products */}
      <section className="section-pad">
        <div className="section-label"><span className="section-label__dot" />Investment</div>
        <h2 className="section-title">지금 모집 중인 투자 상품</h2>
        <div className="products-filters" style={{ marginBottom: 12 }}>
          {["전체", "급식", "F&B", "카페", "스테이"].map(f => (
            <button key={f} className={`filter-btn ${catFilter === f ? "active" : ""}`} onClick={() => setCatFilter(f)}>{f}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(card => (
            <InvestCard key={card.id} card={card} onClick={() => navigate(`/invest/${card.id}`)} />
          ))}
        </div>
        <button
          className="btn-outline"
          style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
          onClick={() => navigate('/invest')}
        >
          전체 상품 보기 →
        </button>
      </section>

      {/* How It Works */}
      <section className="section-pad" style={{ background: 'var(--pale)' }}>
        <div className="section-label"><span className="section-label__dot" />How It Works</div>
        <h2 className="section-title">이렇게 쉬워요</h2>
        <div className="how-grid">
          {[
            ["01", "마음에 드는 가게 발견", "동네 맛집, 감성 카페 중 투자하고 싶은 매장을 골라요."],
            ["02", "1만원부터 조각 투자", "부담 없는 금액으로 시작하세요."],
            ["03", "매출 실시간 확인", "POS·카드 데이터 연동 대시보드로 매출을 모니터링해요."],
            ["04", "매월 수익 + 리워드", "매달 배당금이 들어오고, 할인권도 함께 받아요."],
          ].map(([num, title, desc], i) => (
            <div key={i} className="step-card">
              <div className="step-num">{num}</div>
              <div className="step-body">
                <div className="step-title">{title}</div>
                <div className="step-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section-pad" style={{ background: 'var(--pale)' }}>
        <div className="section-label"><span className="section-label__dot" />We Are</div>
        <h2 className="section-title" style={{ fontSize: 16 }}>
          소상공인을 위한<br /><span className="highlight-bar">새로운 핀테크</span> 시장을<br />개척합니다.
        </h2>
        <p className="section-desc">
          <span className="highlight-fill">빌리크루</span>는 소상공인 매출채권을 발행하여 통합 자금 관리, 유휴자금 투자 서비스를 제공하는 기업입니다.
        </p>
        <div className="about-cards">
          {[
            ["SME 기반의 시장 선점", "다양한 금융생태계와의 접점을 기반으로 새로운 핀테크 시장 발굴"],
            ["소상공인 중심 공급망 금융", "소상공인의 실질적인 자산 운영 니즈에 집중"],
            ["STO 기반 구조 혁신", "누구나 믿고 이용할 수 있는 공급망 금융 생태계 구축"],
          ].map(([title, desc], i) => (
            <div key={i} className="about-card"><h3>{title}</h3><p>{desc}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}
