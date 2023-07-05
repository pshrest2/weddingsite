class Wedding < ApplicationRecord
  has_many :guests, dependent: :destroy
end
