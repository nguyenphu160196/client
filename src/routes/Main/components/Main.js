import React from 'react'
import PropTypes from 'prop-types'
import { GoogleLogout } from 'react-google-login';
import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {Card, CardHeader} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Logout from 'material-ui/svg-icons/action/power-settings-new'
import Search from 'material-ui/svg-icons/action/search'
import './Main.scss'



const logout = (response) => {
  console.log(response);
}

export const FriendList = ({array}) => {
  return (
    <ListItem 
      primaryText={array.name}
      secondaryText	={array.message}
      leftAvatar={<Avatar src="https://vignette.wikia.nocookie.net/epicrapbattlesofhistory/images/8/8c/Batman.gif/revision/latest?cb=20130824220307" />
      // {array.avatar}</Avatar>
    }
      rightIcon={<CommunicationChatBubble />}
    />
  )
}

export const Main = ({ main, signOut }) => (
  <div style={{ margin: '0 auto',height: '100%' }} >
    <div className='row' style={{margin: '0 auto',height: '100%'}}>
        <div className='col-md-3' style={{borderRight: '1px solid lightgray', padding: '0px'}}>
          <div className='row' style={{margin: '0 auto'}}>
          <Card style={{width: '100%' }}>
            <CardHeader
              title={JSON.parse(localStorage.user).name}
              subtitle={JSON.parse(localStorage.user).email}
              avatar="https://thumbs.gfycat.com/FearlessDazzlingJellyfish-max-1mb.gif"             
            >
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem 
                  primaryText="Sign out"
                  leftIcon={<Logout />}
                  onClick={(e) => {
                    signOut()
                  }}
                />
              </IconMenu>
            </CardHeader>
          </Card>
          </div>
          {/* <div className='row' style={{margin: '0 auto', backgroundColor:'rgba(0,0,0,.15)', height: '40px'}}>
            
          </div> */}
          <div className='row' style={{margin: '0 auto', overflowY:'scroll',height:'calc(100% - 84px)'}}>
            <div className="input-group" style={{height: '40px'}}>
              <input type="text" className="form-control" placeholder="Search friend" />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">{<Search/>}</button>
              </div>
            </div>
            <List style={{width: '100%', padding: '0px', height: 'calc(100% - 40px)'}}>
                {/* <Subheader>Recent chats</Subheader> */}
                {main.friendlist ? 
                  main.friendlist.map((value, key) => {
                    return (
                      <FriendList
                        key={key}
                        array={value}
                      />
                    )
                  })
                  : 'Empty'}
            </List>
          </div>
        </div>
        <div className='col-md-9' style={{padding: '0px'}}>
            <div className='row' style={{ margin: '0 auto',width: '100%' }}></div>
            <div className='row' style={{ margin: '0 auto',width: '100%' }}></div>
            <div className='row' style={{ margin: '0 auto',width: '100%' }}></div>
        </div>
    </div>
  </div>
)

    // <GoogleLogout
    //   className="btn btn-danger"
    //   buttonText="Logout"
    //   onLogoutSuccess={logout}
    // >
    // </GoogleLogout>

Main.propTypes = {
  main: PropTypes.object.isRequired,
  signOut: PropTypes.func
}

export default Main
