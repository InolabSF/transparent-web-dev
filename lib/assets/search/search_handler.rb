def search_handler(word, search, transcript, langcode, is_concurrent, is_word_only, search_type, is_test_mode)

  # word = ''
  #
  # for entity in search.entities
  #   word += entity.name
  #   word += ' '
  # end
  #
  # for with_word in search.with_words
  #   word += with_word.text
  #   word += ' '
  # end

  if word.present?

    if is_test_mode
      contents = test_alpha(word, search, transcript, langcode, is_concurrent, search_type)
    else
      contents = production_alpha(word, search, transcript, langcode, is_concurrent, search_type)
    end

  else
    contents = []
  end

  return contents
end

def test_alpha(word, search, transcript, langcode, is_concurrent, search_type)

  if search_type == 0
    contents = image_search_amana(word, search, transcript, langcode, is_concurrent)
  elsif search_type == 1
    contents = news_search(word, search, transcript, langcode, is_concurrent)
  elsif search_type == 2
    contents = video_search(word, search, transcript, langcode, is_concurrent)
  else
    contents = image_search(word, search, transcript, langcode, is_concurrent)
  end

  return contents
end

def production_alpha(word, search, transcript, langcode, is_concurrent, search_type)

  if search_type == 0
    contents = image_search(word, search, transcript, langcode, is_concurrent)
  elsif search_type == 1
    contents = news_search(word, search, transcript, langcode, is_concurrent)
  elsif search_type == 2
    contents = video_search(word, search, transcript, langcode, is_concurrent)
  else
    contents = image_search(word, search, transcript, langcode, is_concurrent)
  end

  return contents
end

def image_search(word, search, transcript, langcode, is_concurrent)
  contents = []

  threads = []
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      ms_image_search(word, search, transcript, langcode, is_concurrent, 5, contents)
    end
  end
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      unsplash(word, search, transcript, langcode, is_concurrent, 2, contents)
    end
  end
  # threads << Thread.new do
  #   ActiveRecord::Base.connection_pool.with_connection do
  #     getty_images(word, search, transcript, langcode, is_concurrent, 2, contents)
  #   end
  # end
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      flickr(word, search, transcript, langcode, is_concurrent, 2, contents)
    end
  end

  # google_custom_search(word, search, transcript, langcode, is_concurrent, 3, contents)

  if !is_concurrent

    threads.each { |t| t.join }

  end

  # threads.each { |t| t.join }

  return contents
end

def image_search_amana(word, search, transcript, langcode, is_concurrent)
  contents = []

  threads = []
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      amana(word, search, transcript, langcode, is_concurrent, 9, contents)
    end
  end

  if !is_concurrent

    threads.each { |t| t.join }

  end

  return contents
end

def news_search(word, search, transcript, langcode, is_concurrent)
  contents = []

  threads = []
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      ms_news_search(word, search, transcript, langcode, is_concurrent, 9, contents)
    end
  end

  threads.each { |t| t.join }

  return contents
end

def video_search(word, search, transcript, langcode, is_concurrent)
  contents = []

  threads = []
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      youtube(word, search, transcript, langcode, is_concurrent, 9, contents)
    end
  end

  threads.each { |t| t.join }

  return contents
end


def ms_image_search(text, search, transcript, langcode, is_concurrent, num, contents_list)

    ms_search_key = ENV['MS_IMAGE_SEARCH_KEY']

    apiUrl = 'api.cognitive.microsoft.com'
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
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

    if is_concurrent
      save_related_contents(transcript, search, contents_list_local)
    end
end

def amana(text, search, transcript, langcode, is_concurrent, num, contents_list)

  begin

    amana_key = ENV['AMANA_KEY']

    apiUrl = 'api02.amanaimages.com'
    uri = "http://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
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

    if is_concurrent
      save_related_contents(transcript, search, contents_list_local)
    end

  rescue => error
    puts error
  end

end

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
       req.params['client_id'] = unsplash_key
       req.params['query'] = text
       req.params['per_page'] = num
    end

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
      # title = 'Photo by <a href="' + result['user']['links']['html'] +'?utm_source=Transparent&utm_medium=referral">'+ result['user']['name'] +'</a> on <a href="https://unsplash.com/?utm_source=Transparent&utm_medium=referral">Unsplash</a>'

      desc = 'Tags : '
      for tag in result['photo_tags']
        desc += tag['title'] + ', '
      end

      img_url = result['urls']['regular']
      url = result['user']['links']['html'] +'?utm_source=Transparent&utm_medium=referral'
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

    if is_concurrent
      save_related_contents(transcript, search, contents_list_local)
    end

  rescue => error
    puts error
  end

end

def getty_images(text, search, transcript, langcode, is_concurrent, num, contents_list)

    getty_images_key = ENV['GETTY_IMAGES_KEY']

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

    if is_concurrent
      save_related_contents(transcript, search, contents_list_local)
    end

end

def flickr(text, search, transcript, langcode, is_concurrent, num, contents_list)

    flickr_key = ENV['FLICKR_KEY']

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

    contents_list_local = []

    for photo in body['photos']['photo']
      content = {}

      title = photo['title']
      desc = 'The result by Flickr with " ' + text + '"'

      img_url = 'https://farm' + photo['farm'].to_s + '.staticflickr.com/' + photo['server'] + '/' + photo['id'] + '_' + photo['secret'] + '.jpg'
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

    if is_concurrent
      save_related_contents(transcript, search, contents_list_local)
    end

end

def google_custom_search(text, search, transcript, langcode, is_concurrent, num, contents_list)

    google_api_key = ENV['GCP_API_KEY']

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

    if is_concurrent
      save_related_contents(transcript, search, contents_list_local)
    end

end

def ms_news_search(text, search, transcript, langcode, is_concurrent, num, contents_list)

    ms_search_key = ENV['MS_NEWS_SEARCH_KEY']

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

      # try catch 構文にかえたい
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

    if is_concurrent
      save_related_contents(transcript, search, contents_list_local)
    end

end

def youtube(text, search, transcript, langcode, is_concurrent, num, contents_list)

    google_api_key = ENV['GCP_API_KEY']

    apiUrl = 'www.googleapis.com'
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
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

    if is_concurrent
      save_related_contents(transcript, search, contents_list_local)
    end

end

def google_translate(langcode, targetcode, text)

    google_api_key = ENV['GCP_API_KEY']

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

def save_related_contents(transcript, search, contents)

    puts('save contents')

    for content in contents
      transcript.has_content = true
      related_content = search.related_contents.build(:transcript => transcript, :title => content['title'], :desc => content['desc'], :url => content['url'], :img_url => content['img_url'], :content_type => content['content_type'], :source => content['source'], :is_visible => true)
      # related_content = RelatedContent.new(:transcript => transcript, :search => search, :title => content['title'], :desc => content['desc'], :url => content['url'], :img_url => content['img_url'], :content_type => content['content_type'], :source => content['source'], :is_visible => true)
      condition = related_content.build_condition(:service => content['condition']['service'], :word => content['condition']['word'])
    end
    transcript.save

end
