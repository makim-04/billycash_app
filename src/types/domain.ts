export interface InvestCard {
  id: number;
  cat: string;
  emoji: string;
  catLabel: string;
  thumbCls: string;
  statusCls: string;
  status: string;
  investors: string;
  name: string;
  sub: string;
  pct: number;
  progCls: string;
  pctLabel: string;
  pctLabelCls: string;
  minInvest: string;
  rate: string;
  reward: string;
  totalTokens: number;
  img?: string;
  periodMonths?: number;
}

export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

export interface FaqGroup {
  group: string;
  icon: string;
  title: string;
  items: FaqItem[];
}

export interface NoticeTag {
  cls: string;
  label: string;
  style?: React.CSSProperties;
}

export interface Notice {
  id: string;
  pinned?: boolean;
  type: string;
  tags: NoticeTag[];
  title: string;
  preview: string;
  date: string;
  views: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface HistoryItem {
  year: number;
  month: number;
  title: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  kycLevel: number;
}

export interface TokenHolding {
  investCardId: number;
  tokenName: string;
  storeName: string;
  category: string;
  tokensOwned: number;
  totalTokens: number;
  purchasePrice: number;
  currentValue: number;
  monthlyYield: string;
  lastDividend: number;
  status: '찜' | '투자중' | '투자 종료';
  phase?: '모집중' | '토큰 발행';
  periodMonths?: number;
  elapsedMonths?: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: '투자' | '매수' | '만기' | '출금' | '입금';
  storeName: string;
  amount: number;
  tokenCount?: number;
  yieldRate?: string;
  status: '발행' | '모집중' | '처리중' | '취소' | '';
}

export interface TokenTransaction {
  id: string;
  date: string;
  type: '충전' | '출금' | '투자' | '배당 수령' | '환급';
  description: string;
  tokenAmount: number;
  balance: number;
}

export interface Portfolio {
  totalInvested: number;
  currentValue: number;
  totalDividends: number;
  tokenBalance: number;
  holdings: TokenHolding[];
  transactions: Transaction[];
  tokenTransactions: TokenTransaction[];
}
