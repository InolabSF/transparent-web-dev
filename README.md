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

#### Searchオブジェクト ： コメントカードに出力する検索に使用した情報（ワード）

複数のワード情報がある場合はコメントカードに並列出力するようにしてください。

    Search = {

      id : NUM,

      transcript_id : NUM, // related transcript id

      words : list ( STRING ), // words used for search

      is_visible : BOOLEAN, // if is visible

      mode : STRING // search type ( image, webpage, video )

    }

#### RelatedContentオブジェクト ： コメントカードに関連づける検索結果のコンテンツ

どのコメントカードに紐付けるかは'search_id'で識別します。

    RelatedContent = {

      id : NUM,

      search_id : NUM, // search id  

      title : STRING, // content title

      desc : STRING, // content description

      url : STRING, // content web page url

      img_url : STRING, // content image url

      content_type : STRING, // content type ( image, webpage, video )

      source : STRING, // information source

      condition : Object( Condition ),  // search condition

      is_visible : BOOLEAN, // if is visible

    }

#### Conditionオブジェクト ： 関連コンテンツを検索するための条件

    Condition = {

      related_content_id : NUM, // related content id

      service : STRING,　// API service for search

      word : String // word for search

    }


## Transparent α API　(5/1/2018)

α版Transparentに必要なAPI群をまとめています。

### 初期コンテンツロード（検索キーワード・関連コンテンツ）の取得

"GET", "/api/transcripts/" + wall_id

    responseBody = {

        searches : List[ object( Search ) ],

        first_search_id : NUM,

        search_index : NUM,

        related_contents : List[ object( RelatedContent ) ],

        related_content_index : NUM

    }

#### Sample Request

  "GET", "/api/transcripts/1"

#### Sample Response

    responseBody = {

        searches : [

          {
            "id" : 20,
            "transcript_id" : 200,
            "words" : [ 'transparent', 'world'],
            "is_visible" : true,
            "mode" : 'Image'
          },
          {
            "id" : 21,
            "transcript_id" : 201,
            "words" : [ 'world', 'camera'],
            "is_visible" : true,
            "mode" : 'Image'
          }

        ],  

        search_index : 21,

        related_contents : [

            {
                "id": 100,
                "search_id": 20,
                "title": "sample 1",
                "desc": "You Tube - Smasher - ",
                "url": "https://www.youtube.com/watch?v=22cdBDK-8hk",
                "img_url": "http://www.designbolts.com/wp-content/uploads/2013/09/40-Free-Transparent-Social-Media-Icons-01.jpg",
                "content_type": "image",
                "source": "www.youtube.com",
                "is_visible": true,
                "created_at": "2018-02-28T05:20:27.091Z",
                "updated_at": "2018-02-28T05:20:27.091Z",
                "awesome": 0,
                "condition":{"service": "MS Bing Image Search API", "word": "transparent world"}
            },
            {
                "id": 101,
                "search_id": 20,
                "title": "sample 2",
                "desc": "You Tube - Smasher - ",
                "url": "https://www.youtube.com/watch?v=22cdBDK-8hk",
                "img_url": "http://www.pgwebs.com/wp-content/uploads/2014/12/Social-Media-Solutions-for-Your-Troubles.png",
                "content_type": "image",
                "source": "www.youtube.com",
                "is_visible": true,
                "created_at": "2018-02-28T05:20:27.091Z",
                "updated_at": "2018-02-28T05:20:27.091Z",
                "awesome": 0,
                "condition":{"service": "MS Bing Image Search API", "word": "transparent world"}
            },
            {
                "id": 102,
                "search_id": 21,
                "title": "sample 3",
                "desc": "You Tube - Smasher - ",
                "url": "https://www.youtube.com/watch?v=22cdBDK-8hk",
                "img_url": "https://coziest.net/wp-content/uploads/2013/12/sc.jpg",
                "content_type": "image",
                "source": "www.youtube.com",
                "is_visible": true,
                "created_at": "2018-02-28T05:20:27.091Z",
                "updated_at": "2018-02-28T05:20:27.091Z",
                "awesome": 0,
                "condition":{"service": "MS Bing Image Search API", "word": "world camera"}
            },
            {
                "id": 103,
                "search_id": 21,
                "title": "sample 4",
                "desc": "You Tube - Smasher - ",
                "url": "https://www.youtube.com/watch?v=22cdBDK-8hk",
                "img_url": "http://image.itmedia.co.jp/bizid/articles/0909/30/st_photo1.jpg",
                "content_type": "image",
                "source": "www.youtube.com",
                "is_visible": true,
                "created_at": "2018-02-28T05:20:27.091Z",
                "updated_at": "2018-02-28T05:20:27.091Z",
                "awesome": 0,
                "condition":{"service": "MS Bing Image Search API", "word": "world camera"}
            }

        ],

        related_content_index : 103

    }

