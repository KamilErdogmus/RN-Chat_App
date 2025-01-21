interface IMessage {
  id: string;
  text: string;
  isUser: boolean;
  username: string;
  timestamp: string;
  edited?: boolean;

  reactions?: string[];
  replyTo?: string;
  attachments?: string[];
}

interface IMessagePayload {
  text: string;
  timestamp: string;

  replyToId?: string;
  attachments?: string[];
}

interface MessagesRef {
  sendMessage: (text: string) => void;
  setUsername: (username: string) => void;
  sendTyping: () => void;

  editMessage?: (messageId: string, newText: string) => void;
  deleteMessage?: (messageId: string) => void;
}

interface MessagesProps {
  onUpdateConnectedUsers?: (count: number) => void;

  onError?: (error: Error) => void;
  onMessageSent?: (message: IMessage) => void;
  onTypingStatusChange?: (isTyping: boolean) => void;
}

interface TypingUser {
  id: string;
  username: string;
  startedTypingAt?: Date;
  lastActivity?: Date;
}

interface User {
  id: string;
  username: string;
  isOnline: boolean;
  lastSeen?: Date;
}

interface SocketResponse {
  users_count: number;
  message: IMessage;
  typing: {
    username: string;
    userId: string;
    timestamp: string;
  };
}

interface SocketEvents {
  send_message: (message: IMessage) => void;
  edit_message: (data: { messageId: string; newText: string }) => void;
  delete_message: (data: { messageId: string }) => void;

  typing_start: (data: { username: string; userId: string }) => void;
  typing_stop: (data: { username: string; userId: string }) => void;

  user_connected: (user: User) => void;
  user_disconnected: (userId: string) => void;

  error: (error: { message: string; code: string }) => void;
}

interface SocketState {
  isConnected: boolean;
  lastError?: Error;
  reconnectAttempts: number;
}

type ChatError = {
  code: string;
  message: string;
  timestamp: Date;
};

type MessageStatus = "sent" | "delivered" | "read" | "failed";
type UserStatus = "online" | "offline" | "away" | "busy";

interface RenderMessageProps {
  item: IMessage;
  editingMessage: IMessage | null;
  editText: string;
  selectedMessage: string | null;
  onLongPress: (messageId: string) => void;
  onEditText: (text: string) => void;
  onSaveEdit: () => void;
  onDelete: (messageId: string) => void;
  onEdit: (messageId: string) => void;
  onCloseModal: () => void;
}
