import { globalForm } from "~/components/_mixin/global-form";
import { defaultRecord, defaultRecordError } from "./record";
import { specialOption } from "./special-option";
export const roleForm = {
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
    specialOption: specialOption,

    apiUrl: "/auth/role"
  })
};
