<template>
  <div class="container-fluid">
  <h1 class="fortest">Noam DB</h1>
  <div class="row">
    <div class="col-md-12 buttons">
      <button type="button" name="button" @click="putOnDb" class="btn btn-primary">Put</button>
      <button type="button" name="button" @click="show" class="btn btn-primary">Show</button>
      <button type="button" name="button" @click="remove" class="btn btn-danger">Remove</button>
    </div>
  </div>
<h2>Messages</h2>
  <div class="row">
    <div class="col-md-3 db">
      <h3>HE</h3>
      <table class="table table-bordered table-dark msg-table">
      <thead>
        <tr>
          <th>recordID</th>
          <th>msgid</th>
          <th>msg</th>
        </tr>
      </thead>
      <tbody v-for="item in data.he">
        <tr>
          <td>{{item.recordID}}</td>
          <td>{{item.msgid}}</td>
          <td>{{item.msg}}</td>
        </tr>
      </tbody>
    </table>
  </div>
    <div class="col-md-3 db">
    <h3>EN</h3>
    <table class="table table-bordered table-dark msg-table">
    <thead>
      <tr>
        <th>recordID</th>
        <th>msgid</th>
        <th>msg</th>
      </tr>
    </thead>
    <tbody v-for="item in data.en">
      <tr>
        <td>{{item.recordID}}</td>
        <td>{{item.msgid}}</td>
        <td>{{item.msg}}</td>
      </tr>
    </tbody>
    </table>
  </div>

    <div class="col-md-3 db">
    <h3>SP</h3>
    <table class="table table-bordered table-dark msg-table">
    <thead>
      <tr>
        <th>recordID</th>
        <th>msgid</th>
        <th>msg</th>
      </tr>
    </thead>
    <tbody v-for="item in data.sp">
      <tr>
        <td>{{item.recordID}}</td>
        <td>{{item.msgid}}</td>
        <td>{{item.msg}}</td>
      </tr>
    </tbody>
    </table>
    </div>
  </div>


  </div>
</template>

<script>
import Pouch from 'pouchdb-browser'
const db = new Pouch('database')
export default {
  name: 'app',
  created() {
  },
  data() {
    return {
      data: {
        en: [],
        he: [],
        sp: [],
        doc: {},
        dataSet: false
      }
    }
  },
  methods: {
    putOnDb() {
      if (this.data.dataSet) {
        return
      }
      const messages = { lang: {
        he: [
          {
            recordID: 1,
            msgid: '1',
            msg: 'lo'
          },
          {
            recordID: 2,
            msgid: '2',
            msg: 'mevin'
          },
          {
            recordID: 3,
            msgid: '3',
            msg: 'klum'
          }
        ],
        en: [
          {
            recordID: 4,
            msgid: '1',
            msg: 'dont'
          },
          {
            recordID: 5,
            msgid: '2',
            msg: 'undersand'
          },
          {
            recordID: 6,
            msgid: '3',
            msg: 'anything'
          }
        ],
        sp: [
          {
            recordID: 7,
            msgid: '1',
            msg: 'no'
          },
          {
            recordID: 8,
            msgid: '2',
            msg: 'entende'
          },
          {
            recordID: 9,
            msgid: '3',
            msg: 'nada'
          }
        ]
      } }
      // const locations = [
      //   {
      //     recordID: 1,
      //     Language: 'he',
      //     msgid: '1',
      //     msg: 'sherutim',
      //   },
      //   {
      //     recordID: 2,
      //     Language: 'he',
      //     msgid: '2',
      //     msg: 'kaspomat',
      //   },
      //   {
      //     recordID: 3,
      //     Language: 'he',
      //     msgid: '3',
      //     msg: 'supermarket',
      //   },
      //   {
      //     recordID: 4,
      //     Language: 'en',
      //     msgid: '1',
      //     msg: 'toilets',
      //   },
      //   {
      //     recordID: 5,
      //     Language: 'en',
      //     msgid: '2',
      //     msg: 'ATM',
      //   },
      //   {
      //     recordID: 6,
      //     Language: 'en',
      //     msgid: '3',
      //     msg: 'supermarket',
      //   },
      //   {
      //     recordID: 7,
      //     Language: 'sp',
      //     msgid: '1',
      //     msg: 'excusado',
      //   },
      //   {
      //     recordID: 8,
      //     Language: 'sp',
      //     msgid: '2',
      //     msg: 'Bank',
      //   },
      //   {
      //     recordID: 9,
      //     Language: 'sp',
      //     msgid: '3',
      //     msg: 'supermarket',
      //   },
      // ];
      db.post(messages, () => {
        this.data.dataSet = true
      })
      this.show()
    },
    show() {
      db.allDocs({ include_docs: true, descending: true }, (err, doc) => {
        if (err) {
          console.log(err.stack)
          return
        }
        if (doc.total_rows === 0) {
          return
        }
        this.data.he = doc.rows[0].doc.lang.he
        this.data.en = doc.rows[0].doc.lang.en
        this.data.sp = doc.rows[0].doc.lang.sp
        this.data.doc = doc.rows[0]
        this.data.dataSet = true
      })
    },
    remove() {
      if (!this.data.dataSet) {
        return
      }
      db.get(this.data.doc.id).then(doc => db.remove(doc)).then(() => {
        this.data = {
          en: [],
          he: [],
          sp: [],
          doc: {}
        }
        this.data.dataSet = false
      })
    }
  }
}
</script>

<style>
.buttons {
  margin-bottom: 10px;
}
</style>
