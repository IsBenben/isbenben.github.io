import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarDays,
  faLightbulb,
  faMoon,
  faSun,
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
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Icon', Icon);
});
