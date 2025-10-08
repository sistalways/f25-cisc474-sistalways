import React from "react";
import Link from "next/link";
import "./inbox.css"
import { Suspense } from "react";

type Message = {
  id: string;        
  content   :  string;
  sentAt   :   Date;
  status  :   "SENT" | "DELIVERED" | "READ";
  sender   :   string;       
  senderId  :  string;
  receiver   : string ;      
  receiverId : string;
}

async function getMessages(): Promise<Message[]> {
  const res = await fetch('https://f25-cisc474-sistalways.onrender.com/message', {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

async function MessagesList() {
  const messages = await getMessages();

  return (
    <div className="inbox-container">
      <h1 className="inbox-title">Inbox</h1>
      <ul className="message-list">
        {messages.map((msg) => (
          <li key={parseInt(msg.id)} className="message-item">
            <div className="message-info">
              <div className="message-sender">
                <strong>{msg.senderId}</strong>
              </div>
              <div className="message-content">{msg.content}</div>
            </div>
            <div className="message-meta">
              <div className="message-date">
                {new Date(msg.sentAt).toLocaleString()}
              </div>
              <div
                className={`message-status ${
                  msg.status === "READ"
                    ? "status-read"
                    : msg.status === "DELIVERED"
                    ? "status-delivered"
                    : "status-sent"
                }`}
              >
                {msg.status}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default function Inbox() {
    return (
        <div className="Inbox-container">
      
      <div className="sidebar">
        <Link href="/dashboard" className="nav-link">Dashboard</Link>
        <Link href="/courses" className="nav-link">Courses</Link>
        <Link href="/calendar" className="nav-link">Calendar</Link>
        <Link href="/profile" className="nav-link">Profile</Link>
        <Link href="/inbox" className="nav-link">Inbox</Link>
        <Link href="/" className="logout">Log out</Link>
      </div>

    
      <div className="main-content">
        {/*
          * REMOVED: <main className="main-layout"> wrapper.
          * The MessagesList (which contains .inbox-container)
          * must be a direct child of .main-content to inherit
          * the full-width stretching correctly.
          */}
        <Suspense fallback={<p className="loading">Loading messages...</p>}>
          <MessagesList />
        </Suspense>
      </div>
    </div>
        
    );
}