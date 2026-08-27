import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    function submit(e) {
        e.preventDefault();
        patch(route('profile.update'));
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-[#16231F]">Profile information</h2>
                <p className="mt-1 text-sm text-[#6B6558]">Update your account's name and email address.</p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
                <div>
                    <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-[#B3402B]">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-[#B3402B]">{errors.email}</p>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-md bg-[#FBF3E6] p-3 text-sm text-[#8A6A1F]">
                        Your email address is unverified.{' '}
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="underline hover:no-underline"
                        >
                            Click here to re-send the verification email.
                        </Link>
                        {status === 'verification-link-sent' && (
                            <p className="mt-2 font-medium text-[#2F5D46]">
                                A new verification link has been sent to your email address.
                            </p>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                        style={{ backgroundColor: '#0F2E2B' }}
                    >
                        Save
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-[#6B6558]">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}