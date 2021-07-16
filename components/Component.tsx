import { Box, Flex, Text } from "@chakra-ui/react";

type props = {
  id: string;
  name: string;
  price: number;
  isDisabled: boolean;
  count: number;
  onClick: (id: string) => void;
};

function Component(props: props) {
  const { id, name, price, isDisabled, count, onClick, ...rest } = props;

  function onClickHandler() {
    if (!isDisabled) {
      onClick(id);
    }
  }

  return (
    <Flex
      backgroundColor={isDisabled ? "rgba(0,0,0,0.1)" : "initial"}
      cursor="pointer"
      padding="2"
      borderRadius="md"
      justifyContent="space-between"
      alignItems="center"
      onClick={onClickHandler}
      {...rest}
    >
      <Box>
        <Text>{name}</Text>
        <Text>{price} watts</Text>
      </Box>
      <Box>
        <Text fontWeight="bold" fontSize="2xl">
          {count}
        </Text>
      </Box>
    </Flex>
  );
}

export default Component;
