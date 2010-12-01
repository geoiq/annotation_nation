%w{ rubygems mq json}.each {|gem| require gem}

dataset_id = ARGV.shift
update_rate = ARGV.shift
raise "need dataset_id and update_rate (seconds)" if !dataset_id or !update_rate

AMQP.start(:host => 'localhost') do
  geocommons = MQ.new.fanout('dataset_1')
  last_updated = Time.at(1) # in the beginning, there was light
  EM.add_periodic_timer(update_rate){
    # Geoiq fetch dataset_id since last_updated
    puts last_updated.strftime('%Y-%m-%dT%H:%M:%S%z')
    
    # features = Geoiq::Features(dataset_id, :timestamp => last_updated.strftime('%Y-%m-%dT%H:%M:%S%z'))
    last_updated = Time.now
        
    # Call to GeoIQ for the dataset that we're listening on
    features = [{:name => "First Feature", :timestamp => last_updated.strftime('%Y-%m-%dT%H:%M:%S%z')}]

    features.each do |feature|
      geocommons.publish(feature.to_json)
    end
  }
end