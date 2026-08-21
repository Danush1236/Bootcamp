"use client";

import { useState } from "react";
import Home from "@/components/home/Home";
import ChatWidget from "@/components/chatbot/ChatWidget";

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Home onOpenChat={() => setIsChatOpen(true)} />

      <ChatWidget
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}