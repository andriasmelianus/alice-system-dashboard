/**
 * Merupakan mixin table yang digunakan khusus untuk table user
 * Mixin ini digunakan untuk menyesuaikan variabel yang ada pada global-mixin
 *
 */
import { globalTable } from "~/components/_mixin/global-table";
import { defaultRecord } from "./record";
export const userTable = {
  mixins: [globalTable],

  data: () => ({
    defaultTableHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Username", value: "username" },
      { text: "Aktif?", value: "is_active" },
      { text: "No.Identitas", value: "id_number" },
      { text: "Telepon", value: "phone" },
      { text: "Alamat", value: "address" },
      { text: "Kota", value: "city" },
      { text: "Propinsi", value: "region" },
      { text: "Negara", value: "country" },
      { text: "Dibuat", value: "created_at" },
      { text: "Diubah", value: "updated_at" },
    ],
    smallTableHeaders: [
      { text: "Nama", value: "name", align: "left" },
      { text: "Username", value: "username" },
    ],
    singleColumnTableHeader: [{ text: "Nama", value: "name", align: "left" }],

    defaultRecord: defaultRecord,
    editedRecord: defaultRecord,

    apiUrl: "/auth/user",
  }),
};
