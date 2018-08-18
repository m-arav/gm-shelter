class ReliefFacilitySerializer < ActiveModel::Serializer
  attributes :id, :name, :humanized_address, :details, :facility_type, :location

  def location
    {
      lat: object.location.lat,
      lon: object.location.lon
    }
  end



end
