class ReliefFacility < ApplicationRecord
  include ActiveModel::Serialization

  scope :within, -> (latitude, longitude, distance_in_km = 5) {
    where(%{
     ST_DWithin(location, 'POINT(%f %f)',%d)
    } % [longitude, latitude, distance_in_km * 5000]).order("ST_Distance(location, 'POINT(#{longitude} #{latitude})') asc") # approx
  }
  scope :colleciton_centers, -> () { where(facility_type: "relief_material_collection") }

  enum district: [:ernakulam,
                  :malapuram,
                  :idukki,
                  :kannur,
                  :wayanad,
                  :palakkad,
                  :thrissur,
                  :kozhikode,
                  :pathanamthitta,
                  :alappuzha,
                  :kottayam,
                  :kollam,
                  :thiruvananthapuram,
                  :malappuram
                ]
end
