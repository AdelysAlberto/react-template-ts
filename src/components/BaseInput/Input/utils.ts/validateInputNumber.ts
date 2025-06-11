import type { KeyboardEvent } from "react";

export function validateInputNumber(event: KeyboardEvent<HTMLInputElement>, disableDecimal: boolean, disableNegativeNumbers: boolean) {
  const inputValue = event.key;
  // Allow only decimal keys
  let allowedCharacters = /^[0-9.]$/;

  // Allow all numeric and decimal keys
  if (!disableDecimal && !disableNegativeNumbers) {
    allowedCharacters = /^-?\d*\.?\d*$/;
  }
  // Allow only positive numbers
  if (disableDecimal && disableNegativeNumbers) {
    allowedCharacters = /^[0-9]$/;
  }
  // Allow only negative numbers
  if (disableDecimal && !disableNegativeNumbers) {
    allowedCharacters = /^[-0-9]$/;
  }

  const permiteKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "Control", "Shift", "Alt", "Delete", "Enter"];

  const allowedCtrlCombos = ["c", "v", "x", "a", "z", "y"];

  if ((event.ctrlKey || event.metaKey) && allowedCtrlCombos.includes(inputValue.toLowerCase())) {
    return;
  }

  // Allow certain special keys
  if (allowedCharacters.test(inputValue) || permiteKeys.indexOf(inputValue) !== -1) {
    return;
  }
  event.preventDefault();
}
