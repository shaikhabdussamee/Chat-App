import React, { useEffect, useState } from 'react'

function Chat({socket,username,room}) {
    const [currentMessage, setcurrentMessage] = useState("");
    const [messageList,setMessageList] = useState([]);

    const sendMessage = async() => {
        if(currentMessage !==""){
            const messageData = {
                room: room,
                Author: username,
                message: currentMessage,
                time:new Date(Date.now()).getHours() + 
                ":" +
                new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }        
    };

    useEffect(() =>{
        socket.on("recieve_message", (data) => {
            setMessageList((list) => [...list, data]);
        });

    },[socket])

  return (
    <div className="chat-window">
    <div className="chat-header">
    <p>Live Chats</p>
     </div>
        <div className='chat-body'>
            {messageList.map((messageContent) => {
                return (
                <div className="message"
                 id={username === messageContent.Author ? "you" : "other"}
                >
                    <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p>{messageContent.time}</p> &nbsp;
                            <p>{messageContent.Author}</p>
                        </div>
                        </div>
                </div>
                );
            })}
        </div>
        <div className='chat-footer'>
        <input type="text" placeholder = "Heyy..."
        onChange={(event) => {
            setcurrentMessage(event.target.value);
        }}
    />
        <button onClick={sendMessage}>&#9658;</button>    
        </div>    
    </div>
  )
}

export default Chat