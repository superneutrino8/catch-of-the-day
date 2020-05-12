import React from 'react'
import PropTypes from 'prop-types';

const Login = (props) => {
    return (
        <nav className="login">
            <h2>Inventory Login</h2>
            <p style={{ textAlign: "center" }}>
                Sign In to manage your Store's Inventory
            </p>
            <button className="github" onClick={() => props.authenticate('Github')} >Login With GitHub</button>
            <button className="twitter" onClick={() => props.authenticate('Twitter')} >Login With Twitter</button>
            <button className="facebook" onClick={() => props.authenticate('Facebook')} >Login With Facebook</button>
        </nav>
    )
}

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login
