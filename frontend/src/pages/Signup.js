import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4567/signup', { name, email, password })
            .then(
                (result) => {
                    console.log(result)
                    navigate('/login')
                }
            )
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="form">
                <div className="heading">CREATE AN ACCOUNT</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" placeholder="Enter your name" className=' text-black' onChange={e => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email ID</label>
                        <input type="text" name="email" id="email" placeholder="Enter your email" className=' text-black' onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter you password"
                            className=' text-black'
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <p>
                    {/* Have an account ? <Link to="/"> Login </Link> */}
                </p>
            </div>
        </div>
    )
}

export default Signup
