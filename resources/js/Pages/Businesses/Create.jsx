import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        currency: 'TZS',
        country: '',
        timezone: 'Africa/Dar_es_Salaam',
    });

    function submit(e) {
        e.preventDefault();
        post('/business')
    }

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow">
            <h1 className="text-xl font-semibold mb-4">Set up your business</h1>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Business name</label>
                    <input
                        type="text"
                        className="mt-1 w-full border-gray-300 rounded-md"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="mt-1 w-full border-gray-300 rounded-md"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Currency</label>
                    <input
                        type="text"
                        maxLength={3}
                        className="mt-1 w-full border-gray-300 rounded-md"
                        value={data.currency}
                        onChange={(e) => setData('currency', e.target.value.toUpperCase())}
                    />
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-indigo-600 text-white rounded-md py-2 font-medium"
                >
                    Create business
                </button>
            </form>
        </div>
    );
}