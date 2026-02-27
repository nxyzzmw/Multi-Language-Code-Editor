export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.12.6",
  java: "20.0.2",
  csharp: "10.0.0",
  ruby: "3.2.2",
  php: "8.3.4",
  go: "1.20.5",
  rust: "1.80.0",
  swift: "5.10.1",
  kotlin: "1.8.20",
};

export const LANGUAGE_IDS = {

  javascript: 63,

  python: 71,

  java: 62,

  csharp: 51,

  php: 68,

  go: 60,

  rust: 73,

  kotlin: 78,

};
export const CODE_SNIPPETS = {

  javascript: `\nfunction main() {\n\tconsole.log("Hello, World!");\n}\n\nmain();\n`,

  python: `\ndef main():\n\tprint("Hello, World!")\n\nmain()\n`,

  java: `\npublic class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}\n`,

  csharp: `\nusing System;\n\nclass Program {\n\tstatic void Main(string[] args) {\n\t\tConsole.WriteLine("Hello, World!");\n\t}\n}\n`,

  ruby: `\ndef main\n\tputs "Hello, World!"\nend\n\nmain\n`,

  php: `\n<?php\n\nfunction main() {\n\techo "Hello, World!";\n}\n\nmain();\n\n?>\n`,

  go: `\npackage main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}\n`,

  rust: `\nfn main() {\n\tprintln!("Hello, World!");\n}\n`,

  swift: `\nimport Foundation\n\nfunc main() {\n\tprint("Hello, World!")\n}\n\nmain()\n`,

  kotlin: `\nfun main() {\n\tprintln("Hello, World!")\n}\n`,

};