let accessToken;

// eslint-disable-next-line no-undef
const clientID= process.env.REACT_APP_clientID;
// eslint-disable-next-line no-undef
const redirectURI=process.env.REACT_APP_redirectURI; 

export let Spotify={
    getAccessToken() {
        if (accessToken) { return accessToken; }
        const url = window.location.href;
        let token = url.match(/access_token=([^&]*)/);
        const expires = url.match(/expires_in=([^&]*)/);
        if (token && expires) {
          accessToken = token[1];
          window.setTimeout(() => accessToken = '', expires[1] * 1000);
          window.history.pushState('Access Token', null, '/');
          return accessToken;
        } else {
          const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          window.location = url;
        }
      },
    search(searchTerm){
        
        accessToken= this.getAccessToken();
        
        return searchTerm ?  fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{
            headers: {Authorization: `Bearer ${accessToken}`}
          })
            .then(response => response.json())
            .then(data => {
                if(!data.tracks){
                    return []
                }
                if (!Array.isArray(data.tracks.items)) {
                    console.log('Error:', data.error.message);
                  }else { 
                    return data.tracks.items.map(track => {
                      return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                      }
                  })}
                
            }): [] ;
    },
    savePlaylist(namePlaylist,trackURI){
        accessToken= this.getAccessToken();
        console.log(accessToken);
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-type': 'application/json'
          };
        fetch('https://api.spotify.com/v1/me',{headers:headers})
                        .then(response => response.json())
                        .then(data => {const userID=data.id;
                            fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{headers:headers,
        body:JSON.stringify({ name: namePlaylist }),
        method: 'POST'})
                                .then(response => response.json())
                                .then(data => {
                                    const playlistID = data.id;
                                   
                                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {headers:headers,
                                    body:JSON.stringify({uris: trackURI}),
                                    method: 'POST'});

                                })

        
    })
}
}; 