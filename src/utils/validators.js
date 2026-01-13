// src/utils/validators.js

// Email validation
export function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password strength (min 8 chars, at least 1 number, 1 letter)
export function isPasswordStrong(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

// Name validation (at least 2 chars)
export function isNameValid(name) {
  return name.trim().length >= 2;
}

// Generic required field check
export function isRequired(value) {
  return (
    value !== null && value !== undefined && value.toString().trim() !== ""
  );
}
