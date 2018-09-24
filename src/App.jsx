import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import queryString from 'query-string';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            data: '',
            accessToken: '',
            artist: null
        }
    }

    search() {
        console.log('this.state', this.state);        
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';    
        var accessToken = this.state.accessToken;
    
        var myOptions = {
          method: 'GET',
          headers:  {
            'Authorization': 'Bearer ' + accessToken
         },
          mode: 'cors',
          cache: 'default'
        };
    
        fetch(FETCH_URL, myOptions )
          .then(response => response.json())
          .then(json => {
              console.log('json', json);
              const artist = json.artists.items[0].name;
              console.log('artist', artist);
              this.setState({artist});
          })
      }

    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        console.log(accessToken);
        this.setState({accessToken: accessToken});
    }

    render () {
        return (
            <div className="App">
                <div className="App-title">Richard's Spotify Music Player</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an artist"
                            value={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <div className="Profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
            </div>
        )
    }
}

export default App;