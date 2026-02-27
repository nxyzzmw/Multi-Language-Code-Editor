import { Box, Flex, VStack } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <VStack minH="100vh" spacing={0} bg="#000000">
      {/* Header */}
      <Box
        w="full"
        bg="#000000"
        borderBottom="2px solid #00d4ff"
        px={{ base: 4, sm: 6, md: 8 }}
        py={{ base: 3, sm: 4 }}
        boxShadow="0 4px 12px rgba(0, 212, 255, 0.1)"
      >
        <Box fontSize={{ base: "xl", sm: "2xl" }} fontWeight="700" color="#00d4ff" letterSpacing="1px">
          CODE EDITOR
        </Box>
        <Box fontSize={{ base: "10px", sm: "xs" }} color="#888" mt={1}>
          Multi-Language Code Execution Platform
        </Box>
      </Box>

      {/* Main Content */}
      <Box w="full" flex={1} p={{ base: 3, sm: 4, md: 6 }}>
        <CodeEditor />
      </Box>
    </VStack>
  );
}

export default App;