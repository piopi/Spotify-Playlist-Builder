import React, { Component } from 'react'
import "./Track.css";
import PropTypes from 'prop-types';
export class Track extends Component {
    constructor(props) {
        super(props);    
        this.addTrack=this.addTrack.bind(this);
        this.removeTrack=this.removeTrack.bind(this);
    }
    removeTrack(){
        this.props.onRemove(this.props.track);
    }
    addTrack(){
        this.props.onAdd(this.props.track);
    }
    renderAction() {
        var action=this.props.isRemoval ? <button className="Track-action" onClick={this.removeTrack}>-</button> : <button className="Track-action" onClick={this.addTrack}>+</button>
        return (action);
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist}|{this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}
Track.propTypes = {
    track: PropTypes.object.isRequired,
    onAdd: PropTypes.func,
    isRemoval: PropTypes.bool,
    onRemove: PropTypes.func
  };

export default Track
