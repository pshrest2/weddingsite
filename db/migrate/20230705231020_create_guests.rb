class CreateGuests < ActiveRecord::Migration[7.0]
  def change
    create_table :guests do |t|
      t.string :name, null: false
      t.string :phone
      t.string :nimto_type, null: false
      t.string :passcode, null: false
      t.string :additional_info
      t.references :wedding, null: false, foreign_key: true

      t.timestamps
    end
  end
end
