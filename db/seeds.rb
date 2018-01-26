1.times { Wall.create!(state: 'MAIN') }
1.times { User.create!(facebook_id: '1296479330455947', name: 'Fuji') }

1.times { Transcript.create!(text: 'I like Emma Stone', wall_id: 1, user_id: 1, has_content: true, is_visible: true) }
1.times { Context.create!(transcript_id: 1, state: 'MAIN') }
1.times { Entity.create!(transcript_id: 1, category: 'PERSON', name: 'Emma Stone') }
1.times { RelatedContent.create!(transcript_id: 1, title: 'Emma Stone', desc: 'Not Emma Watson', url: 'http://www.imdb.com/name/nm1297015/', img_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1.._UX214_CR0,0,214,317_AL_.jpg', content_type: 'webpage', source: 'www.youtube.com', is_visible: true) }
1.times { Condition.create!(related_content_id: 1, service: 'YouTube Data API', word: 'Emma Watson') }
