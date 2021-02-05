<template>
  <imp-panel :title="form.id !=null ? '编辑':'新增用户'">
    <el-form ref="form" :model="form" label-width="180px">
      <!-- <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
      </el-form-item> -->
      <el-form-item label="登录用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!-- <el-form-item label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="工号">
        <el-input v-model="form.no"></el-input>
      </el-form-item>
      <el-form-item label="固定电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item> -->
      <el-form-item label="角色">
        <el-select v-model="roleValue" placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">未激活</el-radio>
          <el-radio :label="1">已激活</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="用户类型">
        <el-radio-group v-model="form.userType">
          <el-radio label="0">注册用户</el-radio>
          <el-radio label="1">后台配置用户</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!-- <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remarks"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="info" @click="onEditSubmit" v-if="form.id">保存</el-button>
        <el-button type="primary" @click="onSubmit" v-else>立即创建</el-button>
         <el-button type="info" @click="onCancel" >取消</el-button>
      </el-form-item>
    </el-form>
  </imp-panel>
</template>
<script>
  import panel from "../../components/panel.vue"
  import * as api from "../../api"
  import http_sys from "../../common/http_sys";


  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
        roleValue:'',
        roleOptions:[],
        form: {
          id: null,
          no: '',
          name: '',
          username: '',
          phone: '',
          email: '',
          mobile: '',
          status: 1,
          userType: '1',
          remarks: ''
        }
      }
    },
    created(){
      this.form.id=this.$route.query.userId;
      // this.form=this.$route.query
      this.loadData();
      this.loadRoleList();
    },
    methods: {
      onCancel(index, row){
        this.$router.push({path: 'userList'})
      },
      onSubmit(){
        // this.$http.post(api.SYS_USER_ADD, this.form)
        //   .then(res => {
        //     this.form = res.data;
        //     this.$confirm('添加成功, 是否返回列表?', '提示', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'success'
        //     }).then(() => {
        //       this.$router.push({path: 'userList'})
        //     })
        //   })
        let parm={
          // "createTime": "2020-12-21T06:32:43.870Z",
          // "createUserId": 0,
         
          // "extValues": {},
          // "mobile": "string",
          // "password": "string",
          "roleIdList":[this.roleValue],
          // "userId": 0,
          "status": this.form.status,
          "email": this.form.email,
          "username": this.form.username
        }
        return http_sys
          .addUser(parm)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
                  // this.form=data.data.data
                  // this.form.id=data.data.data.userId
                  this.$confirm('修改成功, 是否返回列表?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                  }).then(() => {
                    this.$router.push({path: 'userList'})
                  })

                 
              }else{
                 this.$message(data.data.msg||data.data.errMessage);
              }
          }).catch(e => {  this.$message('接口操作失败');})
      },
      onEditSubmit(){
        // this.$http.post(api.SYS_USER_UPDATE, this.form)
        //   .then(res => {
        //     this.form = res.data;
        //     this.$confirm('修改成功, 是否返回列表?', '提示', {
        //       confirmButtonText: '确定',
        //       cancelButtonText: '取消',
        //       type: 'success'
        //     }).then(() => {
        //       this.$router.push({path: 'userList'})
        //     })
        //   })
        let parm={
          // "createTime": "2020-12-21T06:32:43.870Z",
          // "createUserId": 0,
         
          // "extValues": {},
          // "mobile": "string",
          // "password": "string",
          "roleIdList":[this.roleValue],
          "userId": this.form.id,
          "status": this.form.status,
          "email": this.form.email,
          "username": this.form.username
        }
        return http_sys
          .updateUser(parm)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
                  // this.form=data.data.data
                  // this.form.id=data.data.data.userId
                  this.$confirm('修改成功, 是否返回列表?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                  }).then(() => {
                    this.$router.push({path: 'userList'})
                  })

                 
              }else{
                 this.$message(data.data.msg||data.data.errMessage);
              }
          }).catch(e => {  this.$message('接口操作失败');})
      },
      loadData(){
        if (this.$route.query && this.$route.query != null && this.$route.query.userId && this.$route.query.userId != null) {
          this.form.id = this.$route.query.userId;
          // this.$http.get(api.SYS_USER_GET + "?id=" + this.form.id)
          //   .then(res => {
          //     this.form = res.data;
          //   })
          return http_sys
          .getUserInfo(this.form.id)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
            
                  this.form=data.data.data
                  this.form.id=data.data.data.userId

                 
              }else{
                 this.$message(data.data.msg);
              }
          }).catch(e => {  this.$message('接口操作失败');})

        }
      },
      loadRoleList(){
        
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
            "pageNum": 1,
            "pageSize": 10000
          })
          .then(res => {
            this.roleOptions = res.data.data;
            if(this.$route.query.roleIdList.length>0){
               this.roleValue=this.$route.query.roleIdList[0]
            }else{
              if(this.roleOptions.length>0){
                this.roleValue=this.roleOptions[0].roleId
              }
              
            }
            
           
           
          });
      },
    }
  }
</script>
