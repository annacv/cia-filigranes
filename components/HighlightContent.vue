<template>
  <section class="highlight-content--1">
    <div class="grid grid-cols-12 gap-4 pt-6 pb-6">
      <div class="col-start-2 3xl:col-start-3 col-span-10 3xl:col-span-8">
        A lot of content to render
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
// to apply:
// bg-gradient-highlight-primary
$color-primary-light: #c80d0d;
$color-primary-dark: #bc1b36;
$color-secondary-light: #01aedd;
$color-secondary-dark: #2998ff;
$color-tertiary-light: #5643fa;
$color-tertiary-dark: #193950;
$color-grey-light-1: #f7f7f7;
$color-grey-light-2: #eee;

$color-grey-dark: #777;
$color-grey-dark-2: #999;
$color-grey-dark-3: #333;

// CREATE TAILWIND HELPER CLASSES TO HIGHLIGHT CONTENT WITH DIFFERENT VARIANTS:
// HIGHLIGHT CONTENT COMPONENT WILL RENDER A SECTION, A DIV & SLOT
// THE DIV WILL CONTAIN THE GRID CLASS @apply grid should be used everywhere to ease cha
// WILL RECEIVE CLASSES AS PROP: to set height, to set color gamma, to set skew transform values

.highlight-content--1 {
  height: 75vh;
  padding: 20rem 0;
  background-image: linear-gradient(to right bottom,
      rgba(#c80d0d, 1),
      rgba(#bc1b36, 1));
  transform: skewY(-7deg);
  //margin-top: -10rem;

  &>* {
    transform: skewY(7deg);
  }
}

.highlight-content--2 {
  height: 75vh;
  padding: 20rem 0;
  background-image: linear-gradient(to right bottom,
      rgba($color-secondary-light, 1),
      rgba($color-secondary-dark, 1));
  transform: skewY(7deg);
  margin-top: 30rem;

  &>* {
    transform: skewY(-7deg);
  }
}

.highlight-content--3 {
  height: 105vh;
  padding: 20rem 0;
  background-image: linear-gradient(to right bottom,
      rgba($color-tertiary-light, 1),
      rgba($color-tertiary-dark, 1));
  transform: skewY(-7deg);
  margin-top: 30rem;

  &>* {
    transform: skewY(7deg);
  }
}
</style>