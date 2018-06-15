def nlp_handler(nlp_type, text, langcode, is_test_mode)

  if nlp_type == 'MS'
    entities, sentiment = analyze_text_ms(text, langcode)
  elsif nlp_type == 'GCP'
    entities, sentiment = analyze_text_gcp(text, langcode)
  else
    entities, sentiment = analyze_text_ms(text, langcode)
  end

  entities_list = []

  for entity in entities
    if NoGoodWord.exists?(word: entity['name'])
      puts('No Good Entity')
      puts(entity['name'])
    elsif !is_moderate?(entity['name'])
      puts('profane terms')
      puts(entity['name'])
    else
      entities_list.push(entity)
    end
  end

  return entities_list, sentiment
end

def analyze_text_ms(text, langcode)

    apiUrl = "eastasia.api.cognitive.microsoft.com"
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
     ## URLをエンコードする
      builder.use Faraday::Request::UrlEncoded
     ## ログを標準出力に出したい時(本番はコメントアウトでいいかも)
      builder.use Faraday::Response::Logger
     ## アダプター選択（選択肢は他にもあり）
      builder.use Faraday::Adapter::NetHttp

    end

    requrl = "/text/analytics/v2.0/keyPhrases"

    req_body = {
      :documents => [
        {
          :language => langcode,
          :id => 1,
          :text => text
        }
      ]
    }

    res = conn.post do |req|
      req.url requrl
      req.headers['Content-Type'] = 'application/json'
      req.headers['Ocp-Apim-Subscription-Key'] = ENV['MS_TEXT_KEY']
      req.body = req_body.to_json
    end

    body = JSON.parse(res.body)
    # entry.content = body["responses"][0]["textAnnotations"][0]["description"]

    puts(body)

    sentiment = 'N/A'

    entities = body['documents'][0]['keyPhrases']

    entities_hash = []

    for entity in entities
      entity_hash = {}
      entity_hash.store('name', entity)
      entity_hash.store('category', nil)
      entities_hash.push(entity_hash)
    end

    return entities_hash, sentiment

end

def analyze_text_gcp(text, langcode)

    apiUrl = "language.googleapis.com"
    uri = "https://" + apiUrl

    conn = Faraday::Connection.new(:url => uri) do |builder|
     ## URLをエンコードする
      builder.use Faraday::Request::UrlEncoded
     ## ログを標準出力に出したい時(本番はコメントアウトでいいかも)
      builder.use Faraday::Response::Logger
     ## アダプター選択（選択肢は他にもあり）
      builder.use Faraday::Adapter::NetHttp

    end

    requrl = "/v1beta2/documents:analyzeEntities"

    req_body = {
      :document => {
        :language => langcode[0, 2],
        :type => "PLAIN_TEXT",
        :content => text
      }
    }

    res = conn.post do |req|
      req.url requrl
      req.headers['Content-Type'] = 'application/json'
      req.params['key'] = ENV['GCP_API_KEY']
      req.body = req_body.to_json
    end

    body = JSON.parse(res.body)
    # entry.content = body["responses"][0]["textAnnotations"][0]["description"]

    puts(body)

    sentiment = 'N/A'

    entities = body['entities']

    entities_hash = []

    # extract only proper
    for entity in entities
      if entity['mentions'][0]['type'] == 'PROPER'
        entity_hash = {}
        entity_hash.store('name', entity['name'])
        entity_hash.store('category', entity['type'])
        entities_hash.push(entity_hash)
      else
        puts('common entity')
        puts(entity)
      end
    end

    return entities_hash, sentiment

end

def is_moderate?(term)
  ms_content_moderator_key = ENV['MS_CONTENT_MODERATOR_KEY']

  apiUrl = 'eastasia.api.cognitive.microsoft.com'
  uri = "https://" + apiUrl
  conn = Faraday::Connection.new(:url => uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/contentmoderator/moderate/v1.0/ProcessText/Screen'
  res = conn.post do |req|
     req.url requrl
     req.headers['Content-Type'] = 'text/plain'
     req.headers['Ocp-Apim-Subscription-Key'] = ms_content_moderator_key
     req.body = term
  end

  body = JSON.parse(res.body)
  puts(body)
  result = body['Terms'].blank?
  return result
end
