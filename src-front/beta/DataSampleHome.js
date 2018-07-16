// Transparent Home Data Sample

  const datetimeSample = Date();

    // Project Object
  const project = {

    id: 1,

    custom_id: 'sampleproject', // project custom id

    name: 'Sample Project', // project name

    url: 'https://trnspt.com/', // project home url link

    default_langcode: 'ja', // default language code

    created_at: datetimeSample, // time when created

    updated_at: datetimeSample // time when updated

  }

    // User Object
  const user0 = {

    id: 1,

    uid: 'vRKsHA88s1djN8VeDZH4mKBJPcL2',

    name: 'User Name0', // wall name

    title: 'Designer', // job title

    photo_url: 'https://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg', // user icon image link

    primary_langcode: 'ja', // primary language code

    is_admin: true, // if is admin member of the project

    created_at: datetimeSample, // time when created

    updated_at: datetimeSample // time when updated

  }

  const user1 = {

    id: 2,

    uid: 'svRdeSZEqAYyWXTgBfeI3Ut0L5j2',

    name: 'User Name1', // wall name

    title: 'Engineer', // job title

    photo_url: 'https://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/people19.png', // user icon image link

    primary_langcode: 'ja', // primary language code

    is_admin: false, // if is admin member of the project

    created_at: datetimeSample, // time when created

    updated_at: datetimeSample // time when updated

  }

    // Wall Object
  const Wall0 = {

    id: 1,

    project_id: 1, // project id

    name: 'サンプルウォール', // wall name

    url: 'https://trnspt.com/alpha/test/ja?view=chaos', // wall url link

    default_langcode: 'ja', // default language code

    image_url_list: [ // list of image url

      'https://images.unsplash.com/photo-1468277799724-b8ecdfa2cd7a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI1MTU3fQ&s=b4b58881761aae5b3abb3b1644975f00',
      'https://images.unsplash.com/photo-1516624102263-0ec412afe191?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI1MTU3fQ&s=fe94e7813f9804e0d6f927950e28507f',
      'https://images.unsplash.com/photo-1502078534399-8190479363f5?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI1MTU3fQ&s=230aba8a2cf1ca93a6a71ffa02f9a97b',
      'https://images.unsplash.com/photo-1516624102263-0ec412afe191?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI1MTU3fQ&s=fe94e7813f9804e0d6f927950e28507f',
      'https://images.unsplash.com/photo-1502078534399-8190479363f5?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI1MTU3fQ&s=230aba8a2cf1ca93a6a71ffa02f9a97b',
      'https://images.unsplash.com/photo-1468277799724-b8ecdfa2cd7a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI1MTU3fQ&s=b4b58881761aae5b3abb3b1644975f00',
      'https://images.unsplash.com/photo-1502078534399-8190479363f5?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI1MTU3fQ&s=230aba8a2cf1ca93a6a71ffa02f9a97b',
      'https://images.unsplash.com/photo-1468277799724-b8ecdfa2cd7a?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI1MTU3fQ&s=b4b58881761aae5b3abb3b1644975f00',
      'https://images.unsplash.com/photo-1516624102263-0ec412afe191?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjI1MTU3fQ&s=fe94e7813f9804e0d6f927950e28507f'
    ],

    is_live: false, // is live

    created_at: datetimeSample, // time when created

    updated_at: datetimeSample // time when updated

  }

  const Wall1 = {

    id: 2,

    project_id: 1, // project id

    name: 'Sample Wall', // wall name

    url: 'https://trnspt.com/alpha/test/en?view=chaos', // wall url link

    default_langcode: 'en', // default language code

    image_url_list: null,

    is_live: true, // is live

    created_at: datetimeSample, // time when created

    updated_at: datetimeSample // time when updated

  }

  // user array
  const users = [ user0, user1 ];

  // wall array
  const walls = [ wall0, wall1 ];
