<template>

  <imp-panel>
     <h3 class="box-title" slot="header" style="width: 100%;">
        <el-form
          :model="form"
          :inline="true"
          ref="form"
          label-position="left"
          label-width="100px"
        >
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
            <!-- <el-col :span="10" :offset="0" :xs="12" :sm="12" :md="10" :lg="10" :xl="10">
              <div class="el-input" style=" float: right;">
                关键字：
                <input type="text" placeholder="关键字：" v-model="searchKey" @keyup.enter="search($event)"
                      class="el-input__inner" style="width:180px">
              </div>
            </el-col> -->
            <el-col :span="6">
              <div class="el-input" style=" float: right;margin-bottom: 14px">
                分配角色：
                <el-select v-model="form.role" clearable  placeholder="请选择角色" style="width:200px">
                  <el-option
                    v-for="option of roleOptions"
                    :key="option.roleId"
                    :label="option.roleName"
                    :value="option.roleId"
                  >
                </el-option> </el-select>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="el-input" style="  float: right;margin-bottom: 14px">
                用户名称：
                <input type="text" placeholder="输入用户名称" v-model="form.userName" @keyup.enter="search($event)"
                      class="el-input__inner" style="width:200px">
              </div>
            </el-col>
            <el-col :span="6">
              <div class="el-input" style="  float: right;margin-bottom: 14px">
                报表名称：
                <input type="text" placeholder="输入报表名称" v-model="form.reportName" @keyup.enter="search($event)"
                      class="el-input__inner" style="width:200px">
              </div>
            </el-col>
            <el-col :span="6">
              <div class="el-input" style="  float: right;margin-bottom: 14px">
                报表描述：
                <input type="text" placeholder="输入描述" v-model="form.des" @keyup.enter="search($event)"
                      class="el-input__inner" style="width:200px">
              </div>
            </el-col>
            <el-col :span="6">
              <div class="el-input" style="  float: right;margin-bottom: 14px">
                发布时间：
                <el-date-picker
                  v-model="form.time"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width:200px"
                >
                </el-date-picker >
              </div>
            </el-col>
            <el-col :span="14" :xs="12" :sm="12" :md="14" :lg="14" :xl="14">
                <el-button type="primary" icon="plus" @click="search">搜索</el-button>

                <el-button type="primary" icon="plus" @click="reset" >重置</el-button>
              
                <!-- <el-button type="primary" icon="plus">导入</el-button>
                <el-button type="primary" icon="plus">下载模板</el-button> -->
            </el-col>
          </el-row>
        </el-form>
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
        <!-- <el-table-column
          prop="name"
          label="名称">
        </el-table-column> -->
        <el-table-column
          prop="reportName"
          label="报表名称">
        </el-table-column>
        <el-table-column
          prop="des"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="authRoles"
          label="分配角色">
        </el-table-column>
        <el-table-column
          prop="authUsers"
          label="分配用户">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <!-- {{ scope.row.status===1 ? '已激活' : '未激活' }} -->
             <!-- :type="scope.row.status === '1' ? true : false" -->
              <!-- :model="scope.row.status === 1? true : false" -->
              <el-switch
              v-model="scope.row.reportStatus"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeSwitch(scope.row)"/>

            <!-- <el-switch
              
              v-model="scope.row.status"
              @change="changeSwitch(scope.row)"
             >
            </el-switch> -->
            <span> {{ scope.row.reportStatus===1 ? '启用' : '禁用' }} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人员">
        </el-table-column>
        <el-table-column
          prop="releaseTime"
          label="发布时间">
        </el-table-column>
        <el-table-column label="操作" width="285">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="default"
              icon="edit"
              @click="handleAuth(scope.$index, scope.row)">授权
            </el-button>
            <el-button
              size="small"
              type="info"
              icon="setting"
              @click="handlePreview(scope.$index, scope.row)">预览
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

       <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="30%">
        <div>
          <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-form">
            <el-form-item label="报表名称：" prop="reportName_edit">
              <el-input v-model="form.reportName_edit"></el-input>
            </el-form-item>
            <el-form-item label="描述：" prop="des_edit">
              <el-input v-model="form.des_edit"></el-input>
            </el-form-item>
            <el-form-item label="分配角色：" prop="role_edit">
              <el-select v-model="form.role_edit"  multiple collapse-tags  placeholder="" style="width: 100%">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分配用户：" prop="user_edit">
              <el-select v-model="form.user_edit"  multiple collapse-tags  placeholder="" style="width: 100%">
                <el-option
                  v-for="item in userOptions"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="状态：" prop="status">
              <el-input v-model="form.status"></el-input>
            </el-form-item> -->
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmSubmit()">确认提交</el-button>
        </div>
    </el-dialog>


      <!-- <el-dialog title="配置用户角色" :visible.sync="dialogVisible" size="tiny">
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
  // import * as sysApi from '../../services/sys'
  import http_ksh from "../../common/http_ksh";
  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
        // form: {
        //   role: '',
        //   user: null,
        //   reportName: '',
        //   des: '',
        //   time: ''
        // },
         rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
        asc: false,
        col: 'releaseTime',
        form: {
          reportName: '',
          des: '',
          role: '', // 用于查询
          user: '', // 用于查询
          status: '',
          time: '',
          times:'',
          reportName_edit: '',
          des_edit: '',
          role_edit: [], // 用于授权 ['黄金糕','双皮奶']
          user_edit: [], // 用于授权 ['黄金糕','双皮奶']
          role_submit: [], // 用于授权 ['黄金糕','双皮奶']
          user_submit: []// 用于授权 ['黄金糕','双皮奶']
        },
        roleOptions: [],
        userOptions: [],
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
      reset () {
        this.$refs.form.resetFields()
        this.form.role = ''
        this.getList()
      },
      changeSwitch(row){
        // row.reportStatus = !row.reportStatus
        const data = {
          enable: row.reportStatus,
          reportId: row.id
        }
        http_ksh.reportEnable(data).then(data => {
          if(data.data.code==200){
            this.getList()
          }
        })

      },

      search(target){
        this.getList();
      },
      handleSelectionChange(val){

      },
      handleAuth(index, row){
        this.currentRow = row;
          this.form.reportName_edit = row.reportName
            this.form.des_edit = row.des
            this.form.role_submit = []
            this.form.role_edit = []
            row.authRoleList.forEach(element => {
              this.form.role_edit.push(element.roleId)
              // this.form.role_submit.push({
              //   "extValues": {},
              //   "roleId": element.roleId,
              //   "roleName":element.roleName});
            })
            this.form.user_submit = []
            this.form.user_edit = []
            row.authUserList.forEach(element => {
              this.form.user_edit.push(element.userId)
              // this.form.user_submit.push({
              //   "extValues": {},
              //   "userId": element.userId,
              //   "userName": element.userName });
            })

        this.dialogVisible = true;
        
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
      handlePreview(index, row){
         window.open(row.token)
      },
      handleDelete(index, row){
       
        this.$confirm('将删除该数据, 是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            let param={reportId:row.id };
            // let param=[reportId:row.id ];
            return http_ksh
            .reportDelete(param)
            .then(res => res)
            .then(data => {
                if(data.data.code==200)
                {
                   this.getList();
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
      confirmSubmit () {
        var _this = this
        var role_edit = []
        var user_edit = []
        this.roleOptions.forEach(el => {
          _this.form.role_edit.forEach(el2 => {
            if (el.roleId == el2) {
              role_edit.push({
                extValues: {},
                roleId: el.roleId,
                roleName: el.roleName
              })
            }
          })
        })

        this.userOptions.forEach(el => {
          _this.form.user_edit.forEach(el2 => {
            if (el.userId == el2) {
              user_edit.push({
                extValues: {},
                userId: el.userId,
                userName: el.userName
              })
            }
          })
        })

        const data = {
          reportAuthRoles: role_edit,
          reportAuthUsers: user_edit,
          reportId: this.currentRow.id
        }
        http_ksh.reportAuth(data).then(data => {
            if(data.data.code==200){
            this.dialogVisible = false
            this.getList()
            this.row = {}
          }
        })
      },
      getRoleList () {
        const data = {}
        // http_ksh.getRole(data).then(data => {
        //   if (data.success) {
        //     this.roleOptions = data.data
        //   }
        // })

        return http_ksh
          .getRole()
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
            
                  this.roleOptions = data.data.data
                
              }else{
                 this.$message(data.data.msg);
              }
          }).catch(e => {  this.$message('接口操作失败');})



      },
      getUserList () {
        // const data = {}
        // http_ksh.getUser(data).then(data => {
        //   if (data.success) {
        //     this.userOptions = data.data
        //   }
        // })
         return http_ksh
          .getUser()
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
            
                  this.userOptions = data.data.data
                
              }else{
                 this.$message(data.data.msg);
              }
          }).catch(e => {  this.$message('接口操作失败');})
      },

      getList () {
      if (this.form.time != null && this.form.time != '') {
        var start = this.form.time[0].toLocaleDateString()
          .split('/')
          .map(element => {
            if (element.length == 1) {
              return (element = '0' + element)
            } else {
              return element
            }
          })
          .join('-')
        var end = this.form.time[1].toLocaleDateString()
          .split('/')
          .map(element => {
            if (element.length == 1) {
              return (element = '0' + element)
            } else {
              return element
            }
          })
          .join('-')
        this.form.times = start + 'to' + end
      } else {
        this.form.times = ''
      }



        const data = {
          needTotalCount: true,
          offset: 0,
          orderDescs: [
            {
              asc: this.asc,
              col: this.col
            }
          ],
          pageNum: this.tableData.pagination.pageNo,
          pageSize: this.tableData.pagination.pageSize,
          releaseTimeRange: this.form.times || '2000-09-01to2055-12-01',
          reportDes: this.form.des,
          reportName: this.form.reportName,
          roleId: this.form.role,
          userId: this.form.user,
          userName: this.form.user

          
        }
      

        return http_ksh
          .getReportList(data)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
            
                this.tableData.rows = data.data.data
                this.tableData.pagination.total = data.data.total
                
              }else{
                this.$message(data.data.msg);
              }
          }).catch(e => {  this.$message('接口操作失败');})



      },
      // loadData(){
      //     http_ksh.getReportList({
      //       "needTotalCount": true,
      //       "offset": 0,
      //       "orderDescs": [
      //         {
      //           "asc": true,
      //           "col": "string"
      //         }
      //       ],
      //       "key": this.searchKey,
      //       "pageNum": this.tableData.pagination.pageNo,
      //       "pageSize": this.tableData.pagination.pageSize
      //     })
      //     .then(res => {
      //       this.tableData.rows = res.data.data;
      //       this.tableData.pagination.total = res.data.total;
      //     });
      // }
    },
    created(){
      // this.loadData();
    },
    mounted () {
     
      this.getRoleList()
      this.getUserList()
      this.getList()
    },
  }
</script>
<style>
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>
