# require 'vendor/gems/environment'
%w{ rubygems em-websocket uuid mq }.each {|gem| require gem}

uuid = UUID.new

EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |ws|
  ws.onopen do
    puts "WebSocket opened"

    geocommons = MQ.new
    geocommons.queue(uuid.generate).bind(geocommons.fanout('dataset_1')).subscribe do |t|
      puts t
      ws.send t
    end
  end

  ws.onclose do
    puts "WebSocket closed"
  end
end
