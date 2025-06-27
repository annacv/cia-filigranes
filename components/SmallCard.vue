<template>
	<div class="small-card">
		<div class="card">
			<div class="card__side card__side--front">
				<div class="card__picture card__picture--1">
					&nbsp;
				</div>
				<h4 class="card__heading">
					<span class="card__heading-span card__heading-span--1">The Sea Explorer</span>
				</h4>
				<div class="card__details">
					<ul>
						<li>3 day tours</li>
						<li>Up to 30 people</li>
						<li>2 tour guides</li>
						<li>Sleep in cozy hotels</li>
						<li>Difficulty: easy</li>
					</ul>
				</div>
			</div>
			<div class="card__side card__side--back card__side--back-1">
				<div class="card__cta">
					<div class="card__price-box">
						<p class="card__price-only">Only</p>
						<p class="card__price-value">$297</p>
					</div>
					<a href="#popup" class="btn btn--white">Book now!</a>
				</div>
			</div>
		</div>
	</div>
</div></template>

<style lang="scss">
$color-primary-light: #c80d0d;
$color-primary-dark: #bc1b36;
$color-secondary-light: #01aedd;
$color-secondary-dark: #193950;
$color-tertiary-light: #2998ff;
$color-tertiary-dark: #5643fa;
$color-grey-light-1: #f7f7f7;
$color-grey-light-2: #eee;

$color-grey-dark: #777;
$color-grey-dark-2: #999;
$color-grey-dark-3: #333;

$color-white: #fff;
$color-black: #000;

.small-card {

	// FUNCTIONALITY
	perspective: 150rem;
	-moz-perspective: 150rem;
	position: relative;
	height: 52rem;

	&__side {
		height: 52rem;
		transition: all .8s ease;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		border-radius: 3px;
		overflow: hidden;
		box-shadow: 0 1.5rem 4rem rgba(#000, .15);

		&--front {
			background-color: #fff;
		}

		&--back {
			transform: rotateY(180deg);

			&-1 {
				background-image: linear-gradient(to right bottom, $color-secondary-light, $color-secondary-dark);
			}

			&-2 {
				background-image: linear-gradient(to right bottom, $color-primary-light, $color-primary-dark);
			}

			&-3 {
				background-image: linear-gradient(to right bottom, $color-tertiary-light, $color-tertiary-dark);
			}
		}
	}


	&:hover &__side--front {
		transform: rotateY(-180deg);
	}

	&:hover &__side--back {
		transform: rotateY(0);
	}


	// FRONT SIDE STYLING
	&__picture {
		background-size: cover;
		height: 23rem;
		background-blend-mode: screen;
		-webkit-clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
		clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;

		&--1 {
			background-image: linear-gradient(to right bottom, $color-secondary-light, $color-secondary-dark),
				url(../assets/images/desktop/051.JPG);
		}

		&--2 {
			background-image: linear-gradient(to right bottom, $color-primary-light, $color-primary-dark),
				url(../assets/images/desktop/005.JPG);
		}

		&--3 {
			background-image: linear-gradient(to right bottom, $color-tertiary-light, $color-tertiary-dark),
				url(../assets/images/053.jpg.jpg);
		}
	}

	&__heading {
		font-size: 2.8rem;
		font-weight: 300;
		text-transform: uppercase;
		text-align: right;
		color: $color-white;
		position: absolute;
		top: 12rem;
		right: 2rem;
		width: 75%;

	}

	&__heading-span {
		padding: 1rem 1.5rem;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;

		&--1 {
			background-image: linear-gradient(to right bottom,
					rgba($color-secondary-light, .85),
					rgba($color-secondary-dark, .85));
		}

		&--2 {
			background-image: linear-gradient(to right bottom,
					rgba($color-primary-light, .85),
					rgba($color-primary-dark, .85));
		}

		&--3 {
			background-image: linear-gradient(to right bottom,
					rgba($color-tertiary-light, .85),
					rgba($color-tertiary-dark, .85));
		}
	}

	&__details {
		padding: 3rem;

		ul {
			list-style: none;
			width: 80%;
			margin: 0 auto;

			li {
				text-align: center;
				font-size: 1.5rem;
				padding: 1rem;

				&:not(:last-child) {
					border-bottom: 1px solid $color-grey-light-2;
				}
			}
		}
	}

	// FRONT SIDE STYLING
	&__cta {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		text-align: center;
	}

	&__price-box {
		text-align: center;
		color: $color-white;
		margin-bottom: 8rem;
	}

	&__price-only {
		font-size: 1.4rem;
		text-transform: uppercase;
	}

	&__price-value {
		font-size: 6rem;
		font-weight: 100;
	}

	//@include respond(tab-port) {
	@media only screen and (max-width: 56.25em),
	only screen and (hover: none) {

		height: auto;
		border-radius: 3px;
		background-color: $color-white;
		box-shadow: 0 1.5rem 4rem rgba($color-black, .15);

		&__side {
			height: auto;
			position: relative;
			box-shadow: none;

			&--back {
				transform: rotateY(0);
				clip-path: polygon(0 15%, 100% 0, 100% 100%, 0% 100%);
			}
		}

		&:hover &__side--front {
			transform: rotateY(0);
		}


		&__details {
			padding: 1rem 3rem;
		}

		// FRONT SIDE STYLING
		&__cta {
			position: relative;
			top: 0%;
			left: 0;
			transform: translate(0);
			width: 100%;
			padding: 7rem 4rem 4rem 4rem;
		}

		&__price-box {
			margin-bottom: 3rem;
		}

		&__price-value {
			font-size: 4rem;
		}
	}

}
</style>
