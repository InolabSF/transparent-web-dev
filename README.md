# README

## Versions
- Rails - 5.1.6
- Ruby - 2.3.1

## Set up
`$ bundle install`

`$ bin/rails db:migrate RAILS_ENV=development`

`$ rails db:seed`

## テスト版Wallへのアクセスの方法

Transparentアプリでは日本語のテストウォール(wall_id: 3)を用意しています。  
テスト版Wallにアクセスするためにはローカル環境で`$ rails db:seed`を実行した後にルート"/alpha/test/ja"にアクセスしてください。  

ローカルサーバーへのアクセスurl例：http://localhost:3000/alpha/test/ja

## 通常のWallアクセスの方法

DBのWallテーブルに新しくwallレコードが作成される際にそのwallのアクセスのためのランダムキーを含むurlが自動発行されます。そのurlをrails consoleかrails adminによりDBのwallsテーブルのurlカラムから取得できます。そのurlにアクセスすることでwallを起動することが可能です。  
取得できるurlは自動的にDOKIDOKI様カスタムドメインtrnspt.comを適用した状態で発行されますので、実行環境にあわせてurlを編集してください。  

例として、ローカル環境で実行する場合は以下のようにurlを変更してアクセスする必要があります。

~~https://trnspt.com/alpha/wall/1ni3k8eD/dev~~  
↓  
http://localhost:3000/alpha/wall/1ni3k8eD/dev  

## カスタムの仕様が実装されているWallに関して

本番環境では以下のidをもつwallにカスタムの仕様を実装しています。（9/5/2018現在）

wall_id: 3, 12 (開発検証用)

- NLPモデルをGoogle Cloud Platformを使用（通常はMS Keyword API）
- 抽出名刺を固有名刺のみへ絞り込み
- 検索ワードを単数に制限


wall_id: 1, 9, 15, 16 (Amanaさん向けの実装)
- 画像取得先をamanaさんのAPIに限定

## 本番環境運用オペレーション

