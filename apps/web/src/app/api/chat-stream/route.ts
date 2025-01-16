import type { NextRequest } from "next/server";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { ragChat } from "../../../lib/rag-chat";

interface Message {
    content: string;
  }

  interface RequestBody {
    messages: Message[];
    sessionId: string;
  }

export const POST = async (req: NextRequest): Promise<Response> => {
    const {messages, sessionId}: RequestBody = await req.json() as RequestBody;

    if (!Array.isArray(messages)) {
        return new Response(JSON.stringify({ error: "Invalid messages format" }), { status: 400 });
      }
      
    const lastMessage: string = messages[messages.length - 1].content

    const response = await ragChat.chat(lastMessage, {streaming: true, sessionId})
    
    return aiUseChatAdapter(response)
}