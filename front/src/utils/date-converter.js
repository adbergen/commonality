import { computed } from "vue";
import moment from "moment";

export default function dateConverter(date, format) {
  const formattedDate = computed(() =>
    moment(date).format(format)
  );

  return formattedDate.value;
}
