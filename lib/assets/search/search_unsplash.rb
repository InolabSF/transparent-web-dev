# frozen_string_literal: true

require './lib/assets/search/save_contents'
require './lib/assets/search/translate'

def unsplash(text, search, transcript, langcode, is_concurrent, num, contents_list)
  begin
    unsplash_key = ENV['UNSPLASH_KEY']

    if langcode == 'en-US'
      puts('dont need to translate')
    elsif langcode == 'ja-JP'
      text = google_translate(langcode, 'en', text)
    else
      puts('no coresponded language')
    end

    puts('test unsplash translated')

    api_url = 'api.unsplash.com'
    uri = 'https://' + api_url

    conn = Faraday::Connection.new(url: uri) do |builder|
      builder.use Faraday::Request::UrlEncoded
      builder.use Faraday::Response::Logger
      builder.use Faraday::Adapter::NetHttp
    end

    requrl = '/search/photos'

    res = conn.get do |req|
      req.url requrl
      req.headers['Content-Type'] = 'application/json'
      req.params['client_id'] = unsplash_key
      req.params['query'] = text
      req.params['per_page'] = num
    end

    puts('test unsplash sended')

    body = JSON.parse(res.body)
    puts(body)

    service = 'Unsplash API'
    condition = {}
    condition.store('service', service)
    condition.store('word', text)

    contents_list_local = []

    for result in body['results']
      content = {}

      title = 'Photo by ' + result['user']['name'] + ' / Unsplash'
      # title = 'Photo by <a href="' + result['user']['links']['html']
      #   +'?utm_source=Transparent&utm_medium=referral">'
      #   + result['user']['name']
      #   + '</a> on <a href="https://unsplash.com/?utm_source=Transparent&utm_medium=referral">Unsplash</a>'

      desc = 'Tags : '
      result['photo_tags'].each { |tag| desc += tag['title'] + ', ' }

      img_url = result['urls']['regular']
      url = result['user']['links']['html'] + '?utm_source=Transparent&utm_medium=referral'
      source = 'unsplash.com'

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
