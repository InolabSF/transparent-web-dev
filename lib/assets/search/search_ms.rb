# frozen_string_literal: true

require './lib/assets/search/save_contents'
require './lib/assets/search/translate'

def ms_image_search(text, search, transcript, langcode, is_concurrent, num, contents_list)
  ms_search_key = ENV['MS_IMAGE_SEARCH_KEY']

  api_url = 'api.cognitive.microsoft.com'
  uri = 'https://' + api_url

  conn = Faraday::Connection.new(url: uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/bing/v7.0/images/search'

  res = conn.get do |req|
    req.url requrl
    req.headers['Content-Type'] = 'application/json'
    req.headers['Ocp-Apim-Subscription-Key'] = ms_search_key
    req.headers['Accept-Language'] = langcode[0, 2]
    req.params['q'] = text
    req.params['count'] = num
    req.params['cc'] = langcode
    req.params['license'] = 'All'
    req.params['safeSearch'] = 'Strict'
  end

  body = JSON.parse(res.body)

  puts(body)

  service = 'MS Bing Image Search API'
  condition = {}
  condition.store('service', service)
  condition.store('word', text)

  contents_list_local = []

  if body['value']
    for value in body['value']
      content = {}

      title = value['name']
      desc = 'The result by MS Bing Search Image with " ' + text + '"'
      img_url = value['thumbnailUrl']
      # img_url = value['contentUrl']
      url = value['hostPageUrl']
      source = value['hostPageDisplayUrl']

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
  else
    puts(body.keys)
  end
  save_related_contents(transcript, search, contents_list_local) if is_concurrent
end

def ms_news_search(text, search, transcript, langcode, is_concurrent, num, contents_list)
  ms_search_key = ENV['MS_NEWS_SEARCH_KEY']
  api_url = 'api.cognitive.microsoft.com'
  uri = 'https://' + api_url

  conn = Faraday::Connection.new(url: uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/bing/v7.0/news/search'

  res = conn.get do |req|
    req.url requrl
    req.headers['Content-Type'] = 'application/json'
    req.headers['Ocp-Apim-Subscription-Key'] = ms_search_key
    req.params['q'] = text
    req.params['count'] = num
    req.params['mkt'] = langcode
    req.params['license'] = 'All'
    req.params['safeSearch'] = 'Strict'
  end

  body = JSON.parse(res.body)
  puts(body)

  service = 'MS Bing News Search API'
  condition = {}
  condition.store('service', service)
  condition.store('word', text)

  contents_list_local = []

  # if body.has_key?(:value)

  for value in body['value']
    # need to refact as try catch syntax
    if value['image']
      content = {}

      title = value['name']
      desc = value['description']
      img_url = value['image']['thumbnail']['contentUrl']
      url = value['url']
      # source = value['hostPageDisplayUrl']
      source = url

      content.store('title', title)
      content.store('desc', desc)
      content.store('url', url)
      content.store('img_url', img_url)
      content.store('content_type', 'webpage')
      content.store('source', source)
      content.store('condition', condition)

      contents_list.push(content)
      contents_list_local.push(content)
    else
      puts('no image news')
    end

  end
  save_related_contents(transcript, search, contents_list_local) if is_concurrent
end
