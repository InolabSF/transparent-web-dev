def nlp_handler(nlp_type, text, langcode, is_test_mode)

  if nlp_type == 'MS'
    entities, sentiment = analyze_text_ms(text, langcode)
  else
    entities, sentiment = analyze_text_ms(text, langcode)
  end

  ## 開発後回し
  for entity in entities
    puts(moderate(entity))
  end

  return entities, sentiment
end

def analyze_text_ms(text, langcode)

    apiUrl = "westus.api.cognitive.microsoft.com"
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
      :documents => [ { :language => langcode,
                        :id => 1,
                        :text => text } ]
       }

    res = conn.post do |req|
       req.url requrl
       req.headers['Content-Type'] = 'application/json'
       req.headers['Ocp-Apim-Subscription-Key'] = 'cb7538f46f864e5a988f5bd9cf1076b9'
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

def moderate(text)
  return true
end
