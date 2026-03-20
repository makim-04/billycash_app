import type { InvestCard as InvestCardType } from '../types/domain';

interface ExtraMeta {
  label: string;
  value: string;
  accent?: boolean;
}

interface Props {
  card: InvestCardType;
  onClick?: () => void;
  extraMeta?: ExtraMeta[];
  investorMeta?: ExtraMeta[];
  ended?: boolean;
}

export default function InvestCard({ card, onClick, extraMeta, investorMeta, ended }: Props) {
  const isClosed = ended || card.statusCls === 'status-closed';

  const meta = extraMeta || [
    { label: '최소 투자', value: card.minInvest },
    { label: '예상 수익률', value: card.rate, accent: true },
    { label: '발행 예정 토큰', value: `${card.totalTokens.toLocaleString()}개` },
  ];

  return (
    <div className={`icard ${isClosed ? 'icard--ended' : ''}`} onClick={onClick}>
      <div
        className={`icard-thumb ${card.thumbCls}`}
        style={card.img ? { backgroundImage: `url(${card.img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {!card.img && <span>{card.emoji}</span>}
        <div className="thumb-overlay" />
        <div className="thumb-cat">{card.catLabel}</div>
        <div className={`thumb-status ${card.statusCls}`}>{card.status}</div>
        {!isClosed && card.investors && (
          <div className="thumb-cnt"><span className="inv-dot" />{card.investors}</div>
        )}
        {isClosed && <div className="ended-overlay"><span className="ended-label">투자 종료</span></div>}
      </div>
      <div className="icard-body">
        <div className="icard-name">{card.name}</div>
        <div className="icard-sub">{card.sub}</div>
        <div className="prog-head">
          <span className="prog-pct">{card.pct}<sup>%</sup></span>
          <span className={`prog-status ${card.pctLabelCls}`}>{card.pctLabel}</span>
        </div>
        <div className="prog-bg" style={{ marginBottom: 12 }}>
          <div className={`prog-bar ${card.progCls}`} style={{ width: `${card.pct}%` }} />
        </div>
        <div className="icard-meta">
          {meta.map((m, i) => (
            <div key={i}>
              <div className="meta-label">{m.label}</div>
              <div className={`meta-value ${m.accent ? 'meta-accent' : ''}`}>{m.value}</div>
            </div>
          ))}
        </div>
        {investorMeta && (
          <div className="icard-investor">
            {investorMeta.map((m, i) => (
              <div className="icard-investor__item" key={i}>
                <span className="icard-investor__label">{m.label}</span>
                <span className={`icard-investor__value ${m.accent ? 'accent' : ''}`}>{m.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
