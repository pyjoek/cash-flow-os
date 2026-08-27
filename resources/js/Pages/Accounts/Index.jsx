import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ accounts }) {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        type: 'cash',
        balance: 0,
        currency: 'TZS',
    });

    function submit(e) {
        e.preventDefault();
        post('/accounts', { onSuccess: () => reset() });
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto mt-10 p-6">
                <h1 className="text-xl font-semibold mb-4">Accounts</h1>
                <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow mb-6">
                    {accounts.map((account) => (
                        <li key={account.id} className="p-4 flex justify-between">
                            <span>{account.name} ({account.type})</span>
                            <span>{account.currency} {account.balance}</span>
                        </li>
                    ))}
                </ul>
                <form onSubmit={submit} className="bg-white rounded-lg shadow p-4 space-y-3">
                    <h2 className="font-medium">Add account</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border-gray-300 rounded-md"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
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
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Starting balance"
                        className="w-full border-gray-300 rounded-md"
                        value={data.balance}
                        onChange={(e) => setData('balance', e.target.value)}
                    />
                    <input
                        type="text"
                        maxLength={3}
                        placeholder="Currency"
                        className="w-full border-gray-300 rounded-md"
                        value={data.currency}
                        onChange={(e) => setData('currency', e.target.value.toUpperCase())}
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 text-white rounded-md px-4 py-2"
                    >
                        Save
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}