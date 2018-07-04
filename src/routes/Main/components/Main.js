import React from 'react'
import PropTypes from 'prop-types'

import './Main.scss'
import ChannelList from './ChannelList'
import Account from './Account'
import Search from './Search'
import SettingLeft from './SettingLeft'
import Stream from './Stream'
import CallComing from './CallComing'

import DialogMessage from '../../../components/Common/DialogMessage'
import Progress from '../../../components/Common/PageLoading'
import Snackbar from '../../../components/Common/Snackbar'

import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export class RealTime extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.initial();
  }
  render(){
    return(<div></div>)
  }
}

export const Main = ({ main, signOut, makeState, children, changeStatus, closeSnacke, search, dirrect, initial, hideRoom, closeDialog, makeStateRoom}) => {

return (
  <div style={{ margin: '0 auto',height: '100%' }} >
  <RealTime initial={initial} />
  <DialogMessage 
    dialog={main.dialog}
    closeDialog={closeDialog}
    message={main.dialogMess}
  />
  <CallComing main={main} closeDialog={closeDialog} makeState={makeState} />
  <Progress display={main.block}></Progress>
  <Stream main={main} makeState={makeState} makeStateRoom={makeStateRoom}/>
    <div className='row' style={{margin: '0 auto',height: '100%'}}>

        <div className='col-md-3' style={{borderRight: '1px solid lightgray', padding: '0px'}}>  
          <Snackbar 
            open={main.snackeOpen}
            message={main.snackeMess}
            onRequestClose={closeSnacke}
            contentStyle={{color: main.snakeColor}}
          />
          <Search 
            main={main}
            makeState={makeState}
            search={search}
            dirrect={dirrect}
          /> 
          <SettingLeft 
            main={main}
            makeState={makeState}
          />         
          <Account
            main={main}
            signOut={signOut}
            makeState={makeState}
            changeStatus={changeStatus}
          ></Account>
          <div className='row' style={{margin: '0 auto', overflowY:'scroll',height:'calc(100% - 84px)'}}>
            <Subheader></Subheader>
            <List style={{width: '100%', padding: '0px', height: 'calc(100% - 40px)'}}>
                {main && (main.roomlist.length > 0) ? 
                  main.roomlist.map((value, i) => {
                    return (
                      <ChannelList key={i} array={value} hideRoom={hideRoom} ></ChannelList>
                    )
                  })
                  : ''}
            </List>
          </div>
        </div>
        <div className='col-md-9' style={{padding: '0px'}}>
            {children}
        </div>
    </div>
  </div>
)}

Main.propTypes = {
  children: PropTypes.node,
  main: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  makeState: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  closeSnacke: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  dirrect: PropTypes.func.isRequired,
  initial: PropTypes.func.isRequired,
  hideRoom: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  makeStateRoom: PropTypes.func.isRequired
}

export default Main
