import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INVEST_CARDS, NOTICES, FAQ_GROUPS } from '../data';

interface SearchResult {
  type: string;
  label: string;
  to: string;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const results: SearchResult[] = [];

  if (query.length >= 1) {
    const q = query.toLowerCase();

    INVEST_CARDS.forEach(card => {
      if (card.name.toLowerCase().includes(q) || card.catLabel.includes(q) || card.sub.toLowerCase().includes(q)) {
        results.push({ type: '투자 상품', label: card.name, to: `/invest/${card.id}` });
      }
    });

    NOTICES.forEach(n => {
      if (n.title.toLowerCase().includes(q) || n.preview.toLowerCase().includes(q)) {
        results.push({ type: '공지사항', label: n.title, to: '/notice' });
      }
    });

    FAQ_GROUPS.forEach(g => {
      g.items.forEach(item => {
        if (item.q.toLowerCase().includes(q)) {
          results.push({ type: 'FAQ', label: item.q, to: '/faq' });
        }
      });
    });
  }

  return (
    <div className="subpage">
      <div className="search-topbar">
        <button className="subpage-topbar__back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="search-topbar__input-wrap">
          <svg className="search-topbar__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="search-topbar__input"
            type="text"
            placeholder="상품, 공지, FAQ 검색"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="search-topbar__clear" onClick={() => setQuery('')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="search-content">
        {query.length === 0 && (
          <div className="search-empty">
            <div className="search-empty__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p>검색어를 입력해주세요</p>
          </div>
        )}

        {query.length > 0 && results.length === 0 && (
          <div className="search-empty">
            <p>'{query}'에 대한 검색 결과가 없습니다</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="search-results">
            {results.map((r, i) => (
              <button key={i} className="search-result" onClick={() => navigate(r.to)}>
                <span className="search-result__type">{r.type}</span>
                <span className="search-result__label">{r.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
