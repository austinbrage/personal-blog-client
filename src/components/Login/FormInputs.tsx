export function SignUpInputs() {
    return (
        <>
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
            <div className="pb-2 pt-4">
                <input 
                    required
                    id="author"
                    name="author"
                    type="text"
                    placeholder="Author name"
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
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="block w-full p-4 text-lg rounded-sm bg-black"
                />
            </div>
        </div>
    )
}