import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';

class Progress extends React.Component{
    render(){
        return (
            <div style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'fixed',
                width: '100%',
                height: '100%',
                zIndex: 3,
                display: this.props.display
            }}>
                <div style={{
                    height: '40px',
                    display: 'block',
                    margin: 'auto'
                }}><CircularProgress size={70} thickness={7} color='white' /></div>
            </div>
        )
    }
}

export default Progress;

