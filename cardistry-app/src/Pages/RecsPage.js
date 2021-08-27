import React from 'react';
import {GOOGLE_API_KEY} from './APIkey';
import Button from 'react-bootstrap/Button';

export class RecsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alreadyLoaded: false,
            recs: {}
        };
    }
    
    // initialize JS client library and make API request
    initGapi() {
        this.makeAPICall = () => {
            window.gapi.client.setApiKey(GOOGLE_API_KEY);
            let apiReq = {
                'path': 'https://www.googleapis.com/youtube/v3/search',
                'method': 'GET',
                'params': {
                    'part':'snippet', 
                    'q':'bruno mars', 
                    'type':'video',
                    'videoEmbeddable': 'true',
                    'maxResults': 3
                }
            }
            if (Object.keys(this.state.recs).length !== 0) {
                apiReq.params.pageToken = this.state.recs.nextPageToken
            }
            let promise = window.gapi.client.request(apiReq);

            promise.execute((jsonResp, _) => {
                console.log(jsonResp);
                this.setState({
                    alreadyLoaded: this.state.alreadyLoaded,
                    recs: jsonResp
                });
            }) // TODO: add error checking
        }

        // load the gapi if not already loaded, then make API call
        if (!this.state.alreadyLoaded) {
            window.gapi.load('client', () => {
                this.makeAPICall();
            });
            this.setState({
                alreadyLoaded: true,
                recs: this.state.recs
            });
        }
        else {
            this.makeAPICall();
        }
        
    }

    // https://stackoverflow.com/questions/44213061/cannot-read-property-load-of-undefined
    loadGapiAndAfterwardsInitAuth() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        script.async = true;
        script.defer = true;
        script.onload = this.initGapi.bind(this);
        document.head.appendChild(script);
    }

    componentDidMount() {
        this.loadGapiAndAfterwardsInitAuth();
    }

    render() {
        if (Object.keys(this.state.recs).length !== 0) {

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