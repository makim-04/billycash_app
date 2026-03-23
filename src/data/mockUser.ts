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
  totalInvested: 2_270_000,
  currentValue: 2_436_900,
  totalDividends: 105_000,
  tokenBalance: 55_000,
  holdings: [
    {
      investCardId: 7, tokenName: 'MSDM-007', storeName: '강남 미소담 급식', category: '급식',
      tokensOwned: 50, totalTokens: 500, purchasePrice: 750_000, currentValue: 802_500,
      monthlyYield: '3.8%', lastDividend: 28_500, status: '투자중', phase: '모집중',
      periodMonths: 12, elapsedMonths: 0,
    },
    {
      investCardId: 10, tokenName: 'MLML-010', storeName: '판교 밀리밀 케이터링', category: '급식',
      tokensOwned: 20, totalTokens: 600, purchasePrice: 400_000, currentValue: 428_000,
      monthlyYield: '4.5%', lastDividend: 18_000, status: '투자중', phase: '모집중',
      periodMonths: 6, elapsedMonths: 0,
    },
    {
      investCardId: 8, tokenName: 'GRNM-008', storeName: '송파 그린밀 도시락', category: '급식',
      tokensOwned: 40, totalTokens: 5000, purchasePrice: 820_000, currentValue: 891_400,
      monthlyYield: '4.1%', lastDividend: 25_200, status: '투자중', phase: '토큰 발행',
      periodMonths: 12, elapsedMonths: 3,
    },
    {
      investCardId: 9, tokenName: 'HSDT-009', storeName: '영등포 한솥도시락 본점', category: '급식',
      tokensOwned: 30, totalTokens: 500, purchasePrice: 300_000, currentValue: 315_000,
      monthlyYield: '3.5%', lastDividend: 10_500, status: '투자중', phase: '모집중',
      periodMonths: 9, elapsedMonths: 0,
    },
    {
      investCardId: 1, tokenName: 'LPTP-001', storeName: '성수동 르쁘띠파리', category: 'F&B',
      tokensOwned: 35, totalTokens: 500, purchasePrice: 1_050_000, currentValue: 1_123_500,
      monthlyYield: '3.2%', lastDividend: 33_600, status: '투자 종료',
      periodMonths: 12, elapsedMonths: 12,
    },
  ],
  transactions: [
    // 배당 (만기)
    { id: 'tx-01', date: '2026-04-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 33_600, tokenCount: 40, yieldRate: '4.1%', status: '발행' },
    { id: 'tx-03', date: '2026-03-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 25_200, tokenCount: 30, yieldRate: '4.2%', status: '발행' },
    { id: 'tx-07', date: '2026-02-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 25_200, tokenCount: 30, yieldRate: '4.2%', status: '발행' },
    { id: 'tx-09', date: '2026-01-15', type: '만기', storeName: '송파 그린밀 도시락', amount: 21_000, tokenCount: 25, yieldRate: '4.2%', status: '발행' },
    // 매수 (추가 토큰 구매)
    { id: 'tx-02', date: '2026-03-17', type: '매수', storeName: '송파 그린밀 도시락', amount: 220_000, tokenCount: 10, status: '발행' },
    { id: 'tx-08', date: '2026-02-10', type: '매수', storeName: '송파 그린밀 도시락', amount: 100_000, tokenCount: 5, status: '발행' },
    // 투자 (최초 신청)
    { id: 'tx-04', date: '2026-03-01', type: '투자', storeName: '판교 밀리밀 케이터링', amount: 400_000, tokenCount: 20, status: '모집중' },
    { id: 'tx-05', date: '2025-12-25', type: '투자', storeName: '강남 미소담 급식', amount: 300_000, tokenCount: 20, status: '모집중' },
    { id: 'tx-06', date: '2026-02-20', type: '투자', storeName: '강남 미소담 급식', amount: 450_000, tokenCount: 30, status: '모집중' },
    { id: 'tx-11', date: '2025-12-20', type: '투자', storeName: '송파 그린밀 도시락', amount: 500_000, tokenCount: 25, status: '발행' },
    { id: 'tx-12', date: '2025-12-15', type: '투자', storeName: '영등포 한솥도시락 본점', amount: 300_000, tokenCount: 30, status: '모집중' },
    // 입금
    { id: 'tx-20', date: '2026-02-25', type: '입금', storeName: '하나은행 입금', amount: 1_000_000, tokenCount: 0, status: '' },
    { id: 'tx-21', date: '2025-12-10', type: '입금', storeName: '하나은행 입금', amount: 1_500_000, tokenCount: 0, status: '' },
    // 출금
    { id: 'tx-30', date: '2026-05-10', type: '출금', storeName: '하나은행 출금', amount: 280_000, tokenCount: 0, status: '' },
  ],
  tokenTransactions: [
    { id: 'tt-01', date: '2026-03-15', type: '배당 수령', description: '성수동 르쁘띠파리 월 배당', tokenAmount: 336, balance: 3_925 },
    { id: 'tt-02', date: '2026-03-15', type: '배당 수령', description: '연남동 뮤트커피 월 배당', tokenAmount: 224, balance: 3_589 },
    { id: 'tt-03', date: '2026-03-15', type: '배당 수령', description: '제주 돌담스테이 월 배당', tokenAmount: 205, balance: 3_365 },
    { id: 'tt-04', date: '2026-03-01', type: '투자', description: '제주 돌담스테이 5토큰 투자', tokenAmount: -250, balance: 3_160 },
    { id: 'tt-05', date: '2026-02-28', type: '충전', description: 'KRW → 토큰 충전', tokenAmount: 500, balance: 3_410 },
    { id: 'tt-06', date: '2026-02-15', type: '배당 수령', description: '성수동 르쁘띠파리 월 배당', tokenAmount: 336, balance: 2_910 },
    { id: 'tt-07', date: '2026-02-15', type: '배당 수령', description: '연남동 뮤트커피 월 배당', tokenAmount: 224, balance: 2_574 },
    { id: 'tt-08', date: '2026-02-01', type: '투자', description: '연남동 뮤트커피 40토큰 투자', tokenAmount: -400, balance: 2_350 },
    { id: 'tt-09', date: '2026-01-20', type: '충전', description: 'KRW → 토큰 충전', tokenAmount: 1_000, balance: 2_750 },
    { id: 'tt-10', date: '2025-12-10', type: '투자', description: '제주 돌담스테이 5토큰 투자', tokenAmount: -250, balance: 1_750 },
    { id: 'tt-11', date: '2025-11-05', type: '충전', description: 'KRW → 토큰 충전', tokenAmount: 2_000, balance: 2_000 },
  ],
};
