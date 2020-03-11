const userFields = {
  id: "",
  name: "",
  username: "",
  password: "",
  is_active: true,
  id_number: "",
  phone: "",
  address: "",
  city: "",
  region: "",
  country: ""
};
const userRecordError = {
  name: [],
  username: [],
  password: [],
  is_active: [],
  id_number: [],
  phone: [],
  address: [],
  city: [],
  region: [],
  country: []
};

export const state = () => ({
  defaultTableHeaders: [
    { text: "Nama", value: "name", align: "left" },
    { text: "Username", value: "username" },
    { text: "No.Identitas", value: "id_number" },
    { text: "Telepon", value: "phone" },
    { text: "Alamat", value: "address" },
    { text: "Kota", value: "city" },
    { text: "Propinsi", value: "region" },
    { text: "Negara", value: "country" },
    { text: "Dibuat", value: "created_at" },
    { text: "Diubah", value: "updated_at" }
  ],
  smallTableHeaders: [
    { text: "Nama", value: "name", align: "left" },
    { text: "Username", value: "username" }
  ],
  singleColumnTableHeader: [{ text: "Nama", value: "name", align: "left" }],

  records: undefined,
  selectedRecords: [],
  selectedRecord: {},
  selectedRecordIndex: undefined,

  editMode: false,
  editedRecord: userFields,
  defaultRecord: userFields,
  defaultRecordError: userRecordError
});

export const mutations = {
  setRecords(localState, newRecords) {
    localState.records = newRecords;
  },

  setSelectedRecords(localState, newSelectedRecords) {
    localState.selectedRecords = newSelectedRecords;

    /**
     * Nilai pada state selectedRecord selalu diambil dari record yang pertama pada selectedRecords
     */
    localState.selectedRecord = Object.assign({}, newSelectedRecords[0]);
    localState.selectedRecordIndex = localState.records.indexOf(
      newSelectedRecords[0]
    );
  },

  setEditMode(localState, editMode) {
    localState.editMode = editMode;
    if (editMode) {
      localState.editedRecord = Object.assign({}, localState.selectedRecord);
    } else {
      localState.editedRecord = Object.assign({}, localState.defaultRecord);
    }
  },

  createRecord(localState, newRecord) {
    let recordsCount = localState.recors.length;
    localState.records.splice(recordsCount, 1, newRecord);
  },

  updateRecord(localState, newRecord) {
    localState.records[localState.selectedRecordIndex] = Object.assign(
      {},
      newRecord
    );
  },

  deleteRecord(localState) {
    localState.records.splice(localState.selectedRecordIndex, 1);
  }
};

export const actions = {
  setRecords({ dispatch, commit, getters, rootGetters }, newRecords) {
    commit("setRecords", newRecords);
  },

  createRecord(context, newRecord) {
    context.commit("createRecord", newRecord);
  },

  updateRecord(context, newRecord) {
    context.commit("updateRecord", newRecord);
  },

  deleteRecord(context) {
    context.commit("deleteRecord");
  }
};
