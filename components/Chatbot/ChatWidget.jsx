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
    answer:
      "To renew your Sri Lankan driving licence, visit the DMT Werahera or a district office. Bring your current licence, National Identity Card (NIC), and a Medical Fitness Certificate obtained from the National Transport Medical Institute (NTMI).",
  },
  {
    question: "What documents do I need to transfer ownership?",
    answer:
      "For vehicle ownership transfer, you need: MTA 6 Form (Application for Transfer), Vehicle Registration Certificate (VRC), Revenue Licence, NIC copies of seller & buyer, Certificate of Identification, and transfer fees.",
  },
  {
    question: "I lost my driving licence. What should I do?",
    answer:
      "If you lost your licence: First, lodge a complaint at the nearest Police Station and get a Police Report. Then visit a DMT office with your NIC, Police Report, and NTMI Medical Certificate to apply for a duplicate.",
  },
];

const ChatWidget = ({ isOpen, onOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to the Department of Motor Traffic (Sri Lanka) Assistant! How can I help you today?",
      sender: "bot",
      time: "Just now",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

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
  const handleSendMessage = (customQuestion, customAnswer) => {
    const questionText = customQuestion || inputValue;

    if (!questionText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = {
      id: Date.now(),
      text: questionText,
      sender: "user",
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const answerText =
        customAnswer ||
        `Thank you for your inquiry regarding "${questionText}". For official service bookings or further verification, please visit dmt.gov.lk or call 1920.`;

      const botMsg = {
        id: Date.now() + 1,
        text: answerText,
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  // Reset chat
  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Chat reset. Please select a service or type a question for the Department of Motor Traffic.",
        sender: "bot",
        time: "Just now",
      },
    ]);

    setInputValue("");
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
                      onClick={() =>
                        handleSendMessage(
                          item.question,
                          item.answer
                        )
                      }
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
            />

            <button
              type="submit"
              className={`send-btn ${
                inputValue.trim() ? "active" : ""
              }`}
              disabled={!inputValue.trim()}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;