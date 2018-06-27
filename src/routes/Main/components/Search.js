import React from 'react'
import { imagesURL } from '../../../config'
import { IndexLink, Link } from 'react-router'

import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import {ListItem} from 'material-ui/List';

import Clear from 'material-ui/svg-icons/content/clear'
import SearchIcon from 'material-ui/svg-icons/action/search'


export const Search = ({main, makeState, search, dirrect}) => {
    return (
     <div>
       <Drawer 
        open={main.search}
        width='25%'
       >
       <div className="row" style={{display:"flex", alignItems: 'center', justifyContent: 'center', padding:'15px 0px'}}>
                   <div className="col-sm-11">
              <div className="input-group" style={{height: '40px'}}>
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon1" 
                  style={{
                    backgroundColor: 'unset',
                    borderRight: 'none'
                  }} >{<SearchIcon />}</span>
                </div>
                <input type="text" className="form-control" placeholder="Search user or room" 
                  style={{
                    outline: 'none',
                    boxShadow: 'none',
                    border: '1px solid #ccc',
                    borderLeft: 'none',
                    borderRight: 'none',
                    paddingLeft: '0px',
                  }}
                  value={main.searchValue}
                  onChange={(e) => {
                    if(!(new RegExp("/")).test(e.target.value)){
                      makeState('searchValue', e.target.value);
                      search(e.target.value);
                    }
                  }}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" 
                    onClick={() => {
                      makeState('search',false);
                    }} 
                    type="button" 
                    style={{
                      borderLeft: 'none'
                  }}>{<Clear />}</button>
                </div>
              </div>
                   </div>
               </div>
         <div className="row">
            <div className="col-md-12">
                  {main.searchlist && (main.searchlist.length>0) ? 
                    main.searchlist.map((value, i) => {
                      return (
                          <ListItem 
                              key={i}
                              primaryText={value.email ? 
                                <div className="d-flex">
                                  <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 170}}>{value.name}</div>
                                  <div style={{color: '#fff', backgroundColor: '#0084ff', fontSize: 10, textAlign: 'center', width: 30, marginLeft: 10, fontWeight: 'bold'}}>User</div>
                                </div> 
                                :
                                <div className="d-flex">
                                  <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 170}}>{value.name}</div>
                                  <div style={{color: '#fff', backgroundColor: 'red', fontSize: 10, textAlign: 'center', width: 35, marginLeft: 10,     fontWeight: 'bold'}}>Group</div>
                                </div>}
                              leftAvatar={value.avatar.charAt(0) == '#' 
                                ? 
                                <Avatar style={{backgroundColor: value.avatar}}>{value.name.charAt(0).toUpperCase()}</Avatar>
                                :
                                <Avatar src={imagesURL + value.avatar.split('/avatars/')[1]}></Avatar>
                              }
                              onClick={() => {
                                dirrect(value);
                              }}
                          ></ListItem>
                      )
                    })
                    : ''}
            </div>
         </div>
       </Drawer>
     </div>
     );
   }

   export default Search;