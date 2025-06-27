<template>
  <main role="main">
    <div class="grid-layout min-w-full w-full h-full">
      <div class="layout-cols">
        <slot name="wrapped"></slot>
      </div>
      <slot name="full-grid"></slot>
    </div>
    <slot name="unwrapped"></slot>
  </main>
</template>
