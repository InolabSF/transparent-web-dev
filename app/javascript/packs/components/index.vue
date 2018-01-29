<template>

  <div>
        <div v-on:click="stream" class="btn-floating waves-effect waves-light red">
          <i class="material-icons">add</i>
        </div>

        <div class="columns medium-3" v-for="transcript in transcripts">
            <div class="card" >
                <table bgcolor='#607780' style="padding:30;">
                  <tr>
                    <td></td>
                    <td>
                    <font color='#D2D8D9'>
                      <h5>{{ transcript.text }}</h5>
                    </font>
                    </td>
                    <td></td>
                  </tr>

                </table>
            </div>
            <div class="columns medium-3" v-if="transcript.has_content">

            <div class="card" >
                <div class="columns medium-3" v-for="related_content in transcript.related_contents">
                    <div v-if="related_content.awesome">

                        <div v-if="related_content.awesome != 0">
                            <table bgcolor='#B7414B' >
                                <tr>
                                    <td></td>
                                    <td>

                                        <a :href="related_content.url" target="_blank"><img :src="related_content.img_url"></a>

                                    </td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                        <div v-else>
                            <table bgcolor='#607780' >
                                <tr>
                                    <td></td>
                                    <td>

                                        <a :href="related_content.url" target="_blank"><img :src="related_content.img_url"></a>

                                    </td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>

                    </div>
                    <div v-else>
                        <table bgcolor='#607780' >
                            <tr>
                                <td></td>
                                <td>

                                    <a :href="related_content.url" target="_blank"><img :src="related_content.img_url"></a>

                                </td>
                                <td></td>
                            </tr>
                        </table>
                    </div>


              </div>
            </div>
            </div>

            <div class="columns medium-3" v-for="i in transcript.related_contents.length">

            <div class="card" >
              <table>
              <font color='black'>
                <tr>
                  <td></td>
                  <td>
                    <h5> Related Content Information {{i}} </h5>
                  </td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <p> Title : {{ transcript.related_contents[i-1].title }} </p>
                    <p> Desc : {{ transcript.related_contents[i-1].desc }} </p>
                    <div class="columns medium-3" v-if="transcript.related_contents[i-1].condition">
                    <p> Search  Service : {{transcript.related_contents[i-1].condition.service }}</p>
                    <p> Search Words : {{ transcript.related_contents[i-1].condition.word }}</p>
                    </div>
                  </td>
                </tr>

              </font>
              </table>
            </div>

            </div>

            <div class="card" >
              <table>
              <font color='black'>
                <tr>
                  <td></td>
                  <td>
                    <p> Created_at : {{transcript.created_at}} </p>
                    <p> User ID : {{ transcript.user.facebook_id }} </p>
                    <p> Conversation State :  {{ transcript.context.state }} </p>
                    <div class="columns medium-3" v-for="i in transcript.entities.length">
                      <p> Recognized Entity {{i}} : { name : {{ transcript.entities[i-1].name }} , category : {{ transcript.entities[i-1].category }} } </p>
                    </div>
                  </td>
                  <td></td>
                </tr>

              </font>
              </table>
            </div>
        </div>
  </div>

</template>

<script>
  import axios from 'axios';

  export default {
    data: function () {
      return {
        transcripts: [],
        index: 0
      }
    },
    mounted: function () {
      this.fetchTranscripts();
    },
    methods: {
      stream: function() {
          updateDOM(this.index, this.transcripts);
      },
      fetchTranscripts: function () {
        axios.get('/api/transcripts').then((response) => {
          for(var i = 0; i < response.data.transcripts.length; i++) {
            this.transcripts.push(response.data.transcripts[i]);
          }
          this.index = response.data.index;
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

  function updateDOM(index, transcripts) {
    axios.get('/api/transcripts/'+index).then((response) => {
      for(var i = 0; i < response.data.transcripts.length; i++) {
        var transcript = response.data.transcripts[i];
        transcripts.unshift(transcript);
      }
      index += response.data.transcripts.length;
    }, (error) => {
      console.log(error);
      updateDOM(index, transcripts);
    }).then((response) => {
      updateDOM(index, transcripts);
    },
    );
  }
</script>


<style scoped>
  [v-cloak] {
    display: none;
  }
  .display_none {
    display:none;
  }
  // 打ち消し線を引く
  .line-through {
    text-decoration: line-through;
  }
  .pad {
    padding: 10;
  }
</style>
