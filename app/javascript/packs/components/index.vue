<template>



  <div>

        <div v-on:click="updateDOMloop" class="btn-floating waves-effect waves-light red">
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
            <div class="card" >
              <table >
                <font color='#607780'>
                <tr>
                  <td></td>
                  <td>
                    <font>
                      <h5>Related Contents</h5>
                    </font>
                  </td>
                </tr>
                </font>
              </table>
            </div>
            <div class="card" >
              <table >
                <font color='#607780'>
                <tr>
                  <td></td>
                  <td>
                    <p> userid : {{ transcript.user_id }} </p>
                    <p> transcript : {{ transcript.text }} </p>
                    <p> conversation state : state </p>
                    <p> source type : source </p>
                    <p> link url : link </p>
                  </td>
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
        page: 0
      }
    },
    mounted: function () {
      this.fetchTranscripts();
    },
    methods: {
      updateDOMloop: function() {
          updateDOMfunction(this.page, this.transcripts);
      },
      fetchTranscripts: function () {
        axios.get('/api/transcripts').then((response) => {
          for(var i = 0; i < response.data.transcripts.length; i++) {
            this.transcripts.push(response.data.transcripts[i]);
          }
          this.page = response.data.length;
        }, (error) => {
          console.log(error);
        });
      }
    }
  }

  function updateDOMfunction(page, transcripts) {
    axios.get('/api/entities/'+page).then((response) => {
      for(var i = 0; i < response.data.transcripts.length; i++) {
        var transcript = response.data.transcripts[i];
        transcripts.unshift(transcript);
      }
      page += response.data.entities.length;
    }, (error) => {
      console.log(error);
      updateDOMfunction(page, transcripts);
    }).then((response) => {
      updateDOMfunction(page, transcripts);
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
