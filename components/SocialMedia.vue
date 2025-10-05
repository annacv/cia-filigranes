<script setup lang="ts">
  import { RRSS } from "~/constants";
  import FacebookIcon from "~/assets/icons/facebook.svg";
  import InstagramIcon from "~/assets/icons/instagram.svg";
  import YoutubeIcon from "~/assets/icons/youtube.svg";
  import LinkedinIcon from "~/assets/icons/linkedin.svg";

  interface Props {
    size?: string
    width?: string
    height?: string
    gap?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'w-5 h-5',
    width: '',
    height: '',
    gap: 'gap-2 xl:gap-4'
  })

  const socialIcons = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    youtube: YoutubeIcon,
    linkedin: LinkedinIcon
  }

  const getIcon = (platform: string) => {
    return socialIcons[platform as keyof typeof socialIcons] || null
  }

  const getSizeClasses = () => {
    if (props.width && props.height) {
      return `!w-[${props.width}] !h-[${props.height}]`
    }
    return `!${props.size}`
  }

  const getIconClasses = () => {
    const sizeClasses = getSizeClasses()
    return `${sizeClasses} !mb-0 hover:opacity-80`
  }

</script>
<template>
  <ul :class="`flex flex-row justify-center ${props.gap}`">
		<li v-for="(item, index) in RRSS" :key="index">
			<a :href="item.url" target="_blank" rel="noopener noreferrer">
				<Component
					:is="getIcon(item.platform)"
					:class="getIconClasses()"
				/>
			</a>
		</li>
	</ul>
</template>

<style scoped>
:deep(.nuxt-icon) {
  height: unset !important;
}
</style>
