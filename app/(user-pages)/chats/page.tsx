import ChatList from "../../components/Chat/ChatList"
import Contacts from "../../components/Chat/Contacts"


const Chats = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
      <div className="grid md:grid-cols-2">
      <div className="w-[500px]">
        <ChatList currentChatId={""} />
      </div>
      <div className="w-3/4 max-lg:w-full">
        <Contacts />
      </div>
      </div>
    </div>
  )
}

export default Chats