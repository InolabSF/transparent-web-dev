def save_related_contents(transcript, search, contents)
  for content in contents
    transcript.has_content = true
    related_content = search.related_contents.build(
      transcript:   transcript,
      title:        content['title'],
      desc:         content['desc'],
      url:          content['url'],
      img_url:      content['img_url'],
      content_type: content['content_type'],
      source:       content['source'],
      is_visible:   true
    )

    # related_content = RelatedContent.new(
    #   transcript:   transcript,
    #   search:       search,
    #   title:        content['title'],
    #   desc:         content['desc'],
    #   url:          content['url'],
    #   img_url:      content['img_url'],
    #   content_type: content['content_type'],
    #   source:       content['source'],
    #   is_visible:   true
    # )

    condition = related_content.build_condition(
      service: content['condition']['service'],
      word:    content['condition']['word']
    )
    related_content.save
    ## firestore
    index_content_firestore(transcript.wall_id, related_content)
  end
end
