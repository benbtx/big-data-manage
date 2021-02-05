<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="16">
          <router-link :to="{ path: 'roleAdd'}">
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
        <el-table-column
          prop="roleName"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <!-- <el-table-column
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.usable===1 ? '已激活' : '未激活' }}
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
              type="info"
              icon="setting"
              @click="handlePermissionConfig(scope.$index, scope.row)">配置权限
            </el-button>
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

      <el-dialog title="配置角色权限"  :visible.sync="dialogVisible" size="tiny">
        <div class="select-tree">
          <!-- <el-scrollbar
            tag="div"
            style="height:400px"
            class='is-empty'
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list">
           
          </el-scrollbar> -->
            <!-- check-strictly -->
          <el-tree v-if='dialogVisible'
            ref="menuTree"
            :data="menuTree"
            node-key="id"
            show-checkbox
            :default-checked-keys='checkedKeys'
            v-loading="dialogLoading"
            :props="defaultProps">
          </el-tree>
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
  import * as sysApi from '../../services/sys'
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
        menuTree: [],
        listLoading: false,
        searchKey: '',
        checkedKeys:[],
        hakfCheckedKeys:[],
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
      handlePermissionConfig(index, row){
        this.currentRow = row;
     
        // if (this.menuTree.length <= 0) {
        //   // sysApi.menuList({selectChildren:true})
        //   //   .then(res => {
        //   //     this.menuTree = res
        //   //   })
        // }
        // this.$http.get(api.SYS_USER_ROLE + "?id=" + row.id)
        //   .then(res => {
        //     this.$refs.menuTree.setCheckedKeys(res.data);
        //   }).catch(err=>{

        // })
        //获取默认选择
        // this.checkedKeys=[];
        this.checkedKeys=row.menuIdList

        this.dialogVisible = true;
                 
       
        
      },
      configUserRoles(){
        this.checkedKeys = this.$refs.menuTree.getCheckedKeys();
         this.hakfCheckedKeys = this.$refs.menuTree.getHalfCheckedKeys()
          // this.$http.get(api.SYS_SET_USER_ROLE + "?userId=" + this.currentRow.id + "&roleIds="+checkedKeys.join(','))
          // .then(res => {
          //     this.$message('修改成功');
          //     this.dialogVisible = false;
          // })
        let parm={
          // "createTime": "2020-12-21T08:21:35.956Z",
          // "createUserId": 0,
          // "extValues": {},
          "menuIdList": this.checkedKeys,
          "hakfCheckedKeys": this.hakfCheckedKeys,
          // "remark": this.form.remark,
          "roleId": this.currentRow.roleId,
          // "roleName": this.form.roleName
        }
        return http_sys
          .updateRole(parm)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
                    this.dialogVisible = false;
                    // this.$router.push({path: 'roleList'})
                    this.loadData();

                 
              }else{
                 this.$message(data.data.msg||data.data.errMessage);
              }
          }).catch(e => {  this.$message('接口操作失败');})

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
        // this.$router.push({path: 'roleAdd', query: {id: row.id}})
        this.$router.push({path: 'roleAdd', query: row})
      },
      handleDelete(index, row){
        // this.$http.get(api.SYS_USER_DELETE + "?roleIds=" + row.id).then(res => {
        //   this.loadData();
        // });
        this.$confirm('将删除该数据, 是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            // let param={id:row.id };
            let param=[row.roleId ];
            return http_sys
            .deleteRole(param)
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
          // sysApi.roleList({
          //   key: this.searchKey,
          //   pageSize: this.tableData.pagination.pageSize,
          //   pageNo: this.tableData.pagination.pageNo
          // })
          // .then(res => {
          //   this.tableData.rows = res;
          //   this.tableData.pagination.total = res.length;
          // });
          console.log('http_sys',http_sys)
          http_sys.getRoleList({
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
      },
      //获取当前角色的权限树
      loadTree(){
        return http_sys
          .getMenuList()
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
            
                  this.menuTree = data.data.data
                
              }else{
                 this.$message(data.data.msg);
              }
          }).catch(e => {  this.$message('接口操作失败');})

      }
    },
    created(){
      this.loadData();
      this.loadTree();
    }
  }
</script>
<style>
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
  .select-tree{
    height: 400px;
    overflow-y: auto;
  }
</style>
