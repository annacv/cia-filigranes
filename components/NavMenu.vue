<template>
  <nav role="navigation">
    <ul class="navbar">
      <li class="navbar__menu-item">
        <div class="flex py-4">
          <NuxtLinkLocale
            :to="'/'"
            @click="emit('toggle')"
            class="navbar__menu-item--link"
            :class="{ 'border-b-2': isRouteActive('/') }"
          >
            {{ getLocale('home', 'routes') }}
          </NuxtLinkLocale>
        </div>
        
      </li>
      <component
        :is="route.children ? 'ul' : 'li'"
        v-for="(route, index) in routes"
        :key="index"
        class="navbar__menu-item"
        :class="{ 'expanded pb-2': isExpanded(index) }"
      >
        <div class="flex flex-row py-4 gap-8 justify-start items-baseline">
          <NuxtLinkLocale
            :to="route.name"
            @click="emit('toggle')"
            class="navbar__menu-item--link"
            :class="{ 'border-b-2': isRouteActive(`/${route.name}`) }"
          >
            {{ getLocale(route.name, 'routes') }}
          </NuxtLinkLocale>
          <button
            v-if="route.children"
            @click="toggleChildren(index)"
            class="hover:opacity-75 text-xl"
          >
            {{ isExpanded(index) ? '-' : '+' }}
          </button>
        </div>

        <Transition name="fade-slide" mode="out-in">
          <ul v-if="route.children && isExpanded(index)">
            <li
              v-for="(child, childIndex) in route.children"
              :key="childIndex"
              class="pl-4 pb-4"
            >
              <NuxtLinkLocale
                :to="`/${route.name}/${child}`"
                @click="emit('toggle')"
                class="navbar__menu-item--link"
                :class="{ 'border-b-2': isRouteActive(`/${route.name}/${child}`) }"
              >
                {{ getLocale(child, 'routes') }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </Transition>
      </component>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getLocale } from '../composables/use-i18n-utils.composable';
import { useRoute } from 'vue-router';
import { ROUTES_INDEX } from '../constants/constants';

const emit = defineEmits(['toggle']);
const routes = ROUTES_INDEX;
const route = useRoute();
const localePath = useLocalePath();

const isRouteActive = (path: string) => {
  if (path === '/') {
    return route.path === localePath('/');
  }
  return route.path.startsWith(localePath(path)) && route.path !== '/';
};

// State object to keep track of which items are expanded
const expandedItems = ref<Record<number, boolean>>({});

const toggleChildren = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index];
};

const isExpanded = (index: number) => {
  return expandedItems.value[index];
};
</script>

<style scoped lang="scss">
.navbar {
  &__menu-item {
    @apply overflow-hidden text-white;
    transition: max-height 0.5s ease, padding 0.5s ease;
    max-height: 4rem; // Default max-height when collapsed
    &.expanded {
      max-height: 28rem; // Large enough to fit content
    }
    &--link {
      @apply hover:border-b-2 hover:border-opacity-50 border-white pb-1;
    }
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-from,
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
