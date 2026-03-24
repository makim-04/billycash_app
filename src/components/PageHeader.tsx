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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="3" x2="7" y2="21" />
            <polyline points="3 7 7 3 11 7" />
            <line x1="17" y1="21" x2="17" y2="3" />
            <polyline points="13 17 17 21 21 17" />
          </svg>
        </button>
        <button className="page-header__icon" onClick={() => navigate('/menu')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#231F20" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
