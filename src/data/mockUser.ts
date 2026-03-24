import type { User, Portfolio } from '../types/domain';

export const MOCK_USER: User = {
  id: 'u-001',
  name: '김민수',
  email: 'minsu.kim@example.com',
  phone: '010-1234-5678',
  joinDate: '2025-09-15',
  kycLevel: 2,
};

export const MOCK_PORTFOLIO: Portfolio = {
  // 아래 값은 holdings 기반으로 계산됨
  totalInvested: 4_220_000,    // 전체 투자 원금 합계
  currentValue: 4_463_900,     // 전체 현재 평가액 합계
  totalDividends: 491_850,     // 전체 누적 배당 합계
  tokenBalance: 35_000,        // 보유 토큰 잔액 (원화 환산)
  cashBalance: 20_000,         // 출금 가능 현금 (원)
  holdings: [
    // ── 모집중 (pending) ──
    {
      investCardId: 7, tokenName: 'MSDM-007', storeName: '강남 미소담 급식', category: '급식',
      // 토큰 단가 50,000원 × 15토큰 = 750,000원
      tokensOwned: 15, totalTokens: 500, purchasePrice: 750_000, currentValue: 750_000,
      monthlyYield: '3.8%', lastDividend: 0, status: '투자중', phase: '모집중',
      periodMonths: 12, elapsedMonths: 0,
      appliedDate: '2026-03-05', expectedIssueDate: '2026-04-02',
    },
    {
      investCardId: 10, tokenName: 'MLML-010', storeName: '판교 밀리밀 케이터링', category: '급식',
      // 토큰 단가 100,000원 × 4토큰 = 400,000원
      tokensOwned: 4, totalTokens: 600, purchasePrice: 400_000, currentValue: 400_000,
      monthlyYield: '4.5%', lastDividend: 0, status: '투자중', phase: '모집중',
      periodMonths: 6, elapsedMonths: 0,
      appliedDate: '2026-03-10', expectedIssueDate: '2026-04-07',
    },

    // ── 투자중 (live) ──
    {
      investCardId: 8, tokenName: 'GRNM-008', storeName: '송파 그린밀 도시락', category: '급식',
      // 토큰 단가 20,000원 × 40토큰 = 800,000원
      tokensOwned: 40, totalTokens: 5000, purchasePrice: 800_000, currentValue: 871_400,
      monthlyYield: '4.1%', lastDividend: 25_200, status: '투자중', phase: '투자중',
      periodMonths: 12, elapsedMonths: 3, issuedDate: '2025-12-28',
      dividendHistory: [
        { month: '2026-01', amount: 21_000 },
        { month: '2026-02', amount: 25_200 },
        { month: '2026-03', amount: 25_200 },
      ],
      storeRevenue: [
        { month: '2026-01', amount: 18_500_000 },
        { month: '2026-02', amount: 21_200_000 },
        { month: '2026-03', amount: 22_800_000 },
      ],
    },
    {
      investCardId: 9, tokenName: 'HSDT-009', storeName: '영등포 한솥도시락 본점', category: '급식',
      // 토큰 단가 10,000원 × 30토큰 = 300,000원
      tokensOwned: 30, totalTokens: 500, purchasePrice: 300_000, currentValue: 315_000,
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
      // 토큰 단가 50,000원 × 10토큰 = 500,000원
      tokensOwned: 10, totalTokens: 200, purchasePrice: 500_000, currentValue: 538_000,
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
      // 토큰 단가 100,000원 × 8토큰 = 800,000원
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
      // 토큰 단가 10,000원 × 35토큰 = 350,000원 (투자 원금은 그보다 높은 가격에 매수)
      // 실제 투자 원금 670,000원 (초기 500,000 + 추가 170,000)
      tokensOwned: 35, totalTokens: 500, purchasePrice: 670_000, currentValue: 670_000,
      monthlyYield: '3.2%', lastDividend: 33_600, status: '투자 종료',
      periodMonths: 12, elapsedMonths: 12,
      issuedDate: '2025-03-15',
      appliedDate: '2025-03-01',
      dividendHistory: [
        { month: '2025-04', amount: 17_900 },
        { month: '2025-05', amount: 19_300 },
        { month: '2025-06', amount: 20_100 },
        { month: '2025-07', amount: 20_900 },
        { month: '2025-08', amount: 21_400 },
        { month: '2025-09', amount: 21_400 },
        { month: '2025-10', amount: 21_800 },
        { month: '2025-11', amount: 21_400 },
        { month: '2025-12', amount: 21_400 },
        { month: '2026-01', amount: 21_400 },
        { month: '2026-02', amount: 21_400 },
        { month: '2026-03', amount: 21_400 },
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
    // 배당 (송파 그린밀)
    { id: 'tx-01', date: '2026-03-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 25_200, tokenCount: 40, yieldRate: '4.1%', status: '발행' },
    { id: 'tx-03', date: '2026-02-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 25_200, tokenCount: 40, yieldRate: '4.1%', status: '발행' },
    { id: 'tx-09', date: '2026-01-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 21_000, tokenCount: 40, yieldRate: '4.1%', status: '발행' },
    // 배당 (영등포 한솥)
    { id: 'tx-20a', date: '2026-03-15', type: '만기', storeName: '영등포 한솥도시락 본점', amount: 10_500, tokenCount: 30, yieldRate: '3.5%', status: '발행' },
    { id: 'tx-20b', date: '2026-02-15', type: '만기', storeName: '영등포 한솥도시락 본점', amount: 9_800, tokenCount: 30, yieldRate: '3.5%', status: '발행' },
    { id: 'tx-20c', date: '2026-01-15', type: '만기', storeName: '영등포 한솥도시락 본점', amount: 9_100, tokenCount: 30, yieldRate: '3.5%', status: '발행' },
    // 배당 (제주 돌담스테이)
    { id: 'tx-21a', date: '2026-03-15', type: '만기', storeName: '제주 돌담스테이', amount: 20_500, tokenCount: 10, yieldRate: '4.1%', status: '발행' },
    { id: 'tx-21b', date: '2026-02-15', type: '만기', storeName: '제주 돌담스테이', amount: 18_200, tokenCount: 10, yieldRate: '4.1%', status: '발행' },
    // 배당 (용산 스시켄)
    { id: 'tx-22a', date: '2026-02-15', type: '만기', storeName: '용산 오마카세 스시켄', amount: 18_750, tokenCount: 8, yieldRate: '5.0%', status: '발행' },
    { id: 'tx-22b', date: '2026-01-15', type: '만기', storeName: '용산 오마카세 스시켄', amount: 37_500, tokenCount: 8, yieldRate: '5.0%', status: '발행' },
    { id: 'tx-22c', date: '2025-12-15', type: '만기', storeName: '용산 오마카세 스시켄', amount: 40_000, tokenCount: 8, yieldRate: '5.0%', status: '발행' },
    // 투자 신청
    { id: 'tx-04', date: '2026-03-10', type: '투자', storeName: '판교 밀리밀 케이터링', amount: 400_000, tokenCount: 4, status: '모집중' },
    { id: 'tx-05', date: '2026-03-05', type: '투자', storeName: '강남 미소담 급식', amount: 250_000, tokenCount: 5, status: '모집중' },
    { id: 'tx-06', date: '2026-03-12', type: '투자', storeName: '강남 미소담 급식', amount: 500_000, tokenCount: 10, status: '모집중' },
    { id: 'tx-11', date: '2025-12-20', type: '투자', storeName: '송파 그린밀 도시락', amount: 800_000, tokenCount: 40, status: '발행' },
    { id: 'tx-12', date: '2025-12-15', type: '투자', storeName: '영등포 한솥도시락 본점', amount: 300_000, tokenCount: 30, status: '발행' },
    { id: 'tx-13', date: '2026-01-10', type: '투자', storeName: '제주 돌담스테이', amount: 500_000, tokenCount: 10, status: '발행' },
    { id: 'tx-14', date: '2025-11-15', type: '투자', storeName: '용산 오마카세 스시켄', amount: 800_000, tokenCount: 8, status: '발행' },
    { id: 'tx-15', date: '2025-03-01', type: '투자', storeName: '성수동 르쁘띠파리', amount: 670_000, tokenCount: 35, status: '발행' },
    // 입금
    { id: 'tx-30', date: '2026-02-25', type: '입금', storeName: '하나은행 입금', amount: 1_000_000, tokenCount: 0, status: '' },
    { id: 'tx-31', date: '2025-12-10', type: '입금', storeName: '하나은행 입금', amount: 2_000_000, tokenCount: 0, status: '' },
    { id: 'tx-32', date: '2025-11-01', type: '입금', storeName: '하나은행 입금', amount: 2_500_000, tokenCount: 0, status: '' },
    // 출금
    { id: 'tx-40', date: '2026-03-20', type: '출금', storeName: '하나은행 출금', amount: 280_000, tokenCount: 0, status: '' },
  ],
  tokenTransactions: [
    { id: 'tt-01', date: '2026-03-15', type: '배당 수령', description: '송파 그린밀 도시락 월 배당', tokenAmount: 25_200, balance: 55_000 },
    { id: 'tt-02', date: '2026-03-15', type: '배당 수령', description: '영등포 한솥도시락 월 배당', tokenAmount: 10_500, balance: 29_800 },
    { id: 'tt-03', date: '2026-03-15', type: '배당 수령', description: '제주 돌담스테이 월 배당', tokenAmount: 20_500, balance: 19_300 },
    { id: 'tt-04', date: '2026-03-10', type: '투자', description: '판교 밀리밀 케이터링 투자', tokenAmount: -400_000, balance: -1_200 },
    { id: 'tt-05', date: '2026-03-05', type: '투자', description: '강남 미소담 급식 투자', tokenAmount: -375_000, balance: 398_800 },
    { id: 'tt-06', date: '2026-02-28', type: '충전', description: 'KRW → 충전', tokenAmount: 500_000, balance: 773_800 },
    { id: 'tt-07', date: '2026-02-15', type: '배당 수령', description: '송파 그린밀 도시락 월 배당', tokenAmount: 25_200, balance: 273_800 },
    { id: 'tt-08', date: '2026-02-15', type: '배당 수령', description: '영등포 한솥도시락 월 배당', tokenAmount: 9_800, balance: 248_600 },
    { id: 'tt-09', date: '2026-02-15', type: '배당 수령', description: '제주 돌담스테이 월 배당', tokenAmount: 18_200, balance: 238_800 },
  ],
};
