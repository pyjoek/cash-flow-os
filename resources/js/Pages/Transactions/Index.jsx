import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ transactions, categories, accounts }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        account_id: accounts[0]?.id ?? '',
        category_id: '',
        type: 'expense',
        amount: '',
        description: '',
        transaction_date: new Date().toISOString().slice(0, 10),
    });

    function submit(e) {
        e.preventDefault();

        if (!data.account_id) {
            return; // no account exists yet — nothing to submit against
        }

        post('/transactions', {
            data: {
                ...data,
                category_id: data.category_id === '' ? null : data.category_id,
            },
            onSuccess: () => reset(),
        });
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto mt-10 p-6">
                <h1 className="text-xl font-semibold mb-4">Transactions</h1>

                {accounts.length === 0 && (
                    <p className="mb-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
                        You need at least one account before you can log a transaction.{' '}
                        <a href="/accounts" className="underline">Add one here</a>.
                    </p>
                )}

                <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow mb-6">
                    {transactions.data.map((t) => (
                        <li key={t.id} className="p-4 flex justify-between">
                            <span>{t.description || t.type} — {t.category?.name ?? 'Uncategorized'}</span>
                            <span>{t.amount}</span>
                        </li>
                    ))}
                </ul>

                <form onSubmit={submit} className="bg-white rounded-lg shadow p-4 space-y-3">
                    <h2 className="font-medium">Add transaction</h2>

                    <select
                        className="w-full border-gray-300 rounded-md"
                        value={data.account_id}
                        onChange={(e) => setData('account_id', e.target.value)}
                    >
                        {accounts.map((a) => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                    </select>
                    {errors.account_id && <p className="text-red-500 text-sm">{errors.account_id}</p>}

                    <select
                        className="w-full border-gray-300 rounded-md"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                    >
                        <option value="">Uncategorized</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}

                    <select
                        className="w-full border-gray-300 rounded-md"
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                        <option value="transfer">Transfer</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

                    <input
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        className="w-full border-gray-300 rounded-md"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                    />
                    {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}

                    <input
                        type="text"
                        placeholder="Description"
                        className="w-full border-gray-300 rounded-md"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />

                    <input
                        type="date"
                        className="w-full border-gray-300 rounded-md"
                        value={data.transaction_date}
                        onChange={(e) => setData('transaction_date', e.target.value)}
                    />
                    {errors.transaction_date && <p className="text-red-500 text-sm">{errors.transaction_date}</p>}

                    <button
                        type="submit"
                        disabled={processing || accounts.length === 0}
                        className="bg-indigo-600 text-white rounded-md px-4 py-2 disabled:opacity-50"
                    >
                        Save
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}