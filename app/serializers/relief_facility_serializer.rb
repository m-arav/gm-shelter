class ReliefFacilitySerializer < ActiveModel::Serializer
  attributes :id, :name, :humanized_address, :details, :facility_type, :location, :district, :contact

  def location
    {
      lat: object.location.lat,
      lon: object.location.lon
    }
  end

  def contact
    object.contact.blank? ? "Not available": object.contact
  end

  def humanized_address
    object.humanized_address.blank? ? "Not available": object.humanized_address
  end
end
