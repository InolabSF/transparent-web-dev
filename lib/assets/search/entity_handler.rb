def entity_handler(entity, langcode, is_word_only, is_image_search, is_test_mode)

  if is_test_mode
    contents = test_alpha(entity, langcode)
  else
    contents = demo_alpha(entity, langcode)
  end

  return contents
end


def test_alpha(entity, langcode)
  contents = []

  unsplash(entity['name'], langcode, 3, contents)
  getty_images(entity['name'], langcode, 3, contents)
  flickr(entity['name'], langcode, 3, contents)
  # google_custom_search(entity['name'], langcode, 3, contents)

  return contents
end

def production_alpha(entity, langcode)
  contents = []

  ms_bing_search(entity['name'], langcode, 2, contents)
  unsplash(entity['name'], langcode, 3, contents)
  getty_images(entity['name'], langcode, 3, contents)
  flickr(entity['name'], langcode, 2, contents)

  return contents
end

def ms_bing_search(text, langcode, num, contents_list)

    ms_search_key = '3ae4873e178642819682634164b61aed'

    apiUrl = 'api.cognitive.microsoft.com'
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
     ## URLをエンコードする
      builder.use Faraday::Request::UrlEncoded
     ## ログを標準出力に出したい時(本番はコメントアウトでいいかも)
      builder.use Faraday::Response::Logger
     ## アダプター選択（選択肢は他にもあり）
      builder.use Faraday::Adapter::NetHttp

    end

    requrl = '/bing/v7.0/images/search'

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

    service = 'MS Bing Image Search API'
    condition = {}
    condition.store('service', service)
    condition.store('word', text)

    # if body.has_key?(:value)
    for value in body['value']
      content = {}

      title = value['name']
      img_url = value['contentUrl']
      url = value['hostPageUrl']
      source = value['hostPageDisplayUrl']

      content.store('title', title)
      content.store('desc', url)
      content.store('url', url)
      content.store('img_url', img_url)
      content.store('content_type', 'image')
      content.store('source', source)
      content.store('condition', condition)

      contents_list.push(content)

    end
    # else
    #   puts(body.keys)
    # end

    # puts('in ms function')
    # puts(contents_list)
end

def unsplash(text, langcode, num, contents_list)

  begin

    unsplash_key = '255fd8ded83ae33ec37e217af159f6bd64d23e55efe52a84ce4d66c1c8f887c7'

    if langcode == 'en-US'
          puts('dont need to translate')
    elsif langcode == 'ja-JP'
          text = google_translate(langcode, 'en', text)
    else
          puts('no coresponded language')
    end

    apiUrl = 'api.unsplash.com'
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
      builder.use Faraday::Request::UrlEncoded
      builder.use Faraday::Response::Logger
      builder.use Faraday::Adapter::NetHttp
    end

    requrl = '/search/photos'

    res = conn.get do |req|
       req.url requrl
       req.headers['Content-Type'] = 'application/json'
       req.headers['client_id'] = unsplash_key
       req.params['query'] = text
       req.params['per_page'] = num
    end

    body = JSON.parse(res.body)
    puts(body)

    service = 'Unsplash API'
    condition = {}
    condition.store('service', service)
    condition.store('word', text)

    for result in body['results']
      content = {}

      title = 'Photo by ' + result['user']['name'] + ' / Unsplash'
      # title = 'Photo by <a href="' + result['user']['links']['html'] +'?utm_source=Transparent&utm_medium=referral">'+ result['user']['name'] +'</a> on <a href="https://unsplash.com/?utm_source=Transparent&utm_medium=referral">Unsplash</a>'

      desc = 'Tags : '
      for tag in result['photo_tags']
        desc += tag['title'] + ', '
      end

      img_url = result['urls']['thumb']
      url = result['user']['links']['html'] +'?utm_source=Transparent&utm_medium=referral'
      source = 'https://unsplash.com/'

      content.store('title', title)
      content.store('desc', desc)
      content.store('url', url)
      content.store('img_url', img_url)
      content.store('content_type', 'image')
      content.store('source', source)
      content.store('condition', condition)

      contents_list.push(content)

    end

  rescue => error
    puts error
  end

