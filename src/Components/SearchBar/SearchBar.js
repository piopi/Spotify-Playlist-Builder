import React, { Component } from 'react'
import './SearchBar.css';
import PropTypes from 'prop-types';
export class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {term:''};
        this.search = this.search.bind(this);
        this.handleTermChange=this.handleTermChange.bind(this);
    }
    
    handleTermChange(event){
        this.setState({term:event.target.value});
    }
    search(){
        this.props.onSearch(this.state.term);
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}
SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
}
