import { cookies } from "next/headers";
import { ragChat } from "../../lib/rag-chat";
import { redis } from "../../lib/redis";
import ChatWrapper from "./chat-wrapper";

function reConstructUrl({ url }: { url: string | string[] }) {
    const combinedUrl = Array.isArray(url) ? url.join("/") : url;
    return decodeURIComponent(combinedUrl);
}

const ChatBot = async ({params} : { params: { url: string}}): Promise<JSX.Element> => {

    const sessionCookie = cookies().get("sessionId")?.value
    const reconstructedUrl = reConstructUrl({ url: params.url });

    const sessionId = `${reconstructedUrl} --- ${sessionCookie}`.replace(/\//, "")
   
    const isAlreadyIndexed = await redis.sismember("indexed-urls", reconstructedUrl)

    const initialMessages = await ragChat.history.getMessages({amount: 10, sessionId})

    if(!isAlreadyIndexed) {
        await ragChat.context.add({
            type: "html",
            source: reconstructedUrl,
            config: {chunkOverlap: 50, chunkSize:200}
        })

        await redis.sadd("indexed-urls", reconstructedUrl)
    }

    return ( 
        <ChatWrapper sessionId={sessionId} initialMessages={initialMessages}/>
     );
}
 
export default ChatBot;