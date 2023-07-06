class Guest < ApplicationRecord
  belongs_to :wedding

  enum nimto_type: { chuley_nimto: "chuley_nimto", sapariwar: "sapariwar", nimto: "nimto" }
end
