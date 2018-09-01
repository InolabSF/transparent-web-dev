# frozen_string_literal: true

require './lib/assets/search/save_contents'
require './lib/assets/search/translate'

def google_custom_search(text, search, transcript, langcode, is_concurrent, num, contents_list)
  google_api_key = ENV['GCP_API_KEY']

  if langcode == 'en-US'
    context_id = '009975893690043505409:cv7hwnfkxqe'
  elsif langcode == 'ja-JP'
    context_id = '009975893690043505409:2b-pie5bz7s'
  else
    puts('no coresponded language')
  end

  api_url = 'www.googleapis.com'
  uri = 'https://' + api_url

  conn = Faraday::Connection.new(url: uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/customsearch/v1'

  res = conn.get do |req|
    req.url requrl
    req.headers['Content-Type'] = 'application/json'
    req.params['key'] = google_api_key
    req.params['q'] = text
    req.params['num'] = num
    req.params['cx'] = context_id
    req.params['searchType'] = 'image'
  end

  body = JSON.parse(res.body)
  puts(body)

  service = 'Google Custom Search API'
  condition = {}
  condition.store('service', service)
  condition.store('word', text)

  contents_list_local = []

  for item in body['items']
    content = {}

    title = item['title']
    desc = item['snippet']
    img_url = item['link']
    url = item['image']['contextLink']
    source = item['displayLink']

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
