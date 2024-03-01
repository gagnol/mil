"use client"
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import ChatDetails from "../../../components/Chat/ChatDetails";
import ChatList from "../../../components/Chat/ChatList";

interface User {
  _id?: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = () => {
  const { chatId } = useParams<{ chatId: string }>();

  const { data: session } = useSession();
  const currentUser: User | undefined = session?.user;

  const seenMessages = async () => {
    try {
      await fetch(`/api/chats/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUserId: currentUser?._id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser._id && chatId) seenMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, chatId]);

  return (
    <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
      <div className="grid md:grid-cols-2">
      <div className="w-[500px]">
        <ChatList currentChatId={chatId} />
      </div>
      <div className="w-3/4 max-lg:w-full">
        <ChatDetails chatId={chatId} />
      </div>
      </div>
    </div>
  );
};

export default ChatPage;
