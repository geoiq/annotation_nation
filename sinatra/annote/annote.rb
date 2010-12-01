%w{ rubygems erb em-websocket uuid mq thin json geoiq-gem }.each {|gem| require gem}
require File.dirname(__FILE__) +'/vendor/rack/lib/rack'
require File.dirname(__FILE__) +'/vendor/sinatra/lib/sinatra'
require File.dirname(__FILE__) +'/vendor/sinatra/lib/sinatra/base'

uuid = UUID.new

EventMachine.run do
  # 
  # SINATRA
  # 
  class App < Sinatra::Base
    enable :inline_templates
    set :views, File.dirname(__FILE__) + '/views'
    
    get '/hi' do
      "Hello World!"
    end

    get '/' do
      erb :index
    end
    
    get '/comments/:id.json' do
      dataset = Geoiq::Dataset.load(params[:id])
      params.delete :id

      content_type :json

      dataset.features(params).to_json
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
  
  
  App.run!({:port => 3000})
end


