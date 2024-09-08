<template>
  <main>
    <div class="fili">
      companyia
      <span class="fili__cia w-full">filigranes</span>
    </div>
    <div class="fili_i18n-test">
      {{ $t("welcome") }}
      això és la home
    </div>
  </main>
</template>

<style lang="scss">
.fili {
  background-color: var(--main-bg-color) !important;
  &__cia {
    color: red;
  }
  &__i18n-test {
    font-weight: bold;
  }
}
</style>
