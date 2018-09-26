def get_initial_searches(wall_id, num)
  searches = Search.joins(:transcript)
              .where('transcripts.wall_id' => wall_id, 'searches.is_visible' => true)
              .order('id DESC')[0...num]

  search_list = []
  for search in searches.reverse
    words = []
    search.entities.each { |entity| words.push(entity.name) }
    search.with_words.each { |with_word| words.push(with_word.text) }

    search_hash = search.attributes
    search_hash.store('words', words)
    search_list.unshift(search_hash)

  end

  if searches.present?
    search_last_index = searches.first.id
    search_first_index = searches.last.id

    query_search_index = search_first_index - 1
    related_contents = RelatedContent.joins(:transcript)
                        .where('transcripts.wall_id' => wall_id, 'related_contents.is_visible' => true)
                        .joins(:search)
                        .where('searches.id > ?', query_search_index)
                        .order('id DESC')

    related_content_last_index = related_contents.first.id if related_contents.present?

  else
    search_last_index = 0
    search_first_index = 0
    related_content_last_index = 0
  end

  return search_list, search_last_index, search_first_index, related_contents, related_content_last_index
end

def get_new_searches(wall_id, search_last_index, related_content_last_index)
  searches = Search.joins(:transcript)
              .where('transcripts.wall_id' => wall_id, 'searches.is_visible' => true)
              .where('searches.id > ?', search_last_index)
              .order('id DESC')

  search_last_index = searches.first.id if searches.present?
  search_list = []

  for search in searches
    words = []
    search.entities.each {|entity| words.push(entity.name) }
    search.with_words.each {|with_word| words.push(with_word.text) }

    search_hash = search.attributes
    search_hash.store('words', words)
    search_list.push(search_hash)
  end

  related_contents = RelatedContent.joins(:transcript)
                      .where('transcripts.wall_id' => wall_id, 'related_contents.is_visible' => true)
                      .where('related_contents.id > ?', related_content_last_index)
                      .order('id DESC')

  related_content_last_index = related_contents.first.id if related_contents.present?

  # related_contents_list = []
  #
  # for related_content in related_contents
  #   related_content_hash = related_content.attributes
  #   # related_content_hash.store('condition', related_content.condition.attributes) if related_content.condition
  #   related_contents_list.push(related_content_hash)
  # end

  return search_list, search_last_index, related_contents, related_content_last_index
end

def get_further_searches(wall_id, search_first_index, num)
  searches = Search.joins(:transcript)
              .where('transcripts.wall_id' => wall_id, 'searches.is_visible' => true)
              .where('searches.id < ?', search_first_index)
              .order('id DESC')[0...num]

  search_list = []

  for search in searches.reverse
    words = []
    search.entities.each { |entity| words.push(entity.name) }
    search.with_words.each { |with_word| words.push(with_word.text) }

    search_hash = search.attributes
    search_hash.store('words', words)
    search_list.unshift(search_hash)

  end

  if searches.present?

    search_last_index = searches.first.id
    search_first_index = searches.last.id

    query_first_index = search_first_index - 1
    query_last_index = search_last_index + 1

    related_contents = RelatedContent.joins(:transcript)
                        .where('transcripts.wall_id' => wall_id, 'related_contents.is_visible' => true)
                        .joins(:search).where('searches.id > ?', query_first_index)
                        .joins(:search).where('searches.id < ?', query_last_index)
                        .order('id DESC')

    related_content_last_index = related_contents.first.id if related_contents.present?
  end

  return search_list, search_first_index, related_contents
end

def get_all_searches(wall_id)
  searches = Search.joins(:transcript)
              .where('transcripts.wall_id' => wall_id, 'searches.is_visible' => true)
              .order('id DESC')

  search_list = []
  for search in searches.reverse
    words = []
    search.entities.each { |entity| words.push(entity.name) }
    search.with_words.each { |with_word| words.push(with_word.text) }

    search_hash = search.attributes
    search_hash.store('words', words)
    search_list.unshift(search_hash)

  end

  if searches.present?
    search_last_index = searches.first.id
    search_first_index = searches.last.id

    query_search_index = search_first_index - 1
    related_contents = RelatedContent.joins(:transcript)
                        .where('transcripts.wall_id' => wall_id, 'related_contents.is_visible' => true)
                        # .joins(:search)
                        # .where('searches.id > ?', query_search_index)
                        # .order('id DESC')

    related_content_last_index = related_contents.first.id if related_contents.present?

  else
    search_last_index = 0
    search_first_index = 0
    related_content_last_index = 0
  end

  return search_list, search_last_index, search_first_index, related_contents, related_content_last_index
end

def get_formated_data_debug(transcripts)
  formated_transcripts = []

  for transcript in transcripts

    transcript_hash = transcript.attributes
    transcript_hash.store('user', transcript.user.attributes)

    entities = []
    transcript.entities.each { |entity| entities.push(entity.attributes) }

    searches = []

    for search in transcript.searches
      search_hash = search.attributes

      search_word = ''
      for entity_search in search.entity_searches
        search_word += entity_search.entity.name
        search_word += ' '
      end

      # for with_word in search.with_words
      #   search_word += with_word.text
      #   search_word += ' '
      # end

      search_hash.store('search_word', search_word)

      search_entities = []
      search.entity_searches.each { |entity_search| search_entities.push(entity_search.entity.attributes) }
      search_hash.store('entities', search_entities)

      # search_related_contents = []
      # for related_content in search.related_contents
      #   related_content_hash = related_content.attributes
      #   related_content_hash.store('condition', related_content.condition.attributes) if related_content.condition
      #   search_related_contents.push(related_content_hash)
      # end
      search_hash.store('related_contents', search.related_contents)

      searches.push(search_hash)
    end

    transcript_hash.store('entities', entities)
    transcript_hash.store('searches', searches)

    formated_transcripts.push(transcript_hash)

  end

  formated_transcripts
end
