ALL_FACILITIES = ReliefFacility.all.map do |rf|
  h = rf.as_json
  h["contact"] = h["contact"].blank? ? "Not available": h["contact"]
  h["humanized_address"] = h["humanized_address"].blank? ? "Not available": h["humanized_address"]
  h["location"] = { lat: h["location"].lat, lon: h["location"].lon }
  h
end.to_json

ALL_SHELTERS = ReliefFacility.shelters.all.map do |rf|
  h = rf.as_json
  h["contact"] = h["contact"].blank? ? "Not available": h["contact"]
  h["humanized_address"] = h["humanized_address"].blank? ? "Not available": h["humanized_address"]
  h["location"] = { lat: h["location"].lat, lon: h["location"].lon }
  h
end.to_json
