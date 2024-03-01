/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import Loader from "./Loader";
import { pusherClient } from "@/lib/pusher";

interface User {
  _id?: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface Chat {
  _id: string;
  // Add other properties as needed
}

const ChatList = ({ currentChatId }: { currentChatId: string }) => {
  const { data: session } = useSession();

  const currentUser: User | undefined = session?.user;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]); // Specify the Chat type here
  const [search, setSearch] = useState("");

  const getChats = async () => {
    try {
      const res = await fetch(
        search !== ""
          ? `/api/users/${currentUser?._id}/searchChat/${search}`
          : `/api/users/${currentUser?._id}`
      );
      const data: Chat[] = await res.json(); // Specify the Chat type here
      setChats(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getChats();
    }
  }, [currentUser, search]);

  useEffect(() => {
    if (currentUser) {
      pusherClient.subscribe(currentUser._id!);

      const handleChatUpdate = (updatedChat: { id: string; messages: any }) => {
        setChats((allChats) =>
          allChats.map((chat) => {
            if (chat._id === updatedChat.id) {
              return { ...chat, messages: updatedChat.messages };
            } else {
              return chat;
            }
          })
        );
      };

      const handleNewChat = (newChat: Chat) => {
        setChats((allChats) => [...allChats, newChat]);
      };

      pusherClient.bind("update-chat", handleChatUpdate);
      pusherClient.bind("new-chat", handleNewChat);

      return () => {
        pusherClient.unsubscribe(currentUser._id!);
        pusherClient.unbind("update-chat", handleChatUpdate);
        pusherClient.unbind("new-chat", handleNewChat);
      };
    }
  }, [currentUser]);

  return loading ? (
    <Loader />
  ) : (
    <div className="h-[700px] flex flex-col bg-neutral-800 rounded-md">
      <input
        placeholder="Search chat..."
        className="input-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="bg-neutral-800">
        {chats?.map((chat, index) => (
          <div key={index}>
            <ChatBox
              chat={chat}
              index={index}
              currentUser={currentUser}
              currentChatId={currentChatId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
