const orderResponse = {
  status: 200,
  message: "success",
  data: [
    {
      id: 1,
      "name": "Cuci Lipat",
      "order_date": "2024-11-01T10:30:00",
      "status": "Baru",
      "payment": "Belum",
      "weight": 2,
      "total_price": 15000,
      "quantity": 3,
    },
    {
      id: 2,
      "name": "Cuci Setrika",
      "order_date": "2024-11-02T14:45:00",
      "status": "Proses",
      "payment": "Lunas",
      "weight": 1,
      "total_price": 7500,
      "quantity": 1
    },
    {
      id: 3,
      "name": "Cuci Pewangi",
      "order_date": "2024-11-03T09:15:00",
      "status": "Selesai",
      "payment": "Lunas",
      "weight": 3,
      "total_price": 20000,
      "quantity": 4
    },
    {
      id: 4,
      "name": "Cuci Lengkap",
      "order_date": "2024-11-04T11:00:00",
      "status": "Baru",
      "payment": "Belum",
      "weight": 1,
      "total_price": 5000,
      "quantity": 1
    },
    {
      id: 5,
      "name": "Cuci Lipat",
      "order_date": "2024-11-05T16:30:00",
      "status": "Proses",
      "payment": "Lunas",
      "weight": 4,
      "total_price": 30000,
      "quantity": 5
    }
  ]
}

export default orderResponse