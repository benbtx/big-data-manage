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

            <router-link :to="{ path: 'mxsj'}">
              <el-button type="primary" icon="plus">新增</el-button>
            </router-link>
          
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
          label="序号">
        </el-table-column>
        <!-- <el-table-column
          prop="id"
          label="ID">
        </el-table-column> -->
        <el-table-column
          prop="worklineFriendlyName"
          label="工作流名称" width="250">
        </el-table-column>

        <el-table-column
          prop="modelVersion"
          label="版本">
        </el-table-column>

        <el-table-column
          prop="remark"
          label="工作流描述"  width="250">
        </el-table-column>

       

        
         <!-- <el-table-column
          prop="ikStatus"
          label="状态">
        </el-table-column> -->

        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.modelStatus=== 0 ? '新建及更新' : scope.row.modelStatus===1 ?'训练成功':scope.row.modelStatus===2 ?'训练失败':scope.row.modelStatus===3 ?'发布工作流':'训练中'}}
          </template>
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
         <!-- <el-table-column
          label="操作时间">
          <template slot-scope="scope">
            {{ scope.row.status===1 ? '已激活' : '未激活' }}
          </template>
        </el-table-column> -->

        <el-table-column label="操作" width="285">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="default"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>

            <!-- <el-button
              v-if="scope.row.modelStatus=== 3 "
              size="small"
              type="Success"
              @click="handleYY(scope.$index, scope.row)">应用
            </el-button> -->
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

      <!-- <el-dialog title="配置用户角色" v-model="dialogVisible" size="tiny">
        <div class="select-tree">
          <el-scrollbar
            tag="div"
            class='is-empty'
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list">
            <el-tree
              ref="roleTree"
              :data="roleTree"
              show-checkbox
              check-strictly
              node-key="id" v-loading="dialogLoading"
              :props="defaultProps">
            </el-tree>
          </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="configUserRoles">确 定</el-button>
          </span>
      </el-dialog> -->
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
