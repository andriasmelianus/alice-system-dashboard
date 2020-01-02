# Alice System Dashboard

**Alice System** merupakan software sumber terbuka (open source) yang dirancang untuk memenuhi kebutuhan software ERP pada perusahaan skala kecil sampai menengah.

[**Alice System Dashboard**](https://github.com/andriasmelianus/alice-system-dashboard) adalah titik awal atau pintu gerbang pengguna dalam memanfaatkan software Alice System. Melalui dashboard ini pengguna dapat mengakses berbagai macam layanan yang disediakan dalam software Alice System.

Software ini dikembangkan dengan menggunakan **NuxtJS** sebagai front-end, **Lumen** sebagai back-end dan **MySQL** sebagai databasenya. Untuk dapat memanfaatkan layanan-layanan yang tersedia dalam software Alice System, pengguna harus melakukan instalasi beberapa microservice yang sudah disediakan, antara lain:
1. [Gateway](https://github.com/andriasmelianus/alice-system-gateway), _API Gateway_ untuk software Alice System.
2. [Contacts](https://github.com/andriasmelianus/alice-system-contact), microservices yang dibangun khusus untuk menangani data nomor telepon, alamat, kota, propinsi dan negara.

## Tata Cara Mengkloning Project

1. Kloning repositori ini
2. Masuk ke dalam folder kemudian jalankan:
`$ yarn install`
3. Mengembangkan project dengan fasilitas _hot-reload_
`$ yarn serve`
4. Membuat file statis (production)
`$ yarn generate`

---

Software ini dikembangkan di bawah lisensi [GNU General Public License v3 (GPL-3)](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)#summary)

Anda diperbolehkan untuk mendistribusikan dan mengubah software selama Anda menyertakan catatan tentang perubahan dan tanggalnya pada berkas sumber.
Segala bentuk perubahan baik pada kode sumber dan software (hasil kompilasi kode) itu sendiri harus berada di bawah lisensi [GNU General Public License v3 (GPL-3)](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)#summary).
