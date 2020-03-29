/**
 * Merupakan mixin table yang digunakan khusus untuk table user
 * Mixin ini digunakan untuk menyesuaikan variabel yang ada pada global-mixin
 *
 */
import { globalTable } from "~/components/_mixin/global-table";
import { defaultRecord } from "./record-company-user";
export const userTable = {
  mixins: [globalTable],

  data: () => ({
    defaultTableHeaders: [{ text: "Nama", value: "user", align: "left" }],
    smallTableHeaders: [{ text: "Nama", value: "user", align: "left" }],
    singleColumnTableHeader: [{ text: "Nama", value: "user", align: "left" }],

    defaultRecord: defaultRecord,
    editedRecord: defaultRecord,

    apiUrl: "/company-user"
  })
};
