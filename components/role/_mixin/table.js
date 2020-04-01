/**
 * Merupakan mixin table yang digunakan khusus untuk table role
 * Mixin ini digunakan untuk menyesuaikan variabel yang ada pada global-mixin
 *
 */
import { globalTable } from "~/components/_mixin/global-table";
import { defaultRecord } from "./record";
export const roleTable = {
  mixins: [globalTable],

  data: () => ({
    defaultTableHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Slug", value: "slug" },
      { text: "Special", value: "special" },
      { text: "Diinput", value: "created_at" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallTableHeaders: [{ text: "Nama", value: "name", align: "left" }],
    singleColumnTableHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: defaultRecord,
    editedRecord: defaultRecord,

    apiUrl: "/auth/role"
  })
};
