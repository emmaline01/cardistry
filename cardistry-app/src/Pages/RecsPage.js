import React from 'react';
import {GOOGLE_API_KEY} from './APIkey';

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
            let promise = window.gapi.client.request({
                'path': 'https://www.googleapis.com/youtube/v3/search',
                'method': 'GET',
                'params': {'part':'snippet', 'q':'bruno mars', 'type':'video'}
            });
            promise.execute((jsonResp, _) => {
                console.log(jsonResp);
                this.setState({
                    alreadyLoaded: this.state.alreadyLoaded,
                    recs: jsonResp
                });
            })
        }

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
            //display the first video result
            let vid1Link = "https://www.youtube.com/embed/" + this.state.recs.items[0].id.videoId;
            console.log(vid1Link);

            return (
                <>
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
                    allowFullScreen></iframe>
                </>
            )
        }
        return (
            <>
                <p>greet</p>
            </>
        )

        
    }
}