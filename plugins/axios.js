export default function(context) {
  context.$axios.onError(error => {
    /**
     * Apabila request axios mengalami error 400 (Token is expired)
     * maka redirect user ke halaman login.
     */
    const code = parseInt(error.response && error.response.status);
    if (code === 400 && error.response.data.error == "Token is expired") {
      alert(
        "Sesi login Anda telah berakhir. Silahkan login kembali untuk melanjutkan."
      );
      context.redirect("/login");
    }
  });
}
