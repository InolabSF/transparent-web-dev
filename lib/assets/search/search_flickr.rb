# frozen_string_literal: true

require './lib/assets/search/save_contents'
require './lib/assets/search/translate'

def flickr(text, search, transcript, langcode, is_concurrent, num, contents_list)
  flickr_key = ENV['FLICKR_KEY']

  api_url = 'api.flickr.com'
  uri = 'https://' + api_url

  conn = Faraday::Connection.new(url: uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/services/rest/'

  res = conn.get do |req|
    req.url requrl
    req.headers['Content-Type'] = 'application/json'
    req.params['method'] = 'flickr.photos.search'
    req.params['api_key'] = flickr_key
    req.params['text'] = text
    req.params['per_page'] = num
    req.params['content_type'] = 1
    req.params['privacy_filter'] = 1
    req.params['sort'] = 'relevance'
    req.params['safe_search'] = 1
    req.params['format'] = 'json'
    req.params['nojsoncallback'] = 1
  end

  body = JSON.parse(res.body)
  puts(body)

  service = 'Flickr API'
  condition = {}
  condition.store('service', service)
  condition.store('word', text)

  contents_list_local = []

  for photo in body['photos']['photo']
    content = {}

    title = photo['title']
    desc = 'The result by Flickr with " ' + text + '"'

    img_url = 'https://farm'\
      + photo['farm'].to_s\
      + '.staticflickr.com/'\
      + photo['server']\
      + '/' + photo['id'] + '_' + photo['secret'] + '.jpg'

    url = img_url
    source = 'www.flickr.com'

    content.store('title', title)
    content.store('desc', desc)
    content.store('url', url)
    content.store('img_url', img_url)
    # content.store('content_type', 'Image')
    content.store('content_type', 'webpage')
    content.store('source', source)
    content.store('condition', condition)

    contents_list.push(content)
    contents_list_local.push(content)

  end
  save_related_contents(transcript, search, contents_list_local) if is_concurrent
end
