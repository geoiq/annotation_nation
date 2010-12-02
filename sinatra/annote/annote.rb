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
    set :public, File.dirname(__FILE__) + '/public'
    
    get '/hi' do
      "Hello World!"
    end

    get '/' do
      "[TODO: Put list of maps here, until then add /id to the url where id is the map_id]"
    end
    
    get '/:id' do
      erb :index
    end
    
    get '/comments/:id.json' do
      dataset = Geoiq::Dataset.load(params[:id])
      params.delete :id

      content_type :json
      dataset.features(params).to_json
    end
    
    post '/comments/:id.json' do
      dataset = Geoiq::Dataset.load(params[:id])
      params.delete :id
      
      dataset.add(params[:features])
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


