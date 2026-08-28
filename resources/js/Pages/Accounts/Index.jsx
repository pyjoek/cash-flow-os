import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CURRENCIES } from '@/currencies';

export default function Index({ accounts }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        type: 'cash',
        balance: 0,
        currency: 'TZS',
    });

    function submit(e) {
        e.preventDefault();
        post('/accounts', { onSuccess: () => reset() });
    }

    function destroy(accountId) {
        if (!window.confirm('Delete this account? This does not delete its past transactions, but you will no longer be able to log new ones against it.')) {
            return;
        }

        router.delete(`/accounts/${accountId}`, { preserveScroll: true });
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto mt-10 p-6">
                <h1 className="text-xl font-semibold mb-4">Accounts</h1>

                <form onSubmit={submit} className="bg-white rounded-lg shadow p-4 space-y-3 mb-6">
                    <h2 className="font-medium">Add account</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border-gray-300 rounded-md"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                    <select
                        className="w-full border-gray-300 rounded-md"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                    >
                        <option value="cash">Cash</option>
                        <option value="bank">Bank</option>
                        <option value="mpesa">M-Pesa</option>
                        <option value="airtel_money">Airtel Money</option>
                        <option value="visa">Visa</option>
                        <option value="paypal">PayPal</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

                    <input
                        type="number"
                        step="0.01"
                        placeholder="Starting balance"
                        className="w-full border-gray-300 rounded-md"
                        value={data.balance}
                        onChange={(e) => setData('balance', e.target.value)}
                    />

                    <select
                        className="w-full border-gray-300 rounded-md"
                        value={data.currency}
                        onChange={(e) => setData('currency', e.target.value)}
                    >
                        {CURRENCIES.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.code} — {c.name}
                            </option>
                        ))}
                    </select>
                    {errors.currency && <p className="text-red-500 text-sm">{errors.currency}</p>}

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 text-white rounded-md px-4 py-2 disabled:opacity-50"
                    >
                        Save
                    </button>
                </form>

                <h2 className="font-medium mb-2">Your accounts</h2>
                <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
                    {accounts.length === 0 && (
                        <li className="p-4 text-sm text-gray-500">No accounts yet — add one above.</li>
                    )}
                    {accounts.map((account) => (
                        <li key={account.id} className="p-4 flex items-center justify-between">
                            <span>{account.name} ({account.type})</span>
                            <div className="flex items-center gap-3">
                                <span>{account.currency} {account.balance}</span>
                                <button
                                    onClick={() => destroy(account.id)}
                                    className="text-sm text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}