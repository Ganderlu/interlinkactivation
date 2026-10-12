const steps = [
  {
    num: "01",
    title: "Enter an amount",
    desc:
      "Enter the amount of ITL you want to redeem and see your USDT payout calculated instantly.",
  },
  {
    num: "02",
    title: "Send your ITL",
    desc:
      "Transfer your ITL to our redemption address and upload a screenshot as proof of the transaction.",
  },
  {
    num: "03",
    title: "Get paid",
    desc:
      "Our team manually verifies your transfer and settles your payout to your bank account or wallet.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-3">
        <span className="section-eyebrow">PROCESS</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Three steps to redeem ITL
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {steps.map((s) => (
          <div
            key={s.num}
            className="glass-card p-6 sm:p-7 transition-all duration-300 hover:border-brand-600/50 hover:-translate-y-0.5"
          >
            <div className="text-sm font-bold bg-brand-gradient bg-clip-text text-transparent tracking-wider">
              {s.num}
            </div>
            <h3 className="mt-3 text-lg sm:text-xl font-bold text-white">
              {s.title}
            </h3>
            <p className="mt-2.5 text-sm leading-7 text-neutral-400">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
