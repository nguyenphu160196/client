import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class DialogMessage extends React.Component{
    render(){
        const actions = [
			<FlatButton
			  label="OK"
			  primary={true}
			  onClick={this.props.closeDialog}
			/>
		];
        return (
            <div>
                <Dialog
					actions={actions}
					modal={false}
					open={this.props.dialog}
					onRequestClose={this.props.closeDialog}
					contentStyle={{width: '40%'}}
				>
					{this.props.message}
				</Dialog>
            </div>
        )
    }
}

export default DialogMessage;

