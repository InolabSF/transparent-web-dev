def format_transcripts(transcripts_list)
  formated_transcripts = []

  for transcript in transcripts_list do

    if transcript.searches.present?

      for search in transcript.searches

        next if !search.is_visible

        transcript_hash = transcript.attributes
        transcript_hash.store('user', transcript.user.attributes)

        # context = transcript.context.attributes
        # context ={}

        entities = []
        search.entities.each {|entity| entities.push(entity.attributes) }

        related_contents = []
        for related_content in search.related_contents
          related_content_hash = related_content.attributes
          related_content_hash.store('condition', related_content.condition.attributes) if related_content.condition
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

        transcript_hash.store('id', search.id)
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
        related_content_hash.store('condition', related_content.condition.attributes) if related_content.condition
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

# def format_multi_search(transcripts_list, show_dummy)
#   formated_transcripts = []
#
#   for transcript in transcripts_list do
#
#     next if !show_dummy && transcript.text == 'dummy'
#
#     if transcript.searches.present?
#
#       # for search in transcript.searches
#       transcript.searches.each_with_index do |search, i|
#
#         next if !search.is_visible
#
#         if i == 0
#
#           transcript_hash = transcript.attributes
#           transcript_hash.store('user', transcript.user.attributes)
#
#           # context = transcript.context.attributes
#           # context ={}
#
#           entities = []
#           search.entities.each {|entity| entities.push(entity.attributes) }
#
#           related_contents = []
#           for related_content in search.related_contents
#             related_content_hash = related_content.attributes
#             related_content_hash.store('condition', related_content.condition.attributes) if related_content.condition
#             related_contents.push(related_content_hash)
#           end
#
#           word = ''
#           for entity in search.entities
#             word += entity.name
#             word += ' '
#           end
#           for with_word in search.with_words
#             word += with_word.text
#             word += ' '
#           end
#
#           transcript_hash.store('id', search.id)
#           transcript_hash.store('text', word)
#           transcript_hash.store('entities', entities)
#           transcript_hash.store('related_contents', related_contents)
#
#           formated_transcripts.push(transcript_hash)
#
#         else
#           #dummy transcript for demo UI
#
#           text = 'dummy'
#           user_id = transcript.user.id
#           wall_id = transcript.wall.id
#           langcode = transcript.langcode
#           has_content = search.related_contents.present?
#           # with_words = transcript.with_words
#           sentiment = transcript.sentiment
#           is_visible = search.is_visible
#
#           dummy_transcript = Transcript.new(:text => text, :wall_id => wall_id, :user_id => user_id, :has_content => has_content, :is_visible => true, :langcode => langcode, :sentiment => sentiment)
#           dummy_search = dummy_transcript.searches.build(:mode => search.mode, :is_visible => search.is_visible)
#
#           # search.entities.each {|entity| dummy_entity = dummy_transcript.entities.build(:category => entity.category, :name => entity.name) }
#           # search.with_words.each {|with_word| dummy_with_word = dummy_transcript.with_words.build(:text => with_word.text)}
#
#           for entity in search.entities
#             dummy_entity = dummy_transcript.entities.build(:category => entity.category, :name => entity.name)
#             dummy_entity_search = dummy_search.entity_searches.build(:entity => dummy_entity)
#           end
#
#           for with_word in search.with_words
#             dummy_with_word = dummy_transcript.with_words.build(:text => with_word.text)
#             dummy_with_word_search = dummy_search.with_word_searches.build(:with_word => dummy_with_word)
#           end
#
#           for content in search.related_contents
#             related_content = dummy_search.related_contents.build(:transcript => dummy_transcript, :title => content.title, :desc => content.desc, :url => content.url, :img_url => content.img_url, :content_type => content.content_type, :source => content.source, :is_visible => content.is_visible)
#             condition = related_content.build_condition(:service => content.condition.service, :word => content.condition.word)
#           end
#
#           dummy_transcript.save
#
#         end
#
#
#
#       end
#
#     elsif transcript.entities.present?
#
#       transcript_hash = transcript.attributes
#       transcript_hash.store('user', transcript.user.attributes)
#
#       entities = []
#       transcript.entities.each {|entity| entities.push(entity.attributes) }
#
#       related_contents = []
#       for related_content in transcript.related_contents
#         related_content_hash = related_content.attributes
#         related_content_hash.store('condition', related_content.condition.attributes) if related_content.condition
#         related_contents.push(related_content_hash)
#       end
#
#       word = ''
#
#       for entity in transcript.entities
#         word += entity.name
#         word += ' '
#       end
#
#       transcript_hash.store('text', word)
#       transcript_hash.store('entities', entities)
#       transcript_hash.store('related_contents', related_contents)
#
#       formated_transcripts.push(transcript_hash)
#
#     end
#
#   end
#
#   return formated_transcripts
#
# end
