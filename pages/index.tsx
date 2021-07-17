import {
  Container,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Grid,
  Text,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useLocalStorage } from "react-use";
import { Plus } from "react-feather";
import { useInterval } from "react-use";
import * as R from "ramda";

import constants from "../lib/constants";
import utils from "../lib/utils";

import Component from "../components/Component";

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
    <Flex minHeight="100vh" justifyContent="center" alignItems="center">
      <Container>
        <Grid
          backgroundColor={bg}
          gridTemplateColumns="1fr 1fr"
          gridGap="4"
          padding="4"
          borderRadius="lg"
        >
          <Flex flexDir="column">
            <Editable
              mb="4"
              value={name}
              onChange={handleOnNameChange}
              onSubmit={handleOnNameSubmit}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
            <Box mb="4">
              <Text fontWeight="bold" fontSize="4xl">
                {utils.formatNumber(watts)}
              </Text>
              <Flex justifyContent="space-between">
                <Text>watts</Text>
                <Text>per second: {utils.formatNumber(wattsPerSecond)}</Text>
              </Flex>
            </Box>
            <Flex justifyContent="center">
              <Button size="lg" onClick={() => incrementWatts(1)}>
                <Plus size={32} />
              </Button>
            </Flex>
          </Flex>
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
        </Grid>
      </Container>
    </Flex>
  );
}

export default Home;
