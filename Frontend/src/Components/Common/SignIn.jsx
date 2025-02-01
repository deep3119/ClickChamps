import React from 'react'
import '../../Font.css'
import axios from 'axios';

const SignIn = ({ setSignInMethod, apiUrl }) => {
    const setSignInMethodHandler = (a) => {
        if (a === 1) {
            setSignInMethod(true)
        }
        else if (a === 0) {
            setSignInMethod(false)
        }
    }

    const handleSignIn = async (email, password) => {
        try {
            console.log("Requesting login with username/email:", email, "and password:", password);

            const response = await axios.post(`${apiUrl}/user/login`, {
                username_or_email: email,
                password: password
            });

            const data = response.data;
            if (response.status === 200) {
                localStorage.setItem("token", data.access_token);

                document.cookie = `access_token=${data.access_token}; path=/; SameSite=Lax;`;

                console.log("Login successful:", data);
                window.location.href = '/profile';
            } else {
                console.error("Login failed with response:", data);
                alert(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while trying to sign in.");
        }
    };



    const handleSubmitSignIn = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        // Check if email and password are empty before making the request
        if (!email || !password) {
            alert("Please fill in both email and password.");
            return;
        }

        handleSignIn(email, password);
    };

    return (
        <>
            <div className="flex items-center justify-center mt-10 p-4 pb-10">
                <div
                    className="w-full max-w-md"
                    style={{ transform: "translateY(20px)" }}
                >
                    <div className="rounded-xl border text-card-foreground shadow bg-neutral-900/50 border-neutral-800">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <div className="tracking-tight geist-mono-latin-700 text-2xl font-bold text-center text-neutral-200">
                                Welcome to ClickFast
                            </div>
                            <div className="text-sm geist-mono-latin-400 text-center text-neutral-400">
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
                                        aria-selected="true"
                                        aria-controls="radix-:R2jttb:-content-signin"
                                        data-state="active"
                                        id="radix-:R2jttb:-trigger-signin"
                                        className="py-1 geist-mono-latin-500 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm"
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
                                        aria-selected="false"
                                        aria-controls="radix-:R2jttb:-content-signup"
                                        data-state="inactive"
                                        id="radix-:R2jttb:-trigger-signup"
                                        className="py-1 geist-mono-latin-500 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium ring-offset-neutral-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-700 data-[state=active]:text-neutral-50 data-[state=active]:shadow-sm"
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
                                    <form onSubmit={handleSubmitSignIn} className="space-y-4 text-neutral-200">
                                        <div style={{ transform: "translateY(20px)" }}>
                                            <div className="space-y-2">
                                                <label
                                                    className="text-sm geist-mono-latin-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-200"
                                                    htmlFor=":R9mjttb:-form-item"
                                                >
                                                    Email
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
                                                        className="flex geist-mono-latin-400 h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                                                        placeholder="john@gmail.com"
                                                        name="email"
                                                        defaultValue=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ transform: "translateY(20px)" }}>
                                            <div className="space-y-2">
                                                <label
                                                    className="text-sm geist-mono-latin-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-200"
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
                                                        <rect
                                                            width={18}
                                                            height={11}
                                                            x={3}
                                                            y={11}
                                                            rx={2}
                                                            ry={2}
                                                        />
                                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                    </svg>
                                                    <input
                                                        type="password"
                                                        className="flex geist-mono-latin-400 mb-5 h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder-neutral-400"
                                                        placeholder="●●●●●●●●"
                                                        name="password"
                                                        defaultValue=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="inline-flex geist-mono-latin-600 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground shadow bg-gradient-to-r from-red-500 to-red-600 hover:from-red-700 hover:to-red-800 font-semibold transition-all duration-300 h-9 px-4 py-2 w-full"
                                            type="submit"
                                        >
                                            Sign In
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
                        <div className="flex items-center p-6 pt-0">
                            <button className="inline-flex geist-mono-latin-500 bg-white text-black items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full">
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
                                    className="lucide lucide-chrome"
                                >
                                    <circle cx={12} cy={12} r={10} />
                                    <circle cx={12} cy={12} r={4} />
                                    <line x1="21.17" x2={12} y1={8} y2={8} />
                                    <line x1="3.95" x2="8.54" y1="6.06" y2={14} />
                                    <line x1="10.88" x2="15.46" y1="21.94" y2={14} />
                                </svg>
                                <span>Continue with Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <section
                aria-label="Notifications alt+T"
                tabIndex={-1}
                aria-live="polite"
                aria-relevant="additions text"
                aria-atomic="false"
            />

        </>
    )
}

export default SignIn
