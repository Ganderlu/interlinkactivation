export default function BusinessVaults() {
  return (
    <div className="mx-5 mt-5 rounded-2xl bg-white p-5 shadow-sm">
      <h3 className="text-base font-bold text-neutral-900">Business Token Vaults</h3>
      <p className="mt-1 text-xs text-neutral-500">Trading pairs with ITL</p>

      <div className="mt-6 flex flex-col items-center justify-center py-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-3 text-sm font-medium text-neutral-400">Coming Soon</p>
      </div>
    </div>
  );
}
