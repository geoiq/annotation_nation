%w{ rubygems erb em-websocket uuid mq thin json geoiq-gem dm-core dm-migrations }.each {|gem| require gem}
require File.dirname(__FILE__) +'/vendor/rack/lib/rack'
require File.dirname(__FILE__) +'/vendor/sinatra/lib/sinatra'
require File.dirname(__FILE__) +'/vendor/sinatra/lib/sinatra/base'

# 
# Database
# 
# DataMapper.setup(:default, "sqlite://#{File.dirname(__FILE__)}/annote.db")
DataMapper.setup(:default, 'sqlite::memory:')
class Article
  include DataMapper::Resource  
  property :id, Serial      
  property :title, String
  property :text, Text
  property :map, String
  property :created_at, DateTime
  property :updated_at, DateTime
end

# now let's update
DataMapper.auto_upgrade!

uuid = UUID.new

GEOIQ_SERVER = ARGV.shift
raise "need the GeoIQ server URL (e.g. http://geoiq.local) " if !GEOIQ_SERVER

EventMachine.run do
  # 
  # SINATRA
  # 
  class App < Sinatra::Base
    enable :inline_templates
    set :views, File.dirname(__FILE__) + '/views'
    set :public, File.dirname(__FILE__) + '/public'
    
    get '/hi' do
      "Yo! How's your jellyfish?"
    end

    get '/' do
        @articles = Article.all
        erb :index
    end
    
    get '/:id' do
      erb :show
    end

    get '/article/:id' do
      @map = Geoiq::Map.load(params[:id])
      @article = Article.get(params[:id])
      @article = Article.create(:id => params[:id]) if @article.nil?
      erb :show
    end

    post '/article/:id' do
        puts "Creating article!!! #{params.inspect}"
        @article = Article.get(params[:id])
        @article = Article.create(:id => params[:id]) if @article.nil?
        @article.text = params[:text]
        @article.save!
        puts @article.inspect
        redirect "/article/#{params[:id]}"
    end

    get '/article/:id/edit' do
      @map = Geoiq::Map.load(params[:id])
      @article = Article.get(params[:id])
      @article = Article.create(:id => params[:id])  if @article.nil?
      
      erb :edit
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
    
    helpers do
    # Embed a page partial
    # Usage: partial :foo
        def partial(page, options={})
          erb page, options.merge!(:layout => false)
        end
        
        def state_links(text)
            text.gsub(/"([\w\s\d]+)":\(([-\d,\.]+)\)/).each do |state|
                "<a href='#' onclick='F1.Article.setState({extent:[#{$2}]}); return false'>#{$1}</a>"
            end unless text.nil?
        end
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
        ws.send t
      end
    end

    ws.onclose do
      puts "WebSocket closed"
    end
  end
  
  
  App.run!({:port => 3000})
end


