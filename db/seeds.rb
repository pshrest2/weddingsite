# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

wedding = Wedding.create(
  name: "Sayara & Bishwas",
  description: "Sayara and Bishwas's wedding reception party",
  bride_name: "Sayara",
  groom_name: "Bishwas",
  location: "Bharatpur Garden & Resort"
)

Guest.create(
  name: "Pranaya Shrestha",
  nimto_type: "chuley_nimto",
  passcode: "0000",
  wedding:
)

Guest.create(
  name: "Alexis Graham",
  nimto_type: "nimto",
  passcode: "0001",
  wedding:
)
