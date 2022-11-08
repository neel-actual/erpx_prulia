<template>
      <v-btn class="ml-2 mb-sm-4 mt-2 mt-sm-2 mt-md-0 mb-md-0" @click="MemberReport" color="primary" 
      >Prulia Membership and event report</v-btn>
</template>

<script>
export default {
  name: 'MembershipEvent',
  data: () => ({
    csvdata:[],
    headers:{},
    APIURL:"https://www.prulia.org.my/api/method/erpx_prulia.prulia_members.report.prulia_membership_and_event_report.prulia_membership_and_event_report.get_column_data",
  }),
  methods:{
    //MemberReport Download Function
   MemberReport:async function(){
   fetch(this.APIURL, {
    method: 'GET'
}).then(resp => resp.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const downloadLink= document.createElement('a');
        downloadLink.style.display = 'none';
        downloadLink.href = url;
        downloadLink.download = "Prulia Membership and event report.pdf"; 
        document.body.appendChild(downloadLink);
        downloadLink.click();
        window.URL.revokeObjectURL(url);
    }).cathc((error)=>{alert("Pdf Download Error");});
    
   }
  }

}
</script>