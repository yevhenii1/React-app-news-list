import React from 'react'
import ReactDOM from 'react-dom';
import styles from './ModalDelete.module.css'

class ModalDelete extends React.Component {

    componentWillMount() {
        this.root = document.createElement('div')
        document.body.appendChild(this.root)
    }

    componentWillUnmount() {
        document.body.removeChild(this.root)
    }

    render() {
        const {handleDeleteClick, closed, title,} = this.props
        const deleteN = <>
            <p>Вы действительно хотите удалить - </p>
            <span>"{title}"</span>
            <div>
                <button onClick={handleDeleteClick}>Да</button>
                <button onClick={closed}>Нет</button>
            </div>
        </>

        return ReactDOM.createPortal(
            <div className={styles.modal}>
                <div className={styles.wrapper}>
                    {deleteN}
                </div>
            </div>,
            this.root
        )
    }
}

export default ModalDelete