import ChatBot from "../../../components/chat/chat"
import WebPreview from "../../../components/chat/web-preview"

export default function ChatPage({ params }: { params: { url: string } }): JSX.Element {


  return (
    <div className="flex w-screen">
      <div className="w-0 md:w-1/2 h-screen">
        <WebPreview params={params}/>
      </div>
      <div className="w-full md:w-1/2">
        <ChatBot params={params}/>
      </div>
    </div>
  )
}

