# frozen_string_literal: true

require './lib/assets/nlp/nlp_ms'
require './lib/assets/nlp/nlp_gcp'

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
    elsif !moderate?(entity['name'])
      puts('profane terms')
      puts(entity['name'])
    else
      entities_list.push(entity)
    end
  end
  return entities_list, sentiment
end
