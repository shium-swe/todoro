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
  IconButton,
  VStack,
  HStack,
  List,
  ListItem,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function App() {
  const [todos, setTodos] = useState(() => {
    const existingTodos = localStorage.getItem("todos");
    if (existingTodos) {
      return JSON.parse(existingTodos);
    } else {
      return [];
    }
  });
  const [defaultText, setDefaultText] = useState("");
  const todoText = useRef();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (defaultText !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: defaultText.trim(),
        },
      ]);
    }
    setDefaultText("");
  };

  const handleInputChange = (e) => {
    setDefaultText(e.target.value);
  };

  const handleDelete = (id) => {
    const filteredArray = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredArray);
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
                    autoComplete="off"
                    autoFocus
                    size="lg"
                    type="text"
                    value={defaultText}
                    onChange={handleInputChange}
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
              key={todo.id}
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
                  <Text fontSize="2xl">{todo.text}</Text>
                </Checkbox>
                <IconButton
                  aria-label="Remove todo"
                  icon={<DeleteIcon />}
                  _hover={{
                    color: "red",
                  }}
                  color="blackAlpha.500"
                  bgColor="transparent"
                  size="lg"
                  ml={3}
                  onClick={() => handleDelete(todo.id)}
                />
              </HStack>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}

export default App;
