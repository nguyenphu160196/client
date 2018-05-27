import React from 'react'
import './common.scss'

class Progress extends React.Component{
    render(){
        return (
            <div style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                position: 'fixed',
                width: '100%',
                height: '100%',
                zIndex: 1600,
                display: this.props.display
            }}>
                <div style={{
                    height: '40px',
                    display: 'block',
                    margin: 'auto'
                }}><div className="loader"></div></div>
            </div>
        )
    }
}

export default Progress;

