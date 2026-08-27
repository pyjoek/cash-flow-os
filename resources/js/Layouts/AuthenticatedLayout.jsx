import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navItems = [
    { name: 'Dashboard', route: 'dashboard' },
    { name: 'Accounts', route: 'accounts.index' },
    { name: 'Transactions', route: 'transactions.index' },
];

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const current = route().current();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F6F2E8]" style={{ fontFamily: "'Inter', sans-serif" }}>
            <header style={{ backgroundColor: '#0F2E2B' }}>
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-8">
                        <Link href={route('dashboard')} className="flex items-center gap-2">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold"
                                style={{ backgroundColor: '#C08A28', color: '#0F2E2B' }}
                            >
                                F
                            </div>
                            <span className="text-[15px] font-medium text-[#F4F1E8]">FlowPilot</span>
                        </Link>

                        <nav className="hidden gap-1 sm:flex">
                            {navItems.map((item) => {
                                const active = current?.startsWith(item.route.split('.')[0]);
                                return (
                                    <Link
                                        key={item.name}
                                        href={route(item.route)}
                                        className="rounded-md px-3 py-1.5 text-sm transition"
                                        style={{
                                            color: active ? '#0F2E2B' : '#C7D9D2',
                                            backgroundColor: active ? '#C08A28' : 'transparent',
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href={route('profile.edit')}
                            className="hidden text-sm text-[#C7D9D2] hover:underline sm:inline"
                        >
                            {auth.user.name}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="hidden text-sm text-[#E8B98A] hover:underline sm:inline"
                        >
                            Log out
                        </Link>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMobileOpen((open) => !open)}
                            className="flex h-9 w-9 items-center justify-center rounded-md sm:hidden"
                            style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                            aria-label="Toggle menu"
                            aria-expanded={mobileOpen}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                {mobileOpen ? (
                                    <path
                                        d="M3 3L15 15M15 3L3 15"
                                        stroke="#F4F1E8"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                    />
                                ) : (
                                    <path
                                        d="M2 5H16M2 9H16M2 13H16"
                                        stroke="#F4F1E8"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu panel */}
                {mobileOpen && (
                    <div className="border-t border-white/10 px-6 py-3 sm:hidden">
                        <nav className="flex flex-col gap-1">
                            {navItems.map((item) => {
                                const active = current?.startsWith(item.route.split('.')[0]);
                                return (
                                    <Link
                                        key={item.name}
                                        href={route(item.route)}
                                        onClick={() => setMobileOpen(false)}
                                        className="rounded-md px-3 py-2 text-sm transition"
                                        style={{
                                            color: active ? '#0F2E2B' : '#C7D9D2',
                                            backgroundColor: active ? '#C08A28' : 'transparent',
                                        }}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                            <Link
                                href={route('profile.edit')}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-[#C7D9D2] hover:underline"
                            >
                                {auth.user.name}
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm text-[#E8B98A] hover:underline"
                            >
                                Log out
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
    );
}