import { useAuth } from "../contexts/AuthContext"

export default function Register() {

    const { username, setUsername, email, setEmail, password, setPassword, register } = useAuth()


    function handleSubmit(e) {

        e.preventDefault()
        register(username, email, password)

    }

    return (

        <>

            <div className="container">

                <div className="row justify-content-center align-items-center pt-5">

                    <div className="col-4">

                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="mb-3">
                                <label for="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" value={username}
                                    onChange={e => setUsername(e.target.value)} />

                            </div>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email </label>
                                <input type="email" className="form-control" id="email" value={email}
                                    onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label for="Password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="Password" value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>

                    </div>

                </div>

            </div>

        </>

    )

}