<!-- [
    {
        "id": 960,
        "mode": "image",
        "transcript_id": 32964,
        "is_visible": true,
        "created_at": "2018-05-16T05:50:07.440Z",
        "updated_at": "2018-05-16T05:50:07.440Z",
        "words": [
            "children"
        ]
    },
    {
        "id": 959,
        "mode": "image",
        "transcript_id": 32962,
        "is_visible": true,
        "created_at": "2018-05-16T05:49:57.049Z",
        "updated_at": "2018-05-16T05:49:57.049Z",
        "words": [
            "dude"
        ]
    }
] -->

### 更新情報ロード（検索キーワード・関連コンテンツ）の取得

"GET", "/api/transcripts/" + wall_id + "/" + search_index + "/" + related_content_index

    responseBody = {

        searches : List[ object( Search ) ],

        search_index : NUM,

        related_contents : List[ object( RelatedContent ) ],

        related_content_index : NUM

    }

#### Sample Request 1

  "GET", "/api/transcripts/1/21/103"

#### Sample Response 1

    responseBody = {

        searches : [

          {
            "id" : 22,
            "transcript_id" : 200,
            "words" : [ 'san francisco', 'world'],
            "is_visible" : true,
            "mode" : 'Image'
          }
        ],

        search_index : 22,

        related_contents : [

            {
                "id": 104,
                "search_id": 22,
                "title": "sample 5",
                "desc": "You Tube - Smasher - ",
                "url": "https://www.youtube.com/watch?v=22cdBDK-8hk",
                "img_url": "https://wikitravel.org/upload/en/thumb/2/23/Us-ca-sanfran-goldengate.jpg/510px-Us-ca-sanfran-goldengate.jpg",
                "content_type": "image",
                "source": "www.youtube.com",
                "is_visible": true,
                "created_at": "2018-02-28T05:20:27.091Z",
                "updated_at": "2018-02-28T05:20:27.091Z",
                "awesome": 0,
                "condition":{"service": "MS Bing Image Search API", "word": "san francisco world"}
            }

        ],

        related_content_index : 104

    }

#### Sample Request 2

  "GET", "/api/transcripts/1/22/104"

#### Sample Response 2

    responseBody = {

        searches : [],

        search_index : 22,

        related_contents : [

            {
                "id": 105,
                "search_id": 22,
                "title": "sample 6",
                "desc": "You Tube - Smasher - ",
                "url": "https://www.youtube.com/watch?v=22cdBDK-8hk",
                "img_url": "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
                "content_type": "image",
                "source": "www.youtube.com",
                "is_visible": true,
                "created_at": "2018-02-28T05:20:27.091Z",
                "updated_at": "2018-02-28T05:20:27.091Z",
                "awesome": 0,
                "condition":{"service": "MS Bing Image Search API", "word": "san francisco world"}
            },
            {
                "id": 106,
                "search_id": 22,
                "title": "sample 7",
                "desc": "You Tube - Smasher - ",
                "url": "https://www.youtube.com/watch?v=22cdBDK-8hk",
                "img_url": "https://lonelyplanetimages.imgix.net/a/g/hi/t/9cf024dfd5c0bcb2b17f4785340145ea-san-francisco.jpg?sharp=10&vib=20&w=1200",
                "content_type": "image",
                "source": "www.youtube.com",
                "is_visible": true,
                "created_at": "2018-02-28T05:20:27.091Z",
                "updated_at": "2018-02-28T05:20:27.091Z",
                "awesome": 0,
                "condition":{"service": "MS Bing Image Search API", "word": "san francisco world"}
            }
        ],

        related_content_index : 106

    }

### 認識テキストのPOST（transcript(テキスト), langcode, wallID, facebook_id, search_type, with_words(&検索ワード), UI_version）

"POST", "/api/transcripts/"

    requestBody = {

        transcript　: STRING,

        langcode: "en-US" or "ja-JP",

        wallID : NUM,

        FacebookID : STRING, ("guest_x"に固定してください。)

        search_type : NUM, (0:image, 1:webpage, 2:video)

        with_words : List[ STRING ],

        UI_version : "alpha" (demo, alpha, beta)


    }

#### Sample Request Body

    requestBody = {

        "transcript": "今日は六本木にいきましょう。",

        "langcode": "ja-JP",

        "wallID": 3,

        "FacebookID": "guest_x",

        "search_type": 1,

        "with_words": [ "クール" ],

        "UI_version": "alpha"
    }

### コメントカードの削除

"GET", "/api/update/searches/" + search_id

### 画像の削除

"GET", "/api/update/contents/" + related_content_id

## フロントコーディングのための各種設定値サンプル

フロントコーディング時は下記の値を使用してください。バックエンドと統合時に動的なものに変更します。
統合時のために各種設定値はbundle.jsの外に出して頂くようにお願いします。

    wall_id = 3

    langcode = 'ja-JP'

    FacebookID = 'guest_x'


<!-- ## &検索ワードの設定

"GET", "/set/context/" + wall_id

params['query'] = &検索ワード -->

<!-- ## &検索ワードの削除

"GET", "/delete/context/" + wall_id

params['query'] = &検索ワード -->
