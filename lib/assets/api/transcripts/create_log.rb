require './lib/assets/nlp/nlp_handler'
require './lib/assets/search/search_handler'
require './lib/assets/platform/messenger'

def create_log(text, langcode)

  log_nlp(text, langcode)
  log_search()

end

def log_nlp(text, langcode)
  is_test_mode = false

  nlp_type_list = [ 'MS', 'GCP' ]

  for nlp_type in nlp_type_list
    entities, sentiment = nlp_handler(nlp_type, text, langcode, is_test_mode)
    result = format_log_nlp(entities, nlp_type)
    send_messenger(text)
  end
end

def format_log_nlp(entities, nlp_type)

  plain_text = 'NLP : ' + nlp_type
  plain_text += '\n'

  for entity in entities
    log = 'Entity Name : ' + entity.name  +  'Entity Type : ' + entity.category
    plain_text += log
    plain_text += '\n'

  end

  return plain_text
end

def log_search()


end

def format_log_search(related_contents)


end
