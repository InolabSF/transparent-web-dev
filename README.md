
## Transparent　API構造　(5/1/2018)

α版フロント作成に使用するAPI群をまとめてみました。

## Transparent　データオブジェクト構造　(5/1/2018)

主にユーザーに提供するのはユーザー発言（Transcript）が持つテキスト情報（Transcript.text）とそれに付随した関連情報（Transcript.related_contents）になります。

#### Transcript オブジェクト ： ユーザーの声から取得した発言情報

    Transcript = {

      id : NUM,

      text : STRING, // text recognized from user voice input

      user : Object(User), // user information

      context : Object(Context), // conversation cotext information

      entities : List[ object( Entity ) ], // information extracted from transcript

      has_content : BOOLEAN, // if has related_contents

      is_visible : BOOLEAN, // if is visible

      created_at : DATETIME // time when created

      updated_at : DATETIME // time when updated

    }


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

      is_visible : BOOLEAN  // entity category

    }

#### RelatedContentオブジェクト ： ユーザー発言に関連するコンテンツ

    RelatedContent = {

      id : NUM,

      entity_id : NUM, // related entity id

      title : STRING, // content title

      desc : STRING, // content description

      url : STRING, // content web page url

      img_url : STRING, // content image url

      content_type : STRING, // content type ( webpage or image )

      source : STRING, // source type information (Youtube, Linkedin, SXSW official, etc.)

      condition : Object( Condition )  // search condition

    }

#### Conditionオブジェクト ： 関連コンテンツを検索するための条件

    Condition = {

      related_content_id : NUM, // related content id

      service : STRING,　// service for search

      word : String // word for search

    }
