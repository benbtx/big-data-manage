<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="16">
          <router-link :to="{ path: 'userAdd'}">
            <el-button type="primary" icon="plus">新增</el-button>
          </router-link>
        </el-col>
        <el-col :span="8">
          <div class="el-input" style="float: right;">
            <i class="el-input__icon el-icon-search"></i>
            <input type="text" style="width: 200px; " placeholder="输入用户名称" v-model="searchKey" @keyup.enter="search($event)"
                   class="el-input__inner">
          </div>
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
        <el-table-column
          prop="id"
          type="selection"
          width="50">
        </el-table-column>
        <!-- <el-table-column
          label="照片" width="76">
          <template slot-scope="scope">
            <img :src='scope.row.avatar' style="height: 35px;vertical-align: middle;" alt="">
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          prop="name"
          label="名称">
        </el-table-column> -->
        <el-table-column
          prop="username"
          label="登录用户名">
        </el-table-column>
        <el-table-column
          prop="roleNameList"
          label="角色名">
        </el-table-column>
        <!-- <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column> -->
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.status===1 ? '已激活' : '未激活' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="285">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="default"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <!-- <el-button
              size="small"
              type="info"
              icon="setting"
              @click="handleRoleConfig(scope.$index, scope.row)">配置角色
            </el-button> -->
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
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

      <el-dialog title="配置用户角色" :visible.sync="dialogVisible" size="tiny">
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
      </el-dialog>
    </div>


  </imp-panel>
</template>

<script>
  import panel from "../../components/panel.vue"
  import * as api from "../../api"
  import testData from "../../../static/data/data.json"
  // import * as sysApi from '../../services/sys'
  import http_sys from "../../common/http_sys";
  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
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
        searchKey: '',
        tableData: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            parentId: 0
          },
          rows: []
        }
      }
    },
    methods: {
      search(target){
        this.loadData();
      },
      handleSelectionChange(val){

      },
      handleRoleConfig(index, row){
        this.currentRow = row;
        this.dialogVisible = true;
        if (this.roleTree.length <= 0) {
          http_sys.getRoleList({selectChildren:true})
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
        this.$router.push({path: 'userAdd', query: row})
      },
      handleDelete(index, row){
        // this.$http.get(api.SYS_USER_DELETE + "?userIds=" + row.id).then(res => {
        //   this.loadData();
        // });
        // this.$confirm('确定是否删除当前数据?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'success'
        // }).then(() => {
        //     return http_sys
        //     .deleteUser([this.row.id])
        //     .then(res => res)
        //     .then(data => {
        //         if(data.data.code==200)
        //         {
        //           this.loadData();

        //         }else{
        //             this.$message(data.data.msg||data.data.errMessage);
        //         }
        //     }).catch(e => {  this.$message('接口操作失败');})
        // })
        this.$confirm('将删除该数据, 是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            // let param={id:row.id };
            let param=[row.userId ];
            return http_sys
            .deleteUser(param)
            .then(res => res)
            .then(data => {
                if(data.data.code==200)
                {
                   this.loadData();
                }else{
                  this.$message(data.data.msg||data.data.errMessage);
                }
            }).catch(e => {  this.$message('接口操作失败');})


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      
      },
      loadData(){
          http_sys.getUserList({
            "needTotalCount": true,
            "offset": 0,
            "orderDescs": [
              {
                "asc": true,
                "col": "string"
              }
            ],
            "key": this.searchKey,
            "pageNum": this.tableData.pagination.pageNo,
            "pageSize": this.tableData.pagination.pageSize
          })
          .then(res => {
            this.tableData.rows = res.data.data;
            this.tableData.pagination.total = res.data.total;
          });
      }
    },
    created(){
      this.loadData();
    }
  }
</script>
<style>
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>
