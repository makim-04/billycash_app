import type { Notice } from '../types/domain';

export const NOTICES: Notice[] = [
  { id:"n1", pinned:true, type:"service", tags:[{cls:"tag-yellow",label:"필독"},{cls:"tag-black",label:"서비스 안내"}], title:"빌리캐시 서비스 이용약관 개정 안내 (2025.03.01 시행)", preview:"조각투자 서비스 관련 이용약관이 개정됩니다.", date:"2025.02.20", views:"4,821" },
  { id:"n2", type:"product", tags:[{cls:"tag-black",label:"상품 안내"}], title:"신규 투자 상품 오픈: 용산 오마카세 스시켄", preview:"월 예상 수익률 5.0%, 얼리버드 특별 리워드 제공.", date:"2025.03.08", views:"3,204" },
  { id:"n3", type:"update", tags:[{cls:"tag-green",label:"업데이트",style:{background:"rgba(34,197,94,.1)",color:"#22C55E"}}], title:"앱 v2.4.0 업데이트 — 실시간 매출 대시보드 기능 추가", preview:"투자한 매장의 POS 매출을 실시간으로 확인할 수 있는 대시보드 기능이 출시되었습니다.", date:"2025.03.05", views:"2,190" },
  { id:"n4", type:"service", tags:[{cls:"tag-black",label:"서비스 안내"}], title:"2025년 2월 배당금 지급 완료 안내", preview:"2025년 2월분 매출 배당금이 정상 지급되었습니다.", date:"2025.03.01", views:"5,043" },
  { id:"n5", type:"product", tags:[{cls:"tag-black",label:"상품 안내"}], title:"성수동 르쁘띠파리 — 1년 수익 현황 리포트 공개", preview:"누적 배당률 +32% 달성!", date:"2025.02.15", views:"6,712" },
  { id:"n6", type:"service", tags:[{cls:"tag-black",label:"서비스 안내"}], title:"리워드 사용 방법 개선 안내", preview:"투자자 리워드(할인권, 예약권)의 사용 편의성 개선.", date:"2025.02.10", views:"1,887" },
];

export const NOTICE_BODIES: Record<string, React.ReactNode> = {
  n1: <><p>안녕하세요, 빌리캐시입니다.</p><p>2025년 3월 1일부터 서비스 이용약관이 개정됩니다.</p><h3>주요 변경 사항</h3><ul><li>조각투자 수익 배분 기준 명확화</li><li>리워드 제공 조건 및 사용 기간 명시</li><li>분쟁 해결 절차 보완</li></ul></>,
  n2: <><p>신규 투자 상품 <strong>용산 오마카세 스시켄</strong>이 오픈합니다.</p><ul><li>월 예상 수익률: <strong>5.0%</strong></li><li>최소 투자금: ₩100,000</li></ul></>,
  n3: <><p>앱 v2.4.0 업데이트가 완료되었습니다.</p><ul><li>POS 연동 실시간 매출 대시보드</li><li>리워드 쿠폰 사용 UX 개선</li><li>배당금 지급 알림 기능 추가</li></ul></>,
};
