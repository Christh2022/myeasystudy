import React from 'react';
import './login.css'

const Login = () => {
    return (
        <div className="login">
            <h1>Se connecter</h1>
            <form method="post">
                <input type="text" name="u" placeholder="Email" required="required" />
                <input type="password" name="p" placeholder="Mot de passe" required="required" />
                <button type="submit" className="btn btn-primary btn-block btn-large">connexion</button>
            </form>
        </div>
    );
};

export default Login;