/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import React, { Component } from 'react'
import {Spotify} from '../../util/Spotify'

class App extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
      searchResults:[],
      playlistTracks:[],
      playlistName:"New Playlist"
    }
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist= this.savePlaylist.bind(this);
    this.search= this.search.bind(this);
  }
  search(searchTerm){
    Spotify.search(searchTerm).then(searchResults => { this.setState({searchResults:searchResults})})
    
  }
  savePlaylist(){
    let trackURIs= this.state.playlistTracks.map(track => {
        return track.uri;
    })
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistTracks:[],playlistName:'New Playlist'});
  }
  updatePlaylistName(name){
    this.setState({playlistName:name});
  }
  removeTrack(track){
    let newplaylist = [...this.state.playlistTracks]
    newplaylist= newplaylist.filter(elem=>{
      return elem.id !== track.id
    })
    this.setState({playlistTracks:newplaylist})
  }
  addTrack(track){
    let isPresent = this.state.playlistTracks.find(playList => {
      return playList.id == track.id 
    })
    
    if(!isPresent){
      let newplaylist = [...this.state.playlistTracks,track]
      this.setState({playlistTracks:newplaylist})
    }
  }
  render(){
    return (
      <div>
        <h1>Spotify<span className="highlight"> Playlist</span> Builder</h1>
        <div className="App">
        <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
        <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
        <Playlist onSave={this.savePlaylist} onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName}/>
      </div>
    </div>
  </div>
    )
    }
}

export default App;
