import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Step = 'enter' | 'confirm' | 'done';

export default function PinSetupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const goBack = () => searchParams.get('from') === 'settings' ? navigate('/menu?view=settings') : navigate(-1);
  const [step, setStep] = useState<Step>('enter');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const current = step === 'confirm' ? confirmPin : pin;
  const setCurrent = step === 'confirm' ? setConfirmPin : setPin;

  const handleKey = (num: string) => {
    if (error) setError('');
    if (current.length >= 6) return;
    const next = current + num;
    setCurrent(next);

    if (next.length === 6) {
      if (step === 'enter') {
        setTimeout(() => {
          setStep('confirm');
        }, 200);
      } else if (step === 'confirm') {
        setTimeout(() => {
          if (next === pin) {
            setStep('done');
          } else {
            setError('비밀번호가 일치하지 않습니다');
            setTimeout(() => {
              setConfirmPin('');
              setError('');
            }, 800);
          }
        }, 200);
      }
    }
  };

  const handleDelete = () => {
    if (error) setError('');
    setCurrent(current.slice(0, -1));
  };

  const title = step === 'enter'
    ? '간편 비밀번호 설정'
    : step === 'confirm'
    ? '한 번 더 입력해주세요'
    : '설정 완료';

  const subtitle = step === 'enter'
    ? '6자리 숫자를 입력하세요'
    : step === 'confirm'
    ? '확인을 위해 다시 입력하세요'
    : '';

  if (step === 'done') {
    return (
      <div className="subpage">
        <div className="pin-done">
          <div className="pin-done__icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFCE30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 12 10 16 18 8" />
            </svg>
          </div>
          <h2 className="pin-done__title">간편 비밀번호가 설정되었습니다</h2>
          <p className="pin-done__desc">다음 로그인 시 간편 비밀번호로 접속할 수 있습니다.</p>
          <button className="btn-primary pin-done__btn" onClick={goBack}>
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="subpage">
      <div className="subpage-topbar">
        <button className="subpage-topbar__back" onClick={() => step === 'confirm' ? (setStep('enter'), setPin(''), setConfirmPin(''), setError('')) : goBack()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="subpage-topbar__title">간편 비밀번호</span>
        <span className="subpage-topbar__spacer" />
      </div>

      <div className="pin-content">
        <div className="pin-header">
          <h2 className="pin-header__title">{title}</h2>
          <p className="pin-header__sub">{subtitle}</p>
        </div>

        {/* Dots */}
        <div className="pin-dots">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`pin-dot ${error ? 'pin-dot--error' : i < current.length ? 'pin-dot--filled' : ''}`} />
          ))}
        </div>

        {error && <p className="pin-error">{error}</p>}

        {/* Keypad */}
        <div className="pin-keypad">
          {['1','2','3','4','5','6','7','8','9','','0','del'].map((key) => (
            <button
              key={key}
              className={`pin-key ${key === '' ? 'pin-key--empty' : ''} ${key === 'del' ? 'pin-key--del' : ''}`}
              onClick={() => {
                if (key === 'del') handleDelete();
                else if (key !== '') handleKey(key);
              }}
              disabled={key === ''}
            >
              {key === 'del' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
                  <line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
                </svg>
              ) : key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
