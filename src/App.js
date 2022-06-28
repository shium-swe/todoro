import { useEffect, useRef, useState } from "react";
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  HStack,
  List,
  ListItem,
  Button,
  Checkbox,
} from "@chakra-ui/react";

function App() {
  const [todos, setTodos] = useState([]);
  const [defaultText, setDefaultText] = useState("");
  const todoText = useRef();

  useEffect(() => {
    const existingTodos = localStorage.getItem("todos");
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextTodos = [...todos, todoText.current.value];
    setTodos(nextTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
    setDefaultText("");
  };

  return (
    <Box w="100vw" h="100vh" m={0} p={5} display="flex" justifyContent="center">
      <VStack w="60vw" spacing={5}>
        <Heading as="h1" fontSize="6rem" mt={4} mb={8}>
          todoro
        </Heading>
        <Box w="80%">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <HStack>
                <InputGroup>
                  <Input
                    id="todo__input"
                    variant="filled"
                    placeholder="'Clean room'"
                    size="lg"
                    type="text"
                    value={defaultText}
                    onChange={(event) => setDefaultText(event.target.value)}
                    ref={todoText}
                  />
                  <InputRightElement width="8rem" mt={1} padding={2}>
                    <Button type="submit" h="1.75rem" variant="solid">
                      Add todo
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </HStack>
              <FormHelperText>Enter your todo item here.</FormHelperText>
            </FormControl>
          </form>
        </Box>
        <List spacing={3}>
          {todos.map((todo) => (
            <ListItem
              key={todo}
              _hover={{
                bgColor: "gray.100",
                transition: "all 300ms ease",
              }}
              px={10}
              py={3}
            >
              <HStack>
                <Checkbox
                  aria-label="Toggle todo"
                  size="lg"
                  colorScheme="green"
                  spacing="1.5rem"
                >
                  <Text fontSize="2xl">{todo}</Text>
                </Checkbox>
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}

export default App;
