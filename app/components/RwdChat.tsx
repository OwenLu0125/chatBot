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
    <div className="flex flex-col h-full pt-10">
      <div ref={chatContainer} className="flex-grow overflow-y-auto">
        {messages.map((m, index) => (
          <div key={index} className={`flex w-full flex-col gap-1 empty:hidden ${m.role === 'user' ? 'items-end' : ''}`}>
            <div
              className={`flex  px-5 py-2.5 ${m.role === "user" ? " bg-blue-50  self-end rounded-3xl max-w-[70%] " : "items-start"}`}
            >
              {m.role !== "user" && (
                <Image
                  className="rounded-full"
                  alt="avatar"
                  width={40}
                  height={40}
                  src="/cs_icon.jpg"
                />
              )}
              <div className={` flex-grow ${m.role !== 'user' ? 'ml-2' : ''}`}>
                <p className="text-sm">{m.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-4 mb-4">
        {messages.length === 0 && (
          ["請告訴我台灣的歷史，限三百字內", "你可以回答什麼問題?", "Tell me a joke."].map((question, index) => (
            <button
              key={index}
              onClick={() => handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLInputElement>)}
              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
            >
              {question}
            </button>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex relative">
        <input
          name="input-field"
          type="text"
          placeholder="Say anything"
          onChange={handleInputChange}
          value={input}
          className="flex w-full flex-col gap-1.5 rounded-[26px] p-4 transition-colors bg-[#f4f4f4] dark:bg-token-main-surface-secondary pr-16"
        />
        <button
          type="submit"
          disabled={!input}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full focus:outline-none focus:ring-2 ${input ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-2xl"><path fillRule="evenodd" clipRule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor"></path></svg>
        </button>
      </form>
    </div>
  );
};

export default RwdChat;