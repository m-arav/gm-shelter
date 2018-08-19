require 'csv'

task :import_facilities => :environment do
  file_name = File.join(File.dirname(__FILE__), '../../data/data_collection.csv')
  batch = []
  CSV.foreach(file_name,) do |raw|
    puts "----------Collection centers--------------------"
    puts raw
    data = { district: raw[0].downcase.strip,
            name: raw[1],
            location: RGeo::Cartesian.factory(:srid => 4326).point(*[raw[2],raw[3]].map(&:to_f).reverse),
            facility_type: "relief_material_collection",
            contact: raw[4]
           }
    puts data.inspect
    batch << data if data
  end

  ReliefFacility.import! batch

  file_name = File.join(File.dirname(__FILE__), '../../data/data_shelter.csv')
  batch = []
  CSV.foreach(file_name,) do |raw|
    puts "----------Shelters--------------------"
    puts raw
    data = { district: raw[0].downcase.strip,
            name: raw[1],
            contact: raw[2],
            humanized_address: raw[3],
            location: RGeo::Cartesian.factory(:srid => 4326).point(*[raw[4],raw[5]].map(&:to_f).reverse),
            facility_type: "shelter"
           }
    puts data.inspect
    batch << data if data
  end

  ReliefFacility.import! batch
end

task :export_nearby_collection_centers => :environment do
  CSV.open("nearest_collection_centers.csv", "wb") do |csv|
    csv << ["shelter name", "collection center", "url"]
    ReliefFacility.where(facility_type: 'shelter').each do |shelter|
      p = shelter
      c = ReliefFacility.within(p.location.lat, p.location.lon).where(facility_type: 'relief_material_collection').first

      if c
        csv << [p.name, c.name, "https://www.google.com/maps/dir/?api=1&origin=#{p.location.lat},#{p.location.lon}&destination=#{c.location.lat},#{c.location.lon}"]
      else
        puts "no collection centers "
        puts p.name
        puts ReliefFacility.within(p.location.lat, p.location.lon).where(facility_type: 'relief_material_collection').to_sql
        csv << [p.name]
      end

    end
  end
end
