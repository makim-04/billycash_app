import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <span className="page-header__title">{title}</span>
      <div className="page-header__actions">
        <button className="page-header__icon" onClick={() => navigate('/wallet')}>
          <svg width="20" height="20" viewBox="10.5 10.5 20 19" fill="none"><path d="M13 25V27V13V25ZM28 16.058C28 16.3341 27.7761 16.558 27.5 16.558C27.2239 16.558 27 16.3341 27 16.058V14C27 13.4477 26.5523 13 26 13H13V27H26C26.5523 27 27 26.5523 27 26V23.942C27 23.6659 27.2239 23.442 27.5 23.442C27.7761 23.442 28 23.6659 28 23.942V27C28 27.5523 27.5523 28 27 28H13C12.4477 28 12 27.5523 12 27V13C12 12.4477 12.4477 12 13 12H27C27.5523 12 28 12.4477 28 13V16.058ZM21 24C20.4477 24 20 23.5523 20 23V17C20 16.4477 20.4477 16 21 16H28C28.5523 16 29 16.4477 29 17V23C29 23.5523 28.5523 24 28 24H21ZM25.063 21.063C25.3543 20.771 25.5 20.4167 25.5 20C25.5 19.5833 25.3543 19.2293 25.063 18.938C24.7717 18.6467 24.4173 18.5007 24 18.5C23.5827 18.4993 23.2287 18.6453 22.938 18.938C22.6473 19.2307 22.5013 19.5847 22.5 20C22.4987 20.4153 22.6447 20.7697 22.938 21.063C23.2313 21.3563 23.5853 21.502 24 21.5C24.4147 21.498 24.769 21.3523 25.063 21.063ZM27 23C27.5523 23 28 22.5523 28 22V18C28 17.4477 27.5523 17 27 17H22C21.4477 17 21 17.4477 21 18V22C21 22.5523 21.4477 23 22 23H27Z" fill="#231F20"/></svg>
        </button>
        <button className="page-header__icon" onClick={() => navigate('/search')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10.5" cy="10.5" r="7" />
            <line x1="21" y1="21" x2="15.8" y2="15.8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
