%w{ rubygems mq json geoiq-gem}.each {|gem| require gem}

dataset_id = ARGV.shift
update_rate = ARGV.shift
time_attr = ARGV.shift
raise "need dataset_id or update_rate (seconds) or the time attribute " if !dataset_id or !update_rate or !time_attr

AMQP.start(:host => 'localhost') do
  geocommons = MQ.new.fanout('dataset_1')
  last_updated = Time.at(1) # in the beginning, there was light
  dataset = Geoiq::Dataset.load(dataset_id)
  last_features = []
  EM.add_periodic_timer(update_rate){
    # Geoiq fetch dataset_id since last_updated
    last_updated_time = last_updated.strftime('%Y-%m-%dT%H:%M:%S%z')
    params = { :filter => {time_attr => [{"min"=>last_updated_time}]}}

    features = dataset.features(params)
   
    last_updated = Time.now

    features.each do |feature|
      geocommons.publish(feature.to_json) 
    end unless features == last_features
    last_features = features

  }
end
