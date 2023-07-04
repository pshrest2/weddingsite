class CreateWeddings < ActiveRecord::Migration[7.0]
  def change
    create_table :weddings do |t|
      t.string :name
      t.string :description
      t.string :bride_name
      t.string :groom_name
      t.string :location
      t.string :additional_info

      t.timestamps
    end
  end
end
