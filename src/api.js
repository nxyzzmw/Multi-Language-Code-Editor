import axios from "axios";

const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  csharp: 51,
  ruby: 72,
  php: 68,
  go: 60,
  rust: 73,
  swift: 83,
  kotlin: 78,
};

// Client-side JavaScript execution
const executeJavaScript = (sourceCode) => {
  try {
    const output = [];
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      output.push(args.map((arg) => String(arg)).join(" "));
    };

    try {
      eval(sourceCode);
    } catch (e) {
      return {
        stdout: "",
        stderr: `Error: ${e.message}`,
        compile_output: null,
        time: 0,
        memory: 0,
      };
    } finally {
      console.log = originalLog;
      console.error = originalError;
    }

    return {
      stdout: output.join("\n") || "Code executed successfully",
      stderr: null,
      compile_output: null,
      time: 0,
      memory: 0,
    };
  } catch (error) {
    return {
      stdout: "",
      stderr: error.message,
      compile_output: null,
      time: 0,
      memory: 0,
    };
  }
};

const executeRemote = async (language, sourceCode) => {

  const response = await axios.post(

    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",

    {
      source_code: sourceCode,
      language_id: LANGUAGE_IDS[language],
      stdin: "",
    },

    {
      headers: {
        "Content-Type": "application/json",
      },
    }

  );

  // Filter out JVM warnings for Kotlin/Java
  const filterJVMWarnings = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    const filteredLines = lines.filter((line) => {
      const lowerLine = line.toLowerCase();
      // Remove JVM-related warnings
      return !(
        lowerLine.includes("openjdk") ||
        lowerLine.includes("warning:") ||
        lowerLine.includes("-xverify") ||
        lowerLine.includes("-noverify") ||
        lowerLine.includes("deprecated") ||
        lowerLine.includes("will likely be removed") ||
        lowerLine.includes("future release") ||
        lowerLine.includes("jdk") && lowerLine.includes("removed")
      );
    });
    const cleanText = filteredLines
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n");
    return cleanText || null;
  };

  let stderr = filterJVMWarnings(response.data.stderr);
  let compileOutput = filterJVMWarnings(response.data.compile_output);

  return {

    stdout: response.data.stdout || "",

    stderr: stderr,
    
    compile_output: compileOutput,
    
    time: response.data.time || 0,
    
    memory: response.data.memory || 0,

  };

};

export const executeCode = async (language, sourceCode) => {

  if (language === "javascript") {
    return executeJavaScript(sourceCode);
  }

  return executeRemote(language, sourceCode);

};