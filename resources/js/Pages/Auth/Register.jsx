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

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen bg-[#FBF7EE] lg:flex" style={{ fontFamily: "'Inter', sans-serif" }}>

                {/* Ledger panel */}
                <div
                    className="relative hidden overflow-hidden lg:flex lg:w-[46%] lg:flex-col lg:justify-between"
                    style={{ backgroundColor: '#0F2E2B' }}
                >
                    <div className="relative z-10 px-10 pt-12">
                        <div className="flex items-center gap-2">
                            <div>
                                <ApplicationLogo />
                            </div>
                            <span className="text-[15px] font-medium tracking-wide text-[#F4F1E8]">
                                FlowPilot
                            </span>
                        </div>

                        <p
                            className="mt-14 text-2xl leading-snug"
                            style={{ fontFamily: "'Fraunces', serif", color: '#F4F1E8', fontWeight: 500 }}
                        >
                            Register once. See every account, in one place, from day one.
                        </p>

                        <div className="mt-8 flex gap-2">
                            {['Cash', 'Bank', 'M-Pesa', 'Airtel Money'].map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#8FB6A8]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Scrolling ledger strip — the signature element, shared with the login page */}
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
                        Free, always — built for businesses that run on cash and mobile money.
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
                                F
                            </div>
                            <span className="text-[15px] font-medium text-[#16231F]">FlowPilot</span>
                        </div>

                        <h1
                            className="mt-6 text-3xl text-[#16231F]"
                            style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                        >
                            Create your account
                        </h1>
                        <p className="mt-2 text-sm text-[#6B6558]">
                            Takes under a minute. You'll set up your business next.
                        </p>

                        <form onSubmit={submit} className="mt-10 space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]"
                                >
                                    Full name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    autoFocus
                                    autoComplete="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] placeholder:text-[#B3ABA0] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                                    placeholder="Jane Mushi"
                                />
                                {errors.name && (
                                    <p className="mt-1.5 text-sm text-[#B3402B]">{errors.name}</p>
                                )}
                            </div>

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
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] placeholder:text-[#B3ABA0] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-[#B3402B]">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]"
                                >
                                    Confirm password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    autoComplete="new-password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] placeholder:text-[#B3ABA0] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                                    placeholder="••••••••"
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1.5 text-sm text-[#B3402B]">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-md py-2.5 text-[15px] font-medium text-white transition disabled:opacity-60"
                                style={{ backgroundColor: '#0F2E2B' }}
                            >
                                Create account
                            </button>
                        </form>

                        <p className="mt-8 text-sm text-[#6B6558]">
                            Already have an account?{' '}
                            <Link href={route('login')} className="font-medium text-[#8A6A1F] hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}