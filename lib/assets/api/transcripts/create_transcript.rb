require './lib/assets/nlp/nlp_handler'
require './lib/assets/search/search_handler'

def create_transcript(api_req, default_nlp, is_test_mode, is_word_only, is_concurrent, multiple_search)

  if api_req[:search_type]
    search_type = api_req[:search_type]
  else
    search_type = 1
  end

  if search_type == 1
    search_mode = 'image'
  elsif search_type == 2
    search_mode = 'news'
  elsif search_type == 3
    search_mode = 'video'
  else
    search_mode = 'image'
  end

  if api_req[:UI_version]
    if api_req[:UI_version] == 'demo'
      is_concurrent = false
    end
  end

  text = api_req[:transcript]
  user_id = User.find_by(facebook_id: api_req[:FacebookID]).id
  wall_id = api_req[:wallID]
  langcode = api_req[:langcode]
  with_words = api_req[:with_words]

  entities_list, sentiment = nlp_handler(default_nlp, text, langcode, is_test_mode)

  transcript = Transcript.new(:text => text, :wall_id => wall_id, :user_id => user_id, :has_content => false, :is_visible => true, :langcode => langcode, :sentiment => sentiment)
  entities_list.each {|entity_hash| entity = transcript.entities.build(:category => entity_hash['category'], :name => entity_hash['name']) }

  for word in with_words
    if word.present?
      with_word = transcript.with_words.build(:text => word)
    end
  end

  if entities_list.length == 0
    puts('no entities')
  else

    word_list = []

    if multiple_search

      search = transcript.searches.new(:mode => search_mode, :is_visible => true)

      word = ''

      for entity in transcript.entities
        entity_search = search.entity_searches.build(:entity => entity)

        word += entity.name
        word += ' '
      end

      for with_word in transcript.with_words
        with_word_search = search.with_word_searches.build(:with_word => with_word)

        word += with_word.text
        word += ' '
      end

      word_list.push(word)

    else

      for entity in transcript.entities

        search = transcript.searches.new(:mode => search_mode, :is_visible => true)

        word = ''

        entity_search = search.entity_searches.build(:entity => entity)

        word += entity.name
        word += ' '

        for with_word in transcript.with_words
          with_word_search = search.with_word_searches.build(:with_word => with_word)

          word += with_word.text
          word += ' '
        end

        word_list.push(word)

      end

    end

    transcript.save if is_concurrent

    transcript.searches.length.times do |i|

      search = transcript.searches[i]

      puts('search.entities')
      puts(search.entities)

      if same_search?(search, entities_list, with_words, 15)
        search.is_visible = false
      else

        word = word_list[i]
        contents_list = search_handler(word, search, transcript, langcode, is_concurrent, is_word_only, search_type, is_test_mode)

        if !is_concurrent

          if contents_list.length == 0
            puts('no contents')
          else
            transcript.has_content = true
            for content in contents_list
              related_content = search.related_contents.build(:transcript => transcript, :title => content['title'], :desc => content['desc'], :url => content['url'], :img_url => content['img_url'], :content_type => content['content_type'], :source => content['source'], :is_visible => true)
              condition = related_content.build_condition(:service => content['condition']['service'], :word => content['condition']['word'])
            end
          end
        end

      end

    end
  end

  transcript.save

  return transcript

end

def same_search?(search, entities, with_words, num)

  current_words = []
  entities.each {|entity| current_words.push(entity['name']) }
  with_words.each {|with_word| current_words.push(with_word) }
  # entities.each {|entity| current_words.push(entity.name) }
  # with_words.each {|with_word| current_words.push(with_word.text) }

  puts('current_words')
  puts(current_words)

  past_searches = Search.joins(:transcript).where("transcripts.wall_id" => search.transcript.wall_id).order('id DESC')[0...num]

  for past_search in past_searches

    next if search.id == past_search.id

    result = true

    past_words = []
    past_search.entities.each {|entity| past_words.push(entity.name) }
    past_search.with_words.each {|with_word| past_words.push(with_word.text) }

    puts('past_words')
    puts(past_words)

    for current_word in current_words
      if !past_words.include?(current_word)
        result = false
        break
      end
    end

    break if result

  end

  puts(result)

  return result

end
