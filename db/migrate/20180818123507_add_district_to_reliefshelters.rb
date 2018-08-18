class AddDistrictToReliefshelters < ActiveRecord::Migration[5.2]
  def change
    add_column :relief_facilities, :district, :integer
    add_index :relief_facilities, :district
  end
end
