<script setup lang="ts">
import type { Tables } from 'database/types'
import usersService from '../../express/usersService'
import type { AxiosResponse } from 'axios'

const users = ref<Tables<'users'> | null>(null)

const getUsersFunc = async () => {
  const usersResponse: AxiosResponse = await usersService.getUsers()
  console.log(usersResponse.data)
  users.value = usersResponse.data
}
await getUsersFunc()
</script>
<template>
  <div>{{ users }}</div>
</template>
