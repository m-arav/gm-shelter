require 'csv'

task :import_facilities => :environment do
  file_name = File.join(File.dirname(__FILE__), '../../data/data.csv')
  batch = []
  CSV.foreach(file_name) do |raw|
    puts "------------------------------"
    puts raw
    data = {name: raw.shift,
            contact: raw.shift,
            humanized_address: raw.shift,
            facility_type: raw.shift.parameterize.underscore,
            details: raw.shift,
            location: RGeo::Cartesian.factory(:srid => 4326).point(*raw.shift.split(",").collect(&:to_f).reverse)
           } rescue nil
    puts data.inspect

    batch << data if data
  end

  ReliefFacility.import batch

end
