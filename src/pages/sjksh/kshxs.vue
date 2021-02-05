<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
    
    </h3>
    <div slot="body">
      <iframe src="http://192.168.7.233:8848/share.html?shareToken=eNoVjbEBBDEIw1aKCTGhhAD7j_T3jTpJcc2WN0NLc5lDXXUx9hwh4lbxRIrQDqUKKdE5sIMwUYUVb_C8dVImccmXn1NVh7UbjyrhOt2ThP0f4TiiSHs9VdvsGRjrQ5Pi8kRmL0zaHoQHkwvd_uK6w2Ls5hfg9hD8AFLoK1g#share/dashboard" style="height: 700px;width: 100%;">
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
        searchKey: '',
        currentRow: {},
        dialogVisible: false,
        dialogLoading: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        roleTree: [],
        listLoading: false,
      
        tableData: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            parentId: 0
          },
          rows: []
        },
        interval:0
      }
    },
    methods: {
      search(){
        this.loadData();
      },
      handleSelectionChange(val){

      },
      handleRoleConfig(index, row){
        this.currentRow = row;
        this.dialogVisible = true;
        if (this.roleTree.length <= 0) {
          sysApi.roleList({selectChildren:true})
            .then(res => {
              this.roleTree = res
            })
        }
        this.$http.get(api.SYS_USER_ROLE + "?id=" + row.id)
          .then(res => {
            this.$refs.roleTree.setCheckedKeys(res.data);
          }).catch(err=>{

        })
      },
      configUserRoles(){
        let checkedKeys = this.$refs.roleTree.getCheckedKeys();
          this.$http.get(api.SYS_SET_USER_ROLE + "?userId=" + this.currentRow.id + "&roleIds="+checkedKeys.join(','))
          .then(res => {
              this.$message('修改成功');
              this.dialogVisible = false;
          })
      },
      handleSizeChange(val) {
        this.tableData.pagination.pageSize = val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.tableData.pagination.pageNo = val;
        this.loadData();
      },
      handleEdit(index, row){
        // this.$router.push({path: 'userAdd', query: {id: row.id}})
        // this.$router.push({path: 'zdwhUpdate', query: {id: row.id}})
        if(row.modelStatus==4){
          this.$message('正在训练无法编辑！');
          return;
        }
        this.$router.push({path: 'mxsj', query: {id: row.id,status:row.modelStatus,yy:false}})


      },
      handleDelete(index, row){
        // this.$http.POST(api.QWJS_ZWFC_DELETE+"?_method=DELETE" , {id:row.id}).then(res => {
        //   this.loadData();
        // });

            // this.$confirm('确认删除该条数据?', '提示', {
            //   confirmButtonText: '确定',
            //   cancelButtonText: '取消',
            //   // @onConfirm= 'qr',
            //   // @onCancel='qr',
              
            //   type: 'success'
            // })

        this.$confirm('将删除该数据, 是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$http.delete(api.QWJS_ZWFC_DELETE+"?id="+row.id , {id:row.id}).then(res => {
          //   if(res.data.code=='200'){
          //       this.$message(res.data.msg);
          //         this.loadData();
          //     }else{
          //       this.$message(res.data.msg);
          //     }
          
          // });

            let param={id:row.id };
            return http_sfk
            .deleteWorkLineById(param)
            .then(res => res)
            .then(data => {
                if(data.data.code==200)
                {
                   this.loadData();
                  
              
                }else{
                  this.$message(data.data.msg);
                }
            }).catch(e => {  this.$message('接口操作失败');})


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      
      },
      handleYY(index, row){
         this.$router.push({path: 'mxsj', query: {id: row.id,status:row.modelStatus,yy:false}})

      
      },
      loadData(){
         
        let param={workLineName : this.searchKey ,curPage : this.tableData.pagination.pageNo,pageSize : this.tableData.pagination.pageSize};
          return http_sfk
          .getWorkLineByPage(param)
          .then(res => res)
          .then(data => {
              if(data.data.code==200||data.data.code==1)
              {
                  this.tableData.rows = data.data.data.list;
                  this.tableData.pagination.total = data.data.data.totalCount;
                  this.tableData.rows.forEach((element,i) => {
                    element.xh=i+1;
                  });
                
            
              }else{
                 this.$message(data.data.msg);
              }
          }).catch(e => {  this.$message('接口操作失败');})

          
      }
    },
    created(){
      this.loadData();
      this.interval = setInterval(() => {
            this.loadData();
      }, 5000);
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
