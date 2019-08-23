export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-home',
      badge: {
        variant: 'primary',
      }
    },
    {
      name: 'Menu Utama',
      url: '/menu',
      icon: 'icon-menu',
      children: [
        {
          name: 'Booking Cepat',
          url: '/menu/searchDokter',
          icon: 'icon-menu'
        },
        {
          name: 'Cari Faskes',
          url: '/menu/...',
          icon: 'fa fa-search'
        },
        {
          name: 'Cari Dokter',
          url: '/menu/....',
          icon: 'fa fa-search'
        }
      ]
    },
    {
      name: 'Jadwal',
      url: '',
      icon: 'fa fa-calendar'
    },
    {
      name: 'Bayar',
      url: '',
      icon: 'fa fa-credit-card'
    },
    {
      name: 'Profil',
      url: '',
      icon: 'fa fa-user'
    }
  ]
}
