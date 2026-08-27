import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <h1 className="text-3xl text-[#16231F]" style={{ fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                Your profile
            </h1>
            <p className="mt-1 text-sm text-[#6B6558]">Manage your account details and password.</p>

            <div className="mt-8 space-y-6 max-w-2xl">
                <div className="rounded-lg border border-[#E4DCC8] bg-white p-6">
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                </div>

                <div className="rounded-lg border border-[#E4DCC8] bg-white p-6">
                    <UpdatePasswordForm />
                </div>

                <div className="rounded-lg border border-[#E4B0A0] bg-white p-6">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}