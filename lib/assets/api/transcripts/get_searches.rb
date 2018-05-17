def get_initial_searches(wall_id, num)

  searches = Search.joins(:transcript).where("transcripts.wall_id" => wall_id, "searches.is_visible" => true).order('id DESC')[0...num]
  search_index = searches[0].id

  search_list = []
  related_contents_list = []

  for search in searches.reverse

    words = []
    search.entities.each {|entity| words.push(entity.name) }
    search.with_words.each {|with_word| words.push(with_word.text) }

    search_hash = search.attributes
    search_hash.store('words', words)
    search_list.unshift(search_hash)

    for related_content in search.related_contents
      related_content_hash = related_content.attributes
      related_content_hash.store('condition', related_content.condition.attributes) if related_content.condition
      related_contents_list.unshift(related_content_hash)
    end

  end

  related_content_index = related_contents_list[0]['id']

  return search_list, search_index, related_contents_list, related_content_index
end

def get_new_searches(wall_id, search_index, related_content_index)

  searches = Search.joins(:transcript).where("transcripts.wall_id" => wall_id, "searches.is_visible" => true).where("searches.id > ?", search_index).order('id DESC')
  search_index = searches[0].id if searches.present?

  search_list = []

  for search in searches

    words = []
    search.entities.each {|entity| words.push(entity.name) }
    search.with_words.each {|with_word| words.push(with_word.text) }

    search_hash = search.attributes
    search_hash.store('words', words)
    search_list.push(search_hash)

  end

  related_contents = RelatedContent.joins(:transcript).where("transcripts.wall_id" => wall_id, "related_contents.is_visible" => true).where("related_contents.id > ?", related_content_index).order('id DESC')
  related_content_index = related_contents[0].id if related_contents.present?

  related_contents_list = []

  for related_content in related_contents
    related_content_hash = related_content.attributes
    related_content_hash.store('condition', related_content.condition.attributes) if related_content.condition
    related_contents_list.push(related_content_hash)
  end

  return search_list, search_index, related_contents_list, related_content_index
end
