import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls
} from "@chakra-ui/react";


export function CustomControlsExample() {
  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton aria-label="check-icon" icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton aria-label="close-icon" icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton aria-label="icon-button" size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
    >
      <EditablePreview />
      {/* Here is the custom input */}
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
  );
}
