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
