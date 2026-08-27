import { Link, usePage } from '@inertiajs/react';

const navItems = [
    { name: 'Dashboard', route: 'dashboard' },
    { name: 'Accounts', route: 'accounts.index' },
    { name: 'Transactions', route: 'transactions.index' },
];

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const current = route().current();

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
                        <span className="hidden text-sm text-[#8FB6A8] sm:inline">{auth.user.name}</span>
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
            </header>

            <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
    );
}