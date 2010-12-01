require 'rubygems'
require 'vendor/rack/lib/rack'
require 'vendor/sinatra/lib/sinatra'
require 'erb'
require 'geoiq-gem'
enable :inline_templates

get '/hi' do
  "Hello World!"
end

get '/' do
  erb :index
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
<h2>Index</h2>
<p>
</p>


