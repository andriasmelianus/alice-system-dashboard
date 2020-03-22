import { globalForm } from "~/components/_mixin/global-form";
import { defaultRecord, defaultRecordError } from "./record";
export const companyForm = {
  mixins: [globalForm],

  props: {
    record: {
      type: Object,
      default: function() {
        return defaultRecord;
      }
    }
  },
  data: () => ({
    defaultRecordError: defaultRecordError,
    recordError: defaultRecordError,

    apiUrl: "/company"
  })
};
