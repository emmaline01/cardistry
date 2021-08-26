import React from 'react';
import {GOOGLE_API_KEY} from './APIkey';

export class RecsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alreadyLoaded: false
        };
    }
    
    // initialize JS client library and make API request
    initGapi() {
        this.makeAPICall = () => {
            window.gapi.client.setApiKey(GOOGLE_API_KEY);
            let promise = window.gapi.client.request({
                'path': 'https://www.googleapis.com/youtube/v3/search',
                'method': 'GET',
                'params': {'part':'snippet', 'q':'cardistry'}
            });
            promise.execute((jsonResp, rawResp) => console.log(jsonResp))
        }

        if (!this.state.alreadyLoaded) {
            window.gapi.load('client', () => {
                this.makeAPICall();
            });
            this.setState({
                alreadyLoaded: true
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

        return (
            <>
            <p>greet</p>
            </>
        )
    }
}