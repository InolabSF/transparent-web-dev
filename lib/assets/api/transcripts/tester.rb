require './lib/assets/nlp/nlp_handler'
require './lib/assets/search/search_handler'
# require './lib/assets/platform/messenger'

def create_log(text, langcode)

  results = test_nlp(text, langcode)
  test_search()

end

def test_nlp(text, langcode)

  nlp_type_list = [ 'MS', 'GCP' ]
  results = []

  for nlp_type in nlp_type_list
    entities, sentiment = send_nlp_api(nlp_type, text, langcode)
    result = format_log_nlp(entities, nlp_type)
    results.push(result)
  end

  return results
end

def send_nlp_api(nlp_type, text, langcode)

  if nlp_type == 'MS'
    entities, sentiment = analyze_text_ms(text, langcode)
  elsif nlp_type == 'GCP'
    entities, sentiment = analyze_text_gcp(text, langcode)
  else
    entities, sentiment = analyze_text_ms(text, langcode)
  end

  return entities, sentiment
end

def format_log_nlp(entities, nlp_type)

  json = {}
  json.store('nlp_type', nlp_type)
  json.store('entities', entities)

  plain_text = 'NLP : ' + nlp_type
  plain_text += '\n'


  for entity in entities
    if entity['category']
      log = 'Entity Name : ' + entity['name']  +  'Entity Type : ' + entity['category']
    elsif
      log = 'Entity Name : ' + entity['name']  +  'Entity Type : '
    end
    plain_text += log
    plain_text += '\n'
  end

  result = {}
  result.store('plain_text', plain_text)
  result.store('json', json)

  return result
end

def log_search()


end

def format_log_search(related_contents)


end
