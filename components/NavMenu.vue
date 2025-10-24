<script setup lang="ts">
import { ROUTES_INDEX } from '~/constants';

const emit = defineEmits(['toggle']);
const routes = ROUTES_INDEX;
const route = useRoute();
const localePath = useLocalePath();
const { getLocale } = useI18nUtils();

const isRouteActive = (path: string) => {
  if (path === '/') {
    return route.path === localePath('/');
  }
  return route.path.startsWith(localePath(path)) && route.path !== '/';
};

const expandedItems = ref<Record<number, boolean>>({});

const toggleChildren = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index];
};

const isExpanded = (index: number) => {
  return expandedItems.value[index];
};

const shouldBeExpanded = (routeItem: any, index: number) => {
  if (!routeItem.children) return false;
  const currentPath = route.path;
  const parentPath = localePath(`/${routeItem.name}`);
  return currentPath.startsWith(parentPath) && currentPath !== parentPath;
};

const updateExpandedState = () => {
  routes.forEach((routeItem, index) => {
    if (routeItem.children) {
      expandedItems.value[index] = shouldBeExpanded(routeItem, index);
    }
  });
};

watch(() => route.path, () => {
  updateExpandedState();
}, { immediate: true });

onMounted(() => {
  updateExpandedState();
});
</script>

<template>
  <nav role="navigation">
    <ul class="navbar">
      <li class="navbar__menu-item">
        <div class="flex py-4">
          <NuxtLinkLocale
            :to="'/'"
            class="navbar__menu-item--link"
            :class="{ 'border-b-2': isRouteActive('/') }"
            @click="emit('toggle')"
          >
            {{ getLocale('home', 'routes') }}
          </NuxtLinkLocale>
        </div>
      </li>
      <component
        :is="routeItem.children ? 'ul' : 'li'"
        v-for="(routeItem, index) in routes"
        :key="index"
        class="navbar__menu-item"
        :class="{ 'expanded pb-2': isExpanded(index) }"
      >
        <div class="flex flex-row py-4 gap-8 justify-start items-baseline">
          <NuxtLinkLocale
            :to="routeItem.name"
            class="navbar__menu-item--link"
            :class="{ 'border-b-2': isRouteActive(`/${routeItem.name}`) }"
            @click="emit('toggle')"
          >
            {{ getLocale(routeItem.name, 'routes') }}
          </NuxtLinkLocale>
          <button
            v-if="routeItem.children"
            class="hover:opacity-75 text-xl !leading-[1.75rem]"
            @click="toggleChildren(index)"
          >
            {{ isExpanded(index) ? '-' : '+' }}
          </button>
        </div>

        <Transition name="fade-slide" mode="out-in">
          <ul v-if="routeItem.children && isExpanded(index)">
            <li
              v-for="(child, childIndex) in routeItem.children"
              :key="childIndex"
              class="pl-4 pb-4"
            >
              <NuxtLinkLocale
                :to="`/${routeItem.name}/${child}`"
                class="navbar__menu-item--link"
                :class="{ 'border-b-2': isRouteActive(`/${routeItem.name}/${child}`) }"
                @click="emit('toggle')"
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
