def format_transcripts(transcripts_list)
  formated_transcripts = []

  for transcript in transcripts_list do

    if transcript.searches.present?

      for search in transcript.searches

        transcript_hash = transcript.attributes
        transcript_hash.store('user', transcript.user.attributes)

        # context = transcript.context.attributes
        # context ={}

        entities = []
        transcript.entities.each {|entity| entities.push(entity.attributes) }

        related_contents = []
        for related_content in search.related_contents
          related_content_hash = related_content.attributes
          related_content_hash.store('condition', related_content.condition.attributes)
          related_contents.push(related_content_hash)
        end

        word = ''
        for entity in search.entities
          word += entity.name
          word += ' '
        end
        for with_word in search.with_words
          word += with_word.text
          word += ' '
        end

        transcript_hash.store('text', word)
        transcript_hash.store('entities', entities)
        transcript_hash.store('related_contents', related_contents)

        formated_transcripts.push(transcript_hash)

      end

    elsif transcript.entities.present?

      transcript_hash = transcript.attributes
      transcript_hash.store('user', transcript.user.attributes)

      entities = []
      transcript.entities.each {|entity| entities.push(entity.attributes) }

      related_contents = []
      for related_content in transcript.related_contents
        related_content_hash = related_content.attributes
        related_content_hash.store('condition', related_content.condition.attributes)
        related_contents.push(related_content_hash)
      end

      word = ''

      for entity in transcript.entities
        word += entity.name
        word += ' '
      end

      transcript_hash.store('text', word)
      transcript_hash.store('entities', entities)
      transcript_hash.store('related_contents', related_contents)

      formated_transcripts.push(transcript_hash)

    end

  end

  return formated_transcripts

end
