<template>
  <main role="main">
    <div
      v-if="$slots.wrapped" 
      class="grid-layout min-w-full w-full h-full"
    >
      <div class="layout-cols">
        <slot name="wrapped"></slot>
      </div>
    </div>
    <template v-if="$slots.unwrapped">
      <slot name="unwrapped"></slot>
    </template>
    <div
      v-if="$slots.wrappedBottom" 
      class="grid-layout min-w-full w-full h-full"
    >
      <div class="layout-cols">
        <slot name="wrappedBottom"></slot>
      </div>
    </div>
    <template v-if="$slots.unwrappedBottom">
      <slot name="unwrappedBottom"></slot>
    </template>
  </main>
</template>
