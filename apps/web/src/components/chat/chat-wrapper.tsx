"use client"

import type { Message } from "ai/react";
import { useChat } from "ai/react";
import Messages from "./messages";
import ChatInput from "./chat-input";

function ChatWrapper ({initialMessages, sessionId} : {sessionId: string, initialMessages: Message[]}): JSX.Element {

    const {messages, handleInputChange, handleSubmit, setInput} = useChat({
        api: "/api/chat-stream",
        body: {sessionId},
        initialMessages
    })

    return ( 
        <div className="relative h-screen bg-zinc-900 flex  flex-col justify-between gap-2 w-full">
            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col overflow-y-scroll no-scrollbar">
                <Messages messages={messages}/>
            </div>
            <ChatInput handleInputChange={handleInputChange} handleSubmit={handleSubmit} setInput={setInput}/>
        </div>
     );
}
 
export default ChatWrapper;