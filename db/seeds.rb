1.times { Wall.create!(name: 'dev-en', default_langcode: 0) }
1.times { Wall.create!(name: 'dev-ja', default_langcode: 1) }
1.times { Wall.create!(name: 'test-ja', default_langcode: 1) }
