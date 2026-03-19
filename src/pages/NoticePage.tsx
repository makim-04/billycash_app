import { useState } from 'react';
import { NOTICES, NOTICE_BODIES } from '../data';
import type { Notice } from '../types/domain';

export default function NoticePage() {
  const [tab, setTab] = useState("all");
  const [detail, setDetail] = useState<Notice | null>(null);
  const tabs = [
    { key: "all", label: "전체" },
    { key: "service", label: "서비스" },
    { key: "product", label: "상품" },
    { key: "update", label: "업데이트" },
  ];
  const filtered = tab === "all" ? NOTICES : NOTICES.filter(n => n.type === tab);

  if (detail) {
    const body = NOTICE_BODIES[detail.id] || <p>{detail.preview}</p>;
    return (
      <div>
        <button className="notice-detail__back" onClick={() => setDetail(null)}>← 목록으로</button>
        <div className="notice-detail__header">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {detail.tags.map((t, i) => <span key={i} className={`tag ${t.cls}`} style={t.style}>{t.label}</span>)}
          </div>
          <div className="notice-detail__title">{detail.title}</div>
          <div className="notice-detail__meta-row">
            <span>{detail.date}</span><span>·</span><span>{detail.views}</span>
          </div>
        </div>
        <div className="notice-detail__body">{body}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero-app">
        <div className="page-hero-app__glow" />
        <div className="page-hero-app__label">✦ Notice</div>
        <h1 className="page-hero-app__title">공지사항</h1>
        <p className="page-hero-app__desc">서비스 업데이트, 신규 상품 안내를 확인하세요.</p>
      </div>
      <div className="notice-tabs">
        {tabs.map(t => (
          <button key={t.key} className={`filter-pill ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="notice-list">
        {filtered.map(n => (
          <div key={n.id} className={`notice-item ${n.pinned ? "pinned" : ""}`} onClick={() => setDetail(n)}>
            <div className="notice-item__meta">
              {n.pinned && <span>📌</span>}
              {n.tags.map((t, i) => <span key={i} className={`tag ${t.cls}`} style={t.style}>{t.label}</span>)}
            </div>
            <div className="notice-item__title">{n.title}</div>
            <div className="notice-item__preview">{n.preview}</div>
            <div className="notice-item__date">{n.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
