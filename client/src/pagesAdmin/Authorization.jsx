import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/pagesAdmin/autoriz.css';
import { ADMIN_ROUTE } from "../utils/const";
import { login } from "../http/userAPI";
import { Context } from "..";
import { observer } from 'mobx-react-lite'

const Authorization = observer(() => {
    const { user } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const history = useNavigate()

    const signIn = async () => {

        if (!email.trim() || !password ) {
            setError('Заполните все поля')
            return
        }

        setError('')

        try {
            let data = await login(email, password)
            console.log(data);
            user.setUser(user)
            user.setIsAuth(true)
            history(ADMIN_ROUTE)
        } catch (e) {
            if (e.response && e.response.status === 401) {
                setError('Неверный email или пароль')
            } else if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message)
            } else {
                setError('Данные указанны не верно')
            }
        }
    }

    return (
        <div className="Authorization">
            <div className="Authorization__box">
                <input
                    className={`text ${error && 'input-error'}`}
                    type="text"
                    name="email"
                    placeholder="Введите почту"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setError('') 
                    }}
                    required
                />
                <input
                    className={`text ${error && 'input-error'}`}
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    value={password}
                    autoComplete="off"
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError('') 
                    }}
                    required
                />
                {error && <div className="error-message">{error}</div>}
                <button
                    className="btm"
                    onClick={signIn}
                >
                    Авторизоваться
                </button>
            </div>
        </div>
    );
})

export default Authorization;