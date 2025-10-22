import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';
import { backendFetcher } from '../integrations/fetcher.ts';

{/*
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
  const messages = ;

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
*/}
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
async function MessagesList() {
  const fetched = backendFetcher<Message[]>('/message');
  const messages = await fetched();
 

  return (
    <div className="inbox-container">
      <h1 className="inbox-title">Inbox</h1>
      <ul className="message-list">
        {messages.length}
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
export const Route = createFileRoute('/inbox')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
      
      
      <div className="inbox-container">
      
      <div className="sidebar">
          <Link href="/dashboard" className="nav-link" to={'/dashboard'}>Dashboard</Link>
          <Link href="/courses" className="nav-link" to={'/courses'}>Courses</Link>
          <Link href="/calendar" className="nav-link" to={'/calendar'}>Calendar</Link>
          <Link href="/profile" className="nav-link" to={'/profile'}>Profile</Link>
          <Link href="/inbox" className="nav-link" to={'/inbox'}>Inbox</Link>
          <Link href="/" className="logout" to={'/'}>Log out</Link>
      </div>

    
      <div className="main-content">
        
            <MessagesList />
      </div>
    </div>
      
     );

       {/* <div className="Inbox-container">
      
      <div className="sidebar">
          <Link href="/dashboard" className="nav-link" to={'/dashboard'}>Dashboard</Link>
          <Link href="/courses" className="nav-link" to={'/courses'}>Courses</Link>
          <Link href="/calendar" className="nav-link" to={'/calendar'}>Calendar</Link>
          <Link href="/profile" className="nav-link" to={'/profile'}>Profile</Link>
          <Link href="/inbox" className="nav-link" to={'/inbox'}>Inbox</Link>
          <Link href="/" className="logout" to={'/'}>Log out</Link>
      </div>

    
      <div className="main-content">
        
        <Suspense fallback={<p className="loading">Loading messages....</p>}>
          <MessagesList />
        </Suspense>
      </div>
    </div>
      
        */} 
        
      
}
