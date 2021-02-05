<template>
  <imp-panel :title="form.id !=null ? '编辑':'新增角色'">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="角色名">
        <el-input v-model="form.roleName"></el-input>
      </el-form-item>
      
      <!-- <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">未激活</el-radio>
          <el-radio :label="1">已激活</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-radio-group v-model="form.userType">
          <el-radio label="0">注册用户</el-radio>
          <el-radio label="1">后台配置用户</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
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
        form: {
          id: null,
          no: '',
          roleName: '',
          nickName: '',
          phone: '',
          email: '',
          mobile: '',
          status: 1,
          userType: '1',
          remark: ''
        }
      }
    },
    created(){
      this.form.id=this.$route.query.roleId;
      this.loadData();
    },
    methods: {
      onCancel(index, row){
        this.$router.push({path: 'roleList'})
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
          // "createTime": "2020-12-21T08:21:35.956Z",
          // "createUserId": 0,
          // "extValues": {},
          // "menuIdList": [
          //   0
          // ],
          "remark": this.form.remark,
          // "roleId": 0,
          "roleName": this.form.roleName
        }
        return http_sys
          .addRole(parm)
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
                    this.$router.push({path: 'roleList'})
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
          // "createTime": "2020-12-21T08:21:35.956Z",
          // "createUserId": 0,
          // "extValues": {},
          // "menuIdList": [
          //   0
          // ],
          "remark": this.form.remark,
          "roleId": this.form.id,
          "roleName": this.form.roleName
        }
        return http_sys
          .updateRole(parm)
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
                    this.$router.push({path: 'roleList'})
                  })

                 
              }else{
                 this.$message(data.data.msg||data.data.errMessage);
              }
          }).catch(e => {  this.$message('接口操作失败');})
      },
      loadData(){
        if (this.$route.query && this.$route.query != null && this.$route.query.roleId && this.$route.query.roleId != null) {
          this.form.id = this.$route.query.roleId;
          // this.$http.get(api.SYS_USER_GET + "?id=" + this.form.id)
          //   .then(res => {
          //     this.form = res.data;
          //   })
          return http_sys
          .getRoleInfo(this.form.id)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
            
                  this.form=data.data.data
                  this.form.id=data.data.data.roleId

                 
              }else{
                 this.$message(data.data.msg);
              }
          }).catch(e => {  this.$message('接口操作失败');})
        }
      }
    }
  }
</script>
