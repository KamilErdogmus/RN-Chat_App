import moment from "moment";

export const formatMessage = (message: IMessage): IMessage => ({
  ...message,
  timestamp: moment(message.timestamp).format("HH:mm"),
});
