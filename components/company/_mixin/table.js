/**
 * Merupakan mixin table yang digunakan khusus untuk table user
 * Mixin ini digunakan untuk menyesuaikan variabel yang ada pada global-mixin
 *
 */
import { globalTable } from "~/components/_mixin/global-table";
import { defaultRecord } from "./record";
export const companyTable = {
  mixins: [globalTable],

  data: () => ({
    defaultTableHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Deskripsi", value: "description" },
      { text: "NPWP", value: "tax_id" },
      { text: "Bisnis", value: "business" },
      { text: "Industri", value: "industry" },
      { text: "Web", value: "website" },
      { text: "Catatan", value: "note" },
      { text: "Diinput", value: "created_at" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallTableHeaders: [{ text: "Nama", value: "name", align: "left" }],
    singleColumnTableHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: defaultRecord,
    editedRecord: defaultRecord,

    apiUrl: "/company"
  })
};
