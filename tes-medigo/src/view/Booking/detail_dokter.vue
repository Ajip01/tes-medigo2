<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>Detail Dokter</strong>
          </div>
          <b-form>
            <b-form-group
              label="Nama"
              label-for="basicText"
              :label-cols="3"
              :horizontal="true">
              <b-form-input
                id="nama"
                type="text"
                autocomplete="nama"
                v-model="nama"
                disabled="disabled">
              </b-form-input>
            </b-form-group>
            <b-form-group
            label="Jenis Kelamin"
            label-for="basicText"
            :label-cols="3"
            :horizontal="true">
              <b-form-input
                id="jenis_kelamin"
                type="text"
                autocomplete="jenis_kelamin"
                v-model="kelamin"
                disabled="disabled">
              </b-form-input>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>Jadwal Praktik Terdekat</strong>
          </div>

          <div id="tabel_jadwal">
            <vuetable ref="vuetable"
                      :api-mode="false"
                      :data="tableData4"
                      :fields="fields4"
                      data-path="data"
                      pagination-path="pagination"
                      @vuetable:pagination-data="onPaginationData"
            >
              <template slot="actions" scope="props">
                <div style="width:100%;">
                  <div v-if="seen(props.rowData.flag_dipilih)" class="view" style="display: inline-block;padding:3px;">
                    <button class="btn btn-success" @click="onClick(props.rowData)">
                      Buat Janji
                    </button>
                  </div>
                </div>
              </template>
            </vuetable>
            <!--<div class="vuetable-pagination ui basic segment grid">-->
            <!--<vuetable-pagination-info ref="paginationInfo">-->
            <!--</vuetable-pagination-info>-->
            <!--</div>-->
            <!--<vuetable-pagination  :on-each-side="2" ref="pagination"-->
            <!--@vuetable-pagination:change-page="onChangePage"-->
            <!--&gt;-->
            <!--</vuetable-pagination>-->
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>Lokasi Praktik</strong>
          </div>

          <div id="tabel_lokasi">
            <vuetable ref="vuetable"
                      :api-mode="false"
                      :data="tableData3"
                      :fields="fields3"
                      data-path="data"
                      pagination-path="pagination"
                      @vuetable:pagination-data="onPaginationData"
            >
            </vuetable>
            <!--<div class="vuetable-pagination ui basic segment grid">-->
            <!--<vuetable-pagination-info ref="paginationInfo">-->
            <!--</vuetable-pagination-info>-->
            <!--</div>-->
            <!--<vuetable-pagination  :on-each-side="2" ref="pagination"-->
            <!--@vuetable-pagination:change-page="onChangePage"-->
            <!--&gt;-->
            <!--</vuetable-pagination>-->
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>Daftar Keahlian</strong>
          </div>

          <div id="tabel_keahlian">
            <vuetable ref="vuetable"
                      :api-mode="false"
                      :data="tableData"
                      :fields="fields"
                      data-path="data"
                      pagination-path="pagination"
                      @vuetable:pagination-data="onPaginationData"
            >
            </vuetable>
            <!--<div class="vuetable-pagination ui basic segment grid">-->
              <!--<vuetable-pagination-info ref="paginationInfo">-->
              <!--</vuetable-pagination-info>-->
            <!--</div>-->
            <!--<vuetable-pagination  :on-each-side="2" ref="pagination"-->
                                  <!--@vuetable-pagination:change-page="onChangePage"-->
            <!--&gt;-->
            <!--</vuetable-pagination>-->
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>Daftar Penyakit Yang Ditangani</strong>
          </div>

          <div id="tabel_penyakit">
            <vuetable ref="vuetable"
                      :api-mode="false"
                      :data="tableData2"
                      :fields="fields2"
                      data-path="data"
                      pagination-path="pagination"
                      @vuetable:pagination-data="onPaginationData"
            >
            </vuetable>
            <!--<div class="vuetable-pagination ui basic segment grid">-->
              <!--<vuetable-pagination-info ref="paginationInfo">-->
              <!--</vuetable-pagination-info>-->
            <!--</div>-->
            <!--<vuetable-pagination  :on-each-side="2" ref="pagination"-->
                                  <!--@vuetable-pagination:change-page="onChangePage"-->
            <!--&gt;-->
            <!--</vuetable-pagination>-->
          </div>
          <div slot="footer">
            <b-row align-v="center">
              <b-col></b-col>
              <b-col lg="auto" md="auto" sm="auto" cols="auto">
                <b-button
                  size="m"
                  variant="secondary"
                  style="margin-right:5px;height:29px;width:140px;"
                  @click="myModal=true"
                >
                  <strong>
                    <i class="fa fa-times"></i> Kembali
                  </strong>
                </b-button>
              </b-col>
              <b-col></b-col>
            </b-row>
            <b-modal
              title="Kembali Ke Halaman Filter?"
              v-model="myModal"
              ok-variant="danger"
              ok-title="Ya"
              cancel-variant="secondary"
              cancel-title="Tidak"
              @ok="$router.go(-1)"
              @cancel="myModal=false"
              centered
            >
              Kembali ke halaman utama ?
            </b-modal>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
  import axios from 'axios'

  let tableColumns = [
    {
      name: 'nama',
      title: 'Nama Keahlian',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    }
  ]

  let tableColumns2 = [
    {
      name: 'nama',
      title: 'Nama Penyakit',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    }
  ]

  let tableColumns3 = [
    {
      name: 'nama',
      title: 'Nama Faskes',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    },
    {
      name: 'alamat',
      title: 'Alamat',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    }
  ]

  let tableColumns4 = [
    {
      name: 'nama',
      title: 'Lokasi',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    },
    {
      name: 'tanggal_praktik',
      title: 'Tanggal Praktek',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    },
    {
      name: 'jam',
      title: 'Waktu',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    },
    {
      name: '__slot:actions',
      title: '',
      titleClass: 'center aligned',
      dataClass: 'center aligned'
    }
  ]

  export default {
    name: "detail_dokter",
    components: {
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo
    },

    data: function () {
      return {
        myModal: false,
        fields: tableColumns,
        fields2: tableColumns2,
        fields3: tableColumns3,
        fields4: tableColumns4,
        nama: '',
        kelamin: '',
        tableData: {
          data: [],
          pagination: {
            'total': 10,
            'per_page': 10,
            'current_page': 1,
            'last_page': 1,
            'next_page_url': null,
            'prev_page_url': null,
            'from': 1,
            'to': 1
          }
        },
        tableData2: {
          data: [],
          pagination: {
            'total': 10,
            'per_page': 10,
            'current_page': 1,
            'last_page': 1,
            'next_page_url': null,
            'prev_page_url': null,
            'from': 1,
            'to': 1
          }
        },
        tableData3: {
          data: [],
          pagination: {
            'total': 10,
            'per_page': 10,
            'current_page': 1,
            'last_page': 1,
            'next_page_url': null,
            'prev_page_url': null,
            'from': 1,
            'to': 1
          }
        },
        tableData4: {
          data: [],
          pagination: {
            'total': 10,
            'per_page': 10,
            'current_page': 1,
            'last_page': 1,
            'next_page_url': null,
            'prev_page_url': null,
            'from': 1,
            'to': 1
          }
        },
        url_fetch: ''
      }
    },

    created(){
      axios.get('http://localhost:3000/dokter/' + this.$route.params.id
      )
        .then((resp) => {
          console.log(resp.data)
          this.nama = resp.data.nama
          this.kelamin = resp.data.jenis_kelamin
        })

      axios.get('http://localhost:3000/keahlian?id_dokter=' + this.$route.params.id
      )
        .then((resp) => {
          //console.log(resp.data)
          for(var i=0; i < resp.data.length; i++){
            this.tableData.data.push({"nama":resp.data[i].nama})
          }
        })

      axios.get('http://localhost:3000/penyakit?id_dokter=' + this.$route.params.id
      )
        .then((resp) => {
          //console.log(resp.data)
          for(var i=0; i < resp.data.length; i++){
            this.tableData2.data.push({"nama":resp.data[i].nama})
          }
        })

      axios.get('http://localhost:3000/faskes_praktek?id_dokter=' + this.$route.params.id
      )
        .then((resp) => {
          //console.log(resp.data)
          for(var i=0; i < resp.data.length; i++){
            this.tableData3.data.push({"nama":resp.data[i].nama,"alamat":resp.data[i].alamat})
          }
        })

      axios.get('http://localhost:3000/jadwal_praktek?id_dokter=' + this.$route.params.id
      )
        .then((resp) => {
          //console.log(resp.data)
          for(var i=0; i < resp.data.length; i++){
            this.tableData4.data.push({"id":resp.data[i].id, "nama":resp.data[i].nama,
              "tanggal_praktik":resp.data[i].tanggal_praktik, "jam":resp.data[i].jam,
              "flag_dipilih":resp.data[i].flag_dipilih})
          }
        })
    },

    methods: {
      onClick(item){
        console.log(item)

        axios.put('http://localhost:3000/jadwal_praktek/'+ item.id, {
          id : item.id,
          id_dokter : this.$route.params.id,
          nama : item.nama,
          tanggal_praktik : item.tanggal_praktik ,
          jam : item.jam,
          flag_dipilih : true
        })
          .then((resp) => {
          console.log(resp.data)
          alert('Anda telah membuat janji dengan dokter di jadwal yang anda pilih')
          location.reload()
        })
          .catch(error => {
          console.log(error);
        });

        // axios.get('http://localhost:3000/jadwal_praktek?id_dokter=' + this.$route.params.id
        // )
        //   .then((resp) => {
        //     //console.log(resp.data)
        //     this.tableData4.data.length = 0
        //
        //     for(var i=0; i < resp.data.length; i++){
        //       this.tableData4.data.push({"id":resp.data[i].id, "nama":resp.data[i].nama,
        //         "tanggal_praktik":resp.data[i].tanggal_praktik, "jam":resp.data[i].jam,
        //         "flag_dipilih":resp.data[i].flag_dipilih})
        //     }
        //   })
      },
      seen: function(item) {
        var flagValid = localStorage.getItem("flag_online")
        console.log(typeof(flagValid))
        if (item || flagValid == 'false') {
          console.log('tes')
          return false
        } else {
          return true
        }
      },
    }
  }
</script>

<style scoped>

</style>
