def format_transcripts(transcripts_list)
  data_list_temp = []

  for transcript in transcripts_list do

    if transcript.searches.present?

      for search in transcript.searches

        data = {}

        id = transcript.id
        # text = transcript.text
        user = transcript.user.attributes
        # context = transcript.context.attributes
        # entities_obj = Entity.where(:transcript_id => transcript.id)
        entities_obj = transcript.entities
        entities = []
        for entity in entities_obj
          entities.push(entity.attributes)
        end

        has_content = transcript.has_content
        related_contents = []

        related_contents_obj = search.related_contents
        for related_content in related_contents_obj
          condition = related_content.condition
          if condition then
            related_content = related_content.attributes
            related_content.store('condition', condition.attributes)
          end
          related_contents.push(related_content)
        end

        awesome = transcript.awesome
        created_at = transcript.created_at
        updated_at = transcript.updated_at

        word = ''


        for entity in search.entities
          word += entity.name
          word += ' '
        end

        for with_word in search.with_words
          word += with_word.text
          word += ' '
        end

        data.store('id', id)
        data.store('text', word)
        data.store('user', user)
        # data.store('context', context)
        data.store('entities', entities)
        data.store('has_content', has_content)
        data.store('related_contents', related_contents)
        data.store('awesome', awesome)
        data.store('created_at', created_at)
        data.store('updated_at', updated_at)

        data_list_temp.push(data)

      end

    elsif transcript.entities.present?

      data = {}

      id = transcript.id
      # text = transcript.text
      user = transcript.user.attributes
      # context = transcript.context.attributes
      # entities_obj = Entity.where(:transcript_id => transcript.id)
      entities_obj = transcript.entities
      entities = []
      for entity in entities_obj
        entities.push(entity.attributes)
      end

      has_content = transcript.has_content
      related_contents = []

      related_contents_obj = transcript.related_contents
      for related_content in related_contents_obj
        condition = related_content.condition
        if condition then
          related_content = related_content.attributes
          related_content.store('condition', condition.attributes)
        end
        related_contents.push(related_content)
      end

      awesome = transcript.awesome
      created_at = transcript.created_at
      updated_at = transcript.updated_at

      word = ''

      for entity in transcript.entities
        word += entity.name
        word += ' '
      end

      data.store('id', id)
      data.store('text', word)
      data.store('user', user)
      # data.store('context', context)
      data.store('entities', entities)
      data.store('has_content', has_content)
      data.store('related_contents', related_contents)
      data.store('awesome', awesome)
      data.store('created_at', created_at)
      data.store('updated_at', updated_at)

      data_list_temp.push(data)

    end

  end

  return data_list_temp

end
