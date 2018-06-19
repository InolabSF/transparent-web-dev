require './lib/assets/nlp/nlp_handler'
require './lib/assets/search/search_handler'
# require './lib/assets/platform/messenger'

def create_log(text, langcode)

  results = test_nlp(text, langcode)
  test_search()

end

def test_nlp(text, langcode)
  is_test_mode = false

  nlp_type_list = [ 'MS', 'GCP' ]
  results = []

  for nlp_type in nlp_type_list
    entities, sentiment = nlp_handler(nlp_type, text, langcode, is_test_mode)
    result = format_log_nlp(entities, nlp_type)
    results.push(result)
  end

  return results
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
