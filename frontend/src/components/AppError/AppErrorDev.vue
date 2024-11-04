<script setup lang="ts">

defineProps<{
    message: string,
    hint: string | null,
    statusCode: number,
    details: string,
    customCode: number,
    code: string
}>()
</script>
<template>
        <div>
	      <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
	      <h1 class="error__code">{{ customCode || code}}</h1>
	      <p class="error__msg" v-if="statusCode"> Status Code{{ statusCode }}</p>
	      <p class="error__msg">{{ message }}</p>
	      <p class="error__msg" v-if="hint">{{ hint }}</p>
	      <p class="error__msg" v-if="details">{{ details }}</p>
	      <div class="error-footer">
	        <p class="error-footer__text">You'll find lots to explore on the home page.</p>
	        <RouterLink to="/">
	          <Button class="max-w-36"> Back to homepage </Button>
	        </RouterLink>
	      </div>
	    </div>
</template>