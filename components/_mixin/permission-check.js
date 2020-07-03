export const permissionCheck = {
  data: () => ({
    permissionRequired: ""
  }),
  mounted() {
    let userRetreivedPermission = this.$auth.user.permission,
      userSpecials = userRetreivedPermission.map(function(userPermission) {
        return userPermission["special"];
      }),
      userPermissions = userRetreivedPermission.map(function(userPermission) {
        return userPermission["slug"];
      });

    if (userSpecials.indexOf("nothing") > -1) {
      // User special mengandung "nothing"
      this.preventPageAccess();
    }

    if (userSpecials.indexOf("everything") == -1) {
      // User special tidak mengandung "everything"
      if (userPermissions.indexOf(this.permissionRequired) == -1) {
        // Required permission tidak ada pada user permission
        this.preventPageAccess();
      }
    }
  },
  methods: {
    preventPageAccess() {
      this.$store.commit("preventAccess/show");
    }
  }
};
