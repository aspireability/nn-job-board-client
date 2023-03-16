import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

export const renderTag = (label: string, size: string = 'md', colorScheme: string = 'gray') => {
  return (
    <Tag variant="subtle" size={size} colorScheme={colorScheme}>
      <TagLabel>{label}</TagLabel>
    </Tag>
  );
};