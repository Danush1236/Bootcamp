"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  User,
  Send,
  X,
  Sparkles,
  MessageSquare,
  RotateCcw,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

import "./ChatWidget.css";

const DMT_SUGGESTIONS = [
  {
    question: "How do I renew my driving licence?",
  },
  {
    question: "What documents do I need to transfer ownership?",
  },
  {
    question: "I lost my driving licence. What should I do?",
  },
];

const ChatWidget = ({ isOpen, onOpen, onClose }) => {
  const [messages, setMessages] = useState([
      {
        id: 1,
        text: "Welcome to the Department of Motor Traffic (Sri Lanka) Assistant. Ask me about DMT appointments, driving licences, vehicle registration, ownership transfers, forms, or contact details.",
        sender: "bot",
        time: "Just now",
      },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const messagesEndRef = useRef(null);
  const messageIdRef = useRef(2);

  // Typing badge animation
  const [displayText, setDisplayText] = useState("");
  const fullText = "Ask DMT Sri Lanka...";

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let deleteTimeout;

    const interval = setInterval(() => {
      if (!isDeleting && index <= fullText.length) {
        setDisplayText(fullText.substring(0, index));
        index++;

        if (index > fullText.length) {
          deleteTimeout = setTimeout(() => {
            isDeleting = true;
          }, 1800);
        }
      } else if (isDeleting && index >= 0) {
        setDisplayText(fullText.substring(0, index));
        index--;

        if (index === 0) {
          isDeleting = false;
        }
      }
    }, 110);

    return () => {
      clearInterval(interval);
      clearTimeout(deleteTimeout);
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isTyping, isOpen]);

  // Send message
  const handleSendMessage = async (customQuestion) => {
    const questionText = customQuestion || inputValue;

    if (!questionText.trim() || isTyping) return;

    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = {
      id: messageIdRef.current++,
      text: questionText,
      sender: "user",
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setErrorMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: questionText,
          history: messages.slice(-6).map((message) => ({
            sender: message.sender,
            text: message.text,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The assistant could not respond.");
      }

      const botMsg = {
        id: messageIdRef.current++,
        text: data.answer,
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sources: data.sources || [],
        suggestions: data.suggestions || [],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const fallbackText =
        error instanceof Error
          ? error.message
          : "The assistant could not respond.";

      setErrorMessage(fallbackText);
      setMessages((prev) => [
        ...prev,
        {
          id: messageIdRef.current++,
          text:
            "Sorry, I could not reach the DMT assistant service right now. Please try again in a moment.",
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Reset chat
  const handleReset = () => {
    setMessages([
      {
        id: messageIdRef.current++,
        text: "Chat reset. Please select a service or type a question for the Department of Motor Traffic.",
        sender: "bot",
        time: "Just now",
      },
    ]);

    setInputValue("");
    setErrorMessage("");
    setIsTyping(false);
  };

  return (
    <div className="chat-widget-wrapper">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <div className="chat-launcher-container">
          <div className="chat-badge-pill">
            <Sparkles size={14} className="sparkle-icon" />

            <span>{displayText}</span>

            <span className="typing-cursor">|</span>
          </div>

          <button
            type="button"
            className="chat-toggle-btn pulse"
            onClick={onOpen}
            aria-label="Open DMT Assistant"
          >
            <MessageSquare size={24} />
          </button>
        </div>
      )}

      {/* Main Chat Panel */}
      {isOpen && (
        <div className="chat-card">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-bot-icon">
                <Bot size={20} />
              </div>

              <div className="header-title-group">
                <h4>DMT Assistant</h4>
                <p>Dept. of Motor Traffic LK</p>
              </div>
            </div>

            <div className="header-actions">
              <button
                type="button"
                className="icon-btn"
                onClick={handleReset}
                title="Reset chat"
              >
                <RotateCcw size={15} />
              </button>

              <button
                type="button"
                className="icon-btn close-btn"
                onClick={onClose}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message-group ${msg.sender}`}
              >
                <div className="message-avatar">
                  {msg.sender === "bot" ? (
                    <Bot size={13} />
                  ) : (
                    <User size={13} />
                  )}
                </div>

                <div className="message-content">
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                  </div>

                  {msg.sources?.length > 0 && (
                    <div className="message-sources">
                      <span>Official sources</span>
                      {msg.sources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source.title}
                        </a>
                      ))}
                    </div>
                  )}

                  {msg.suggestions?.length > 0 && (
                    <div className="message-followups">
                      {msg.suggestions.slice(0, 3).map((suggestion) => (
                        <button
                          type="button"
                          key={suggestion}
                          onClick={() => handleSendMessage(suggestion)}
                          disabled={isTyping}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="message-time">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chat-message-group bot">
                <div className="message-avatar">
                  <Bot size={13} />
                </div>

                <div className="message-content">
                  <div className="message-bubble typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions */}
            {messages.length < 3 && !isTyping && (
              <div className="quick-actions-container">
                <p className="quick-title">
                  <HelpCircle size={12} />
                  Frequently Asked Questions:
                </p>

                <div className="quick-chips">
                  {DMT_SUGGESTIONS.map((item, i) => (
                    <button
                      type="button"
                      key={i}
                      className="chip-btn"
                      onClick={() => handleSendMessage(item.question)}
                      disabled={isTyping}
                    >
                      <span>{item.question}</span>

                      <ChevronRight size={13} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            className="chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Ask about licences, transfers, registration..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />

            <button
              type="submit"
              className={`send-btn ${
                inputValue.trim() ? "active" : ""
              }`}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>

          {errorMessage && (
            <div className="chat-error" role="status">
              {errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
