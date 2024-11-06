const userResponse = {
  status: 200,
  message: "success",
  total_data: 5,
  data: [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      status: "paid",
      created_at: "2024-10-01T10:15:30Z",
      updated_at: "2024-10-15T10:15:30Z"
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      status: "free",
      created_at: "2024-09-20T09:25:10Z",
      updated_at: "2024-10-05T09:25:10Z"
    },
    {
      name: "Alice Johnson",
      email: "alicejohnson@example.com",
      status: "paid",
      created_at: "2024-10-02T14:00:00Z",
      updated_at: "2024-10-14T14:00:00Z"
    },
    {
      name: "Bob Brown",
      email: "bobbrown@example.com",
      status: "free",
      created_at: "2024-10-03T16:30:45Z",
      updated_at: "2024-10-18T16:30:45Z"
    },
    {
      name: "Charlie Green",
      email: "charliegreen@example.com",
      status: "paid",
      created_at: "2024-10-04T12:45:20Z",
      updated_at: "2024-10-20T12:45:20Z"
    }
  ]
};

export default userResponse;