<template>

  <div>

        <p>  </p>
        <button v-on:click="start">Stream</button>
        <button v-on:click="pause">Pause</button>

        <div class="columns medium-3" v-for="transcript in transcripts">
            <div class="card" >
                <table bgcolor='#09506B' style="padding:30;">
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

                <div v-if="transcript.related_contents.length != 0">

                    <div v-if="transcript.related_contents[0].awesome">

                          <div v-if="transcript.related_contents[0].awesome != 0">
                              <table bgcolor='#607780' >
                                  <tr bgcolor='#B7414B'>
                                      <td></td>

                                      <div class="columns medium-3" v-for="related_content in transcript.related_contents">
                                          <td>
                                              <a :href="related_content.url" target="_blank"><img :src="related_content.img_url"></a>
                                          </td>
                                      </div>

                                      <td></td>
                                  </tr>
                              </table>
                          </div>
                          <div v-else>
                              <table bgcolor='#09506B' >
                                  <tr>
                                      <td></td>

                                      <div class="columns medium-3" v-for="related_content in transcript.related_contents">
                                          <td>
                                              <a :href="related_content.url" target="_blank"><img :src="related_content.img_url"></a>
                                          </td>
                                      </div>

                                      <td></td>
                                  </tr>
                              </table>
                          </div>

                    </div>
                    <div v-else>
                          <table bgcolor='#09506B' >
                              <tr>
                                  <td></td>
                                  <div class="columns medium-3" v-for="related_content in transcript.related_contents">
                                      <td>
                                          <a :href="related_content.url" target="_blank"><img :src="related_content.img_url"></a>
                                      </td>
                                  </div>
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
                    <p> Source : {{ transcript.related_contents[i-1].source }} </p>
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
        wall_id: 2,
        index: 0,
        stream: false

      }
    },
    mounted: function () {
      this.fetchTranscripts();
    },
    methods: {
      start: function() {
          this.stream = true


          updateDOM(this.wall_id, this.index, this.transcripts, this.stream);
      },
      pause: function() {
          location.reload();
      },
      fetchTranscripts: function () {
        axios.get('/api/transcripts/'+this.wall_id).then((response) => {
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

  function updateDOM(wall_id, index, transcripts, stream) {
    axios.get('/api/transcripts/'+wall_id+'/'+index).then((response) => {

      if(response.data.index != index){
        if(response.data.transcripts[0].text != transcripts[0].text ){
          index += response.data.transcripts.length;
          for(var i = 0; i < response.data.transcripts.length; i++) {
            var transcript = response.data.transcripts[i];
            if(transcript.context.reaction){
              if(transcript.context.reaction == 'AWESOME'){
                  if(transcripts[0].has_content){
                      for(var i = 0; i < transcripts[0].related_contents.length; i++) {
                          transcripts[0].related_contents[i].awesome += 1;
                      }
                  }
              }
            }
            transcripts.unshift(transcript);
            transcript = null;
          }
        }}
    }, (error) => {
      console.log(error);
      if (stream) {
          updateDOM(wall_id, index, transcripts, stream);
      }
    }).then((response) => {
      if (stream) {
          updateDOM(wall_id, index, transcripts, stream);
      } else {
          console.log('straeming stopped');
      }
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
</style>
