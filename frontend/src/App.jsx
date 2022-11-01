import React, { useCallback, useState } from 'react';
import axios from 'axios';
import logo from './img/tier-logo.svg';
import './css/App.css';
import UrlForm from './components/UrlForm';
import ResultPanel from "./components/ResultPanel";

const App = () => {

    const [visibleValue, setVisibleValue] = useState(false);
    const [resultValue, setResultValue] = useState('');
    const [shortenValue, setShortenValue] = useState('');
    const [expandValue, setExpandValue] = useState('');

    const shortenOnChange = useCallback(
        (e) => {
            setShortenValue(e.target.value);
        }
    );

    const expandOnChange = useCallback(
        (e) => {
            setExpandValue(e.target.value);
        }
    );
    
    const submitForShortening = useCallback(
        (e) => {
            e.preventDefault();
            axios.post("http://localhost:8000/shortener/shorten", {
                url: shortenValue, 
            }).then(response => {
                navigator.clipboard.writeText(response.data.data.shortened_url);
                setResultValue(`The URL ${response.data.data.url} has been shortened to: ${response.data.data.shortened_url} and copied to the clipboard!`);
            }).catch(error => {
                if (error.response.status === 409) {
                    navigator.clipboard.writeText(error.response.data.data.shortened_url);
                    setResultValue(`${error.response.data.message} Its short version: ${error.response.data.data.shortened_url} has been copied to the clipboard!`);
                } else if (error.response.status === 400) {
                    setResultValue(`${error.response.data.message}`);
                } else {
                    setResultValue("Unexpected error occurred! Please try again later!");
                }
            }).finally(() => {
                if (!visibleValue) {
                    setVisibleValue(true);
                }
            });
        }
    );

    const submitForExpansion = useCallback(
        (e) => {
            e.preventDefault();
            axios.post("http://localhost:8000/shortener/fetch", {
                shortened_url: expandValue
            }).then(response => {
                navigator.clipboard.writeText(response.data.data.url);
                setResultValue(`The short URL ${response.data.data.shortened_url} corresponds to: ${response.data.data.url}. The full URL has been copied to the clipboard!`);
            }).catch(error => {
                setResultValue(`${error.response.data.message}`)
            }).finally(() => {
                if (!visibleValue) {
                    setVisibleValue(true);
                }
            });
        }
    );

    const shortenInputProperties = {
        "id": "shorten_url",
        "placeholder": "URL to shorten",
        "value": shortenValue,
        "onChange": shortenOnChange,
    };

    const expandInputProperties = {
        "id": "expand_url",
        "placeholder": "URL to expand",
        "value": expandValue,
        "onChange": expandOnChange,
    };

    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Change mobility for good</p>
            <UrlForm 
                label="Full URL" 
                buttonLabel="Shorten URL" 
                inputPlaceholder="URL to shorten" 
                onSubmit={submitForShortening}
                inputProperties={shortenInputProperties}
                useClass="align-form"
            />
            <UrlForm 
                label="Shortened URL" 
                buttonLabel="Expand URL" 
                inputPlaceholder="URL to expand" 
                onSubmit={submitForExpansion}
                inputProperties={expandInputProperties}
                useClass=""
            />
            <ResultPanel visible={visibleValue} result={resultValue} />
        </div>
    );
}

export default App;
