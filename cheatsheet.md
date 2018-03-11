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
