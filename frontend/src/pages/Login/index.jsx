import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <div className="flex items-center justify-center">

            <input className="border-2" type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="border-2" type="text" value={senha} onChange={e => setSenha(e.target.value)} />

            <button className="border-2" >Login</button>

        </div>
    )
}
