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

Config.create(:cse_id => "014983619042086533707:sf88exwzxmu", :name => "general media Tech Ja", :number => 5)

Config.create(:cse_id => "014983619042086533707:yowg6mvvpf8", :name => "general media Finantial Ja", :number => 5)

ConfigGroup.create(:config_id => 1, :wall_id => 2)

ConfigGroup.create(:config_id => 2, :wall_id => 2)

rails generate model NoGoodWord word:string:unique langcode:string

 rails g migration AddIndexToNoGoodWord

 rails g migration ChangeLangcodeToNoGoodWord

 export UNSPLASH_KEY=""
