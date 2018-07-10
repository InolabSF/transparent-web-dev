rails new transparent-web-dev --webpack=vue

cd transparent-web-dev

rails g controller Home index


rails generate model Wall name:string state:string

rails generate model User facebook_id:string name:string

rails generate model Transcript text:string user_id:integer wall_id:integer has_content:boolean is_visible:boolean

rails generate model Context transcript_id:integer state:string

rails generate model Entity transcript_id:integer category:string name:string

rails generate model Condition related_content_id:integer service:string word:string

rails generate model RelatedContent transcript_id:integer title:string desc:string url:string img_url:string content_type:string source:string is_visible:boolean

rails db:migrate

rails g migration AddNameToWalls name:string

rails g migration AddCategoryToEntities category:string

rails generate migration RemoveTypeFromEntities type:string

rails g migration AddSentimentToTranscript sentiment:string

rails g migration AddIsawesomeToTranscript is_awesome:boolean

rails g migration AddFeedbackToContext feedback:boolean

rails g migration AddReactionToContext reaction:string

rails g migration ChangeAwesomeToTranscript

rails g migration ChangeColumnToContext

rails g migration ChangeColumnToRelatedContent

rails g migration AddLangcodeToTranscript langcode:string

User.create(:facebook_id => "guest_x", :name => "Guest X")

Wall.create(:state => "MAIN", :name => "Try")

rails generate model Config name:string cse_id:string number:integer

rails generate model config_group config:references wall:references

rails g migration AddManageridToWall manager_id:integer

rails g migration AddKeysToUser ms_key:string google_key:string

ConfigGroup.create(:config_id => 1, :wall_id => 2)

rails generate model NoGoodWord word:string:unique langcode:string

 rails g migration AddIndexToNoGoodWord

 rails g migration ChangeLangcodeToNoGoodWord

 heroku config:set MS_IMAGE_SEARCH_KEY=

 rails generate model WithWord text:string transcript_id:integer

 rails generate model Search mode:string transcript_id:integer　is_visible:boolean

 rails generate model entity_search search:references entity:references

 rails generate model with_word_search search:references with_word:references

 rails g migration AddSearchToRelatedContent search_id:integer

 RelatedContent.update_all("content_type='webpage'")

 Search.update_all("mode='image'")

 bundle exec rake db:migrate

rails g migration AddIsarchivedToSearch is_archived:boolean

rails g migration AddIsarchivedToRelatedContent is_archived:boolean

rails g migration AddIsarchivedToTranscript is_archived:boolean

rails g migration AddViewedToRelatedContent viewed:integer

rails g migration AddOpenedToRelatedContent opened:integer

 w = Wall.all
 w.each {|w|w.new_url}
 w.each {|w|w.save}
 Wall.update_all("default_langcode=1")
