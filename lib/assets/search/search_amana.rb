# frozen_string_literal: true

require './lib/assets/search/save_contents'
require './lib/assets/search/translate'

def amana(text, search, transcript, langcode, is_concurrent, num, contents_list)
  begin
    amana_key = ENV['AMANA_KEY']
    api_url = 'api02.amanaimages.com'
    uri = 'https://' + api_url

    conn = Faraday::Connection.new(url: uri) do |builder|
      builder.use Faraday::Request::UrlEncoded
      builder.use Faraday::Response::Logger
      builder.use Faraday::Adapter::NetHttp
    end

    requrl = '/api/trnspt/searchImage'

    res = conn.get do |req|
      req.url requrl
      req.headers['Content-Type'] = 'application/json'
      req.params['code'] = amana_key
      req.params['keyword'] = text
      req.params['limit'] = num
    end

    body = JSON.parse(res.body)
    puts(body)

    service = 'Amanaimages API'
    condition = {}
    condition.store('service', service)
    condition.store('word', text)

    contents_list_local = []

    for item in body['items']
      content = {}

      title = item['title']
      desc = item['author']

      img_url = item['previewUrl']
      url = img_url
      source = 'amanaimages.com'

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
  rescue => error
    puts error
  end
end
