import { Send } from "lucide-react";
import {type useChat} from "ai/react"

type HandleInputChange = ReturnType<typeof useChat>["handleInputChange"]
type HandleSubmit = ReturnType<typeof useChat>["handleSubmit"]
type SetInput = ReturnType<typeof useChat>["setInput"]


interface ChatInputProps {
    handleInputChange: HandleInputChange
    handleSubmit: HandleSubmit
    setInput: SetInput
}

function ChatInput ({handleInputChange, handleSubmit, setInput}: ChatInputProps): JSX.Element {
    return ( 
        <div className="z-10 bg-zinc-900 w-full">
            <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-3 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                    <div className="relative flex flex-col w-full flex-grow px-4">
                        <form className="relative text-neutral-300" onSubmit={handleSubmit}>
                            <input 
                                minLength={4} 
                                className="resize-none bg-zinc-800 hover:bg-zinc-900 rounded-xl text-base w-full px-3 py-1.5" 
                                onChange={handleInputChange} 
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        handleSubmit()
                                        e.preventDefault()
                                        setInput("")
                                    }
                                }}
                                placeholder="Enter your question..." 
                            />
                            <button className="absolute z-10 right-3 bottom-2" type="submit"><Send size={20}/></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ChatInput;