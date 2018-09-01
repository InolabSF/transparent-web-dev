def analyze_text_ms(text, langcode)
  api_url = 'eastasia.api.cognitive.microsoft.com'
  uri = 'https://' + api_url

  conn = Faraday::Connection.new(url: uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/text/analytics/v2.0/keyPhrases'
  req_body = {
    documents: [{
      language: langcode,
      id:       1,
      text:     text
    }]
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

def moderate?(term)
  ms_content_moderator_key = ENV['MS_CONTENT_MODERATOR_KEY']

  api_url = 'eastasia.api.cognitive.microsoft.com'
  uri = 'https://' + api_url
  conn = Faraday::Connection.new(url: uri) do |builder|
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
  result
end
