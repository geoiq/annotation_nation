%w{ pp rubygems eventmachine json geoiq-gem}.each {|gem| require gem}

dataset_id = ARGV.shift

puts "Fetching dataset #{dataset_id}..."
dataset = Geoiq::Dataset.load(dataset_id)

puts "Fetching features..."
features = dataset.features

puts "Creating a destination dataset..."
target = Geoiq::Dataset.new()
target.title = dataset.title

first_feature = features.shift
id = target.upload_data("#{first_feature.keys.join(',')}\n#{first_feature.values.join(',')}")
puts "Saved Dataset #{id}"

EventMachine::run {

  EventMachine.add_periodic_timer(5) {

    feature = features.shift
    feature['timestamp'] = feature['timestamp']['time']
    feature['geometry'] = {:type => "Point", :coordinates => [feature['longitude'], feature['latitude']]}

    puts "Adding Feature: #{feature.to_json}"
    target.add( [feature] )

  }
  
}

puts "Good day, sir!"