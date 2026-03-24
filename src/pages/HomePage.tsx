import { useNavigate } from 'react-router-dom';
import { INVEST_CARDS, MOCK_PORTFOLIO } from '../data';
import InvestCard from '../components/InvestCard';
import type { ProductStatus } from '../types/domain';

const STATUS_LABEL: Record<ProductStatus, string> = {
  pending: '모집중',
  ready: '모집완료',
  live: '투자중',
  expired: '만기 상환',
  done: '완제됨',
  delay: '연체',
};

const FEATURED_CARD = INVEST_CARDS.find(c => c.id === 7)!;
const SECONDARY_FNB = INVEST_CARDS.find(c => c.id === 1)!;
const SECONDARY_STAY = INVEST_CARDS.find(c => c.id === 3)!;

const totalAsset = MOCK_PORTFOLIO.currentValue + MOCK_PORTFOLIO.totalDividends;
const growthRate = ((MOCK_PORTFOLIO.currentValue - MOCK_PORTFOLIO.totalInvested) / MOCK_PORTFOLIO.totalInvested * 100).toFixed(1);

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-v2">
      {/* Hero Portfolio Section */}
      <section className="home-portfolio">
        <div className="home-portfolio__top">
          <div className="home-portfolio__label">총 투자 자산</div>
          <button className="home-portfolio__menu" onClick={() => navigate('/menu')}>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 0H20V2H0V0ZM0 6H20V8H0V6ZM0 12H20V14H0V12Z" fill="#231F20"/>
            </svg>
          </button>
        </div>
        <div className="home-portfolio__amount">
          <span className="home-portfolio__num">{totalAsset.toLocaleString()}</span>
          <span className="home-portfolio__unit">원</span>
        </div>
        <div className="home-portfolio__growth">
          <span className="home-portfolio__badge">+{growthRate}%</span>
          <span className="home-portfolio__growth-label">투자 대비 성장</span>
        </div>
      </section>

      {/* Quick Actions Bento */}
      <section className="home-bento">
        <button className="home-bento__card home-bento__card--charge" onClick={() => navigate('/wallet')}>
          <svg className="home-bento__icon" width="24" height="20" viewBox="0 0 20 16" fill="none">
            <path d="M1.81818 14.2222C1.31818 14.2222 0.890303 14.0483 0.534546 13.7004C0.178788 13.3526 0.000606061 12.9339 0 12.4444V1.77778C0 1.28889 0.178182 0.870518 0.534546 0.522667C0.890909 0.174815 1.31879 0.000592593 1.81818 0H16.3636C16.8636 0 17.2918 0.174222 17.6482 0.522667C18.0045 0.871111 18.1824 1.28948 18.1818 1.77778V7.11111H1.81818V12.4444H10.9091V14.2222H1.81818ZM1.81818 3.55556H16.3636V1.77778H1.81818V3.55556ZM15.4545 16V13.3333H12.7273V11.5556H15.4545V8.88889H17.2727V11.5556H20V13.3333H17.2727V16H15.4545Z" fill="#BED475"/>
          </svg>
          <span className="home-bento__label">입출금</span>
        </button>
        <button className="home-bento__card home-bento__card--dashboard" onClick={() => navigate('/my')}>
          <svg className="home-bento__icon" width="22" height="22" viewBox="0 0 17 17" fill="none">
            <path d="M3.96312 13.2812H5.02562V6.90625H3.96312V13.2812ZM7.96875 13.2812H9.03125V3.71875H7.96875V13.2812ZM11.9744 13.2812H13.0369V10.0937H11.9744V13.2812ZM1.71594 17C1.22648 17 0.818125 16.8364 0.490875 16.5091C0.163625 16.1819 0 15.7732 0 15.283V1.717C0 1.22754 0.163979 0.819187 0.491937 0.491937C0.819896 0.164687 1.22825 0.000708333 1.717 0H15.2841C15.7728 0 16.1812 0.163979 16.5091 0.491937C16.8371 0.819896 17.0007 1.22825 17 1.717V15.2841C17 15.7728 16.8364 16.1812 16.5091 16.5091C16.1819 16.8371 15.7732 17.0007 15.283 17H1.71594ZM1.71594 15.9375H15.283C15.4459 15.9375 15.5957 15.8695 15.7324 15.7335C15.8691 15.5975 15.9371 15.4473 15.9364 15.283V1.717C15.9364 1.55338 15.8684 1.40321 15.7324 1.2665C15.5964 1.12979 15.4466 1.06179 15.283 1.0625H1.717C1.55338 1.0625 1.40321 1.1305 1.2665 1.2665C1.12979 1.4025 1.06179 1.55267 1.0625 1.717V15.2841C1.0625 15.447 1.1305 15.5968 1.2665 15.7335C1.4025 15.8702 1.55231 15.9382 1.71594 15.9375Z" fill="#494949"/>
          </svg>
          <span className="home-bento__label">MY 대시보드</span>
        </button>
      </section>

      {/* Featured STO Section */}
      <section className="home-featured">
        <div className="home-featured__header">
          <h2 className="home-featured__title">주목할 만한<br/>조각투자 상품</h2>
          <button className="home-featured__more" onClick={() => navigate('/invest')}>모두 보기</button>
        </div>

        <InvestCard card={FEATURED_CARD} onClick={() => navigate(`/invest/${FEATURED_CARD.id}`)} />

        {/* Small Secondary Cards */}
        <div className="home-secondary">
          <div className="home-secondary__card" onClick={() => navigate(`/invest/${SECONDARY_FNB.id}`)}>
            <div className="home-secondary__icon-wrap">
              <svg width="22" height="14" viewBox="0 0 22 14" fill="none"><path d="M19.1 11.95C19.3833 12.1 19.6333 12.0667 19.85 11.85C20.0667 11.6333 20.1 11.3833 19.95 11.1L18.5 8.4L17.45 11.1L19.1 11.95M14.1 11H15.3L17.7 5.05C17.75 4.91667 17.7375 4.80417 17.6625 4.7125C17.5875 4.62083 17.5 4.55 17.4 4.5L15.4 3.7C15.25 3.65 15.1042 3.66667 14.9625 3.75C14.8208 3.83333 14.7333 3.95 14.7 4.1L14.1 11M6.7 11H7.9L7.3 4.1C7.26667 3.91667 7.17917 3.79167 7.0375 3.725C6.89583 3.65833 6.75 3.65 6.6 3.7L4.6 4.5C4.46667 4.55 4.37083 4.62083 4.3125 4.7125C4.25417 4.80417 4.25 4.91667 4.3 5.05L6.7 11M2.9 11.95L4.55 11.1L3.5 8.4L2.05 11.1C1.9 11.3833 1.93333 11.6333 2.15 11.85C2.36667 12.0667 2.61667 12.1 2.9 11.95M9.9 11H12.1L12.85 2.55C12.8833 2.4 12.8458 2.27083 12.7375 2.1625C12.6292 2.05417 12.5 2 12.35 2H9.65C9.51667 2 9.39583 2.05417 9.2875 2.1625C9.17917 2.27083 9.13333 2.4 9.15 2.55L9.9 11M2.45 14C1.75 14 1.16667 13.7375 0.7 13.2125C0.233333 12.6875 0 12.0667 0 11.35C0 11.15 0.0291667 10.9542 0.0875 10.7625C0.145833 10.5708 0.216667 10.3833 0.3 10.2L2.5 6C2.26667 5.33333 2.275 4.675 2.525 4.025C2.775 3.375 3.21667 2.91667 3.85 2.65L5.85 1.85C6.08333 1.76667 6.31667 1.70833 6.55 1.675C6.78333 1.64167 7.01667 1.65 7.25 1.7C7.48333 1.21667 7.80833 0.8125 8.225 0.4875C8.64167 0.1625 9.11667 0 9.65 0H12.35C12.8833 0 13.3583 0.1625 13.775 0.4875C14.1917 0.8125 14.5167 1.21667 14.75 1.7C14.9833 1.66667 15.2167 1.6625 15.45 1.6875C15.6833 1.7125 15.9167 1.76667 16.15 1.85L18.15 2.65C18.8167 2.91667 19.2833 3.375 19.55 4.025C19.8167 4.675 19.8 5.31667 19.5 5.95L21.7 10.15C21.8 10.3333 21.875 10.525 21.925 10.725C21.975 10.925 22 11.1333 22 11.35C22 12.1 21.7458 12.7292 21.2375 13.2375C20.7292 13.7458 20.1 14 19.35 14C19.1667 14 18.9833 13.9792 18.8 13.9375C18.6167 13.8958 18.4333 13.8333 18.25 13.75L16.7 13H5.25L3.85 13.75C3.63333 13.8667 3.40417 13.9375 3.1625 13.9625C2.92083 13.9875 2.68333 14 2.45 14" fill="#231F20"/></svg>
            </div>
            <div className="home-secondary__text">
              <p className="home-secondary__name">{SECONDARY_FNB.name}</p>
              <p className="home-secondary__info">{STATUS_LABEL[SECONDARY_FNB.productStatus]} • {SECONDARY_FNB.rate}</p>
            </div>
          </div>
          <div className="home-secondary__card" onClick={() => navigate(`/invest/${SECONDARY_STAY.id}`)}>
            <div className="home-secondary__icon-wrap">
              <svg width="18" height="16" viewBox="0 0 18 16" fill="none"><path d="M9 1L1 8.5H3.5V15H7V11H11V15H14.5V8.5H17L9 1Z" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="home-secondary__text">
              <p className="home-secondary__name">{SECONDARY_STAY.name}</p>
              <p className="home-secondary__info">{STATUS_LABEL[SECONDARY_STAY.productStatus]} • {SECONDARY_STAY.rate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insight Section */}
      <section className="home-insight">
        <div className="home-insight__inner">
          <div className="home-insight__content">
            <h3 className="home-insight__title">투자 트렌드 리포트</h3>
            <p className="home-insight__desc">
              최근 2030 투자자들은 실물 자산 기반의 STO에 주목하고 있습니다. 특히 상권 분석 기반의 카페 토큰은...
            </p>
          </div>
          <div className="home-insight__icon-wrap">
            <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
              <path d="M16.25 7.375V5.25C16.9375 4.95833 17.6406 4.73958 18.3594 4.59375C19.0781 4.44792 19.8333 4.375 20.625 4.375C21.1667 4.375 21.6979 4.41667 22.2188 4.5C22.7396 4.58333 23.25 4.6875 23.75 4.8125V6.8125C23.25 6.625 22.7448 6.48438 22.2344 6.39062C21.724 6.29688 21.1875 6.25 20.625 6.25C19.8333 6.25 19.0729 6.34896 18.3438 6.54688C17.6146 6.74479 16.9167 7.02083 16.25 7.375M16.25 14.25V12.125C16.9375 11.8333 17.6406 11.6146 18.3594 11.4688C19.0781 11.3229 19.8333 11.25 20.625 11.25C21.1667 11.25 21.6979 11.2917 22.2188 11.375C22.7396 11.4583 23.25 11.5625 23.75 11.6875V13.6875C23.25 13.5 22.7448 13.3594 22.2344 13.2656C21.724 13.1719 21.1875 13.125 20.625 13.125C19.8333 13.125 19.0729 13.2188 18.3438 13.4062C17.6146 13.5938 16.9167 13.875 16.25 14.25M16.25 10.8125V8.6875C16.9375 8.39583 17.6406 8.17708 18.3594 8.03125C19.0781 7.88542 19.8333 7.8125 20.625 7.8125C21.1667 7.8125 21.6979 7.85417 22.2188 7.9375C22.7396 8.02083 23.25 8.125 23.75 8.25V10.25C23.25 10.0625 22.7448 9.92188 22.2344 9.82812C21.724 9.73438 21.1875 9.6875 20.625 9.6875C19.8333 9.6875 19.0729 9.78646 18.3438 9.98438C17.6146 10.1823 16.9167 10.4583 16.25 10.8125M6.875 15C7.85417 15 8.80729 15.1094 9.73438 15.3281C10.6615 15.5469 11.5833 15.875 12.5 16.3125V4C11.6458 3.5 10.7396 3.125 9.78125 2.875C8.82292 2.625 7.85417 2.5 6.875 2.5C6.125 2.5 5.38021 2.57292 4.64062 2.71875C3.90104 2.86458 3.1875 3.08333 2.5 3.375V15.75C3.22917 15.5 3.95312 15.3125 4.67188 15.1875C5.39062 15.0625 6.125 15 6.875 15M15 16.3125C15.9167 15.875 16.8385 15.5469 17.7656 15.3281C18.6927 15.1094 19.6458 15 20.625 15C21.375 15 22.1094 15.0625 22.8281 15.1875C23.5469 15.3125 24.2708 15.5 25 15.75V3.375C24.3125 3.08333 23.599 2.86458 22.8594 2.71875C22.1198 2.57292 21.375 2.5 20.625 2.5C19.6458 2.5 18.6771 2.625 17.7188 2.875C16.7604 3.125 15.8542 3.5 15 4V16.3125M13.75 20C12.75 19.2083 11.6667 18.5938 10.5 18.1562C9.33333 17.7188 8.125 17.5 6.875 17.5C6 17.5 5.14062 17.6146 4.29688 17.8438C3.45312 18.0729 2.64583 18.3958 1.875 18.8125C1.4375 19.0417 1.01562 19.0312 0.609375 18.7812C0.203125 18.5312 0 18.1667 0 17.6875V2.625C0 2.39583 0.0572917 2.17708 0.171875 1.96875C0.286458 1.76042 0.458333 1.60417 0.6875 1.5C1.64583 1 2.64583 0.625 3.6875 0.375C4.72917 0.125 5.79167 0 6.875 0C8.08333 0 9.26562 0.15625 10.4219 0.46875C11.5781 0.78125 12.6875 1.25 13.75 1.875C14.8125 1.25 15.9219 0.78125 17.0781 0.46875C18.2344 0.15625 19.4167 0 20.625 0C21.7083 0 22.7708 0.125 23.8125 0.375C24.8542 0.625 25.8542 1 26.8125 1.5C27.0417 1.60417 27.2135 1.76042 27.3281 1.96875C27.4427 2.17708 27.5 2.39583 27.5 2.625V17.6875C27.5 18.1667 27.2969 18.5312 26.8906 18.7812C26.4844 19.0312 26.0625 19.0417 25.625 18.8125C24.8542 18.3958 24.0469 18.0729 23.2031 17.8438C22.3594 17.6146 21.5 17.5 20.625 17.5C19.375 17.5 18.1667 17.7188 17 18.1562C15.8333 18.5938 14.75 19.2083 13.75 20" fill="#ffffff"/>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
