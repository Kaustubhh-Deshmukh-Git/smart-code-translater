export const SUPPORTED_LANGUAGES = [
  { id: "c", name: "C", extension: ".c" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "csharp", name: "C#", extension: ".cs" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "python", name: "Python", extension: ".py" },
];

export const getLanguageName = (id) => {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.id === id);
  return lang ? lang.name : id;
};

export const isSupportedLanguage = (id) => {
  return SUPPORTED_LANGUAGES.some((l) => l.id === id);
};
