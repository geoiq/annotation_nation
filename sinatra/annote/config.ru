require 'rubygems'
require 'vendor/rack/lib/rack'
require 'vendor/sinatra/lib/sinatra'
  
set :run, false
set :environment, :production
#set :views, "views"
set :inline_templates, 'annote.rb'
  
require 'annote.rb'
run Sinatra::Application

