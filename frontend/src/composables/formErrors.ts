import type { LoginForm, RegisterForm } from '@/types/AuthForm'
import type { AxiosError } from 'axios'

type FormErrors<T> = {
  [K in keyof T]: string[]
}

export const useFormErrors = () => {
  const serverError = ref('')
  const realtimeErrors = ref<FormErrors<LoginForm | RegisterForm>>()
  const handleServerError = (error: AxiosError<{ error: string }> ) => {

    
    serverError.value =
      error?.response?.data?.error === 'invalid or unregistered email' || 'invalid username or password'
        ? 'Incorrect email or password, please try again'
        : error?.message
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realtimeErrors.value = {
      username: [],
      password: [],
    }
    const { validateEmail, validatePassword } = await import(
      '@/utils/formValidations'
    )
    const emailErrors = validateEmail(formData.username)
    if (emailErrors.length) realtimeErrors.value.username = emailErrors
    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) realtimeErrors.value.password = passwordErrors
  }

  //handleRegisterForm to add here

  return {
    serverError,
    handleServerError,
    realtimeErrors,
    handleLoginForm,
  }
}
