# frozen_string_literal: true

require './lib/assets/search/search_amana'
require './lib/assets/search/search_flickr'
require './lib/assets/search/search_gcp'
require './lib/assets/search/search_getty'
require './lib/assets/search/search_ms'
require './lib/assets/search/search_unsplash'
require './lib/assets/search/search_youtube'

def search_handler(word, search, transcript, langcode, is_concurrent, is_word_only, search_type, is_test_mode)
  # word = ''
  # for entity in search.entities
  #   word += entity.name
  #   word += ' '
  # end
  # for with_word in search.with_words
  #   word += with_word.text
  #   word += ' '
  # end
  if word.present?
    if is_test_mode
      contents = test_alpha(word, search, transcript, langcode, is_concurrent, search_type)
    else
      contents = production_alpha(word, search, transcript, langcode, is_concurrent, search_type)
    end
  else
    contents = []
  end

  contents
end

def test_alpha(word, search, transcript, langcode, is_concurrent, search_type)
  contents = if search_type.zero?
               image_search_amana(word, search, transcript, langcode, is_concurrent)
             elsif search_type == 1
               news_search(word, search, transcript, langcode, is_concurrent)
             elsif search_type == 2
               video_search(word, search, transcript, langcode, is_concurrent)
             else
               image_search(word, search, transcript, langcode, is_concurrent)
             end
  contents
end

def production_alpha(word, search, transcript, langcode, is_concurrent, search_type)
  if search_type.zero?
    contents = if transcript.wall_id == 3
                 image_search_beta(word, search, transcript, langcode, is_concurrent)
               else
                 image_search(word, search, transcript, langcode, is_concurrent)
               end
  elsif search_type == 1
    contents = news_search(word, search, transcript, langcode, is_concurrent)
  elsif search_type == 2
    contents = video_search(word, search, transcript, langcode, is_concurrent)
  else
    contents = image_search(word, search, transcript, langcode, is_concurrent)
  end

  contents
end

def image_search(word, search, transcript, langcode, is_concurrent)
  puts('imagebeta')
  contents = []
  threads = []
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      ms_image_search(word, search, transcript, langcode, is_concurrent, 5, contents)
    end
  end
  ## Next 100対応でunsplash削除
  # threads << Thread.new do
  #   ActiveRecord::Base.connection_pool.with_connection do
  #     unsplash(word, search, transcript, langcode, is_concurrent, 2, contents)
  #   end
  # end
  # threads << Thread.new do
  #   ActiveRecord::Base.connection_pool.with_connection do
  #     getty_images(word, search, transcript, langcode, is_concurrent, 2, contents)
  #   end
  # end
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      flickr(word, search, transcript, langcode, is_concurrent, 4, contents)
    end
  end
  # google_custom_search(word, search, transcript, langcode, is_concurrent, 3, contents)
  threads.each { |t| t.join } unless is_concurrent
  # threads.each { |t| t.join }

  contents
end

def image_search_beta(word, search, transcript, langcode, is_concurrent)
  contents = []
  threads = []
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      ms_image_search(word, search, transcript, langcode, is_concurrent, 5, contents)
    end
  end
  threads.each { |t| t.join } unless is_concurrent

  contents
end

def image_search_amana(word, search, transcript, langcode, is_concurrent)
  contents = []
  threads = []
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      amana(word, search, transcript, langcode, is_concurrent, 9, contents)
    end
  end
  threads.each { |t| t.join } unless is_concurrent

  contents
end

def news_search(word, search, transcript, langcode, is_concurrent)
  contents = []
  threads = []
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      ms_news_search(word, search, transcript, langcode, is_concurrent, 9, contents)
    end
  end
  threads.each { |t| t.join }

  contents
end

def video_search(word, search, transcript, langcode, is_concurrent)
  contents = []
  threads = []
  threads << Thread.new do
    ActiveRecord::Base.connection_pool.with_connection do
      youtube(word, search, transcript, langcode, is_concurrent, 9, contents)
    end
  end
  threads.each { |t| t.join }

  contents
end
