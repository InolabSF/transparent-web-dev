# README


## Transparent Next100 API

### [POST] 新規ウォール作成

[POST], "/walls/"

    requestBody = {

        name: STRING, // Wall名を指定します(Optional)

        default_langcode: ENUM(0:en, 1:ja), // 言語を指定します。デフォルトは日本語です。(Optional)

        version: "next100" // APIのバージョンを指定します。Next100イベントではnext100といれてください。

    }

  #### Sample Request

      requestBody = {

          name: "demo",

          default_langcode: 1,

          version: "next100"

      }

  #### Sample Response

      responseBody = {

          name: "demo",

          id: 3,

          default_langcode: "ja",

          key: "random_key",

          url: "https://trnspt.com/next100/wall/random_key/demo"

      }

### [GET] ウォール毎のtranscripts一覧）取得

[GET] '/next100/contents/' + wall_key

#### Sample Response

    responseBody = {

        searches: [

          {
            "id" : 14,
            "transcript_id" : 200,
            "words" : [ 'san francisco', 'soccer'],
            "is_visible" : true,
            "mode" : 'Image'
          },
          {
            "id" : 13,
            "transcript_id" : 200,
            "words" : [ 'san francisco', 'soccer'],
            "is_visible" : true,
            "mode" : 'Image'
          },
        ],

        related_contents: [

            {
                "id": 104,
                "search_id": 14,
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
                "condition": {"service": "MS Bing Image Search API", "word": "san francisco soccer"}
            }

        ]

    }

### [POST] transcriptsに対してピンのON（ユーザー毎）

[POST] "/next100/pins"

    requestBody = {

        related_content_id: "NUM,

        eventuser_id: STRING // Next100イベント用に作成するユーザーID

    }

#### Sample Request

    requestBody = {

        related_content_id: 123,

        eventuser_id: 'A'

    }

### [DELETE] transcriptsに対してピンのOFF（ユーザー毎）

[DELETE] "/next100/pins/"

    Requested parameters:

        - related_content_id: NUM

        - eventuser_id: STRING

### [DELETE] コメントカードの削除

[DELETE] "/next100/searches/"

    Requested parameters:

        - search_id: NUM

### [DELETE] 画像の削除

[DELETE] "/next100/contents/"

    Requested parameters:

        - related_content_id: NUM
