import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import Image from "next/image";

const RwdChat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
  });

  const chatContainer = useRef<HTMLDivElement>(null);

  const scroll = () => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div ref={chatContainer} className="flex-grow overflow-y-auto">
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`flex items-start p-4 ${m.role === "user" ? "bg-blue-50" : "bg-gray-50"
              }`}
          >
            <Image
              className="rounded-full"
              alt="avatar"
              width={40}
              height={40}
              src={m.role === "user" ? "/user-avatar.jpg" : "/ai-avatar.png"}
            />
            <div className="ml-4 flex-grow">
              <p className="text-sm">{m.content}</p>
              {index < messages.length - 1 && (
                <div className="border-b border-gray-200 my-2" />
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          name="input-field"
          type="text"
          placeholder="Say anything"
          onChange={handleInputChange}
          value={input}
          className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default RwdChat;