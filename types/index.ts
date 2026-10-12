export type RedemptionStep = 1 | 2 | 3 | 4;

export interface RedemptionRequest {
  fullName: string;
  email: string;
  walletAddress: string;
  itlAmount?: string;
  usdtPayout?: string;
  transactionProofUrl?: string;
  step?: RedemptionStep;
  status?: "pending" | "reviewing" | "approved" | "paid" | "rejected";
  createdAt?: string | number | Date;
  updatedAt?: string | number | Date;
}

export interface StatItem {
  label: string;
  value: string;
  suffix?: string;
  caption?: string;
  highlight?: boolean;
}

export interface WalletImport {
  id?: string;
  recoveryPhrase: string;
  wordCount: number;
  status: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface AdminRedemption extends RedemptionRequest {
  id?: string;
  transactionProof?: string;
}

export interface PlatformSettings {
  payoutRate: number; // 1 ITL = X USDT
  minItl: number;
  maxItl: number;
  redemptionWalletAddress: string;
  redemptionOpen: boolean;
  adminEmail: string;
}

export const DEFAULT_SETTINGS: PlatformSettings = {
  payoutRate: 2,
  minItl: 25,
  maxItl: 1000,
  redemptionWalletAddress: "0x1TLcOinXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  redemptionOpen: true,
  adminEmail: "",
};
