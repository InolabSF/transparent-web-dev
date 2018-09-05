// let searches = [];
// let related_contents = [];
let firstSearch;
let contentsFetched = false;
let isLoading = false;
// const maxResults = 10;

initFirebase = () => {
  const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);
}
initFirebase();

fetchSearches = () => {
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);
  const maxResults = 10;
  const searchesRef = db.collection('searches')
    // .where(`walls.${wallId.toString()}`, '==', true)
    .where('wall_id', '==', wallId.toString())
    .orderBy('created_at', 'desc')
    .limit(maxResults);

  searchesRef.onSnapshot((snapshot) => {
    // const searches = [];
    snapshot.docChanges().reverse().forEach(function(change) {
      if (change.type === "added") {
        console.log("Added Doc: ", change.doc.data());
        const doc = change.doc;
        const search = doc.data();
        search.id = doc.id;
        search.words = search.words_array;
        search.created_at = search.created_at.toDate();
        search.updated_at = search.updated_at.toDate();
        // searches.push(search);
        const searches = [ search ];
        const related_contents = [];
        TRANSCRIPTS.prependContents({ searches, related_contents });
      }
      if (change.type === "modified") {
        console.log("Modified Doc: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed Doc: ", change.doc.data());
      }
    });
    // querySnapshot.forEach((doc) => {
    //
    // });
    firstSearch = snapshot.docs[snapshot.docs.length - 1];
    if (!contentsFetched) {
      contentsFetched = true;
      fetchContents(firstSearch);
    }
    // related_contents = [];
    // TRANSCRIPTS.prependContents({ searches, related_contents });
  })
}

fetchContents = (lastVisible) => {
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);
  const contentsRef = db.collection('contents')
    .where('wall_id', '==', wallId.toString())
    .where('search_id', '>=', lastVisible.id)

  contentsRef.onSnapshot((snapshot) => {
    const related_contents = [];
    snapshot.docChanges().forEach(function(change) {
      if (change.type === "added") {
        const doc = change.doc;
        const content = doc.data();
        content.id = doc.id;
        content.created_at = content.created_at.toDate();
        content.updated_at = content.updated_at.toDate();
        related_contents.push(content);
        // ここで１つずつrelated_contentsを追加する方が動作が軽い可能性もある
      }
      if (change.type === "modified") {
          console.log("Modified Doc: ", change.doc.data());
      }
      if (change.type === "removed") {
          console.log("Removed Doc: ", change.doc.data());
      }
    });
    TRANSCRIPTS.addContents(related_contents);
  });
}

loadPastContents = () => {
// getContents = () => {
  if (firstSearch && !firstSearch.isSearched) {
    firstSearch.isSearched = true;
    const maxResults = 5;
    const db = firebase.firestore();
    const settings = {
      timestampsInSnapshots: true
    };
    db.settings(settings);
    const pastSearchesRef = db.collection('searches')
      .where('wall_id', '==', wallId.toString())
      .orderBy('created_at', 'desc')
      .startAfter(firstSearch)
      .limit(maxResults);

    pastSearchesRef.onSnapshot((snapshot) => {
      // searches = [];
      snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          const doc = change.doc;
          const search = doc.data();
          search.id = doc.id;
          search.words = search.words_array;
          search.created_at = search.created_at.toDate();
          search.updated_at = search.updated_at.toDate();
          // searches.push(search);
          const searches = [ search ];
          const related_contents = [];
          TRANSCRIPTS.appendContents({ searches, related_contents });
        }
        if (change.type === "modified") {
            console.log("Modified Doc: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed Doc: ", change.doc.data());
        }
      });
      relateContents(firstSearch, maxResults);
      firstSearch = snapshot.docs[snapshot.docs.length - 1];
    })
  }
}

relateContents = (lastVisible, number) => {
  const endCursorInt = parseInt(lastVisible.id, 10) + number
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);
  const contentsRef = db.collection('contents')
    .where('wall_id', '==', wallId.toString())
    .where('search_id', '>=', lastVisible.id)
    .where('search_id', '<', endCursorInt.toString());

  contentsRef.onSnapshot((snapshot) => {
    const related_contents = [];
    snapshot.docChanges().forEach(function(change) {
      if (change.type === "added") {
        const doc = change.doc;
        const content = doc.data();
        content.id = doc.id;
        content.created_at = content.created_at.toDate();
        content.updated_at = content.updated_at.toDate();
        related_contents.push(content);
        // ここで１つずつrelated_contentsを追加する方が動作が軽い可能性もある
      }
      if (change.type === "modified") {
          console.log("Modified Doc: ", change.doc.data());
      }
      if (change.type === "removed") {
          console.log("Removed Doc: ", change.doc.data());
      }
    });
    TRANSCRIPTS.addContents(related_contents);
  });
}

window.addEventListener('load', fetchSearches, false);
// window.addEventListener('load', fetchContents, false);
