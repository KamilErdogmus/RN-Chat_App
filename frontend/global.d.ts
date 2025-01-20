interface IMessage {
  id: string;
  text: string;
  isUser: boolean;
  username: string;
  timestamp: string;
}

interface MessagesRef {
  sendMessage: (text: string) => void;
}

interface MessagesProps {
  onUpdateConnectedUsers?: (count: number) => void;
}

interface SocketResponse {
  users_count: number;
  message: IMessage;
  typing: {
    username: string;
  };
}

interface SocketEvents {
  send_message: (message: IMessage) => void;
  typing: (data: { username: string }) => void;
}
