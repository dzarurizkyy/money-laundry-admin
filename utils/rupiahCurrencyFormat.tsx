function rupiachCurrencyFormat(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(value)
}

export default rupiachCurrencyFormat