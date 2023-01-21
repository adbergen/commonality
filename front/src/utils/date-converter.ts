import { computed } from 'vue';
import moment from 'moment';

export default function dateConverter(date: string, format: string) {
  const formattedDate = computed(() => moment(date).format(format));

  return formattedDate.value;
}
