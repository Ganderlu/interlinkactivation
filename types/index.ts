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
