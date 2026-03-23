import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAQ_GROUPS } from '../data';

const CATS = [
  { key: "all", label: "전체" },
  { key: "basic", label: "소개" },
  { key: "invest", label: "투자" },
  { key: "reward", label: "리워드" },
  { key: "safety", label: "안전" },
  { key: "account", label: "계정" },
];

export default function FAQPage() {
  const navigate = useNavigate();
  const [cat, setCat] = useState("all");
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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
    <div className="faq-page">
      {/* Back button */}
      <div className="faq-page__topbar">
        <button className="faq-page__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-hero__label">Frequently Asked Questions</div>
        <h1 className="faq-hero__title">자주 묻는 질문</h1>
        <div className="faq-hero__bar" />
      </section>

      {/* Search */}
      <div className="faq-search-v2">
        <svg className="faq-search-v2__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className="faq-search-v2__input"
          type="text"
          placeholder="궁금한 내용을 검색하세요"
          value={search}
          onChange={e => { setSearch(e.target.value); setCat("all"); setOpenItem(null); }}
        />
      </div>

      {/* Category Filter */}
      <div className="faq-filter">
        {CATS.map(s => (
          <button
            key={s.key}
            className={`notice-filter__btn ${cat === s.key ? 'notice-filter__btn--active' : ''}`}
            onClick={() => { setCat(s.key); setSearch(""); setOpenItem(null); }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      {visibleGroups.length === 0 ? (
        <div className="faq-empty">
          <p>검색 결과가 없습니다</p>
        </div>
      ) : (
        <div className="faq-list-v2">
          {visibleGroups.map(g => (
            <div key={g.group} className="faq-group-v2">
              <div className="faq-group-v2__title">{g.title}</div>
              {g.items.map((item, i) => {
                const key = `${g.group}-${i}`;
                const isOpen = openItem === key;
                return (
                  <div key={i} className={`faq-item-v2 ${isOpen ? 'faq-item-v2--open' : ''}`}>
                    <button className="faq-item-v2__q" onClick={() => setOpenItem(isOpen ? null : key)}>
                      <span className="faq-item-v2__q-text">{item.q}</span>
                      <svg className={`faq-item-v2__arrow ${isOpen ? 'faq-item-v2__arrow--open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div className={`faq-item-v2__a ${isOpen ? 'faq-item-v2__a--open' : ''}`}>
                      <div className="faq-item-v2__a-inner">{item.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
