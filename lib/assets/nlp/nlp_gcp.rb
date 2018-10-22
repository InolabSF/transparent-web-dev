def analyze_text_gcp(text, langcode)
  api_url = 'language.googleapis.com'
  uri = 'https://' + api_url

  conn = Faraday::Connection.new(url: uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/v1beta2/documents:analyzeEntities'
  req_body = {
    document: {
      language: langcode[0, 2],
      type:     'PLAIN_TEXT',
      content:  text
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
  puts('google text analytics')
  puts(body)

  sentiment = 'N/A'
  entities = body['entities']
  entities_hash = []

  for entity in entities
    ## extract only proper
    # if entity['mentions'][0]['type'] == 'PROPER'
    #   entity_hash = {}
    #   entity_hash.store('name', entity['name'])
    #   entity_hash.store('category', entity['type'])
    #   entities_hash.push(entity_hash)
    # else
    #   puts('common entity')
    #   puts(entity)
    # end

    ## extract all noun
    entity_hash = {}
    entity_hash.store('name', entity['name'])
    entity_hash.store('category', entity['type'])
    entities_hash.push(entity_hash)
  end
  return entities_hash, sentiment
end