本番用のサーバーはHerokuで運用しています。最新のコードのサーバー環境への反映方法は下記Heroku公式ドキュメントを参照してください。HerokuアカウントはDOKIDOKIさんのものを使用しております。

 [Heroku -Deploying with Git-](https://devcenter.heroku.com/articles/git)

## Beta版にむけてのバックエンド改善案

クライアント間のストリミーミング技術にはFirebase FirestoreのonSnapshot APIを使用する方針がいいと思います。以下の利点があると思います。

* Googleの提供する通信技術により安定性向上
* オフライン補正機能
* No SQL DBの特性によるレイテンシー向上

Transparent webアプリのアーキテクチャFirestoreを活用するには以下の変更点が必要です。

* バックエンド
  * クライアントで取得するデータをFirestoreに反映するロジック
  * https://github.com/InolabSF/transparent-web-dev/blob/master/lib/assets/platform/firestore.rb
* フロントエンド
  * Firestoreからリアルタイムアップデートを取得する仕組み
  * https://github.com/InolabSF/transparent-web-dev/blob/master/app/assets/javascripts/front/beta/wall/loadContents.js

参考 [Cloud Firestore でリアルタイム アップデートを入手する](https://firebase.google.com/docs/firestore/query-data/listen)

## 3rd Party Services

#### Google Cloud Platform

  Transparentデモ用アカウントです。（本プロジェクトGoogle Driveの"Cloud Service Account"のドキュメントに詳細があります。）

  使用しているAPIサービスリスト
  * Cloud Natural language API
  * Cluod Translation API

#### Microsoft Azure

  DOKIDOKIさん所有のアカウントです。

  使用しているAPIサービスリスト
  * Microsoft Text Analytics API
  * Bing Image Search API
  * Microsoft Content Moderator API
  * Bing Speech API
  * Bing News Search API

#### Heroku

  DOKIDOKIさん所有のアカウントです。本番環境のサーバー運用に使用しています。

#### DNSimple

  DOKIDOKIさん所有のアカウントです。カスタムドメインの割り当てに使用しています。

#### Unsplash API

  Unsplash APIの使用には開発者用のAPIキーを用意してください。Transparent α版本番環境においてはフリーアカウントを使用しています。Unsplash APIを使用するには環境変数"UNSPLASH_KEY"を設定する必要があります。  
  <https://unsplash.com/documentation>

#### Getty Images API

  Getty Images APIの使用には開発者用のAPIキーを用意してください。Transparent α版本番環境においてはフリーアカウントを使用しています。Getty Images APIを使用するには環境変数"GETTY_IMAGES_KEY"を設定する必要があります。  
  <https://developers.gettyimages.com/api/>

#### Flickr API

  Flickr APIの使用には開発者用のAPIキーを用意してください。Transparent α版本番環境においてはフリーアカウントを使用しています。Flickr APIを使用するには環境変数"FLICKR_KEY"を設定する必要があります。  
  <https://www.flickr.com/services/api/>

#### Amana Images API

  Amanaさんに用意していただいたAPIキーを環境変数"AMANA_KEY"に設定してください。

## Environment Variables

  * MS_TEXT_KEY (Microsoft Text Analytics API)
  * MS_IMAGE_SEARCH_KEY (Bing Image Search API)
  * MS_CONTENT_MODERATOR_KEY (Microsoft Content Moderator API)
  * MS_ASR_KEY  (Bing Speech API)
  * MS_NEWS_SEARCH_KEY  (Bing News Search API)
  * GCP_API_KEY=  (Google Cloud Platform API)
  * UNSPLASH_KEY  (Unsplash API)
  * FLICKR_KEY  (Flickr API)
  * GETTY_IMAGES_KEY  (Getty Images API)
  * AMANA_KEY  (Amana images API)

<!-- ## Transparent Home画面 データオブジェクト　(β ver, 7/5/2018)

#### Projectオブジェクト ： プロジェクト情報の取得に使用します。

    Project = {

      id : NUM,

      custom_id : STRING, // custom id

      name : STRING, // wall name

      url : STRING, // project home url link

      default_langcode : STRING, // default language code

      created_at : ISOString, // time when created

      updated_at : ISOString // time when updated

    }

#### Userオブジェクト ： ユーザーの情報を保持したオブジェクトです。

    User = {

      id : NUM,

      uid : STRING,

      name : STRING, // wall name

      title : STRING, // job title

      photo_url : STRING, // user icon image link

      primary_langcode : STRING, // primary language code

      is_admin : BOOLEAN, // if is admin member of the project

      created_at : ISOString, // time when created

      updated_at : ISOString // time when updated

    }

#### Wallオブジェクト ： Wallのサムネイル生成に必要なデータオブジェクトです。

    Wall = {

      id : NUM,

      project_id : NUM, // project id  

      name : STRING, // wall name

      url : STRING, // wall url link

      default_langcode : STRING, // default language code

      image_url_list :  List[ STRING ], // list of image url

      is_live : BOOLEAN, // is live

      created_at : ISOString, // time when created

      updated_at : ISOString // time when updated

    } -->

<!-- ## Transparent Home画面 API (β ver, 7/5/2018)

取得するデータのサンプルは"/src-front/beta/DataSampleHome.js"を参考にしてください。

#### プロジェクト情報の取得 ： プロジェクト情報をサーバーから取得します。

"GET", "/api/project/" + project_id

    responseBody = {

        project : object( project ),

    }

#### プロジェクトメンバーリストの取得 ： プロジェクトに紐づくユーザーの情報をサーバーから取得します。

"GET", "/api/project/" + project_id + "/users/"

    responseBody = {

        users :  List[ object( User ) ]

    }


#### Wallリストの取得 ： プロジェクトに紐づくWallのリストを取得します。

レイテンシ最適化のためにWallの一覧を取得したいと思います。

"GET", "/api/project/" + project_id + "/walls/" + limit（wallデータ取得上限）

    responseBody = {

        walls : List[ object( Wall ) ]

    } -->

## Transparent Wall画面 データオブジェクト　(α ver, 5/1/2018)

主にウェブアプリに表示するのは検索に使用したワード（Searchオブジェクト）とそれに付随した関連コンテンツ（RelatedContentオブジェクト）になります。認識した音声のテキスト情報はDBのTranscriptテーブルに保存しています。

### ERD図

![Transparent Domain Model](https://github.com/InolabSF/transparent-web-dev/blob/refactoring/erd.pdf)


<!-- #### Transcript オブジェクト ： ユーザーの声から取得した発言情報

    Transcript = {

      id : NUM,

      text : STRING, // text recognized from user voice input

      user : Object(User), // user information

      context : Object(Context), // conversation cotext information

      entities : List[ object( Entity ) ], // entity extracted from transcript

      has_content : BOOLEAN, // if has related_contents

      is_visible : BOOLEAN, // if is visible

      created_at : ISOString // time when created

      updated_at : ISOString // time when updated

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

#### Searchオブジェクト ： 検索に使用した情報（ワード）です. α版ではコメントカードに出力します.

複数のワード情報がある場合はコメントカードに並列出力するようにしてください.

    Search = {

      id : NUM,

      transcript_id : NUM, // related transcript id

      words : list ( STRING ), // words used for search

      is_visible : BOOLEAN, // if is visible

      mode : STRING, // search type ( image, webpage, video )

      created_at : ISOString, // time when created

      updated_at : ISOString // time when updated

    }

#### RelatedContentオブジェクト ： 検索結果のコンテンツ情報です. α版ではコメントカードに関連づけて表示します.

どのコメントカードに紐付けるかは'search_id'で識別します.

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

      created_at : ISOString, // time when created

      updated_at : ISOString // time when updated

    }

<!-- #### Conditionオブジェクト ： 関連コンテンツを検索するための条件（α版アプリでは使用しません）

    Condition = {

      related_content_id : NUM, // related content id

      service : STRING,　// API service for search

      word : String // word for search

    } -->


## Transparent Wall画面 API　(a ver, 5/1/2018)

α版Transparentに必要なAPI群をまとめています.

- データ取得方法に関しては"/app/assets/javascripts/front/alpha/grid/api.js"を参考にしてください.
- 全てのAPIエンドポイントはtrnspt.comドメインにて動作しています.

  APIエンドポイント例）<https://trnspt.com/api/transcripts/2>

### 初期コンテンツロード（検索キーワード, 関連コンテンツ）の取得

"GET", "/api/transcripts/" + wall_id

    responseBody = {

        searches : List[ object( Search ) ],

        search_last_index : NUM, // 最も新しいsearch.id情報. コンテンツの更新に使用します.

        search_first_index : NUM, // 最も古いsearch.id情報. コンテンツの更新に使用します.

        related_contents : List[ object( RelatedContent ) ],

        related_content_last_index : NUM　// 最も新しいrelated_content.id情報. コンテンツの更新に使用します.

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

        search_last_index : 21,

        search_first_index : 1,

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

        related_content_last_index : 103

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

### 更新情報ロード（検索キーワード, 関連コンテンツ）の取得

"GET", "/api/transcripts/" + wall_id + "/" + search_last_index + "/" + related_content_last_index

    responseBody = {

        searches : List[ object( Search ) ],

        search_last_index : NUM,　// 最も新しいsearch.id. コンテンツの更新に使用します.

        related_contents : List[ object( RelatedContent ) ],

        related_content_last_index : NUM　// 最も新しいrelated_content.id. コンテンツの更新に使用します.

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

        search_last_index : 22,

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

        related_content_last_index : 104

    }

#### Sample Request 2

  "GET", "/api/transcripts/1/22/104"

#### Sample Response 2

    responseBody = {

        searches : [],

        search_last_index : 22,

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

        related_content_last_index : 106

    }

### 過去コンテンツ（初期コンテンツより古いもの）のロード（検索キーワード, 関連コンテンツ）の取得

"GET", "/api/transcripts/" + wall_id + "/" + search_first_index

    responseBody = {

        searches : List[ object( Search ) ],

        search_first_index : NUM, // 最も古いsearch.id情報. コンテンツの更新に使用します.

        related_contents : List[ object( RelatedContent ) ]

    }

#### Sample Request 1

  "GET", "/api/transcripts/3/15"

#### Sample Response 1

    responseBody = {

        searches : [

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

        search_first_index : 13,

        related_contents : [

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
                "condition":{"service": "MS Bing Image Search API", "word": "san francisco soccer"}
            }

        ]

    }


### 認識テキストのPOST（transcript(テキスト), langcode, wallID, search_type, with_words(&検索ワード), UI_version）

"POST", "/api/transcripts/"

    requestBody = {

        transcript　: STRING,

        langcode: "en-US" or "ja-JP",

        wallID : NUM,  

        search_type : NUM, (0:image, 1:webpage, 2:video)

        with_words : List[ STRING ],

        UI_version : "alpha" (demo, alpha, beta)


    }

#### Sample Request Body

    requestBody = {

        "transcript": "今日は六本木にいきましょう",

        "langcode": "ja-JP",

        "wallID": 3,

        "search_type": 1,

        "with_words": [ "クール" ],

        "UI_version": "alpha"
    }

### コメントカードの削除

"GET", "/api/update/searches/" + search_id

### 画像の削除

"GET", "/api/update/contents/" + related_content_id
