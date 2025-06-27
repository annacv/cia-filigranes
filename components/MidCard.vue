<template>
  <div class="mid-card">
    <div class="mid-card__content h-[400px] desktop:min-h-[600px]">
      <div class="mid-card__text-wrapper">
        >MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD
        >MID
        CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD >MID
        CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD >MID
        CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD >MID
        CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD >MID
        CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD >MID
        CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD>MID CARD
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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

$color-white: #fff;
$color-black: #000;


// WE CAN CREATE DIFFERENT MID CARD POLYGONS TO SUIT DIFFERENT CONTENT NEEDS; FOR EXAMPLE DISTINGUISHING BETWEEN SHOWS AND WORSHOPS

.mid-card {
  position: relative;
  background: url(../assets/images/desktop/035.JPG);
  background-size: cover;
  background-position: right center;
  box-shadow: 0 0.05rem 0.25rem rgba(0, 0, 0, 0.15);
  overflow: hidden;

  /* Custom clipping area */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid white;
    /* Equivalent to $color-white */
    clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
    z-index: 1;
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 2;
    width: 100%;
    padding: 5rem;
  }

  &__text-wrapper {
    width: 60%;
    height: 100%;
    clip-path: polygon(0 0, 76% 0, 60% 100%, 0 100%);
  }
}


// // OPTION 1
// .mid-card-1 {
//   position: relative;
//   background: url(../assets/images/035.jpg);
//   background-size: cover;
//   background-position: right center;
//   box-shadow: 0 0.05rem 0.25rem rgba(0, 0, 0, 0.15);
//   overflow: hidden;

//   /* Inverted vertically */
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(255, 255, 255, 1);
//     /* Equivalent to $color-white */
//     clip-path: polygon(0 100%, 50% 100%, 100% 0, 0% 0);
//     z-index: 1;
//     pointer-events: none;
//   }

//   &__content {
//     position: relative;
//     z-index: 2;
//     width: 50%;
//     padding: 6rem;
//   }
// }

// .mid-card-3 {
//   position: relative;
//   background: url(../assets/images/035.jpg);
//   background-size: cover;
//   background-position: right center;
//   box-shadow: 0 0.05rem 0.25rem rgba(0, 0, 0, 0.15);
//   overflow: hidden;

//   /* Inverted direction */
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(255, 255, 255, 1); /* Equivalent to $color-white */
//     clip-path: polygon(100% 0, 100% 100%, 50% 100%, 0 0);
//     z-index: 1;
//     pointer-events: none;
//   }

//   &__content {
//     position: relative;
//     z-index: 2;
//     width: 50%;
//     padding: 6rem;
//   }
// }


// OPTION 2:
.mid-card-2 {
  position: relative;
  background: url(../assets/images/desktop/035.JPG);
  background-size: cover;
  background-position: right center;
  box-shadow: 0 0.05rem 0.25rem rgba(0, 0, 0, 0.15);
  overflow: hidden;

  /* Create a pseudo-element for the white background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    /* Equivalent to $color-white */
    clip-path: polygon(0 0, 50% 0, 100% 100%, 0% 100%);
    z-index: 1;
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 2;
    width: 50%;
    padding: 6rem;
  }
}


// LINEAR GRADIENT FIRST OPTION
// .mid-card {
//   background-image: linear-gradient(105deg,
//       rgba($color-white, 1) 0%,
//       rgba($color-white, .9) 50%,
//       transparent 50%),
//     url(../assets/images/035.jpg);
//   background-size: 100%; // cover
//   background-position: right center;
//   box-shadow: 0 0.05rem 0.25rem rgba($color-black, .15);

//   &__content {
//     width: 50%;
//     padding: 6rem;
//   }
// }</style>
