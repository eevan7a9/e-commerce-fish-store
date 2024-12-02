export const validEmail = (val: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
  'Please enter a valid email address';

export const requiredField = (val: string | number) =>
  !!val || 'This field is required';

export const maxLength = (max: number) => (val: string) =>
  val.length <= max || `Must be less than ${max} characters`;

export const minLength = (min: number) => (val: string) =>
  val.length >= min || `Must be at least ${min} characters`;

export const passwordStrong = (val: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
    val
  ) ||
  'Password must include an uppercase letter, a lowercase letter, a number, and a special character';

export const passwordsMatch = (password: string, passwordConfirm: string) =>
  password === passwordConfirm || 'Passwords must match';

export const validPhone = (val: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(val) ||
  'Please enter a valid phone number';

export const requireMinimumItems = (min: number) => (val: unknown[]) => {
  return val && val.length >= min
    ? true
    : `Please select at least ${min} tags.`;
};

export const priceFormat = (value: string | number) => {
  const regex = /^[0-9.,]*$/; // Regular expression to allow numbers, decimal points, and commas
  return regex.test(value.toString())
    ? true
    : 'Only numbers, commas, and decimals are allowed.';
};

export const weightFormat = (value: string) => {
  const regex = /^\d+(\.\d{1,2})?$/; // Regex for numbers with up to two decimal places
  return regex.test(value) ? true : 'Require valid weight (e.g., 20.00, 33.00)';
};
