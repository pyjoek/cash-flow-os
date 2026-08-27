import { Head, Link, useForm } from '@inertiajs/react';
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
            <p
                className="font-mono text-sm"
                style={{ color: positive ? '#9FCDB8' : '#E8B98A' }}
            >
                {row.amount}
                <span className="ml-1 text-[10px] text-[#6E9086]">TZS</span>
            </p>
        </div>
    );
}

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e) {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    }

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen bg-[#FBF7EE] lg:flex" style={{ fontFamily: "'Inter', sans-serif" }}>

                {/* Ledger panel */}
                <div
                    className="relative hidden overflow-hidden lg:flex lg:w-[46%] lg:flex-col lg:justify-between"
                    style={{ backgroundColor: '#0F2E2B' }}
                >
                    <div className="relative z-10 px-10 pt-12">
                        <div className="flex items-center gap-2">
                            <div>
                                <Link href="/">
                                    <ApplicationLogo />
                                </Link>
                            </div>
                            <span className="text-[15px] font-medium tracking-wide text-[#F4F1E8]">
                                FlowPilot
                            </span>
                        </div>

                        <p
                            className="mt-14 text-sm uppercase tracking-[0.2em]"
                            style={{ color: '#8FB6A8' }}
                        >
                            Current balance
                        </p>
                        <p
                            className="mt-2 text-5xl"
                            style={{ fontFamily: "'Fraunces', serif", color: '#F4F1E8', fontWeight: 500 }}
                        >
                            2,847,300
                            <span className="ml-2 text-lg text-[#8FB6A8]">TZS</span>
                        </p>

                        <svg viewBox="0 0 260 60" className="mt-6 h-14 w-64" fill="none">
                            <path
                                d="M0 45 L30 40 L55 48 L85 22 L115 30 L145 12 L175 20 L205 8 L235 16 L260 4"
                                stroke="#C08A28"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* Scrolling ledger strip — the signature element */}
                    <div className="relative z-10 mt-10 h-72 overflow-hidden border-t border-white/10">
                        <div className="ledger-track">
                            {[...ledgerRows, ...ledgerRows].map((row, i) => (
                                <LedgerRow row={row} key={i} />
                            ))}
                        </div>
                        <div
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                            style={{ background: 'linear-gradient(to top, #0F2E2B, transparent)' }}
                        />
                    </div>

                    <p className="relative z-10 px-10 pb-10 text-xs text-[#6E9086]">
                        Every shilling in, every shilling out — tracked automatically.
                    </p>
                </div>

                {/* Form panel */}
                <div className="flex flex-1 flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
                    <div className="mx-auto w-full max-w-sm">

                        <div className="mb-2 flex items-center gap-2 lg:hidden">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold"
                                style={{ backgroundColor: '#C08A28', color: '#0F2E2B' }}
                            >
                                
                            </div>
                            <span className="text-[15px] font-medium text-[#16231F]">FlowPilot</span>
                        </div>

                        <h1
                            className="mt-6 text-3xl text-[#16231F]"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                        >
                            Welcome back
                        </h1>
                        <p className="mt-2 text-sm text-[#6B6558]">
                            Log in to see today's cash position.
                        </p>

                        {status && (
                            <div className="mt-6 rounded-md bg-[#EFF6F1] px-4 py-3 text-sm text-[#2F5D46]">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="mt-10 space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoFocus
                                    autoComplete="username"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] placeholder:text-[#B3ABA0] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                                    placeholder="you@business.co.tz"
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-[#B3402B]">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]"
                                    >
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs text-[#8A6A1F] hover:underline"
                                        >
                                            Forgot?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] placeholder:text-[#B3ABA0] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-[#B3402B]">{errors.password}</p>
                                )}
                            </div>

                            <label className="flex items-center gap-2 text-sm text-[#6B6558]">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-[#DDD6C4] text-[#C08A28] focus:ring-[#C08A28]"
                                />
                                Remember me
                            </label>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-md py-2.5 text-[15px] font-medium text-white transition disabled:opacity-60"
                                style={{ backgroundColor: '#0F2E2B' }}
                            >
                                Log in
                            </button>
                        </form>

                        <p className="mt-8 text-sm text-[#6B6558]">
                            New to FlowPilot?{' '}
                            <Link href={route('register')} className="font-medium text-[#8A6A1F] hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}