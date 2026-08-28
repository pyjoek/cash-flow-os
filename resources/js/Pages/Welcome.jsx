import { Head, Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

const ledgerRows = [
    { label: 'Uber', category: 'Transport', amount: '-12,000', type: 'expense' },
    { label: 'CRDB Deposit', category: 'Sales', amount: '+450,000', type: 'income' },
    { label: 'Electricity', category: 'Utilities', amount: '-38,500', type: 'expense' },
    { label: 'Salary — John', category: 'Payroll', amount: '-600,000', type: 'expense' },
    { label: 'Vodacom M-Pesa', category: 'Mobile Money', amount: '+120,000', type: 'income' },
];

function LedgerRow({ row }) {
    const positive = row.type === 'income';
    return (
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
                <p className="font-medium text-[15px] text-[#F4F1E8]">{row.label}</p>
                <p className="text-xs uppercase tracking-wide text-[#8FB6A8]">{row.category}</p>
            </div>
            <p className="font-mono text-sm" style={{ color: positive ? '#9FCDB8' : '#E8B98A' }}>
                {row.amount}
                <span className="ml-1 text-[10px] text-[#6E9086]">TZS</span>
            </p>
        </div>
    );
}

const features = [
    {
        title: 'Every account, one place',
        body: 'Cash, bank, M-Pesa, Airtel Money, Visa, PayPal — track balances across all of them instead of piecing it together from memory and paper.',
    },
    {
        title: 'Smart categorization',
        body: 'Log a transaction and FlowPilot suggests a category based on the description — Uber becomes Transport, a CRDB deposit becomes Sales — one click to apply it.',
    },
    {
        title: 'Real cash flow dashboard',
        body: "Current balance, cash in, cash out, and net cash for the month — plus a 7-day trend and your top expense categories, computed from your actual data.",
    },
    {
        title: '30-day forecast',
        body: "A projected balance 30 days out, based on your real cash flow over the last month — so you can see a squeeze coming before it happens.",
    },
];

const steps = [
    { step: '01', title: 'Create a free account', body: 'No credit card, no trial period — just register.' },
    { step: '02', title: 'Add your accounts', body: 'Cash drawer, bank account, mobile money — whatever you actually use.' },
    { step: '03', title: 'Log transactions', body: 'Income and expenses, categorized as you go — or accept a suggestion.' },
    { step: '04', title: 'See where you stand', body: 'One dashboard, updated in real time, with a forecast for what\u2019s next.' },
];

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="FlowPilot — Free cash flow tracking for small businesses" />

            <div className="min-h-screen bg-[#FBF7EE]" style={{ fontFamily: "'Inter', sans-serif" }}>

                {/* Header */}
                <header className="border-b border-[#E4DCC8]">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                        <div className="flex items-center gap-2">
                            <ApplicationLogo />
                            <span className="text-[15px] font-medium text-[#16231F]">FlowPilot</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-4 py-2 text-sm font-medium text-white"
                                    style={{ backgroundColor: '#0F2E2B' }}
                                >
                                    Go to dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-[#16231F] hover:bg-[#F1ECDD]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-4 py-2 text-sm font-medium text-white"
                                        style={{ backgroundColor: '#0F2E2B' }}
                                    >
                                        Create free account
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <section className="mx-auto max-w-6xl px-6 py-16 lg:flex lg:items-center lg:gap-12 lg:py-24">
                    <div className="lg:w-1/2">
                        <span
                            className="inline-block rounded-full px-3 py-1 text-xs font-medium"
                            style={{ backgroundColor: '#EFE3C8', color: '#8A6A1F' }}
                        >
                            Free. Always. No catch.
                        </span>

                        <h1
                            className="mt-5 text-4xl leading-tight text-[#16231F] lg:text-5xl"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                        >
                            See your cash flow clearly — without paying for it.
                        </h1>

                        <p className="mt-5 text-[17px] leading-relaxed text-[#6B6558]">
                            FlowPilot is a cash flow tool for small businesses running on cash, bank
                            accounts, and mobile money. Built as a free community project — not a
                            trial, not a "free tier," just a tool that stays free because it was
                            built to help people manage money, not to extract it from them.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href={route(auth?.user ? 'dashboard' : 'register')}
                                className="rounded-md px-6 py-3 text-[15px] font-medium text-white"
                                style={{ backgroundColor: '#0F2E2B' }}
                            >
                                {auth?.user ? 'Go to dashboard' : 'Get started — it\u2019s free'}
                            </Link>
                            <a
                                href="#how-it-works"
                                className="rounded-md border border-[#DDD6C4] px-6 py-3 text-[15px] font-medium text-[#16231F]"
                            >
                                See how it works
                            </a>
                        </div>
                    </div>

                    {/* Ledger preview panel */}
                    <div className="mt-12 overflow-hidden rounded-xl lg:mt-0 lg:w-1/2" style={{ backgroundColor: '#0F2E2B' }}>
                        <div className="px-6 pt-8">
                            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: '#8FB6A8' }}>
                                Current balance
                            </p>
                            <p
                                className="mt-2 text-4xl"
                                style={{ fontFamily: "'Fraunces', serif", color: '#F4F1E8', fontWeight: 500 }}
                            >
                                2,847,300 <span className="text-base text-[#8FB6A8]">TZS</span>
                            </p>
                        </div>
                        <div className="mt-6 divide-y divide-white/5">
                            {ledgerRows.map((row, i) => (
                                <LedgerRow row={row} key={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why free */}
                <section className="border-y border-[#E4DCC8] bg-[#F6F2E8]">
                    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
                        <h2
                            className="text-2xl text-[#16231F]"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                        >
                            Why this is free
                        </h2>
                        <p className="mt-4 text-[15px] leading-relaxed text-[#6B6558]">
                            A lot of small businesses run their finances on paper, memory, or a
                            notebook — not because they don't want better tools, but because most
                            finance software is priced for businesses much bigger than theirs.
                            FlowPilot exists to close that gap. It's built and maintained as an
                            open, community project: no subscription tier, no "upgrade to unlock,"
                            no ads. If it's useful to you, it's yours to use.
                        </p>
                    </div>
                </section>

                {/* Features */}
                <section className="mx-auto max-w-6xl px-6 py-16">
                    <h2
                        className="text-2xl text-[#16231F]"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                    >
                        What you get
                    </h2>
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {features.map((f) => (
                            <div key={f.title} className="rounded-lg border border-[#E4DCC8] bg-white p-6">
                                <h3 className="text-[15px] font-medium text-[#16231F]">{f.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-[#6B6558]">{f.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How it works */}
                <section id="how-it-works" className="border-t border-[#E4DCC8] bg-[#F6F2E8]">
                    <div className="mx-auto max-w-6xl px-6 py-16">
                        <h2
                            className="text-2xl text-[#16231F]"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                        >
                            How it works
                        </h2>
                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {steps.map((s) => (
                                <div key={s.step}>
                                    <p className="font-mono text-sm" style={{ color: '#C08A28' }}>
                                        {s.step}
                                    </p>
                                    <h3 className="mt-2 text-[15px] font-medium text-[#16231F]">{s.title}</h3>
                                    <p className="mt-1 text-sm text-[#6B6558]">{s.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="mx-auto max-w-3xl px-6 py-20 text-center">
                    <h2
                        className="text-3xl text-[#16231F]"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                    >
                        Start seeing your cash flow today.
                    </h2>
                    <p className="mt-3 text-[15px] text-[#6B6558]">
                        Free to use, free to keep using. No card required.
                    </p>
                    <Link
                        href={route(auth?.user ? 'dashboard' : 'register')}
                        className="mt-6 inline-block rounded-md px-6 py-3 text-[15px] font-medium text-white"
                        style={{ backgroundColor: '#0F2E2B' }}
                    >
                        {auth?.user ? 'Go to dashboard' : 'Create your free account'}
                    </Link>
                </section>

                {/* Footer */}
                <footer className="border-t border-[#E4DCC8]">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
                        <div className="flex items-center gap-2">
                            <ApplicationLogo />
                            <span className="text-sm text-[#6B6558]">FlowPilot — free, community-built, always.</span>
                        </div>
                        <p className="text-xs text-[#8A8272]">
                            <a href="https://github.com/pyjoek/cash-flow-os">
                            Open source. Contributions welcome.
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}