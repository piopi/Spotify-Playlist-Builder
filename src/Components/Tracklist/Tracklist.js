import React, { Component } from 'react'
import './Tracklist.css';
import PropTypes from 'prop-types';
import Track from '../Track/Track';
export class Tracklist extends Component {
    constructor(props) {
        super(props)
    
        
    }
    
    
    render() {
        return (
            
            <div className="TrackList">
                {this.props.tracks.map(search => {
            return <Track key={search.id} track={search} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove}/>
            })}
            </div>
            
        )
    }
}
Tracklist.propTypes = {
    tracks: PropTypes.array,
    onAdd: PropTypes.func,
    isRemoval: PropTypes.bool.isRequired,
    onRemove: PropTypes.func,
    
  };

export default Tracklist
