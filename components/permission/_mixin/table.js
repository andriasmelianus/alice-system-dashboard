/**
 * Merupakan mixin table yang digunakan khusus untuk table role
 * Mixin ini digunakan untuk menyesuaikan variabel yang ada pada global-mixin
 *
 */
import { globalTable } from "~/components/_mixin/global-table";
import { defaultRecord } from "./record";
export const permissionTable = {
  mixins: [globalTable],

  data: () => ({
    defaultTableHeaders: [
      { text: "Layanan", value: "service", align: "left" },
      { text: "Nama", value: "name", align: "left" },
      { text: "Slug", value: "slug" },
      { text: "Diinput", value: "created_at" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallTableHeaders: [
      { text: "Layanan", value: "service", align: "left" },
      { text: "Nama", value: "name", align: "left" }
    ],
    singleColumnTableHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: defaultRecord,
    editedRecord: defaultRecord,

    apiUrl: "/auth/permission"
  })
};
