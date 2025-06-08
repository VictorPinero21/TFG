import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="mb-4 flex items-center justify-center">
                <a
                    href="/login/google"
                    className="flex items-center rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="mr-2 h-5 w-5"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.63 1.23 9.1 3.25l6.8-6.8C35.9 2.3 30.3 0 24 0 14.64 0 6.6 5.8 2.7 14.1l7.9 6.1C12.4 13.1 17.7 9.5 24 9.5z"
                        />
                        <path
                            fill="#34A853"
                            d="M46.5 24c0-1.5-.2-3-.5-4.5H24v9h12.7c-.6 3-2.4 5.6-4.9 7.3l7.6 5.9c4.4-4.1 7.1-10.2 7.1-17.7z"
                        />
                        <path
                            fill="#4A90E2"
                            d="M9.6 28.2c-1-3-1-6.4 0-9.4L1.7 12.7C-1.2 18.3-1.2 25.7 1.7 31.3l7.9-6.1z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M24 48c6.5 0 12-2.1 16.1-5.7l-7.6-5.9c-2.2 1.5-5 2.4-8.5 2.4-6.3 0-11.6-4.3-13.5-10.1l-7.9 6.1C6.6 42.2 14.6 48 24 48z"
                        />
                    </svg>
                    Sign in with Google
                </a>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
