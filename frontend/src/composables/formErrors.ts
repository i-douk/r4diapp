import type { LoginForm, RegisterForm } from '@/types/AuthForm'
import type { AuthError } from '@supabase/supabase-js'

type FormErrors<T> = {
  [K in keyof T]: string[]
}

export const useFormErrors = () => {
  const serverError = ref('')
  const realtimeErrors = ref<FormErrors<LoginForm | RegisterForm>>()
  const handleServerError = (error: AuthError) => {
    serverError.value =
      error?.message === 'Invalid login credentials'
        ? 'Incorrect email or password'
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

  return {
    serverError,
    handleServerError,
    realtimeErrors,
    handleLoginForm,
  }
}
