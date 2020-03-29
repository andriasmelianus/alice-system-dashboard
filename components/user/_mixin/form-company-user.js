import { globalForm } from "~/components/_mixin/global-form";
import { defaultRecord, defaultRecordError } from "./record-company-user";
export const userForm = {
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

    apiUrl: "/company-user"
  })
};
