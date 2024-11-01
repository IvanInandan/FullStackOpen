const Notification = ({ message, success }) => {
    if (message === null) {
        return null
    } else {
        const notifStyle = (success === true) ? {
            color: 'green',
            background: 'lightgrey',  
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
        } : {
            color: 'red',
            background: 'lightgrey',
            fontSize: '20px',
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
        }

        return (
            <div style={notifStyle}>
                {message}
            </div>
        )
    }
}

export default Notification