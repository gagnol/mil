/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { FaCheckCircle } from "react-icons/fa";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  _id?: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface Contact {
  _id: string;
  name: string;
  image: string | null | undefined;
}

const Contacts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");

  const { data: session } = useSession();
  const currentUser: User | undefined = session?.user;

  const getContacts = async () => {
    try {
      const res = await fetch(
        search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
      );
      const data: Contact[] = await res.json();
      setContacts(
        data.filter((contact) => contact._id !== currentUser?._id)
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) getContacts();
  }, [currentUser, search]);

  /* SELECT CONTACT */
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const isGroup = selectedContacts.length > 1;

  const handleSelect = (contact: Contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((item) => item !== contact)
      );
    } else {
      setSelectedContacts((prevSelectedContacts) => [
        ...prevSelectedContacts,
        contact,
      ]);
    }
  };

  /* ADD GROUP CHAT NAME */
  const [name, setName] = useState("");

  const router = useRouter();

  /* CREATE CHAT */
  const createChat = async () => {
    const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        currentUserId: currentUser?._id,
        members: selectedContacts.map((contact) => contact._id),
        isGroup,
        name,
      }),
    });
    const chat = await res.json();

    if (res.ok) {
      router.push(`/chats/${chat._id}`);
    }
  };

  return loading ? (
    <Loader />
  ) : (
<div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
    <div className="grid md:grid-cols-2">
          
      <div className="w-[500px]">
      <button
            className="btn btn-primary btn-outline"
            onClick={createChat}
            disabled={selectedContacts.length === 0}
          >
            FIND OR START A NEW CHAT
          </button>
        <div className="my-5">
          <p className="font-bold my-5 text-xl">Select the customers to start chat</p>
          <div className="md:grid-cols-1 overflow-y-scroll custom-scrollbar">
            {contacts.map((user, index) => (
              <div
                key={index}
                className="flex gap-5 m-5 items-center cursor-pointer"
                onClick={() => handleSelect(user)}
              
              >
                {selectedContacts.find((item) => item === user) ? (
                  <FaCheckCircle className="text-primary" />
                ) : (
                  <MdRadioButtonUnchecked />
                )}
                <Image
                  width={50}
                  height={50}
                  src={user?.image || "/noavatar.png"}
                  alt="profile"
                  className="profilePhoto"
                />
                <p className="font-bold">{user?.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className="font-bold">Group Chat Name</p>
                <input
                  placeholder="Enter group chat name..."
                  className="input-group-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="font-bold">Members</p>
                <div className="flex flex-wrap gap-3">
                  {selectedContacts.map((contact, index) => (
                    <p className="font-bold p-2 bg-primary rounded-lg" key={index}>
                      {contact.name}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contacts;
