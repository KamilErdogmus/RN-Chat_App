import { Text, Pressable } from "react-native";
import { reactionModalStyles } from "@/styles/reactionModalStyles";

interface ReactionModalProps {
  isUser: boolean;
  messageId: string;
  onDelete: (messageId: string) => void;
  onEdit: (messageId: string) => void;
  onClose: () => void;
}

const ReactionModal = ({
  isUser,
  messageId,
  onDelete,
  onEdit,
  onClose,
}: ReactionModalProps) => {
  if (!isUser) return null;

  return (
    <Pressable onLongPress={onClose} style={reactionModalStyles.container}>
      <Pressable
        style={reactionModalStyles.button}
        onPress={() => {
          onEdit(messageId);
          onClose();
        }}
      >
        <Text style={reactionModalStyles.buttonText}>Edit</Text>
      </Pressable>
      <Pressable
        style={reactionModalStyles.button}
        onPress={() => {
          onDelete(messageId);
          onClose();
        }}
      >
        <Text
          style={[
            reactionModalStyles.buttonText,
            reactionModalStyles.deleteText,
          ]}
        >
          Delete
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default ReactionModal;
