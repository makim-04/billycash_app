import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOTICES, NOTICE_BODIES } from '../data';
import type { Notice } from '../types/domain';

const TABS = [
  { key: "all", label: "전체" },
  { key: "service", label: "서비스" },
  { key: "update", label: "점검" },
  { key: "product", label: "투자" },
];

const TYPE_LABEL: Record<string, string> = {
  service: "SERVICE",
  product: "INVEST",
  update: "SYSTEM",
};

export default function NoticePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");
  const [detail, setDetail] = useState<Notice | null>(null);
  const [showCount, setShowCount] = useState(4);

  const filtered = tab === "all" ? NOTICES : NOTICES.filter(n => n.type === tab);
  const pinnedNotice = NOTICES.find(n => n.pinned);

  if (detail) {
    const body = NOTICE_BODIES[detail.id] || <p>{detail.preview}</p>;
    return (
      <div>
        <button className="notice-detail__back" onClick={() => setDetail(null)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          목록으로
        </button>
        <div className="notice-detail__header">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {detail.tags.map((t, i) => <span key={i} className={`tag ${t.cls}`} style={t.style}>{t.label}</span>)}
          </div>
          <div className="notice-detail__title">{detail.title}</div>
          <div className="notice-detail__meta-row">
            <span>{detail.date}</span>
            <span>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              {detail.views}
            </span>
          </div>
        </div>
        <div className="notice-detail__body">{body}</div>
      </div>
    );
  }

  return (
    <div className="notice-page">
      {/* Hero Editorial Section */}
      <section className="notice-hero">
        <div className="notice-hero__label">Updates & Announcements</div>
        <h1 className="notice-hero__title">공지사항</h1>
        <div className="notice-hero__bar" />
      </section>

      {/* Featured Notice */}
      {pinnedNotice && (
        <section className="notice-featured" onClick={() => setDetail(pinnedNotice)}>
          <div className="notice-featured__glow" />
          <span className="notice-featured__badge">Important</span>
          <h3 className="notice-featured__title">{pinnedNotice.title}</h3>
          <p className="notice-featured__desc">{pinnedNotice.preview}</p>
          <div className="notice-featured__footer">
            <span className="notice-featured__date">{pinnedNotice.date}</span>
            <button className="notice-featured__btn">
              자세히 보기
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <div className="notice-filter">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`notice-filter__btn ${tab === t.key ? 'notice-filter__btn--active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notice List */}
      <div className="notice-list-v2">
        {filtered.slice(0, showCount).map(n => (
          <div key={n.id} className="notice-list-item" onClick={() => setDetail(n)}>
            <div className="notice-list-item__top">
              <span className="notice-list-item__tag">{TYPE_LABEL[n.type] || n.type.toUpperCase()}</span>
              <span className="notice-list-item__date">{n.date}</span>
            </div>
            <h4 className="notice-list-item__title">{n.title}</h4>
            <p className="notice-list-item__preview">{n.preview}</p>
            <div className="notice-list-item__divider" />
          </div>
        ))}
      </div>

      {/* Load More */}
      {showCount < filtered.length && (
        <div className="notice-load-more">
          <button className="notice-load-more__btn" onClick={() => setShowCount(s => s + 4)}>
            더 보기
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
              <path d="M1 1L4.5 5L8 1" stroke="#231F20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* FAQ 바로가기 */}
      <div className="notice-faq-banner" onClick={() => navigate('/faq')}>
        <div className="notice-faq-banner__text">
          <h4 className="notice-faq-banner__title">자주 묻는 질문</h4>
          <p className="notice-faq-banner__desc">투자, 배당, 출금 등 궁금한 점을 확인하세요.</p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </div>
    </div>
  );
}
