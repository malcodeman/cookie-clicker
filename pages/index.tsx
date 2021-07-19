import {
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Grid,
  Text,
  Box as ChakraBox,
  Button,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useLocalStorage } from "react-use";
import { useInterval } from "react-use";
import * as R from "ramda";
import { Canvas } from "@react-three/fiber";

import constants from "../lib/constants";
import utils from "../lib/utils";

import Component from "../components/Component";
import Box from "../components/Box";

function Home() {
  const [localStorageName, setLocalStorageName] = useLocalStorage(
    "name",
    constants.DEFAULT_PLANT_NAME
  );
  const [localStorageComponents, setLocalStorageComponents] = useLocalStorage(
    "components",
    constants.INITIAL_COMPONENTS
  );
  const [localStorageWatts, setLocalStorageWatts] = useLocalStorage("watts", 0);
  const [name, setName] = React.useState("");
  const [components, setComponents] = React.useState(
    constants.INITIAL_COMPONENTS
  );
  const [watts, setWatts] = React.useState(0);
  const isRunning: boolean = R.sum(R.map((item) => item.count, components)) > 0;
  const bg = useColorModeValue("gray.100", "gray.900");
  const wattsPerSecond = R.sum(
    R.map((item) => item.count * item.perSecond, components)
  );
  const totalComponentCount = R.sum(R.map((item) => item.count, components));

  React.useEffect(() => {
    if (localStorageName) {
      setName(localStorageName);
    }
  }, [localStorageName]);

  React.useEffect(() => {
    if (localStorageComponents) {
      setComponents(localStorageComponents);
    }
  }, [localStorageComponents]);

  React.useEffect(() => {
    if (localStorageWatts) {
      setWatts(localStorageWatts);
    }
  }, [localStorageWatts]);

  useInterval(
    () => {
      R.forEach(
        (item) => incrementWatts(item.count * item.perSecond),
        components
      );
    },
    isRunning ? 1000 : null
  );

  useInterval(
    () => {
      setLocalStorageComponents(components);
      setLocalStorageWatts(watts);
    },
    isRunning || watts > 0 ? constants.AUTO_SAVE_DELAY : null
  );

  function handleOnNameChange(nextValue: string) {
    setName(nextValue);
  }

  function handleOnNameSubmit(nextValue: string) {
    setLocalStorageName(nextValue);
  }

  function incrementWatts(nextValue: number) {
    setWatts((prevValue) => (prevValue += nextValue));
  }

  function decrementWatts(nextValue: number) {
    setWatts((prevValue) => (prevValue -= nextValue));
  }

  function handleBuildItem(itemID: string) {
    const values = components.map((item) => {
      if (item.id === itemID) {
        decrementWatts(item.price);
        return {
          ...item,
          price: Math.round(item.price + item.price * 0.1),
          count: (item.count += 1),
        };
      }
      return item;
    });
    return setComponents(values);
  }

  return (
    <Grid
      backgroundColor={bg}
      minHeight="100vh"
      gridTemplateColumns={{ base: "1fr", md: "256px 1fr" }}
    >
      <ChakraBox>
        <Flex flexDir="column" padding="4">
          <Editable
            mb="4"
            value={name}
            onChange={handleOnNameChange}
            onSubmit={handleOnNameSubmit}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <ChakraBox mb="4">
            <Text fontWeight="bold" fontSize="4xl">
              {utils.formatNumber(watts)}
            </Text>
            <Flex justifyContent="space-between">
              <Text>watts</Text>
              <Text>per second: {utils.formatNumber(wattsPerSecond)}</Text>
            </Flex>
          </ChakraBox>
        </Flex>
        <Flex justifyContent="center">
          <Button size="lg" onClick={() => incrementWatts(1)}>
            + 1
          </Button>
        </Flex>
        <ChakraBox padding="4">
          <Text>Components</Text>
          <Divider marginY="4" />
          <Flex flexDir="column">
            {components.map((item) => (
              <Component
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                isDisabled={watts < item.price}
                count={item.count}
                onClick={handleBuildItem}
              />
            ))}
          </Flex>
        </ChakraBox>
      </ChakraBox>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {R.times(
          (index) => (
            <Box key={index} position={[0 + index * 0.5, 0, 0]} />
          ),
          totalComponentCount
        )}
      </Canvas>
    </Grid>
  );
}

export default Home;
