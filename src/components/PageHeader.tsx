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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M12 10v4" />
            <path d="M10 12h4" />
          </svg>
        </button>
        <button className="page-header__icon" onClick={() => navigate('/search')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </div>
  );
}
