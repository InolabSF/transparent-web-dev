def index_search_firestore(wall_id, search, words)

  # words = []
  # search.entities.each {|entity| words.push(entity.name) }
  # search.with_words.each {|with_word| words.push(with_word.text) }

  id = search.id
  path = '/(default)/documents/searches/'

  walls = [wall_id.to_s]
  search_object = {
    fields: {
      walls: { mapValue: get_map_value_from_array(walls) }, # firestoreのカスタムインデックスが作成できないため現状では使用していない
      wall_id: { stringValue: wall_id.to_s },
      user_id: { nullValue: nil },
      transcript_id: { stringValue: search.transcript_id.to_s },
      words: { mapValue: get_map_value_from_array(words) },
      words_array: { arrayValue: get_array_value(words) },
      is_visible: { booleanValue: search.is_visible },
      is_archived: { booleanValue: search.is_archived },
      mode: { stringValue: search.mode },
      created_at: { timestampValue: search.created_at },
      updated_at: { timestampValue: search.updated_at }
    }
  }

  apiUrl = 'firestore.googleapis.com'
  uri = "https://" + apiUrl

  conn = Faraday::Connection.new(:url => uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  google_api_key = ENV['GCP_API_KEY']
  requrl = '/v1beta1/projects/transparent-sxsw/databases' + path + '?documentId=' + id.to_s + '&key=' + google_api_key

  res = conn.post do |req|
     req.url requrl
     req.headers['Content-Type'] = 'application/json'
     req.body = search_object.to_json
  end
  # body = JSON.parse(res.body)
end

def index_content_firestore(wall_id, content)
  id = content.id
  path = '/(default)/documents/contents/'

  walls = [wall_id.to_s]
  req_object = {
    fields: {
      walls:         { mapValue: get_map_value_from_array(walls) }, # firestoreのカスタムインデックスが作成できないため現状では使用していない
      wall_id:       { stringValue: wall_id.to_s },
      user_id:       { nullValue: nil },
      transcript_id: { stringValue: content.transcript_id.to_s },
      search_id:     { stringValue: content.search_id.to_s },
      title:         { stringValue: content.title },
      desc:          { stringValue: content.desc },
      url:           { stringValue: content.url },
      img_url:       { stringValue: content.img_url },
      content_type:  { stringValue: content.content_type },
      source:        { stringValue: content.source },
      viewed:        { mapValue: get_map_value_from_array([]) },
      opened:        { mapValue: get_map_value_from_array([]) },
      awesome:       { mapValue: get_map_value_from_array([]) },
      is_visible:    { booleanValue: content.is_visible },
      is_archived:   { booleanValue: content.is_archived },
      created_at:    { timestampValue: content.created_at },
      updated_at:    { timestampValue: content.updated_at }
    }
  }

  apiUrl = 'firestore.googleapis.com'
  uri = "https://" + apiUrl

  conn = Faraday::Connection.new(:url => uri) do |builder|
    builder.use Faraday::Request::UrlEncoded
    builder.use Faraday::Response::Logger
    builder.use Faraday::Adapter::NetHttp
  end

  google_api_key = ENV['GCP_API_KEY']
  requrl = '/v1beta1/projects/transparent-sxsw/databases' + path + '?documentId=' + id.to_s + '&key=' + google_api_key

  res = conn.post do |req|
     req.url requrl
     req.headers['Content-Type'] = 'application/json'
     req.body = req_object.to_json
  end
  # body = JSON.parse(res.body)
end

def get_array_value(array)
  values = []
  array.each { |prop| values.push({ stringValue: prop })}
  array_value = {
    values: values
  }
  return array_value
end

def get_map_value_from_array(array)
  fields = {}
  array.each { |prop| fields.store(prop, { booleanValue: true })}
  map_value = {
    fields: fields
  }
  return map_value
end
