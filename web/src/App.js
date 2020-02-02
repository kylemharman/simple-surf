import React, { Component } from "react";
import axios from "axios";
import "./App.css";

export default class App extends Component {
    state = {
        quote: "",
        by: ""
    };

    componentDidMount() {
        axios.get('/hello')
            .then(res => {
                console.log(res.data.quote)
                this.setState({ quote: res.data.quote, by: res.data.by })
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
    }

    render() {
        return (
            <div className="App">
                <h1>Simple Surf Coming Soon!</h1>
                <p><i>{this.state.quote}</i></p>
                <p><strong>{this.state.by}</strong></p>
            </div>
        );
    }
}
