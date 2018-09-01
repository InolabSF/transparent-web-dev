# frozen_string_literal: true

def google_translate(langcode, targetcode, text)
  google_api_key = ENV['GCP_API_KEY']

  if langcode == 'en-US'
    langcode = 'en'
  elsif langcode == 'ja-JP'
    langcode = 'ja'
  end

  api_url = 'translation.googleapis.com'
  uri = 'https://' + api_url

  conn = Faraday::Connection.new(url: uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  requrl = '/language/translate/v2?key=' + google_api_key
  req_body = {
    q:      text,
    source: langcode,
    target: targetcode,
    format: 'text'
  }

  res = conn.post do |req|
    req.url requrl
    req.headers['Content-Type'] = 'application/json'
    req.body = req_body.to_json
  end
  body = JSON.parse(res.body)
  puts(body)
  result = body['data']['translations'][0]['translatedText']
  result
end
