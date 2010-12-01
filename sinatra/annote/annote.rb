%w{ rubygems erb em-websocket uuid mq thin  }.each {|gem| require gem}
require File.dirname(__FILE__) +'/vendor/rack/lib/rack'
require File.dirname(__FILE__) +'/vendor/sinatra/lib/sinatra'
require File.dirname(__FILE__) +'/vendor/sinatra/lib/sinatra/base'
enable :inline_templates

uuid = UUID.new

EventMachine.run do
  # 
  # SINATRA
  # 
  class App < Sinatra::Base
    get '/hi' do
      "Hello World!"
    end

    get '/' do
      erb :index
    end
  end

  # 
  # EventMachine websockets
  # 
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
  
  
  puts "going to be running"
  App.run!({:port => 3000})
  puts "Running!"
end


