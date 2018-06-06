import React from 'react'
import PropTypes from 'prop-types'

import './Main.scss'
import ChannelList from './ChannelList'
import Account from './Account'
import Search from './Search'
import SettingLeft from './SettingLeft'

import Progress from '../../../components/Common/PageLoading'
import Snackbar from '../../../components/Common/Snackbar'

import { GoogleLogout } from 'react-google-login';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


const logout = (response) => {
  console.log(response);
}

export const Main = ({ main, signOut, makeState, children, changeStatus, closeSnacke, search, dirrect }) => {

return (
  <div style={{ margin: '0 auto',height: '100%' }} >
  <Progress display={main.block}></Progress>
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
                      <ChannelList key={i} array={value}></ChannelList>
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

// <GoogleLogout
//   className="btn btn-danger"
//   buttonText="Logout"
//   onLogoutSuccess={logout}
// >
// </GoogleLogout>

Main.propTypes = {
  children: PropTypes.node,
  main: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  makeState: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  closeSnacke: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  dirrect: PropTypes.func.isRequired
}

export default Main
