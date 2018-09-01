# frozen_string_literal: true

require './lib/assets/search/save_contents'
require './lib/assets/search/translate'

def youtube(text, search, transcript, langcode, is_concurrent, num, contents_list)
  google_api_key = ENV['GCP_API_KEY']

  api_url = 'www.googleapis.com'
  uri = 'https://' + api_url

  conn = Faraday::Connection.new(url: uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/youtube/v3/search'

  res = conn.get do |req|
    req.url requrl
    req.headers['Content-Type'] = 'application/json'
    req.params['key'] = google_api_key
    req.params['q'] = text
    req.params['maxResults'] = num
    req.params['type'] = 'video'
    req.params['part'] = 'snippet'
  end

  body = JSON.parse(res.body)
  puts(body)

  service = 'YouTube Data API'
  condition = {}
  condition.store('service', service)
  condition.store('word', text)

  contents_list_local = []

  for item in body['items']
    content = {}

    title = item['snippet']['title']
    desc = item['snippet']['description']
    img_url = item['snippet']['thumbnails']['medium']['url']
    url = 'https://www.youtube.com/watch?v=' + item['id']['videoId']
    source = 'www.youtube.com'

    content.store('title', title)
    content.store('desc', desc)
    content.store('url', url)
    content.store('img_url', img_url)
    # content.store('content_type', 'Video')
    content.store('content_type', 'webpage')
    content.store('source', source)
    content.store('condition', condition)

    contents_list.push(content)
    contents_list_local.push(content)

  end

  save_related_contents(transcript, search, contents_list_local) if is_concurrent
end
