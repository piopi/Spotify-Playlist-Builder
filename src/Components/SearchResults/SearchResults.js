import React, { Component } from 'react'
import './SearchResults.css';
import {Tracklist} from '../Tracklist/Tracklist';
import PropTypes from 'prop-types';
export class SearchResults extends Component {
    
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist tracks={this.props.searchResults} isRemoval={false} onAdd={this.props.onAdd}/>
            </div>
        )
    }
}
SearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
    
  };
export default SearchResults
