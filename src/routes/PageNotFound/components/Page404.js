import React from 'react'

export const NotFound = () => (
	<div style={{
			height: '100%', 
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center'
		}}>     
    	<div style={{
			height: '40px', 
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}>     
    		<span style={{
				width: 70,
			    fontSize: 25,
			    margin: 20,
			    borderRight: '1px solid lightgrey',
			}}>404</span>
    		<p style={{
    			marginBottom: 'unset'
    		}}>The requested path could not be found</p>
    	</div>
  </div>
  )

export default NotFound;