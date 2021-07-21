import { Box, Text, Button } from "@chakra-ui/react";

import utils from "../lib/utils";

type props = {
  id: string;
  name: string;
  price: number;
  isDisabled: boolean;
  count?: number;
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
        <Text>{utils.formatNumber(price)} watts</Text>
      </Box>
      {count && (
        <Box>
          <Text fontWeight="bold" fontSize="2xl">
            {utils.formatNumber(count)}
          </Text>
        </Box>
      )}
    </Button>
  );
}

export default Component;
