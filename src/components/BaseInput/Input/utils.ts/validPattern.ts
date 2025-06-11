export const isPatternValid = (inputValue: string, pattern: string | undefined, inverseRegexValidation = false) => {
  if (!pattern) {
    return true;
  }
  try {
    const regex = new RegExp(pattern, "u");
    const regexTest = regex.test(inputValue);

    return inverseRegexValidation ? !regexTest : regexTest;
  } catch (_) {
    console.error("The regex pattern is invalid. Please check the syntax.");
    return false;
  }
};
