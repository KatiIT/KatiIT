export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-semibold tracking-tight ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" fill="none">
        <rect x="1" y="1" width="24" height="24" rx="7" fill="#0B0F17" stroke="rgba(255,255,255,0.14)" />
        <path d="M7 7v12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 13l7-6" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 13l7 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-[17px] text-ink">
        Kati<span className="text-ink-muted">IT</span>
      </span>
    </span>
  );
}
