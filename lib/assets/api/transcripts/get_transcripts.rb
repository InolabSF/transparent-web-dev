def format_transcripts(transcripts_list)
  formated_transcripts = []

  for transcript in transcripts_list do

    if transcript.searches.present?

      for search in transcript.searches

        next if !search.is_visible

        transcript_hash = transcript.attributes
        transcript_hash.store('user', transcript.user)

        word = ''
        for entity in search.entities
          word += entity.name
          word += ' '
        end
        for with_word in search.with_words
          word += with_word.text
          word += ' '
        end

        transcript_hash.store('id', search.id)
        transcript_hash.store('text', word)
        transcript_hash.store('entities', search.entities)
        transcript_hash.store('related_contents', search.related_contents)

        formated_transcripts.push(transcript_hash)

      end

    elsif transcript.entities.present?

      transcript_hash = transcript.attributes
      transcript_hash.store('user', transcript.user)

      word = ''

      for entity in transcript.entities
        word += entity.name
        word += ' '
      end

      transcript_hash.store('text', word)
      transcript_hash.store('entities', transcript.entities)
      transcript_hash.store('related_contents', transcript.related_contents)

      formated_transcripts.push(transcript_hash)

    end

  end

  return formated_transcripts

end
