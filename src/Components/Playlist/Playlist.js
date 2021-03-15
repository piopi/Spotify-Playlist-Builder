import React, { Component } from 'react'
import './Playlist.css'
import {Tracklist} from '../Tracklist/Tracklist';
import PropTypes from 'prop-types';
export class Playlist extends Component {
    constructor(props) {
        super(props)
    
        this.handleNameChange=this.handleNameChange.bind(this);
        
    }
    
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }
    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} value={this.props.playlistName}/>
                <Tracklist tracks = {this.props.playlistTracks} isRemoval={true} onRemove={this.props.onRemove}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
Playlist.propTypes = {
    playlistTracks: PropTypes.array.isRequired,
    playlistName:PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func,
    onSave: PropTypes.func.isRequired,
  };
export default Playlist
