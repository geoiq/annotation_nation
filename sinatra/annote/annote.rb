require 'rubygems'
require 'vendor/rack/lib/rack'
require 'vendor/sinatra/lib/sinatra'
require 'erb'
require 'geoiq-gem'
require 'json'
enable :inline_templates

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




__END__

@@ layout
<html><head><title>a title</title>
<style>body{font-family: Arial, Helvetica, sans-serif;}</style>
</head><body>
<h1>header</h1>
<%= yield %>
<hr />
<p>footer</p>
</body></html>

@@ index
<h2>Useage</h2>
<p>
comments/{dataset_id}.json
<br />
with parameters  comments/{dataset_id}.json?limit=20
</p>


