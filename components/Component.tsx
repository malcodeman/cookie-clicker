import { Box, Text, Button } from "@chakra-ui/react";

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

  return (
    <Button
      size="lg"
      mb="2"
      justifyContent="space-between"
      isDisabled={isDisabled}
      onClick={() => onClick(id)}
      {...rest}
    >
      <Box textAlign="left">
        <Text>{name}</Text>
        <Text>{price} watts</Text>
      </Box>
      <Box>
        <Text fontWeight="bold" fontSize="2xl">
          {count}
        </Text>
      </Box>
    </Button>
  );
}

export default Component;
