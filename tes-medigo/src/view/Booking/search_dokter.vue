<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>Filter</strong>
          </div>

          <!-- error message -->
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="flag_warning"
            @dismissed="flag_warning=0"
          >
            <i class="fa fa-exclamation-triangle" style="margin-right:3px" />
            {{warning_message}}
          </b-alert>

          <b-form>
            <b-form-group
              label="Spesialis Dokter"
              label-for="basicSelect"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="dropDokter"
                             :plain="true"
                             :options="arSpesialis"
                             @change="onSpesialis"
                             v-model="spesialisasi"
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <b-form-group
              label="Praktik Sekitar"
              label-for="basicSelect"
              :label-cols="3"
              :horizontal="true">
              <b-form-select id="dropDokter"
                             :plain="true"
                             :options="arLokasi"
                             v-model="lokasi"
                             value="Please select">
              </b-form-select>
            </b-form-group>

            <b-form-group
              label="Nama Dokter*"
              label-for="basicSelect"
              :label-cols="3"
              :horizontal="true">
              <b-form-input
                id="nama"
                type="text"
                v-model="nama"
                autocomplete="nama">
              </b-form-input>
              <i>Mengisi input nama dokter akan langsung men-filter daftar dengan nama dokter yang telah diinput
              di form filter nama</i>
            </b-form-group>
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
                  <b-button
                    size="m"
                    variant="primary"
                    style="height:29px;width:140px;"
                    @click="onFilter"
                  >
                    <strong>
                      <i class="fa fa-plus"></i> Filter
                    </strong>
                  </b-button>
                </b-col>
                <b-col></b-col>
              </b-row>
              <b-modal
                title="Kembali Ke Halaman Utama?"
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
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="10" offset="1">
        <b-card>
          <div slot="header">
            <strong>Daftar Dokter</strong>
          </div>

          <!-- error message -->
          <b-alert
            variant="danger"
            dismissible
            fade
            :show="flag_warning2"
            @dismissed="flag_warning2=0"
          >
            <i class="fa fa-exclamation-triangle" style="margin-right:3px" />
            {{warning_message}}
          </b-alert>

          <div id="tabel_dokter">
            <vuetable ref="vuetable"
                      :api-mode="false"
                      :data="tableData"
                      :fields="fields"
                      data-path="data"
                      pagination-path="pagination"
                      @vuetable:pagination-data="onPaginationData"
            >
              <template slot="actions" scope="props">
                <div style="width:100%;">
                  <div class="view" style="display: inline-block;padding:3px;">
                    <button class="btn btn-warning" @click="onView(props.rowData)">
                      <i class="fa fa-eye"/> Detail
                    </button>
                  </div>
                </div>
              </template>
            </vuetable>
            <div class="vuetable-pagination ui basic segment grid">
              <vuetable-pagination-info ref="paginationInfo">
              </vuetable-pagination-info>
            </div>
            <vuetable-pagination  :on-each-side="2" ref="pagination"
                                  @vuetable-pagination:change-page="onChangePage"
            >
            </vuetable-pagination>
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
      title: 'Nama Dokter',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    },{
      name: 'tempat_praktik',
      title: 'Tempat Praktik',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    },{
      name: 'tanggal_praktik',
      title: 'Tanggal Praktik',
      titleClass: 'center aligned',
      dataClass: 'left aligned'
    },{
      name: 'flag_booking_online',
      title: 'Bisa Buat Janji Online?',
      titleClass: 'center aligned',
      dataClass: 'left aligned',
      callback: 'booking'
    },{
      name: '__slot:actions',
      title: 'Action',
      titleClass: 'center aligned',
      dataClass: 'center aligned'
    }
  ]

    export default {
      name: "search_dokter",
      components: {
        Vuetable,
        VuetablePagination,
        VuetablePaginationInfo
      },
      data: function () {
        return {
          myModal: false,
          fields: tableColumns,
          arSpesialis: [{value: 1, text:"Dokter Umum"},{value: 2, text: "Dokter Gigi"},{value: 3, text:"Dokter Bedah"}],
          arLokasi: [],
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
          url_fetch: '',
          spesialisasi: null,
          lokasi: null,
          nama: '',
          flag_warning : 0,
          flag_warning2 : 0,
          warning_message : ''
        }
      },
      methods: {
        onFilter(){
          var flagValid = true

          if(this.spesialisasi == null || this.lokasi == null){
            if(this.nama != ''){
              this.url_fetch = 'http://localhost:3000/dokter?q=' + this.nama
            }

            else {
              this.flag_warning = 10
              this.warning_message = 'Harap pilih spesialisasi dan lokasi praktik dokter'
              flagValid = false
            }
          }

          else {
            if(this.nama != ''){
              this.url_fetch = 'http://localhost:3000/dokter?q=' + this.nama
            }

            else {
              this.url_fetch = 'http://localhost:3000/dokter?id_spesialis=' + this.spesialisasi +
                '&id_praktek=' + this.lokasi
            }
          }

          if(flagValid){
            axios.get(this.url_fetch
            )
              .then((resp) => {
                console.log(resp.data)
                if(resp.data.length == 0){
                  this.flag_warning2 = 10
                  this.warning_message = 'Tak Ada Dokter untuk filter pencarian yang dimaksud'
                }
                else {
                  this.tableData.data.length = 0

                  for(var i=0; i < resp.data.length; i++){
                    this.tableData.data.push({"id":resp.data[i].id, "nama":resp.data[i].nama,
                      "tempat_praktik":resp.data[i].tempat_praktik, "tanggal_praktik": resp.data[i].tanggal_praktik,
                      "flag_booking_online":resp.data[i].flag_bisa_online})
                  }
                }
              })
          }
        },

        booking : function(value){
          if(value){
            value = 'Ya'
          }
          else {
            value = 'Tidak'
          }
          return value
        },

        onSpesialis(){
          if(this.arLokasi.length != 0){
            this.arLokasi.length = 0
          }

          this.arLokasi.push({value:1, text:"Jakarta Barat"},{value:2, text:"Jakarta Selatan"},
            {value:3, text:"Jakarta Utara"},{value:4, text:"Jakarta Timur"})
        },

        onView(item){
          localStorage.setItem("flag_online", item.flag_booking_online)
          this.$router.push('/menu/detailDokter/' + item.id)
        },

        onPaginationData (paginationData) {
          this.$refs.pagination.setPaginationData(paginationData);
          this.$refs.paginationInfo.setPaginationData(paginationData);
        },

        onChangePage (page) {
          console.log('change page ' + page)
          this.$refs.vuetable.changePage(page)
        }

      }
    }
</script>

<style scoped>

</style>










