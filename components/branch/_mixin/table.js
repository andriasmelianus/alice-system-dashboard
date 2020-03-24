/**
 * Merupakan mixin table yang digunakan khusus untuk table user
 * Mixin ini digunakan untuk menyesuaikan variabel yang ada pada global-mixin
 *
 */
import { globalTable } from "~/components/_mixin/global-table";
import { defaultRecord } from "./record";
export const branchTable = {
  mixins: [globalTable],

  data: () => ({
    defaultTableHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Kode", value: "code" },
      { text: "Telepon", value: "phone" },
      { text: "Alamat", value: "address" },
      { text: "Kota", value: "city" },
      { text: "Propinsi", value: "region" },
      { text: "Negara", value: "country" },
      { text: "Catatan", value: "note" },
      { text: "Pengguna", value: "user" },
      { text: "Diinput", value: "created_at" },
      { text: "Diupdate", value: "updated_at" }
    ],
    smallTableHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Kode", value: "code" }
    ],
    singleColumnTableHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: defaultRecord,
    editedRecord: defaultRecord,

    apiUrl: "/branch"
  })
};
