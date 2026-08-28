import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

function formatMoney(value) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

function StatCard({ label, value, accent, currency }) {
    return (
        <div className="rounded-lg border border-[#E4DCC8] bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-[#8A8272]">{label}</p>
            <p className="mt-2 font-mono text-2xl" style={{ color: accent ?? '#16231F' }}>
                {formatMoney(value)}
                <span className="ml-1 text-xs text-[#8A8272]">{currency}</span>
            </p>
        </div>
    );
}

function SuggestionsCard({ suggestions }) {
    function apply(transactionId, categoryId) {
        router.patch(
            route('transactions.update-category', transactionId),
            { category_id: categoryId },
            { preserveScroll: true }
        );
    }

    return (
        <div className="rounded-lg border border-[#E4DCC8] bg-white p-5">
            <p className="text-sm font-medium text-[#16231F]">AI suggestions</p>
            <p className="text-xs text-[#8A8272]">Based on transaction descriptions</p>

            <div className="mt-4 space-y-3">
                {suggestions.length === 0 && (
                    <p className="text-sm text-[#8A8272]">
                        Nothing to suggest right now — everything's categorized.
                    </p>
                )}

                {suggestions.map((s) => (
                    <div key={s.transaction_id} className="flex items-center justify-between text-sm">
                        <div>
                            <p className="text-[#16231F]">{s.description}</p>
                            <p className="text-xs text-[#8A8272]">
                                Suggested: <span className="font-medium">{s.suggested_category_name}</span>
                            </p>
                        </div>
                        <button
                            onClick={() => apply(s.transaction_id, s.suggested_category_id)}
                            className="rounded-md px-3 py-1 text-xs font-medium text-white"
                            style={{ backgroundColor: '#C08A28' }}
                        >
                            Apply
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ForecastCard({ projectedBalance30, net30, currency }) {
    return (
        <div className="rounded-lg border border-[#E4DCC8] bg-white p-5">
            <p className="text-sm font-medium text-[#16231F]">30-day forecast</p>
            <p className="text-xs text-[#8A8272]">Projected from your last 30 days of activity</p>

            <p className="mt-3 font-mono text-2xl" style={{ color: projectedBalance30 >= 0 ? '#0F2E2B' : '#B3402B' }}>
                {formatMoney(projectedBalance30)}
                <span className="ml-1 text-xs text-[#8A8272]">{currency}</span>
            </p>
            <p className="mt-1 text-xs text-[#8A8272]">
                Assumes the same net cash flow ({net30 >= 0 ? '+' : ''}
                {formatMoney(net30)} {currency} over the last 30 days) continues.
            </p>

            <p className="mt-4 text-xs text-[#8A8272]">
                Upcoming bill reminders need a recurring-bills feature that isn't built yet —
                that's a separate table/feature, not something this forecast can show today.
            </p>
        </div>
    );
}

export default function Dashboard({
    currentBalance,
    cashIn,
    cashOut,
    netCash,
    topCategories,
    trend,
    recentTransactions,
    accountCount,
    suggestions,
    net30,
    projectedBalance30,
    currency,
}) {
    const maxCategory = Math.max(...topCategories.map((c) => Number(c.total)), 1);
    const maxTrend = Math.max(...trend.map((t) => Math.abs(t.net)), 1);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <h1 className="text-3xl text-[#16231F]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                Overview
            </h1>
            <p className="mt-1 text-sm text-[#6B6558]">
                {accountCount} account{accountCount === 1 ? '' : 's'} · this month
            </p>

            {/* Top row */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="Current balance" value={currentBalance} accent="#0F2E2B" currency={currency} />
                <StatCard label="Cash in" value={cashIn} accent="#2F7A55" currency={currency} />
                <StatCard label="Cash out" value={cashOut} accent="#B3402B" currency={currency} />
                <StatCard
                    label="Net cash"
                    value={netCash}
                    accent={netCash >= 0 ? '#2F7A55' : '#B3402B'}
                    currency={currency}
                />
            </div>

            {/* Second row */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-lg border border-[#E4DCC8] bg-white p-5">
                    <p className="text-sm font-medium text-[#16231F]">Top expense categories</p>
                    <p className="text-xs text-[#8A8272]">This month</p>
                    <div className="mt-4 space-y-3">
                        {topCategories.length === 0 && (
                            <p className="text-sm text-[#8A8272]">No expenses logged yet this month.</p>
                        )}
                        {topCategories.map((c) => (
                            <div key={c.name}>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#16231F]">{c.name}</span>
                                    <span className="font-mono text-[#6B6558]">
                                        {formatMoney(c.total)} {currency}
                                    </span>
                                </div>
                                <div className="mt-1 h-2 rounded-full bg-[#F1ECDD]">
                                    <div
                                        className="h-2 rounded-full"
                                        style={{
                                            width: `${(Number(c.total) / maxCategory) * 100}%`,
                                            backgroundColor: '#C08A28',
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border border-[#E4DCC8] bg-white p-5">
                    <p className="text-sm font-medium text-[#16231F]">Cash trend</p>
                    <p className="text-xs text-[#8A8272]">Last 7 days, net of income and expenses</p>
                    <div className="mt-6 flex h-32 items-end gap-3">
                        {trend.map((t) => {
                            const height = Math.max((Math.abs(t.net) / maxTrend) * 100, 4);
                            return (
                                <div key={t.date} className="flex flex-1 flex-col items-center gap-2">
                                    <div className="flex h-24 w-full items-end">
                                        <div
                                            className="w-full rounded-t-sm"
                                            style={{
                                                height: `${height}%`,
                                                backgroundColor: t.net >= 0 ? '#2F7A55' : '#B3402B',
                                            }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-[#8A8272]">{t.date}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Third row */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-lg border border-[#E4DCC8] bg-white p-5 lg:col-span-1">
                    <p className="text-sm font-medium text-[#16231F]">Recent transactions</p>
                    <div className="mt-4 divide-y divide-[#F1ECDD]">
                        {recentTransactions.length === 0 && (
                            <p className="text-sm text-[#8A8272]">Nothing logged yet.</p>
                        )}
                        {recentTransactions.map((t) => (
                            <div key={t.id} className="flex justify-between py-2.5 text-sm">
                                <div>
                                    <p className="text-[#16231F]">{t.description || t.type}</p>
                                    <p className="text-xs text-[#8A8272]">
                                        {t.category?.name ?? 'Uncategorized'} · {t.account?.name}
                                    </p>
                                </div>
                                <span
                                    className="font-mono"
                                    style={{ color: t.type === 'income' ? '#2F7A55' : '#B3402B' }}
                                >
                                    {t.type === 'income' ? '+' : '-'}
                                    {formatMoney(t.amount)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <SuggestionsCard suggestions={suggestions} />
                <ForecastCard projectedBalance30={projectedBalance30} net30={net30} currency={currency} />
            </div>
        </AuthenticatedLayout>
    );
}