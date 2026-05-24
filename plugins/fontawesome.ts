import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCalendarDays,
  faLightbulb,
} from '@fortawesome/free-regular-svg-icons';
import {
  faExclamation,
  faCode,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import Icon from '~/components/Icon.vue';

config.autoAddCss = false;

library.add(
  faCalendarDays,
  faLightbulb,
  faExclamation,
  faCode,
  faTableCellsLarge,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Icon', Icon);
});
