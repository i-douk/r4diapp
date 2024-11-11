export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return []

  const errors = []
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const isValidEmailFormate = emailRegex.test(trimmedEmail)
  if (!isValidEmailFormate) errors.push('Please enter a valid email format')

  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []
  const errors = []
  if (password.length <= 8)
    errors.push('the password longer than 6 characters')
  
  const hasSpecialCharacter = (str : string) => /[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]/.test(str);
  if (!hasSpecialCharacter(password)) {
   errors.push("add at least one special character (e.g. : @,%,&, etc).");
  }

  return errors
}
