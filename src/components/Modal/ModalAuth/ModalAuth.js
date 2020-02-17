import React from 'react'
import ReactDOM from 'react-dom';
import styles from './ModalAuth.module.css'

class ModalAuth extends React.Component {

    componentWillMount() {
        this.root = document.createElement('div')
        document.body.appendChild(this.root)
    }

    componentWillUnmount() {
        document.body.removeChild(this.root)
    }

    render() {
        const {signInGoogle, closed} = this.props
        return ReactDOM.createPortal(
            <div className={styles.modal}>
                <div className={styles.wrapper}>
                    <button onClick={signInGoogle}>Sign in with google</button>
                    <button onClick={closed}>X</button>
                </div>
            </div>,
            this.root
        )
    }
}

export default ModalAuth