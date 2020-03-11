export const userTable = {
  data: () => ({
    apiUrl: "/auth/user",
    vuexActionPathForReadRecords: "user/setRecords",
    vuexActionPathForCreateRecord: "user/createRecord",
    vuexActionPathForUpdateRecord: "user/updateRecord",
    vuexActionPathForDeleteRecord: "user/deleteRecord",
    vuexCommitPathForSelectedRecords: "user/setSelectedRecords",
    vuexCommitPathForSetEditMode: "user/setEditMode"
  }),
  computed: {
    storeStateModule() {
      return this.$store.state.user;
    }
  }
};
