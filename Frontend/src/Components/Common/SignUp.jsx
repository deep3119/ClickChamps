import React, { useState } from 'react'
import '../../Font.css'
import axios from 'axios';
import toast from 'react-hot-toast';

function SignUp({ setSignInMethod, apiUrl }) {
    const setSignInMethodHandler = (a) => {
        if (a === 1) {
            setSignInMethod(true)
        }
        else if (a === 0) {
            setSignInMethod(false)
        }
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/user/register`, {
                username: formData.name,
                email: formData.email,
                password: formData.password
            });
            toast.success("Successfully registered")
            setSignInMethod(true)
            console.log('Response:', response.data);

            // Handle successful signup (e.g., redirect, show success message, etc.)
        } catch (error) {
            console.error('Error during signup:', error.response ? error.response.data : error.message);

            // Handle error and show error message
            if (error.response && error.response.data) {
                alert(error.response.data.message || 'Something went wrong!');
            }
        }
    };

    return (
        <div className="flex items-center justify-center py-5 mt-10 p-4 pb-10">
            <div
                className="w-full max-w-md"
                style={{ transform: "translateY(20px)" }}
            >
                <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <div className="tracking-tight fira-700 text-2xl font-bold text-center text-neutral-200">
                            Welcome to ClickFast
                        </div>
                        <div className="text-sm text-center fira-400 text-neutral-400">
                            Sign in to your account or create a new one
                        </div>
                    </div>
                    <div className="p-6 pt-0">
                        <div dir="ltr" data-orientation="horizontal" className="w-full">
                            <div
                                role="tablist"
                                aria-orientation="horizontal"
                                className="h-9 items-center justify-center rounded-lg p-1 grid w-full grid-cols-2 bg-neutral-800 text-neutral-300"
                                tabIndex={-1}
                                data-orientation="horizontal"
                                style={{ outline: "none" }}
                            >
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected="false"
                                    aria-controls="radix-:R2jttb:-content-signin"
                                    data-state="inactive"
                                    id="radix-:R2jttb:-trigger-signin"
                                    className="py-1 fira-500 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm"
                                    tabIndex={-1}
                                    data-orientation="horizontal"
                                    data-radix-collection-item=""
                                    onClick={() => setSignInMethodHandler(1)}
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected="true"
                                    aria-controls="radix-:R2jttb:-content-signup"
                                    data-state="active"
                                    id="radix-:R2jttb:-trigger-signup"
                                    className="py-1 fira-500 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm"
                                    tabIndex={-1}
                                    data-orientation="horizontal"
                                    data-radix-collection-item=""
                                    onClick={() => setSignInMethodHandler(0)}
                                >
                                    Sign Up
                                </button>
                            </div>
                            <div
                                data-state="active"
                                data-orientation="horizontal"
                                role="tabpanel"
                                aria-labelledby="radix-:R2jttb:-trigger-signin"
                                id="radix-:R2jttb:-content-signin"
                                tabIndex={0}
                                className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                style={{ animationDuration: "0s" }}
                            >
                                <form onSubmit={handleSubmit} className="space-y-4 text-neutral-200">
                                    <div style={{ transform: "translateY(20px)" }}>
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm fira-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-200"
                                                htmlFor=":R9mjttb:-form-item"
                                            >
                                                Name
                                            </label>
                                            <div
                                                className="relative"
                                                id=":R9mjttb:-form-item"
                                                aria-describedby=":R9mjttb:-form-item-description"
                                                aria-invalid="false"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-user absolute left-3 top-2 h-5 w-5 text-neutral-400"
                                                >
                                                    <path d="M12 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 14c-4.41 0-8 2.69-8 6v2h16v-2c0-3.31-3.59-6-8-6z" />
                                                </svg>

                                                <input
                                                    className="flex fira-400 h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                                                    placeholder="John Doe"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ transform: "translateY(20px)" }}>
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm fira-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-200"
                                                htmlFor=":R9mjttb:-form-item"
                                            >
                                                E-mail
                                            </label>
                                            <div
                                                className="relative"
                                                id=":R9mjttb:-form-item"
                                                aria-describedby=":R9mjttb:-form-item-description"
                                                aria-invalid="false"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-mail absolute left-3 top-2 h-5 w-5 text-neutral-400"
                                                >
                                                    <rect width={20} height={16} x={2} y={4} rx={2} />
                                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                </svg>
                                                <input
                                                    className="flex fira-400 h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                                                    placeholder="john@gmail.com"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ transform: "translateY(20px)" }}>
                                        <div className="space-y-2">
                                            <label
                                                className="text-sm fira-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-200"
                                                htmlFor=":Ramjttb:-form-item"
                                            >
                                                Password
                                            </label>
                                            <div
                                                className="relative"
                                                id=":Ramjttb:-form-item"
                                                aria-describedby=":Ramjttb:-form-item-description"
                                                aria-invalid="false"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={24}
                                                    height={24}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-lock absolute left-3 top-2 h-5 w-5 text-neutral-400"
                                                >
                                                    <rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                                <input
                                                    type="password"
                                                    className="flex fira-400 mb-5 h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                                                    placeholder="●●●●●●●●"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="inline-flex fira-600 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-red-800 font-semibold transition-all duration-300 h-9 px-4 py-2 w-full"
                                        type="submit"
                                    >
                                        Sign Up{" "}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-arrow-right ml-2 h-5 w-5"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div
                                data-state="inactive"
                                data-orientation="horizontal"
                                role="tabpanel"
                                aria-labelledby="radix-:R2jttb:-trigger-signup"
                                hidden=""
                                id="radix-:R2jttb:-content-signup"
                                tabIndex={0}
                                className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SignUp
