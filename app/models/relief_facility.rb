class ReliefFacility < ApplicationRecord
  include ActiveModel::Serialization

  scope :within, -> (latitude, longitude, distance_in_km = 5) {
    where(%{
     ST_Distance(location, 'POINT(%f %f)') < %d
    } % [longitude, latitude, distance_in_km * 1000]) # approx
  }
end
