<template>
  <v-list-item>
    <v-btn @click="MemberReport" color="primary">Members Report</v-btn>
  </v-list-item>
</template>

<script>
export default {
  name: 'MemberReport',
  data: () => ({
    csvdata: [],
    headers: {},
    APIURL:
      'https://www.prulia.org.my/api/method/erpx_prulia.prulia_members.report.prulia_member_library.prulia_member_library.get_column_data'
  }),
  methods: {
    //MemberReport Download Function
    MemberReport: async function() {
      try {
        const response = await fetch(this.APIURL)
        const data = await response.json()
        this.DownloadCsv(data.message)
      } catch (err) {
        alert('Member Report Data Fetch Error')
        console.log(err)
      }
    },
    //Json Data converte Csv File
    convertToCSV(objArray) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray
      var str = ''

      for (var i = 0; i < array.length; i++) {
        var line = ''
        for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index]
        }

        str += line + '\r\n'
      }

      return str
    },
    DownloadCsv(items) {
      this.csvdata = items[1]
      let csvContent = 'data:text/csv;charset=utf-8,'
      var csvDataFormat = []
      var header = items[0]
      header.map(item => {
        var key = item.fieldname
        this.headers[key] = item.label
      })
      //JSON MEMBER Data Formated
      this.csvdata.map(item => {
        console.log('item', item.user_status)
        csvDataFormat.push({
          'Prudential ID': item.prudential_id.replace(null, ''),
          'Full Name': item.full_name.replace(/,/g, ''),
          'Positions': item.position.replace(null, ''),
          'Branch': item.branch.replace(/,/g, ''),
          'Cell Number': item.cell_number,
          'Agency No': item.agency_no == null ? '' : item.agency_no,
          'Status': item.user_status
        })
      })
      csvDataFormat.unshift(this.headers)
      var jsonObject = JSON.stringify(csvDataFormat)
      var csv = this.convertToCSV(jsonObject)
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae)
      } else {
        var link = document.createElement('a')
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob)
          link.setAttribute('href', url)
          link.setAttribute('download', 'Members Report.csv')
          link.style.visibility = 'hidden'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    }
  }
}
</script>
