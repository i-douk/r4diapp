<script setup lang="ts">
const props = defineProps<{
  message: string
  hint: string | null
  statusCode: number
  details: string
  customCode: number
  code: string
  isCustomError: boolean
}>()

const error = ref({
  code: 500,
  msg: 'Oh là là, what did you do?',
})

if (props.isCustomError) {
  error.value.code = props.customCode
  error.value.msg = props.message
}

if (props.statusCode === 406) {
  error.value.code = 404
  error.value.msg = props.message
}
</script>
<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ error.code }}</h1>
    <p class="error__msg">{{ error.msg }}</p>
    <div class="error-footer">
      <p class="error-footer__text">
        You'll find lots to explore on the home page.
      </p>
      <RouterLink to="/">
        <Button class="max-w-36"> Back to homepage </Button>
      </RouterLink>
    </div>
  </div>
</template>
