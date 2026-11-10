import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy — FlowPilot" />

            <div className="min-h-screen bg-[#FBF7EE]" style={{ fontFamily: "'Inter', sans-serif" }}>
                {/* Header */}
                <header className="border-b border-[#E4DCC8]">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                        <Link href="/" className="flex items-center gap-2">
                            <ApplicationLogo />
                            <span className="text-[15px] font-medium text-[#16231F]">FlowPilot</span>
                        </Link>

                        <Link
                            href="/"
                            className="rounded-md px-4 py-2 text-sm font-medium text-[#16231F] hover:bg-[#F1ECDD]"
                        >
                            Back to home
                        </Link>
                    </div>
                </header>

                <main className="mx-auto max-w-3xl px-6 py-12">
                    <h1
                        className="text-3xl text-[#16231F] lg:text-4xl"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}
                    >
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-sm text-[#6B6558]">Last updated: November 10, 2026</p>

                    <div className="prose prose-sm mt-8 max-w-none text-[#16231F] prose-headings:font-medium prose-headings:text-[#16231F] prose-p:text-[#6B6558] prose-a:text-[#0F2E2B]">
                        <p>
                            FlowPilot (“we”, “our”, or “us”) is a free, open-source cash flow tracking tool for small businesses. This Privacy Policy explains how we handle your information when you use the service at FlowPilot (the “Service”).
                        </p>

                        <h2>Information We Collect</h2>
                        <p>
                            When you create an account, we collect your name, email address, and password (stored hashed). After setup, we store your business details (name, email, phone, currency, country, timezone) and the financial data you enter: accounts, transactions, categories, and related amounts. This data is used solely to provide the Service to you.
                        </p>
                        <p>
                            We do not collect payment information because the Service is free. We do not sell your data, and we do not use it for advertising.
                        </p>

                        <h2>How We Use Your Information</h2>
                        <ul>
                            <li>To create and manage your account and business</li>
                            <li>To display your dashboard, balances, transactions, and forecasts</li>
                            <li>To improve the Service and fix bugs</li>
                            <li>To communicate with you about account-related matters (e.g., password resets)</li>
                        </ul>

                        <h2>Data Storage and Security</h2>
                        <p>
                            Your data is stored in a database controlled by the operator of the FlowPilot instance you use. We take reasonable measures to protect it, but no method of transmission or storage is 100% secure. Because the project is open source, you can also self-host it if you prefer full control.
                        </p>

                        <h2>Sharing of Information</h2>
                        <p>
                            We do not share your personal or financial data with third parties except as required by law or to protect the rights and safety of users. Your data stays within your account and business.
                        </p>

                        <h2>Your Rights</h2>
                        <p>
                            You can view, update, or delete your profile information from the Profile page while logged in. Deleting your account removes your user record. Contact the instance operator if you need further assistance with data export or deletion.
                        </p>

                        <h2>Cookies and Analytics</h2>
                        <p>
                            The Service uses standard session cookies required for authentication and security. We do not use third-party tracking or advertising cookies.
                        </p>

                        <h2>Children’s Privacy</h2>
                        <p>
                            The Service is not directed at children under 13 (or the applicable age in your jurisdiction). We do not knowingly collect data from children.
                        </p>

                        <h2>Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. The “Last updated” date at the top will change when we do. Continued use of the Service after changes means you accept the updated policy.
                        </p>

                        <h2>Contact</h2>
                        <p>
                            This is a community open-source project. For questions about this policy or your data, open an issue on the{' '}
                            <a href="https://github.com/pyjoek/cash-flow-os" target="_blank" rel="noopener noreferrer">
                                GitHub repository
                            </a>{' '}
                            or contact the operator of the instance you are using.
                        </p>
                    </div>
                </main>

                <footer className="border-t border-[#E4DCC8]">
                    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
                        <div className="flex items-center gap-2">
                            <ApplicationLogo />
                            <span className="text-sm text-[#6B6558]">FlowPilot — free, community-built, always.</span>
                        </div>
                        <div className="flex gap-4 text-xs text-[#8A8272]">
                            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                            <a href="https://github.com/pyjoek/cash-flow-os" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Open source
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
