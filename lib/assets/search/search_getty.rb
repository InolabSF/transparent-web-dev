# frozen_string_literal: true

require './lib/assets/search/save_contents'
require './lib/assets/search/translate'

def getty_images(text, search, transcript, langcode, is_concurrent, num, contents_list)
  getty_images_key = ENV['GETTY_IMAGES_KEY']

  if langcode == 'en-US'
    puts('dont need to translate')
  elsif langcode == 'ja-JP'
    text = google_translate(langcode, 'en', text)
  else
    puts('no coresponded language')
  end

  api_url = 'api.gettyimages.com'
  uri = 'https://' + api_url

  conn = Faraday::Connection.new(url: uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/v3/search/images/creative'

  res = conn.get do |req|
    req.url requrl
    req.headers['Content-Type'] = 'application/json'
    req.headers['Api-Key'] = getty_images_key
    req.params['phrase'] = text
    req.params['page_size'] = num
    req.params['sort_order'] = 'most_popular'
    req.params['embed_content_only'] = true
  end

  body = JSON.parse(res.body)

  puts(body)

  service = 'Getty Images API'
  condition = {}
  condition.store('service', service)
  condition.store('word', text)

  contents_list_local = []

  for image in body['images']
    content = {}

    title = image['title']
    desc = image['caption']
    img_url = image['display_sizes'][0]['uri']
    url = image['display_sizes'][0]['uri']
    source = 'https://www.gettyimages.com/'

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
