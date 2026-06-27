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
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Icon', Icon);
});
