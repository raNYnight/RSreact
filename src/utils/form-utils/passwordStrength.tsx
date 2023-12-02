export const calculatePasswordStrength = (password: string) => {
  let strength = 0;
  if (password.length >= 6) {
    strength++;
  }
  if (/[A-Z]/.test(password)) {
    strength++;
  }
  if (/[!@#$%^&*]/.test(password)) {
    strength++;
  }
  if (/\d/.test(password)) {
    strength++;
  }
  switch (strength) {
    case 0:
      return 'Very Weak';
    case 1:
      return 'Weak';
    case 2:
      return 'Medium';
    case 3:
      return 'Strong';
    case 4:
      return 'Very Strong';
    default:
      return '';
  }
};
