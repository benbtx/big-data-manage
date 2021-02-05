<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <!-- <el-col :span="12">
          <router-link :to="{ path: 'hmdAdd'}">
            <el-button type="primary" icon="plus">新增</el-button>
          </router-link>
        </el-col>
        <el-col :span="12">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search"></i>
            <input type="text" placeholder="输入用户名称" v-model="searchKey" @keyup.enter="search($event)"
                   class="el-input__inner">
          </div>
        </el-col> -->
        <el-col :span="10" :offset="0" :xs="12" :sm="12" :md="10" :lg="10" :xl="10">
          <div class="el-input" style=" float: right;">
             关键字：
            <input type="text" placeholder="关键字：" v-model="searchKey" @keyup.enter="search($event)"
                   class="el-input__inner" style="width:180px">
          </div>
        </el-col>
         <!-- <el-col :span="5">
          <div class="el-input" style=" float: right;">
            身份证：
            <input type="text" placeholder="输入用户名称" v-model="searchKey" @keyup.enter="search($event)"
                   class="el-input__inner" style="width:180px">
          </div>
        </el-col>
         <el-col :span="5">
          <div class="el-input" style="  float: right;">
            电话：
            <input type="text" placeholder="输入用户名称" v-model="searchKey" @keyup.enter="search($event)"
                   class="el-input__inner" style="width:180px">
          </div>
        </el-col> -->
        <el-col :span="14" :xs="12" :sm="12" :md="14" :lg="14" :xl="14">
            <el-button type="primary" icon="plus" @click="search">搜索</el-button>

            <!-- <router-link :to="{ path: 'mxsj'}">
              <el-button type="primary" icon="plus">新增</el-button>
            </router-link> -->
          
            <!-- <el-button type="primary" icon="plus">导入</el-button>
            <el-button type="primary" icon="plus">下载模板</el-button> -->
        </el-col>
      </el-row>
    </h3>
    <div slot="body">
      <el-table
        :data="tableData.rows"
        border
        style="width: 100%"
        v-loading="listLoading"
        @selection-change="handleSelectionChange">
        <!--checkbox 适当加宽，否则IE下面有省略号 https://github.com/ElemeFE/element/issues/1563-->
        <!-- <el-table-column
          prop="id"
          type="selection"
          width="50">
        </el-table-column> -->

        <!-- <el-table-column
          label="照片" width="76">
          <template slot-scope="scope">
            <img :src='scope.row.avatar' style="height: 35px;vertical-align: middle;" alt="">
          </template>
        </el-table-column> -->
        <el-table-column
          prop="xh"
          label="序号"  width="80">
        </el-table-column>
        <!-- <el-table-column
          prop="id"
          label="ID">
        </el-table-column> -->
        <el-table-column
          prop="worklineName"
          label="服务名称" width="250">
        </el-table-column>

        <el-table-column
          prop="serviceUrl"
          label="服务地址">
        </el-table-column>

        <!-- <el-table-column
          prop="remark"
          label="工作流描述"  width="250">
        </el-table-column> -->

       

        
         
        <!-- <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.online=== 0 ? '新建及更新' : scope.row.online===1 ?'训练成功':scope.row.modelStatus===2 ?'训练失败':scope.row.modelStatus===3 ?'发布工作流':'训练中'}}
          </template>
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column> -->
        

        <el-table-column label="操作" width="285">
          <template slot-scope="scope">
            <!-- <el-button
              size="small"
              type="default"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button> -->

            <el-button
           
              size="small"
              type="Success"
              @click="handleDetail(scope.$index, scope.row)">详情
            </el-button>
            <el-button
              size="small"
              type="Success"
              @click="handleTest(scope.$index, scope.row)">测试
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pagination.pageNo"
        :page-sizes="[5, 10, 20]"
        :page-size="tableData.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.pagination.total">
      </el-pagination>

      <el-dialog
                title="详情" width="30%"
                :visible.sync="dialogVisible"
              >
               
                

               <div>
                  <div>输入参数：</div> </br>
                  <el-row type="flex" style='margin-bottom:10px' >
                      <el-col :span="8">名称
                      </el-col>
                      <el-col :span="4">类型
                      </el-col>
                      <el-col :span="12">描述
                      </el-col>
                  </el-row>
                  <el-row type="flex" style='margin-bottom:10px' v-for="item in JSON.parse(this.detailRow.requestParam)" :key="item.paramName" >
         
                      <el-col :span="8" :title="'参数类型:'+ item.paramType"   >{{item.paramName}} </el-col>
                      <el-col :span="4" >{{item.paramType}} </el-col>
                      <el-col :span="12">
                            {{item.paramRemark}}

                      </el-col>
                  </el-row>
                  </br>
                   <div>输出参数：</div> </br>
                   <el-row type="flex" style='margin-bottom:10px' >
                      <el-col :span="8">名称
                      </el-col>
                       <el-col :span="4">类型
                      </el-col>
                      <el-col :span="12">描述
                      </el-col>
                  </el-row>
                  <el-row type="flex" style='margin-bottom:10px' v-for="item in JSON.parse(this.detailRow.responseParam)" :key="item.paramName" >
         
                      <el-col :span="8" :title="'参数类型:'+ item.paramType"   >{{item.paramName}} </el-col>
                      <el-col :span="4" >{{item.paramType}} </el-col>
                      <el-col :span="12">
                            {{item.paramRemark}}

                      </el-col>
                  </el-row>
               </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        
          <el-button type="primary" @click="dialogVisible = false">确 认</el-button>
        </span>
      </el-dialog>
      <el-dialog
                title="测试"
                :visible.sync="dialogVisible_yy"
              >
                
                <el-form ref="form" :model="form" label-width="120px">
                   
                    <el-form-item  label="源数据JSON">
                      <el-input  type="textarea"  :rows="19"  v-model="form.json"></el-input>

                      
 
                      
                    </el-form-item>

                    <el-form-item  label="结果">

                    <el-input  type="textarea"  :rows="4"  v-model="form.jsonresult"></el-input>
                      </el-form-item>

                   


                </el-form>


                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_yy = false">取 消</el-button>
                  <el-button type="primary" @click="runYY">确 认</el-button>
                  <!-- <el-button type="primary" @click="saveWorkFlow">确 认</el-button> -->
                </span>
      </el-dialog>

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
        dialogVisible_yy: false,
        detailRow:{requestParam:null,responseParam:null},
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
        interval:0,
        form: {
          json:'',
          jsonresult:''
        }
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
      handleDetail(index, row){
        //  this.$router.push({path: 'mxsj', query: {id: row.id,status:row.modelStatus,yy:false}})
        this.dialogVisible=true;
        this.detailRow=row;

      
      },
      handleTest(index, row){
        this.dialogVisible_yy=true;
        this.detailRow=row;
      },
      runYY(){
        var _this=this;  
        
        var query={
          id:this.detailRow.worklineId,
          sourceData :_this.form.json,
        };     
         var query2=_this.form.json;    
        return http_sfk
          .exeWorkflow(query)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
                 _this.$message(data.data.msg); 
                 _this.form.jsonresult=data.data.data
               

              }else{
                _this.$message(data.data.msg);
                 _this.form.jsonresult="";

                
              }
          }).catch(e => { 
              _this.$message('接口操作失败');
                 _this.form.jsonresult="";

        
        })
      },
      loadData(){
          
          let param={modelName : this.searchKey ,page  : this.tableData.pagination.pageNo,pageSize  : this.tableData.pagination.pageSize};
          return http_sfk
          .getModelServiceListByPage(param)
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
      // this.interval = setInterval(() => {
      //       this.loadData();
      // }, 5000);
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
