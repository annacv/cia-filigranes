<template>
  <main role="main">
    <div class="grid-layout min-w-full w-full h-full">
      <div class="layout-cols" v-if="$slots.wrapped">
        <slot name="wrapped"></slot>
      </div>
      <template v-if="$slots['full-grid']">
        <slot name="full-grid"></slot>
      </template>
    </div>
    <template v-if="$slots.unwrapped">
      <slot name="unwrapped"></slot>
    </template>
  </main>
</template>
