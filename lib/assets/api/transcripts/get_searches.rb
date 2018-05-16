def get_initial_searches(wall_id, num)

  searches = Search.joins(:transcript).where("transcripts.wall_id" => wall_id).order('id DESC')[0...num]
  search_index = Search.joins(:transcript).where("transcripts.wall_id" => wall_id).count

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
      related_content_hash.store('condition', related_content.condition.attributes)
      related_contents_list.unshift(related_content_hash)
    end

  end

  related_content_index = related_contents_list[0]['id']

  return search_list, search_index, related_contents_list, related_content_index
end
