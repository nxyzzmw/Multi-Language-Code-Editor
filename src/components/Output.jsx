import { useState } from "react";
import { Box, Button, Text, useToast, HStack, VStack } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {

  const toast = useToast();

  const [output, setOutput] = useState(null);

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  
  const [metrics, setMetrics] = useState(null);


  const runCode = async () => {

    if (!editorRef.current) {

      toast({
        title: "Error",
        description: "Editor not ready.",
        status: "warning",
        duration: 3000,
      });

      return;

    }


    const sourceCode = editorRef.current.getValue();

    if (!sourceCode) return;


    try {

      setIsLoading(true);

      setOutput(null);

      setError(null);


      const result = await executeCode(language, sourceCode);


      // Extract ALL possible errors

      const compileError = result.compile_output;

      const runtimeError = result.stderr;

      const apiError = result.message;

      const statusError = result.status?.description;


      const finalError =

        compileError ||

        runtimeError ||

        apiError ||

        (statusError !== "Accepted" ? statusError : null);


      if (finalError) {

        setError(finalError);

        setOutput(null);
        
        setMetrics(null);

      } else {

        const stdout = result.stdout || "Code executed successfully";

        setOutput(stdout.split("\n"));

        setError(null);
        
        setMetrics({
          time: result.time || 0,
          memory: result.memory || 0,
        });

      }


    } catch (err) {

      setError(err.message);

      setOutput(null);
      
      setMetrics(null);

      toast({

        title: "Execution failed",

        description: err.message,

        status: "error",

        duration: 4000,

      });

    }

    finally {

      setIsLoading(false);

    }

  };


  const isError = Boolean(error);


  return (

    <Box w={{ base: "full", md: "50%" }} minH={{ base: "300px", md: "auto" }}>

      <Text mb={2} fontSize={{ base: "md", sm: "lg" }}>

        Output

      </Text>


      <Button

        variant="outline"

        colorScheme={isError ? "red" : "green"}

        mb={4}

        isLoading={isLoading}

        onClick={runCode}

        w={{ base: "full", sm: "auto" }}

        fontSize={{ base: "sm", sm: "md" }}

      >

        Run Code

      </Button>
      
      {metrics && !isError && (
        <HStack mb={3} spacing={{ base: 3, sm: 6 }} flexWrap="wrap">
          <VStack align="flex-start" spacing={0}>
            <Text fontSize={{ base: "10px", sm: "xs" }} color="#888">Time Complexity</Text>
            <Text fontSize={{ base: "xs", sm: "sm" }} color="#00d4ff" fontWeight="bold">{(metrics.time * 1000).toFixed(2)} ms</Text>
          </VStack>
          <VStack align="flex-start" spacing={0}>
            <Text fontSize={{ base: "10px", sm: "xs" }} color="#888">Space Used</Text>
            <Text fontSize={{ base: "xs", sm: "sm" }} color="#00d4ff" fontWeight="bold">{metrics.memory ? `${metrics.memory} KB` : "N/A"}</Text>
          </VStack>
        </HStack>
      )}


      <Box

        height={{ base: "30vh", sm: "50vh", md: "70vh" }}

        p={{ base: 2, sm: 3 }}

        border="2px solid"

        borderRadius={6}

        borderColor={isError ? "red.500" : "#00d4ff"}

        bg="#111111"

        overflowY="auto"

        fontSize={{ base: "xs", sm: "sm" }}

      >

        {isError ? (

          <Text

            color="red.300"

            fontFamily="monospace"

            whiteSpace="pre-wrap"

          >

            {error}

          </Text>

        ) : output ? (

          output.map((line, i) => (

            <Text

              key={i}

              color="green.300"

              fontFamily="monospace"

            >

              {line}

            </Text>

          ))

        ) : (

          <Text color="gray.500">

            Click "Run Code" to see output

          </Text>

        )}

      </Box>

    </Box>

  );

};


export default Output;