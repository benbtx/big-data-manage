<template>

  <imp-panel>
    <!-- <h3 class="box-title" slot="header" style="width: 100%;">
    
    </h3> -->
    <div slot="body">
      <iframe :src="kshsjsrc" style="height: 700px;width: 100%;border: 0;">
          IE：你们都看我干吗，我现在也是支持的
      </iframe>
    </div>


  </imp-panel>
</template>

<script>
  import panel from "../../components/panel.vue"
  import * as api from "../../api"
  import testData from "../../../static/data/data.json"
  import * as sysApi from '../../services/sys'

    import http_sfk from "../../common/http_sfk"

  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
         kshsjsrc:'' 
        
      }
    },
    methods: {
      
    },
    created(){
      //token 可以登录之后把id name 写到localstorage,也可以更加不能的人生成动态路由，那个token 就在返回路由的链接上
      // this.$route.params.token;
      // let id=localStorage.getItem("id");
      // let name=localStorage.getItem("name");
      // let token=localStorage.getItem("token");
      // let cs="id="+id+"&name="+name
      // let encodeData = window.btoa(cs)//编码aWQ9MjIyJm5hbWU9Y3My
      // token=encodeData .slice(0,5)+'Mk4'+encodeData .slice(5)
      // this.kshsjsrc=apiURL_sjksh+token||this.$route.params.token
      // this.loadData();
      // this.interval = setInterval(() => {
      //       this.loadData();
      // }, 5000);
       let token=localStorage.getItem("token");
       this.kshsjsrc=apiURL_sjksh+token
    },
    destroyed(){
      clearInterval(this.interval);
    }

  }
</script>
<style>
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>
