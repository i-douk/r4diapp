export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return []

  const errors = []
  const emailRegex = / ^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$ /
  const isValidEmailFormate = emailRegex.test(trimmedEmail)
  if (!isValidEmailFormate) errors.push('Not a valid email format')

  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []
  const errors = []
  if (password.length <= 6)
    errors.push('enter a password longer than 6 characters')
  if (!password.includes('@'))
    errors.push('password must include special character @')
  return errors
}