end

def getty_images(text, langcode, num, contents_list)

    getty_images_key = 'ugsgaqp6masnxjc4mhhwwnus'
    if langcode == 'en-US'
          puts('dont need to translate')

    elsif langcode == 'ja-JP'
          text = google_translate(langcode, 'en', text)
    else
          puts('no coresponded language')
    end

    apiUrl = 'api.gettyimages.com'
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
     ## URLをエンコードする
      builder.use Faraday::Request::UrlEncoded
     ## ログを標準出力に出したい時(本番はコメントアウトでいいかも)
      builder.use Faraday::Response::Logger
     ## アダプター選択（選択肢は他にもあり）
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
      content.store('content_type', 'image')
      content.store('source', source)
      content.store('condition', condition)

      contents_list.push(content)

    end

end

def flickr(text, langcode, num, contents_list)

    flickr_key = '3a1beefbe8e8644ebc097d166d5eab49'

    apiUrl = 'api.flickr.com'
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
     ## URLをエンコードする
      builder.use Faraday::Request::UrlEncoded
     ## ログを標準出力に出したい時(本番はコメントアウトでいいかも)
      builder.use Faraday::Response::Logger
     ## アダプター選択（選択肢は他にもあり）
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

    for photo in body['photos']['photo']
      content = {}

      title = photo['title']
      desc = 'By Flickr'

      img_url = 'https://farm' + photo['farm'].to_s + '.staticflickr.com/' + photo['server'] + '/' + photo['id'] + '_' + photo['secret'] + '.jpg'
      url = img_url
      source = 'https://www.flickr.com/'

      content.store('title', title)
      content.store('desc', desc)
      content.store('url', url)
      content.store('img_url', img_url)
      content.store('content_type', 'image')
      content.store('source', source)
      content.store('condition', condition)

      contents_list.push(content)

    end

end

def google_custom_search(text, langcode, num, contents_list)

    google_api_key = 'AIzaSyDQVzBPCDbkf7sMECj8viRCZ7DnGVrJeT0'

    if langcode == 'en-US'
          contextID = '009975893690043505409:cv7hwnfkxqe'

    elsif langcode == 'ja-JP'
          contextID = '009975893690043505409:2b-pie5bz7s'

    else
          puts('no coresponded language')
    end

    apiUrl = 'www.googleapis.com'
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
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
       req.params['cx'] = contextID
       req.params['searchType'] = 'image'
    end

    body = JSON.parse(res.body)

    puts(body)

    service = 'Google Custom Search API'
    condition = {}
    condition.store('service', service)
    condition.store('word', text)

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
      content.store('content_type', 'image')
      content.store('source', source)
      content.store('condition', condition)

      contents_list.push(content)

    end

end


def google_translate(langcode, targetcode, text)

    google_api_key = 'AIzaSyDQVzBPCDbkf7sMECj8viRCZ7DnGVrJeT0'

    if langcode == 'en-US'
          langcode = 'en'
    elsif langcode == 'ja-JP'
          langcode = 'ja'
    end

    apiUrl = 'translation.googleapis.com'
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
     ## URLをエンコードする
      builder.use Faraday::Request::UrlEncoded
     ## ログを標準出力に出したい時(本番はコメントアウトでいいかも)
      builder.use Faraday::Response::Logger
     ## アダプター選択（選択肢は他にもあり）
      builder.use Faraday::Adapter::NetHttp

    end

    requrl = '/language/translate/v2?key=' + google_api_key
    req_body = {
                  'q': text,
                  'source': langcode,
                  'target': targetcode,
                  'format': 'text'
                }

    res = conn.post do |req|
       req.url requrl
       req.headers['Content-Type'] = 'application/json'
       req.body = req_body.to_json
    end

    body = JSON.parse(res.body)
    puts(body)

    result = body['data']['translations'][0]['translatedText']
    return result

end
