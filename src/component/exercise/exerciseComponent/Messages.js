import React from 'react';
import Message from './Message';

const Messages = ({messages, image}) => {
    return (
        <div className="message_exo">
            {messages?.map((m) => <Message image={image} message={m} />)}
        </div>
    );
};

export default Messages;