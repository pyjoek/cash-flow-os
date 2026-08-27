import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-[#16231F]">Update password</h2>
                <p className="mt-1 text-sm text-[#6B6558]">
                    Use a long, random password to keep your account secure.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-5">
                <div>
                    <label
                        htmlFor="current_password"
                        className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]"
                    >
                        Current password
                    </label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                        className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                    />
                    {errors.current_password && (
                        <p className="mt-1.5 text-sm text-[#B3402B]">{errors.current_password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]">
                        New password
                    </label>
                    <input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                        className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                    />
                    {errors.password && <p className="mt-1.5 text-sm text-[#B3402B]">{errors.password}</p>}
                </div>

                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="block text-xs font-medium uppercase tracking-wide text-[#6B6558]"
                    >
                        Confirm new password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                        className="mt-2 w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] focus:border-[#C08A28] focus:outline-none focus:ring-1 focus:ring-[#C08A28]"
                    />
                    {errors.password_confirmation && (
                        <p className="mt-1.5 text-sm text-[#B3402B]">{errors.password_confirmation}</p>
                    )}
                </div>

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