export const navigationData = [
  {title:'Dashboard', url:'/', icon:'mdi-gauge'},

  {
    title: 'Akses Kontrol *',
    icon: 'mdi-account-key',
    children: [
      {title: 'Services', url:'/auth/service'},
      {title: 'Role', url:'/auth/role'},
      {title: 'User', url:'/auth/user'},
      {title: 'Company', url:'/auth/company'},
    ]
  },

  {
    title:'Perusahaan',
    icon:'mdi-office-building',
    children: [
      { title: 'Data Perusahaan', url: '/company' },
      { title: 'Data Pengguna', url: '/user' },
    ]
  },

  {
    title:'Kontak',
    icon:'mdi-contacts',
    children: [
      { title: 'Daftar Pelanggan', url: '/customer' },
      { title: 'Daftar Supplier', url: '/supplier' },
      { title: 'Daftar Salesman', url: '/salesman' },
    ]
  },

  {title:'Produk',url:'/product',icon:'mdi-food-apple'},

  {title:'Harga',url:'/price',icon:'mdi-tag-multiple'},

  {
    title:'Penjualan',
    icon:'mdi-cash-plus',
    children: [
      { title: 'Data Penjualan', url: '/sale' },
      { title: 'Retur Penjualan', url: '/sale-return' },
    ]
  },
  {
    title:'Pembelian',
    icon:'mdi-cart-plus',
    children: [
      { title: 'Data Pembelian', url: '/purchase' },
      { title: 'Retur Pembelian', url: '/purchase-return' },
    ]
  },

  { title:'Akuntansi (Segera)', url:'/under-construction', icon:'mdi-cash-register'},

  {
    title:'Laporan',
    icon:'mdi-chart-areaspline-variant',
    children: [
      { title: 'Pelanggan', url: '/report/customer' },
    ]
  },

  {
    title:'Bantuan',
    icon:'mdi-help-circle',
    children: [
      { title: 'Penggunaan Aplikasi', url: '/help/howto' },
      { title: 'Tentang', url: '/help/about' },
    ]
  },
]
