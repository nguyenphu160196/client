import React from 'react'
import PropTypes from 'prop-types'


export const Default = ({ defaultpage }) => (
  	<div style={{padding: 10, height: '100%'}}>
  		<div id="demo" className="carousel slide" data-ride="carousel" style={{height: '100%'}}>
			
			<ul className="carousel-indicators">
				<li data-target="#demo" data-slide-to="0" className="active"></li>
				<li data-target="#demo" data-slide-to="1"></li>
				<li data-target="#demo" data-slide-to="2"></li>
			</ul>

			
			<div className="carousel-inner" style={{backgroundColor: 'lavender', height: '100%'}}>
				<div className="carousel-item active" style={{justifyContent: 'center'}}>
					<img src={require("../assets/img-4.png")} />
					<div className="carousel-caption" style={{bottom: '-80px', color: 'black'}}>
					</div>  
				</div>
				<div className="carousel-item" style={{justifyContent: 'center'}}>
					<img src={require("../assets/jitsi-front.png")} />
					<div className="carousel-caption" style={{bottom: '-50px', color: 'black'}}>
					</div>
				</div>
				<div className="carousel-item" style={{justifyContent: 'center'}}>
					<img src={require("../assets/jitsi-meet.png")} />
				</div>
			</div>

			<a className="carousel-control-prev" href="#demo" data-slide="prev">
			<span className="carousel-control-prev-icon"></span>
			</a>
			<a className="carousel-control-next" href="#demo" data-slide="next">
			<span className="carousel-control-next-icon"></span>
			</a>

		</div>
  	</div>
)

Default.propTypes = {
    defaultpage: PropTypes.object.isRequired,
}

export default Default