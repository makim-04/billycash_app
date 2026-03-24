import type { User, Portfolio } from '../types/domain';

export const MOCK_USER: User = {
  id: 'u-001',
  name: '김민수',
  email: 'minsu.kim@example.com',
  phone: '010-1234-5678',
  joinDate: '2025-02-15',
  kycLevel: 2,
};

// ── 자금 흐름 검증 ──
// 입금: 800,000 + 2,000,000 + 800,000 + 2,000,000 = 5,600,000
// 투자: 700,000 + 800,000 + 300,000 + 800,000 + 500,000 + 500,000 + 400,000 + 1,000,000 = 5,000,000
// 배당: 261,200 + 96,250 + 95,200 + 29,400 + 38,700 = 520,750
// 만기 상환: 700,000
// 출금: 280,000
// cashBalance = 5,600,000 - 5,000,000 + 520,750 + 700,000 - 280,000 = 1,540,750

export const MOCK_PORTFOLIO: Portfolio = {
  totalInvested: 5_000_000,
  currentValue: 5_036_900,
  totalDividends: 520_750,
  cashBalance: 1_540_750,
  holdings: [
    // ── 모집중 (pending) ──
    {
      investCardId: 7, tokenName: 'MSDM-007', storeName: '강남 미소담 급식', category: '급식',
      // 5토큰 + 10토큰 = 15토큰 × 100,000원 = 1,500,000원
      tokensOwned: 15, totalTokens: 500, purchasePrice: 1_500_000, currentValue: 1_500_000,
      monthlyYield: '3.8%', lastDividend: 0, status: '투자중', phase: '모집중',
      periodMonths: 12, elapsedMonths: 0,
      appliedDate: '2026-03-05', expectedIssueDate: '2026-04-02',
    },
    {
      investCardId: 10, tokenName: 'MLML-010', storeName: '판교 밀리밀 케이터링', category: '급식',
      // 4토큰 × 100,000원 = 400,000원
      tokensOwned: 4, totalTokens: 600, purchasePrice: 400_000, currentValue: 400_000,
      monthlyYield: '4.5%', lastDividend: 0, status: '투자중', phase: '모집중',
      periodMonths: 6, elapsedMonths: 0,
      appliedDate: '2026-03-10', expectedIssueDate: '2026-04-07',
    },

    // ── 투자중 (live) ──
    {
      investCardId: 8, tokenName: 'GRNM-008', storeName: '송파 그린밀 도시락', category: '급식',
      // 8토큰 × 100,000원 = 800,000원
      tokensOwned: 8, totalTokens: 5000, purchasePrice: 800_000, currentValue: 871_400,
      monthlyYield: '4.2%', lastDividend: 33_600, status: '투자중', phase: '투자중',
      periodMonths: 12, elapsedMonths: 3, issuedDate: '2025-12-28',
      dividendHistory: [
        { month: '2026-01', amount: 28_000 },
        { month: '2026-02', amount: 33_600 },
        { month: '2026-03', amount: 33_600 },
      ],
      storeRevenue: [
        { month: '2026-01', amount: 18_500_000 },
        { month: '2026-02', amount: 21_200_000 },
        { month: '2026-03', amount: 22_800_000 },
      ],
    },
    {
      investCardId: 9, tokenName: 'HSDT-009', storeName: '영등포 한솥도시락 본점', category: '급식',
      // 3토큰 × 100,000원 = 300,000원
      tokensOwned: 3, totalTokens: 500, purchasePrice: 300_000, currentValue: 315_000,
      monthlyYield: '3.5%', lastDividend: 10_500, status: '투자중', phase: '투자중',
      periodMonths: 9, elapsedMonths: 3, issuedDate: '2025-12-29',
      dividendHistory: [
        { month: '2026-01', amount: 9_100 },
        { month: '2026-02', amount: 9_800 },
        { month: '2026-03', amount: 10_500 },
      ],
      storeRevenue: [
        { month: '2026-01', amount: 15_500_000 },
        { month: '2026-02', amount: 15_300_000 },
        { month: '2026-03', amount: 16_800_000 },
      ],
    },
    {
      investCardId: 3, tokenName: 'JJDS-003', storeName: '제주 돌담스테이', category: '스테이',
      // 5토큰 × 100,000원 = 500,000원
      tokensOwned: 5, totalTokens: 200, purchasePrice: 500_000, currentValue: 538_000,
      monthlyYield: '4.1%', lastDividend: 20_500, status: '투자중', phase: '투자중',
      periodMonths: 3, elapsedMonths: 2, issuedDate: '2026-01-15',
      dividendHistory: [
        { month: '2026-02', amount: 18_200 },
        { month: '2026-03', amount: 20_500 },
      ],
      storeRevenue: [
        { month: '2026-02', amount: 8_900_000 },
        { month: '2026-03', amount: 11_200_000 },
      ],
    },

    // ── 연체 (delay) ──
    {
      investCardId: 5, tokenName: 'SSKN-005', storeName: '용산 오마카세 스시켄', category: 'F&B',
      // 8토큰 × 100,000원 = 800,000원
      tokensOwned: 8, totalTokens: 300, purchasePrice: 800_000, currentValue: 712_500,
      monthlyYield: '5.0%', lastDividend: 0, status: '투자중', phase: '투자중',
      periodMonths: 12, elapsedMonths: 4, issuedDate: '2025-11-20',
      dividendHistory: [
        { month: '2025-12', amount: 40_000 },
        { month: '2026-01', amount: 37_500 },
        { month: '2026-02', amount: 18_750 },
        { month: '2026-03', amount: 0 },
      ],
      storeRevenue: [
        { month: '2025-12', amount: 35_000_000 },
        { month: '2026-01', amount: 32_000_000 },
        { month: '2026-02', amount: 18_500_000 },
        { month: '2026-03', amount: 9_200_000 },
      ],
    },

    // ── 만기 상환 (expired) ──
    {
      investCardId: 1, tokenName: 'LPTP-001', storeName: '성수동 르쁘띠파리', category: 'F&B',
      // 7토큰 × 100,000원 = 700,000원
      tokensOwned: 7, totalTokens: 500, purchasePrice: 700_000, currentValue: 700_000,
      monthlyYield: '3.2%', lastDividend: 22_400, status: '투자 종료',
      periodMonths: 12, elapsedMonths: 12,
      issuedDate: '2025-03-15',
      appliedDate: '2025-03-01',
      dividendHistory: [
        { month: '2025-04', amount: 18_700 },
        { month: '2025-05', amount: 20_100 },
        { month: '2025-06', amount: 21_000 },
        { month: '2025-07', amount: 21_800 },
        { month: '2025-08', amount: 22_400 },
        { month: '2025-09', amount: 22_400 },
        { month: '2025-10', amount: 22_800 },
        { month: '2025-11', amount: 22_400 },
        { month: '2025-12', amount: 22_400 },
        { month: '2026-01', amount: 22_400 },
        { month: '2026-02', amount: 22_400 },
        { month: '2026-03', amount: 22_400 },
      ],
      storeRevenue: [
        { month: '2025-04', amount: 28_000_000 },
        { month: '2025-05', amount: 31_000_000 },
        { month: '2025-06', amount: 33_500_000 },
        { month: '2025-07', amount: 35_200_000 },
        { month: '2025-08', amount: 36_800_000 },
        { month: '2025-09', amount: 35_500_000 },
        { month: '2025-10', amount: 37_100_000 },
        { month: '2025-11', amount: 34_800_000 },
        { month: '2025-12', amount: 36_200_000 },
        { month: '2026-01', amount: 35_900_000 },
        { month: '2026-02', amount: 36_500_000 },
        { month: '2026-03', amount: 37_800_000 },
      ],
    },
  ],
  transactions: [
    // 배당 (성수동 르쁘띠파리 — 7토큰, 12개월)
    { id: 'tx-s01', date: '2026-03-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 22_400, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s02', date: '2026-02-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 22_400, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s03', date: '2026-01-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 22_400, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s04', date: '2025-12-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 22_400, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s05', date: '2025-11-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 22_400, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s06', date: '2025-10-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 22_800, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s07', date: '2025-09-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 22_400, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s08', date: '2025-08-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 22_400, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s09', date: '2025-07-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 21_800, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s10', date: '2025-06-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 21_000, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s11', date: '2025-05-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 20_100, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    { id: 'tx-s12', date: '2025-04-15', type: '만기', storeName: '성수동 르쁘띠파리', amount: 18_700, tokenCount: 7, yieldRate: '3.2%', status: '발행' },
    // 배당 (송파 그린밀 — 8토큰)
    { id: 'tx-01', date: '2026-03-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 33_600, tokenCount: 8, yieldRate: '4.2%', status: '발행' },
    { id: 'tx-03', date: '2026-02-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 33_600, tokenCount: 8, yieldRate: '4.2%', status: '발행' },
    { id: 'tx-09', date: '2026-01-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 28_000, tokenCount: 8, yieldRate: '4.2%', status: '발행' },
    // 배당 (영등포 한솥 — 3토큰)
    { id: 'tx-20a', date: '2026-03-15', type: '만기', storeName: '영등포 한솥도시락 본점', amount: 10_500, tokenCount: 3, yieldRate: '3.5%', status: '발행' },
    { id: 'tx-20b', date: '2026-02-15', type: '만기', storeName: '영등포 한솥도시락 본점', amount: 9_800, tokenCount: 3, yieldRate: '3.5%', status: '발행' },
    { id: 'tx-20c', date: '2026-01-15', type: '만기', storeName: '영등포 한솥도시락 본점', amount: 9_100, tokenCount: 3, yieldRate: '3.5%', status: '발행' },
    // 배당 (제주 돌담스테이 — 5토큰)
    { id: 'tx-21a', date: '2026-03-15', type: '만기', storeName: '제주 돌담스테이', amount: 20_500, tokenCount: 5, yieldRate: '4.1%', status: '발행' },
    { id: 'tx-21b', date: '2026-02-15', type: '만기', storeName: '제주 돌담스테이', amount: 18_200, tokenCount: 5, yieldRate: '4.1%', status: '발행' },
    // 배당 (용산 스시켄 — 8토큰)
    { id: 'tx-22a', date: '2026-02-15', type: '만기', storeName: '용산 오마카세 스시켄', amount: 18_750, tokenCount: 8, yieldRate: '5.0%', status: '발행' },
    { id: 'tx-22b', date: '2026-01-15', type: '만기', storeName: '용산 오마카세 스시켄', amount: 37_500, tokenCount: 8, yieldRate: '5.0%', status: '발행' },
    { id: 'tx-22c', date: '2025-12-15', type: '만기', storeName: '용산 오마카세 스시켄', amount: 40_000, tokenCount: 8, yieldRate: '5.0%', status: '발행' },
    // 투자 신청 (1토큰=100,000원)
    { id: 'tx-15', date: '2025-03-01', type: '투자', storeName: '성수동 르쁘띠파리', amount: 700_000, tokenCount: 7, status: '발행' },
    { id: 'tx-14', date: '2025-11-15', type: '투자', storeName: '용산 오마카세 스시켄', amount: 800_000, tokenCount: 8, status: '발행' },
    { id: 'tx-12', date: '2025-12-15', type: '투자', storeName: '영등포 한솥도시락 본점', amount: 300_000, tokenCount: 3, status: '발행' },
    { id: 'tx-11', date: '2025-12-20', type: '투자', storeName: '송파 그린밀 도시락', amount: 800_000, tokenCount: 8, status: '발행' },
    { id: 'tx-13', date: '2026-01-10', type: '투자', storeName: '제주 돌담스테이', amount: 500_000, tokenCount: 5, status: '발행' },
    { id: 'tx-05', date: '2026-03-05', type: '투자', storeName: '강남 미소담 급식', amount: 500_000, tokenCount: 5, status: '모집중' },
    { id: 'tx-04', date: '2026-03-10', type: '투자', storeName: '판교 밀리밀 케이터링', amount: 400_000, tokenCount: 4, status: '모집중' },
    { id: 'tx-06', date: '2026-03-12', type: '투자', storeName: '강남 미소담 급식', amount: 1_000_000, tokenCount: 10, status: '모집중' },
    // 입금
    { id: 'tx-30', date: '2025-02-20', type: '입금', storeName: '하나은행 입금', amount: 800_000, tokenCount: 0, status: '' },
    { id: 'tx-31', date: '2025-11-01', type: '입금', storeName: '하나은행 입금', amount: 2_000_000, tokenCount: 0, status: '' },
    { id: 'tx-32', date: '2025-12-10', type: '입금', storeName: '하나은행 입금', amount: 800_000, tokenCount: 0, status: '' },
    { id: 'tx-33', date: '2026-02-25', type: '입금', storeName: '하나은행 입금', amount: 2_000_000, tokenCount: 0, status: '' },
    // 출금
    { id: 'tx-40', date: '2026-03-20', type: '출금', storeName: '하나은행 출금', amount: 280_000, tokenCount: 0, status: '' },
  ],
  tokenTransactions: [
    { id: 'tt-01', date: '2026-03-15', type: '배당 수령', description: '성수동 르쁘띠파리 만기 상환 (원금)', tokenAmount: 700_000, balance: 1_540_750 },
    { id: 'tt-02', date: '2026-03-15', type: '배당 수령', description: '3월 배당 (4개 상품)', tokenAmount: 87_000, balance: 840_750 },
    { id: 'tt-03', date: '2026-03-20', type: '출금', description: '하나은행 출금', tokenAmount: -280_000, balance: 753_750 },
    { id: 'tt-04', date: '2026-03-12', type: '투자', description: '강남 미소담 급식 추가 신청', tokenAmount: -1_000_000, balance: 1_033_750 },
    { id: 'tt-05', date: '2026-03-10', type: '투자', description: '판교 밀리밀 케이터링 신청', tokenAmount: -400_000, balance: 2_033_750 },
    { id: 'tt-06', date: '2026-03-05', type: '투자', description: '강남 미소담 급식 신청', tokenAmount: -500_000, balance: 2_433_750 },
    { id: 'tt-07', date: '2026-02-25', type: '충전', description: '하나은행 입금', tokenAmount: 2_000_000, balance: 2_933_750 },
    { id: 'tt-08', date: '2026-02-15', type: '배당 수령', description: '2월 배당 (5개 상품)', tokenAmount: 102_750, balance: 933_750 },
    { id: 'tt-09', date: '2026-01-15', type: '배당 수령', description: '1월 배당 (4개 상품)', tokenAmount: 97_000, balance: 831_000 },
    { id: 'tt-10', date: '2026-01-10', type: '투자', description: '제주 돌담스테이 신청', tokenAmount: -500_000, balance: 734_000 },
  ],
};
