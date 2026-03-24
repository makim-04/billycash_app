import type { InvestCard as InvestCardType, ProductStatus, TokenHolding } from '../types/domain';

interface ExtraMeta {
  label: string;
  value: string;
  accent?: boolean;
}

interface Props {
  card: InvestCardType;
  holding?: TokenHolding;
  onClick?: () => void;
  extraMeta?: ExtraMeta[];
  investorMeta?: ExtraMeta[];
  ended?: boolean;
}

const STATUS_CONFIG: Record<ProductStatus, { label: string; cls: string; progCls: string; pctLabel: string; pctCls: string; accentCls: string }> = {
  pending:  { label: '모집중',     cls: 'status-pending',  progCls: 'prog-bar-green', pctLabel: '모집중',     pctCls: 'ps-pending',  accentCls: 'accent-pending' },
  ready:    { label: '모집완료',   cls: 'status-ready',    progCls: 'prog-bar-gray',  pctLabel: '모집완료',   pctCls: 'ps-ready',    accentCls: 'accent-ready' },
  live:     { label: '투자중',     cls: 'status-live',     progCls: 'prog-bar-green', pctLabel: '투자중',     pctCls: 'ps-live',     accentCls: 'accent-live' },
  expired:  { label: '만기 상환',  cls: 'status-expired',  progCls: 'prog-bar-black',  pctLabel: '만기 상환',  pctCls: 'ps-expired',  accentCls: 'accent-expired' },
  done:     { label: '완제됨',     cls: 'status-done',     progCls: 'prog-bar-gray',  pctLabel: '완제됨',     pctCls: 'ps-done',     accentCls: 'accent-done' },
  delay:    { label: '연체',       cls: 'status-delay',    progCls: 'prog-bar-red',   pctLabel: '연체',       pctCls: 'ps-delay',    accentCls: 'accent-delay' },
};

function buildMeta(card: InvestCardType, holding?: TokenHolding): ExtraMeta[] {
  if (holding && ['live', 'delay'].includes(card.productStatus)) {
    const profit = holding.currentValue - holding.purchasePrice;
    const actualRate = holding.purchasePrice > 0 ? (profit / holding.purchasePrice * 100).toFixed(1) : '0.0';
    return [
      { label: '내 투자금', value: `${holding.purchasePrice.toLocaleString('ko-KR')}원` },
      { label: '실제 수익률', value: `${Number(actualRate) >= 0 ? '+' : ''}${actualRate}%`, accent: true },
      { label: '투자 기간', value: holding.elapsedMonths != null && holding.periodMonths ? `${holding.elapsedMonths}/${holding.periodMonths}개월` : '-' },
    ];
  }
  return [
    { label: '최소 투자', value: card.minInvest },
    { label: '예상 수익률', value: card.rate, accent: true },
    { label: '투자 기간', value: card.periodMonths ? `${card.periodMonths}개월` : '-' },
  ];
}

export default function InvestCard({ card, holding, onClick, extraMeta, investorMeta, ended }: Props) {
  const cfg = STATUS_CONFIG[card.productStatus];
  const isClosed = ended || ['ready', 'done'].includes(card.productStatus);
  const isLive = ['live', 'delay'].includes(card.productStatus);

  const meta = extraMeta || buildMeta(card, holding);

  return (
    <div className={`icard ${isClosed ? 'icard--ended' : ''}`} onClick={onClick}>
      <div
        className={`icard-thumb ${card.thumbCls}`}
        style={card.img ? { backgroundImage: `url(${card.img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {!card.img && <span>{card.emoji}</span>}
        <div className="thumb-overlay" />
        <div className="thumb-cat">{card.catLabel}</div>
        <div className={`thumb-status ${cfg.cls}`}>{cfg.label}</div>
        {!isClosed && !isLive && card.investors && (
          <div className="thumb-cnt">
            <span className="inv-dot" />
            {card.investors} · {Math.round(card.pct * card.totalTokens / 100)}/{card.totalTokens} 토큰
          </div>
        )}
        {isLive && holding && (
          <div className="thumb-cnt">
            <span className="inv-dot" />
            {holding.tokensOwned}/{holding.totalTokens} 토큰 보유
          </div>
        )}
        {isClosed && <div className="ended-overlay"><span className="ended-label">{cfg.label}</span></div>}
      </div>
      <div className="icard-body">
        <div className="icard-name">{card.name}</div>
        <div className="icard-sub">{card.sub}</div>
        <div className="prog-head">
          <span className="prog-pct">{card.pct}%</span>
          <span className={`prog-status ${cfg.pctCls}`}>{cfg.pctLabel}</span>
        </div>
        <div className="prog-bg" style={{ marginBottom: 12 }}>
          <div className={`prog-bar ${cfg.progCls}`} style={{ width: `${card.pct}%` }} />
        </div>
        <div className="icard-meta">
          {meta.map((m, i) => (
            <div key={i}>
              <div className="meta-label">{m.label}</div>
              <div className={`meta-value ${m.accent ? cfg.accentCls : ''}`}>{m.value}</div>
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
