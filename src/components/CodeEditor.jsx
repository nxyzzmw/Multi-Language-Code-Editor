import { useRef, useState,  } from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {

  const editorRef = useRef(null);

  const [language, setLanguage] = useState("javascript");

  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);


  // Define theme BEFORE editor mounts
  const handleEditorBeforeMount = (monaco) => {

    monaco.editor.defineTheme("black-theme", {

      base: "vs-dark",

      inherit: true,

      rules: [],

      colors: {

        "editor.background": "#000000",

        "editor.foreground": "#e0e0e0",

        "editorLineNumber.foreground": "#666",

        "editorLineNumber.activeForeground": "#00d4ff",

        "editorLineNumber.background": "#000000",

        "editorGutter.background": "#000000",

        "editorMargin.background": "#000000",

        "editorCursor.foreground": "#00d4ff",

        "editor.selectionBackground": "#264f78",

        "editor.inactiveSelectionBackground": "#264f7855",

        "editor.lineHighlightBackground": "#000000",

        "editor.lineHighlightBorder": "#00000000",

        "scrollbar.shadow": "#000000",

        "scrollbarSlider.background": "#000000",

        "scrollbarSlider.hoverBackground": "#111111",

        "scrollbarSlider.activeBackground": "#222222",

      },

    });

  };


  // Apply theme AFTER mount
  const handleEditorDidMount = (editor, monaco) => {

    editorRef.current = editor;

    monaco.editor.setTheme("black-theme");

    editor.focus();

  };


  // Language change
  const handleLanguageSelect = (lang) => {

    setLanguage(lang);

    setValue(CODE_SNIPPETS[lang]);

  };


  return (

    <Box w="full" h={{ base: "calc(100vh - 100px)", md: "calc(100vh - 120px)" }}>

      <HStack spacing={{ base: 2, sm: 3, md: 4 }} h="full" align="stretch" flexDirection={{ base: "column", md: "row" }}>


        {/* LEFT SIDE */}

        <VStack w={{ base: "full", md: "50%" }} spacing={{ base: 2, sm: 3 }}>


          <Box w="full">

            <LanguageSelector

              language={language}

              onSelect={handleLanguageSelect}

            />

          </Box>


          <Box

            h={{ base: "30vh", sm: "50vh", md: "70vh" }}

            w="full"

            border="2px solid #00d4ff"

            borderRadius="8px"

            overflow="hidden"

            bg="#000000"

          >


            <Editor

              beforeMount={handleEditorBeforeMount}

              onMount={handleEditorDidMount}

              theme="black-theme"

              language={language}

              value={value}

              height="100%"

              onChange={(val) => setValue(val)}

              options={{

                minimap: { enabled: false },

                fontSize: window.innerWidth < 768 ? 12 : 14,

                lineHeight: 22,

                fontFamily: "Fira Code, monospace",

                automaticLayout: true,

                cursorBlinking: "smooth",

                smoothScrolling: true,

                padding: { top: 10 },

              }}

            />


          </Box>


        </VStack>


        {/* RIGHT SIDE */}

        <Output

          editorRef={editorRef}

          language={language}

        />


      </HStack>

    </Box>

  );

};


export default CodeEditor;