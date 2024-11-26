<script setup lang="ts"></script>
<template>
  <nav
    class="h-16 border-b bg-muted/40 flex gap-2 justify-between px-6 items-center"
  >
    <form class="relative h-fit w-full max-w-96">
      <iconify-icon
        class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground"
        icon="lucide:search"
      ></iconify-icon>
      <Input
        class="w-full pl-8 bg-background"
        type="text"
        placeholder="Search ..."
      />
    </form>
        <div
      class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between"
    >
      <!-- <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button> -->

      <Button variant="outline" size="icon" class="w-8 h-8">
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src="https://github.com/radix-vue.png"
            alt="@radix-vue"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
</template>
