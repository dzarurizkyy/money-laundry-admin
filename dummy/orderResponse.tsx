const orderResponse = {
  status: 200,
  message: "success",
  data: [
    {
      id: 1,
      name: "Cuci Lipat",
      order_date: "2024-11-01T10:30:00",
      status: "baru",
      payment: "belum",
      weight: 2,
      total_price: 15000,
      quantity: 3,
    },
    {
      id: 2,
      name: "Cuci Setrika",
      order_date: "2024-11-02T14:45:00",
      status: "proses",
      payment: "lunas",
      weight: 1,
      total_price: 7500,
      quantity: 1
    },
    {
      id: 3,
      name: "Cuci Pewangi",
      order_date: "2024-11-03T09:15:00",
      status: "selesai",
      payment: "lunas",
      weight: 3,
      total_price: 20000,
      quantity: 4
    },
    {
      id: 4,
      name: "Cuci Lengkap",
      order_date: "2024-11-04T11:00:00",
      status: "baru",
      payment: "belum",
      weight: 1,
      total_price: 5000,
      quantity: 1
    }
  ]
}

export default orderResponse