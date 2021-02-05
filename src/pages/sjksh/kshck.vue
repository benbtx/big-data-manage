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
            <el-col :span="14" :xs="12" :sm="12" :md="14" :lg="6" :xl="6">
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
              type="info"
              icon="setting"
              @click="handlePreview(scope.$index, scope.row)">预览
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
        row.reportStatus = !row.reportStatus
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
          const data = {
              reportId: row.id// this.selection[0].id
            }
          http_ksh.reportCheck(data).then(data => {
                if (data.data.code==200) {
                  if (data.data.data=="enable") {
                         window.open(row.token)
                  }else{
                      this.$message('当前记录已禁用。。。')
                      this.getList()
                  }
                 
                } 
              
            })

        
      },
      handleDelete(index, row){
       
        this.$confirm('将删除该数据, 是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            // let param={id:row.id };
            let param=[row.reportId ];
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
          roleIds: JSON.parse(window.localStorage.getItem('user')).roleIdList,
          userId: JSON.parse(window.localStorage.getItem('user')).userId,
          userName: this.form.user

          
        }
      

        return http_ksh
          .reportViewList(data)
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
     
      // this.getRoleList()
      // this.getUserList()
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
