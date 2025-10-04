<script setup lang="ts">
  import { RRSS } from "~/constants";
  import FacebookIcon from "~/assets/icons/facebook.svg";
  import InstagramIcon from "~/assets/icons/instagram.svg";
  import YoutubeIcon from "~/assets/icons/youtube.svg";
  import LinkedinIcon from "~/assets/icons/linkedin.svg";

  const socialIcons = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    youtube: YoutubeIcon,
    linkedin: LinkedinIcon
  }

  const getIcon = (url: string) => {
    const platform = Object.keys(socialIcons).find(platform =>
      url.includes(platform)
    )
    return platform ? socialIcons[platform as keyof typeof socialIcons] : null
  }

</script>
<template>
  <ul class="flex flex-row justify-center gap-2 xl:gap-4">
		<li v-for="(item, index) in RRSS" :key="index">
			<a :href="item" target="_blank" rel="noopener noreferrer">
				<Component
					:is="getIcon(item)"
					class="!w-5 !h-5 !mb-0 hover:opacity-80"
				/>
			</a>
		</li>
	</ul>
</template>
