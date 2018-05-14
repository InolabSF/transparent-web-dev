# README


## Versions
- Rails - 5.1.4
- Ruby - 2.3.1


## Set up

$ bundle install



## Transparent　データオブジェクト構造　(5/1/2018)

<!-- 主にユーザーに提供するのはユーザー発言（Transcript）が持つテキスト情報（Transcript.text）とそれに付随した関連情報（Transcript.related_contents）になります。 -->

主にウェブアプリに表示するのは検索に使用したワード（Searchオブジェクト）とそれに付随した関連コンテンツ（RelatedContentオブジェクト）になります。

<!-- #### Transcript オブジェクト ： ユーザーの声から取得した発言情報

    Transcript = {

      id : NUM,

      text : STRING, // text recognized from user voice input

      user : Object(User), // user information

      context : Object(Context), // conversation cotext information

      entities : List[ object( Entity ) ], // entity extracted from transcript

      has_content : BOOLEAN, // if has related_contents

      is_visible : BOOLEAN, // if is visible

      created_at : DATETIME // time when created

      updated_at : DATETIME // time when updated

    } -->

<!--
#### User オブジェクト ： ユーザー情報

    User = {

      user_id : STRING   

    }

#### Context オブジェクト ： 発言状況情報

    Context = {

      state : STRING // conversation state

    }

#### Entity オブジェクト ： ユーザーの発言テキストから抽出された固有名詞情報

    Entity = {

      transcript_id : NUM, // related transcript id

      name : STRING, // entity name

      category : STRING,  // entity category

      is_visible : BOOLEAN, // if is visible

    } -->

#### Searchオブジェクト ： 検索に使用した情報（ワード）

    Search = {

      id : NUM,

      transcript_id : NUM, // related transcript id

      words : list ( STRING ), // words used for search

      is_visible : BOOLEAN, // if is visible

      mode : NUM

    }

#### RelatedContentオブジェクト ： ユーザー発言に関連するコンテンツ

    RelatedContent = {

      id : NUM,

      search_id : NUM, // search id  

      title : STRING, // content title

      desc : STRING, // content description

      url : STRING, // content web page url

      img_url : STRING, // content image url

      content_type : STRING, // content type ( webpage, image, video )

      source : STRING, // information source

      search_service : STRING, // serach API information

      <!-- condition : Object( Condition ),  // search condition -->

      is_visible : BOOLEAN, // if is visible

    }

<!-- #### Conditionオブジェクト ： 関連コンテンツを検索するための条件

    Condition = {

      related_content_id : NUM, // related content id

      service : STRING,　// service for search

      word : String // word for search

    } -->


## Transparent　API　(5/1/2018)

α版Transparentに必要なAPI群をまとめています。

## 初期コンテンツロード（検索キーワード・関連コンテンツ）の取得

"GET", "/api/transcripts/" + wall_id

    responseBody = {

        searchs : List[ object( Search ) ],

        search_index : NUM,

        related_contents : List[ object( RelatedContent ) ],

        related_content_index : NUM

    }

## 更新情報ロード（検索キーワード・関連コンテンツ）の取得

"GET", "/api/transcripts/" + wall_id / index

    responseBody = {

        searchs : List[ object( Search ) ],

        entity_index : NUM,

        related_contents : List[ object( RelatedContent ) ],

        related_content_index : NUM

    }

## 認識テキストのPOST（テキスト, langcode, wallID, facebook_id, search_type, &検索ワード）

"POST", "/api/transcripts/"

    requestBody = {

        transcript　: STRING,

        langcode: "en-US" or "ja-JP",

        wallID : NUM,

        FacebookID : STRING,

        search_type : NUM, (1:Image, 2:Webpage, 3:Video)

        with_words : List[ STRING ],

        UI_version : "alpha" (demo, alpha, beta)


    }

## コメントカードの削除

"GET", "/update/search/" + search_id

## 画像の削除

"GET", "/update/relatedcontent/" + related_content_id

<!-- ## &検索ワードの設定

"GET", "/set/context/" + wall_id

params['query'] = &検索ワード -->

<!-- ## &検索ワードの削除

"GET", "/delete/context/" + wall_id

params['query'] = &検索ワード -->
