import React from "react";

import {
    Typography,
    Grid,
    TextField
} from "@material-ui/core";

import MessageList from "../chat/MessageList";
import TextInput from "../chat/TextInput";

import {
    Message,
    User
} from "../../classes/";

class Main extends React.Component {
    constructor(props) {
        super(props);

        const messages = [
            new Message("Hello there, how are you?")
                .align(Message.LEFT)
                .author(User.random())
        ];

        this.state = {
            messages: messages
        };
    }

    handleEnter = (e) => {
        if (e.keyCode == 13) {
            this.newMessage(
                new Message(e.target.value)
                    .align(Message.RIGHT)
                    .author(User.me())
            );

            this.mockAnswer();

            e.target.value = "";
        }
    }

    mockAnswer() {
        const answers = [
            "Ok",
            "Alright",
            "Yeah...",
            "That's cool!",
            "That's amazing!",
            "I'm listening"
        ];

        setTimeout(() => {
            const selected = answers[Math.floor(Math.random() * answers.length)];

            this.newMessage(
                new Message(selected)
                    .align(Message.LEFT)
                    .author(User.random())
            );

        }, Math.random() * 1000 + 500);
    }

    newMessage = (message, callback = () => { }) => {
        let newArray = this.state.messages.slice(0);
        newArray.push(message);

        this.setState({
            messages: newArray
        }, callback);
    }

    render() {
        return (
            <Grid item xl={10} lg={9} md={8} sm={7} xs={6} style={{ paddingTop: '2.5rem', paddingLeft: '0.5rem', paddingBottom: '3rem' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    padding: '1rem',
                    paddingLeft: 0
                }}>
                    <MessageList messages={this.state.messages} className="Messages" />
                    <TextInput onEnter={this.handleEnter} />
                </div>
            </Grid>
        );
    }
}

export default Main;