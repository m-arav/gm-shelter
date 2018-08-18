class CreateReliefFacility < ActiveRecord::Migration[5.2]
  def change
    create_table :relief_facilities do |t|
      t.string :name
      t.string :contact
      t.st_point :location, geographic: true
      t.string :details
      t.string :humanized_address
      t.string :facility_type

      t.timestamps
    end

    add_index :relief_facilities, :location, using: :gist
  end
end
