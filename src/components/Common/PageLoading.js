import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';

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
                }}><CircularProgress size={70} thickness={7} /></div>
            </div>
        )
    }
}

export default Progress;

