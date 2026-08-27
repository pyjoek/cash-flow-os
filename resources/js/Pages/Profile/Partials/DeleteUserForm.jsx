import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const passwordInput = useRef(null);

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    });

    function confirmDeletion() {
        setConfirmingDeletion(true);
    }

    function submit(e) {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    }

    function closeModal() {
        setConfirmingDeletion(false);
        clearErrors();
        reset();
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-[#16231F]">Delete account</h2>
                <p className="mt-1 text-sm text-[#6B6558]">
                    Once your account is deleted, all of its data — including every transaction and account —
                    will be permanently removed. This cannot be undone.
                </p>
            </header>

            <button
                onClick={confirmDeletion}
                className="mt-6 rounded-md px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: '#B3402B' }}
            >
                Delete account
            </button>

            {confirmingDeletion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6">
                        <h3 className="text-lg font-medium text-[#16231F]">Are you sure?</h3>
                        <p className="mt-2 text-sm text-[#6B6558]">
                            Enter your password to confirm you want to permanently delete your account.
                        </p>

                        <form onSubmit={submit} className="mt-4">
                            <input
                                ref={passwordInput}
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                                autoFocus
                                className="w-full rounded-md border border-[#DDD6C4] bg-white px-3.5 py-2.5 text-[15px] text-[#16231F] focus:border-[#B3402B] focus:outline-none focus:ring-1 focus:ring-[#B3402B]"
                            />
                            {errors.password && <p className="mt-1.5 text-sm text-[#B3402B]">{errors.password}</p>}

                            <div className="mt-5 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="rounded-md px-4 py-2 text-sm font-medium text-[#6B6558]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                                    style={{ backgroundColor: '#B3402B' }}
                                >
                                    Delete account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}