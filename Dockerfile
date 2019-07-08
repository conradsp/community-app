FROM ruby:2.6.3 as build-community

ENV GEM_HOME="/usr/local/bundle"
ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN npm install -g bower grunt-cli
RUN gem install bundler

RUN mkdir /community-app
WORKDIR /community-app

COPY . /community-app

RUN bower install --allow-root
RUN npm install
RUN bundle install
RUN grunt serve
