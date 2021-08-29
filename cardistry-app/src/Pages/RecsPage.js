import React from 'react';
import {GOOGLE_API_KEY} from './APIkey';
import Button from 'react-bootstrap/Button';

/* uses the YouTube Data API v3 and statistics from the list of known cardistry
 * moves to display tutorial videos for cardistry moves of similar type and
 * difficulty to moves already learned
 * 
 * uses this Google API client https://github.com/google/google-api-javascript-client
*/
export class RecsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alreadyLoaded: false,
            recs: {},
            moves: [],
            error: 0
        };
        this.diffRec = "";
        this.typeRec = "";


        // CONSTANTS

        this.index2Type = {
            0: "2-handed cut",
            1: "1-handed cut",
            2: "1-card move",
            3: "display",
            4: "aerial",
            5: "shuffle",
            6: "isolation",
            7: "fan spread",
            8: "",
            9: "magic"
        };
        this.type2Index = {
            "2-handed cuts": 0,
            "1-handed cuts": 1,
            "1-card moves": 2,
            "displays": 3,
            "aerials": 4,
            "shuffles": 5,
            "isolations": 6,
            "fans/spreads": 7,
            "misc": 8,
            "magic": 9
        }

        this.index2Difficulty = {
            0: "easy",
            1: "easy intermediate",
            2: "intermediate",
            3: "intermediate hard",
            4: "hard"
        };
    }
    
    // initialize JS client library and make API request
    initGapi() {

        // helper function that makes the API call
        this.makeAPICall = () => {
            // create the API request
            window.gapi.client.setApiKey(GOOGLE_API_KEY);
            let apiReq = {
                'path': 'https://www.googleapis.com/youtube/v3/search',
                'method': 'GET',
                'params': {
                    'part':'snippet', 
                    'q': 'cardistry tutorial ' + this.diffRec + ' ' + this.typeRec, 
                    'type':'video',
                    'videoEmbeddable': 'true',
                    'maxResults': 3
                }
            }
            // if we've already loaded some recommendations, load the next page of search results
            if (Object.keys(this.state.recs).length !== 0) {
                apiReq.params.pageToken = this.state.recs.nextPageToken
            }
            let promise = window.gapi.client.request(apiReq);

            // execute the API request
            promise.execute((jsonResp, rawResp) => {
                if (jsonResp) {
                    console.log(jsonResp);
                    
                    //error checking
                    if (jsonResp.hasOwnProperty('error')) {
                        this.setState({
                            alreadyLoaded: this.state.alreadyLoaded,
                            recs: this.state.recs,
                            moves: this.state.moves,
                            error: 1
                        });
                    }
                    // if no errors, set recommendations state
                    else {
                        this.setState({
                            alreadyLoaded: this.state.alreadyLoaded,
                            recs: jsonResp,
                            moves: this.state.moves,
                            error: this.state.error
                        });
                    }
                }
                else {
                    console.log(rawResp);
                }
            })
        }

        // load the gapi if not already loaded, then make API call
        if (!this.state.alreadyLoaded) {
            window.gapi.load('client', () => {
                this.makeAPICall();
            });
            this.setState({
                alreadyLoaded: true,
                recs: this.state.recs,
                moves: this.state.moves,
                error: this.state.error
            });
        }
        else {
            this.makeAPICall();
        }
        
    }

    // https://stackoverflow.com/questions/44213061/cannot-read-property-load-of-undefined
    // load the Google API 
    loadGapiAndAfterwardsInitAuth() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.async = true;
        script.defer = true;
        script.onload = this.initGapi.bind(this);
        document.head.appendChild(script);
    }

    // load the current list of movese already learned
    loadKnownMoves() {
        fetch('/api')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => this.setState({
                alreadyLoaded: this.state.alreadyLoaded,
                recs: this.state.recs,
                moves: data,
                error: this.state.error
            }));
    }

    componentDidUpdate() {
        // set recommended difficulty and type if not already set and moves have been loaded
        if (this.diffRec.length === 0 && this.typeRec.length === 0 && this.state.moves.length !== 0 ) {
            let difficultyArr = [0, 0, 0, 0, 0];
            let typeArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            // 2-handed cuts, 1-handed cuts, 1-card moves, displays, aerials, shuffles, isolations, fans/spreads, misc, magic
            
            // count the occurrences of each type/difficulty in the known moves list
            for (let i = 0; i < this.state.moves.length; i++) {
                //update difficulty if valid
                let diffInt = parseInt(this.state.moves[i].difficulty);
                if (!isNaN(diffInt)) {
                    difficultyArr[diffInt - 1]++;
                }
                //update type if valid
                if (this.type2Index.hasOwnProperty(this.state.moves[i].moveType)) {
                    let typeIndex = this.type2Index[this.state.moves[i].moveType];
                    if (typeIndex >= 0) {
                        typeArr[typeIndex]++;
                    }
                }
            }

            // find the type/difficulty with most moves learned
            this.diffRec = " ";
            let currMax = -1;
            for (let i = 0; i < difficultyArr.length; i++) {
                if (difficultyArr[i] > currMax) {
                    currMax = difficultyArr[i];
                    this.diffRec = this.index2Difficulty[i];
                }
            }
            this.typeRec = " ";
            currMax = -1;
            for (let i = 0; i < typeArr.length; i++) {
                if (typeArr[i] > currMax) {
                    currMax = typeArr[i];
                    this.typeRec = this.index2Type[i];
                }
            }

            // after getting the YouTube query parameters, prepare and use the API
            this.loadGapiAndAfterwardsInitAuth(); 
        }
    }

    // when this component loads, load the known moves and Google API
    componentDidMount() {
        this.loadKnownMoves();
    }

    render() {
        if (this.state.error === 1) {
            return <p>error - check console logs</p>
        }
        else if (Object.keys(this.state.recs).length !== 0) {

            //display the video results
            let vid1Link = "https://www.youtube.com/embed/" + this.state.recs.items[0].id.videoId;
            let vid2Link = "https://www.youtube.com/embed/" + this.state.recs.items[1].id.videoId;
            let vid3Link = "https://www.youtube.com/embed/" + this.state.recs.items[2].id.videoId;

            return (
                <>
                <h4 style={{padding: "50px 0px 20px 0px"}}>Top 3 tutorial recommendations: </h4>

                <iframe width="560" 
                    height="315" 
                    src={vid1Link}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; 
                        autoplay; 
                        clipboard-write; 
                        encrypted-media; 
                        gyroscope; 
                        picture-in-picture" 
                    allowFullScreen
                    style={{padding:"0px 5px 0px 5px"}}></iframe>
                <iframe width="560" 
                    height="315" 
                    src={vid2Link}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; 
                        autoplay; 
                        clipboard-write; 
                        encrypted-media; 
                        gyroscope; 
                        picture-in-picture" 
                    allowFullScreen
                    style={{padding:"0px 5px 0px 5px"}}></iframe>
                <iframe width="560" 
                    height="315" 
                    src={vid3Link}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; 
                        autoplay; 
                        clipboard-write; 
                        encrypted-media; 
                        gyroscope; 
                        picture-in-picture" 
                    allowFullScreen
                    style={{padding:"0px 5px 0px 5px"}}></iframe>
                <div style={{padding: "20px 0px 100px 0px"}}>
                    <Button variant="secondary" onClick={this.initGapi.bind(this)}>Generate more!</Button>
                </div>
                </>
                
            )
        }
        return (
            <>
                <h4 style={{padding: "50px 0px 20px 0px"}}>loading recommendation videos... </h4>
            </>
        )

        
    }
}