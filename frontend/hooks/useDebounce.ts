import { debounce } from "lodash";

export const debouncedEmitTyping = debounce(
  (socket: any, isTyping: boolean) => {
    if (isTyping) {
      socket?.emit("typing_start");
    } else {
      socket?.emit("typing_stop");
    }
  },
  300
);
