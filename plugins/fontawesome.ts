import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarDays,
  faLightbulb,
  faMoon,
  faSun,
  faCopy,
} from '@fortawesome/free-regular-svg-icons';
import {
  faExclamation,
  faCode,
  faTableCellsLarge,
  faDisplay,
  faArrowRotateRight,
  faChevronRight,
  faCircleInfo,
  faCircleExclamation,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import Icon from '~/components/Icon.vue';

config.autoAddCss = false;

library.add(
  faCalendarDays,
  faLightbulb,
  faExclamation,
  faCode,
  faTableCellsLarge,
  faDisplay,
  faSun,
  faMoon,
  faArrowRotateRight,
  faChevronRight,
  faCircleInfo,
  faCircleExclamation,
  faCopy,
  faLink,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Icon', Icon);
});
