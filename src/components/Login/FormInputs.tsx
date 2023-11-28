export function SignUpInputs() {
    return (
        <>
            <div className="pb-2 pt-4">
                <input 
                    required
                    id="password2"
                    name="password2"
                    type="password"
                    placeholder="Repeat password"
                    className="block w-full p-4 text-lg rounded-sm bg-black"
                />
            </div>
            <div className="pb-2 pt-4">
                <input 
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="block w-full p-4 text-lg rounded-sm bg-black"
                />
            </div>
        </>
    )
}

export function CommonInputs() {
    return (
        <div>
            <div className="pb-2 pt-4">
                <input 
                    required
                    id="name"
                    name="name"
                    type="text"
                    placeholder="User name"
                    className="block w-full p-4 text-lg rounded-sm bg-black"
                />
            </div>
            <div className="pb-2 pt-4">
                <input 
                    required
                    id="password1"
                    name="password1"
                    type="password"
                    placeholder="Password"
                    className="block w-full p-4 text-lg rounded-sm bg-black"
                />
            </div>
        </div>
    )
}