import { useState } from 'react';
import { FAQ_GROUPS } from '../data';

export default function FAQPage() {
  const [cat, setCat] = useState("all");
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const cats = [
    { key: "all", icon: "📋", label: "전체" },
    { key: "basic", icon: "🔰", label: "소개" },
    { key: "invest", icon: "💰", label: "투자" },
    { key: "reward", icon: "🎁", label: "리워드" },
    { key: "safety", icon: "🛡️", label: "안전" },
    { key: "account", icon: "👤", label: "계정" },
  ];

  const visibleGroups = FAQ_GROUPS
    .filter(g => cat === "all" || g.group === cat)
    .map(g => ({
      ...g,
      items: g.items.filter(item =>
        !search || item.q.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(g => g.items.length > 0);

  return (
    <div>
      <div className="page-hero-app">
        <div className="page-hero-app__glow" />
        <div className="page-hero-app__label">✦ FAQ</div>
        <h1 className="page-hero-app__title">자주 묻는 질문</h1>
        <p className="page-hero-app__desc">궁금한 점이 있으신가요?</p>
      </div>
      <div className="faq-cats">
        {cats.map(s => (
          <button
            key={s.key}
            className={`faq-cat-btn ${cat === s.key ? "active" : ""}`}
            onClick={() => { setCat(s.key); setSearch(""); setOpenItem(null); }}
          >
            <span>{s.icon}</span>{s.label}
          </button>
        ))}
      </div>
      <div className="faq-search">
        <span className="faq-search__icon">🔍</span>
        <input
          type="text"
          placeholder="검색"
          value={search}
          onChange={e => { setSearch(e.target.value); setCat("all"); setOpenItem(null); }}
        />
      </div>
      {visibleGroups.length === 0 ? (
        <div className="faq-no-result">
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          검색 결과가 없어요
        </div>
      ) : (
        visibleGroups.map(g => (
          <div key={g.group} className="faq-group">
            <div className="faq-group__title"><span>{g.icon}</span>{g.title}</div>
            {g.items.map((item, i) => {
              const key = `${g.group}-${i}`;
              const isOpen = openItem === key;
              return (
                <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <div className="faq-item__q" onClick={() => setOpenItem(isOpen ? null : key)}>
                    <span className="faq-q-mark">Q</span>
                    <span className="faq-q-text">{item.q}</span>
                    <span className="faq-arrow">▾</span>
                  </div>
                  <div className="faq-item__a">
                    <div className="faq-item__a-inner">{item.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}
