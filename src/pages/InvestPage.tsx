import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import InvestCard from '../components/InvestCard';
import { INVEST_CARDS } from '../data';

export default function InvestPage() {
  const navigate = useNavigate();
  const [catFilter, setCatFilter] = useState("all");
  const cats = [
    { key: "all", label: "전체" },
    { key: "meal", label: "급식" },
    { key: "fnb", label: "F&B" },
    { key: "cafe", label: "카페" },
    { key: "stay", label: "스테이" },
    { key: "kitchen", label: "공유주방" },
  ];
  const filtered = catFilter === "all" ? INVEST_CARDS : INVEST_CARDS.filter(c => c.cat === catFilter);

  return (
    <div>
      <PageHeader title="투자" />
      <div className="page-hero-app" style={{ backgroundImage: 'url(/images/invest/hero-invest.webp)' }}>
        <div className="page-hero-app__label">INVESTMENT</div>
        <h1 className="page-hero-app__title">지금 신청할 수 있는<br />투자 상품들</h1>
        <p className="page-hero-app__desc">투명한 매출 데이터와 리워드 혜택까지.</p>
      </div>
      <div className="invest-filter-bar">
        {cats.map(c => (
          <button key={c.key} className={`filter-pill ${catFilter === c.key ? "active" : ""}`} onClick={() => setCatFilter(c.key)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="invest-list">
        {filtered.map(card => (
          <InvestCard key={card.id} card={card} onClick={() => navigate(`/invest/${card.id}`)} />
        ))}
      </div>
    </div>
  );
}
