<template>

    <div>
        <!-- <Row type="flex"  v-for="item in sysfields" :key="item.code">
            <Col span="6" class="caption">{{item.caption}}</Col>
            <Col span="18">
                <Tooltip v-if="item.editType=='textbox'" :content="item.remark" placement="top-end">
                    <Input v-if="item.editType=='textbox'" v-model="currentdata[item.code]" :placeholder="item.default"  />
                </Tooltip>
                <Tooltip v-if="item.editType=='number'" :content="item.remark" placement="top-end">
                    <InputNumber v-if="item.editType=='number'" v-model="currentdata[item.code]"></InputNumber>
                </Tooltip>
                <Tooltip v-if="item.editType=='checkbox'" :content="item.remark" placement="top-end">
                    <Checkbox v-if="item.editType=='checkbox'" v-model="currentdata[item.code]"></Checkbox>
                </Tooltip>
                <Tooltip v-if="item.editType=='datasource'" :content="item.remark" placement="top-end">
                    <div style="display:inline-flex">
                    <span style="line-height:32px">{{currentdata[item.code]}}</span>
                    <Button type="text" icon="ios-search" @click="openDatasource"/>
                    </div>
                </Tooltip>
            </Col>
        </Row> <el-upload
                      action="#"
                      v-if="item.editType=='Upload'" 
                      class="upload-demo"
                      :http-request="UploadFile"
                      :on-success="UploadSuccess"
                      :file-list="fileList"
                     >
                      <el-button size="small" type="primary">点击上传</el-button>
                     
                    </el-upload>
        <Divider v-if="customfields.length>0">自定义配置</Divider> -->
        <el-row type="flex" style='margin-bottom:10px' >  <el-col :span="24">说明：{{operatorDoc}} </el-col>    </el-row>
        </br>
        <el-row type="flex" style='margin-bottom:10px' v-for="item in customfields" :key="item.paramName" >
         
            <el-col :span="6" class="caption"  :title="'参数说明：'+currentdata.config[item.paramName].doc+'; 参数类型：'+currentdata.config[item.paramName].paramType" >{{item.labelName}} <i class="el-icon-question"></i></el-col>
            <el-col :span="18">
               
                    <el-input v-if="item.editType=='Input'"  v-model="currentdata.config[item.paramName].paramValue" :title="'参数说明：'+currentdata.config[item.paramName].doc+'; 参数类型：'+currentdata.config[item.paramName].paramType" :placeholder="currentdata.config[item.paramName].doc" />

              
                    <el-select v-if="item.editType=='Select'" style='width:100%' v-model="currentdata.config[item.paramName].paramValue" :title="'参数说明：'+currentdata.config[item.paramName].doc+'; 参数类型：'+currentdata.config[item.paramName].paramType" :placeholder="currentdata.config[item.paramName].doc">
                        <el-option
                          v-for="item in item.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
  
                   


                    <el-input v-if="item.editType=='Upload'" v-model="currentdata.config[item.paramName].paramValue" :title="'参数说明：'+currentdata.config[item.paramName].doc+'; 参数类型：'+currentdata.config[item.paramName].paramType " :placeholder="currentdata.config[item.paramName].doc" />
                    <el-upload
                      class="upload-demo"
                      v-if="item.editType=='Upload'" 
                      action="#"
                      :http-request="UploadFile"
                      :file-list="fileList">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>


                  

                 


            </el-col>
        </el-row>
    </div>

</template>

<script>
import http_sfk from "../../common/http_sfk";
export default {
  name: 'EleSetting',
  props: {
      id: '',
      operatorDoc:''
  },
  data () {
    return {

      sysfields: [],
      customfields: [],
      currentdata: {},

      fileList:[],

      



      // modal_visiable: false,
      // modal_editor: null,
      // modal_editor_visiable: false,
      // hasds: false,
      // cfgEditor: {},
      // list_columns: [],
      // list_data: [],
      // modal_callback: null,
      // isnew: false,
      // editorType: '', // 当前编辑的元素类型
      // modal_work: '', // 当前对话框的工作内容
      // enableTypeSelect: true
    }
  },
  mounted () {

  },

  methods: {
    // 设置一个元素的配置信息，形成属性设置列表 字段信息和相应绑定的数据信息
    setEditor: function (fileds,data) {
      console.log(data)
      this.customfields = fileds;
      this.currentdata = data;
     
    },
    //上传单个文件，用于 文件数据加载
    UploadFile(param){
      var _this=this;
      let formData = new FormData()
      formData.append('file', param.file) // 要提交给后台的文件

       return http_sfk
          .uploadDataFile(formData)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
                // alert(data.data.data);//
                //更新project 里面的数据
                _this.fileList=[];
                // _this.currentdata.config['filePath']=data.data.data;
                _this.currentdata.config['filePath'].paramValue=data.data.data;

                console.log(_this.currentdata.config);
              }else{
                this.$message(data.data.msg);
              }
          }).catch(e => { 
              this.$message('接口操作失败');
                 _this.fileList=[];
            
            })

    },
    UploadSuccess(){
      alert(1)
      console.log(this.fileList)
    },

    // handleChange(file, fileList) {
    //     this.fileList = fileList.slice(-3);
    //   }

    // setEditor2: function (editors, data, enableTypeSelect) {
    //   console.log(data)
    //   this.cfgEditor = editors
    //   this.refreshEditor()
    //   this.isnew = false
    //   this.currentdata = data
    //   this.editorType = data.category
    //   if (data.category == 'channel') {
    //     this.olddata = this.$util.clone(data)
    //   }
    // },
    // // 呈现新建元素的界面
    // newElement: function (editorType, editor) {
    //   this.isnew = true
    //   this.cfgEditor = this.$util.clone(editor != null ? editor : {})
    //   this.refreshEditor()
    //   this.editorType = editorType
    //   if (editorType == 'job') {
    //     this.currentdata =
    //                 {
    //                   category: 'jobs',
    //                   id: 'job_' + parseInt(Math.random() * 1000000),
    //                   caption: '作业1',
    //                   remark: '',
    //                   type: 'job',
    //                   components: [

    //                   ],
    //                   channels: [

    //                   ]
    //                 }
    //   } else {
    //     this.currentdata = { type: '请选择类型', config: {} }
    //   }
    // },
    // onModal: function (fn) {
    //   this.modal_callback = fn
    // },
    // setList: function (list) {
    //   this.list_data = list
    // },
    // openEleType: function () {
    //   // 打开类型选择器
    //   this.list_columns = [
    //     {
    //       type: 'index',
    //       width: 60,
    //       align: 'center'
    //     },
    //     {
    //       title: '名称',
    //       key: 'caption'
    //     },
    //     {
    //       title: '语言',
    //       key: 'lang'
    //     },
    //     {
    //       title: '类型',
    //       key: 'type'
    //     },
    //     {
    //       title: '说明',
    //       key: 'remark'
    //     }
    //   ]
    //   this.modal_work = 'selEditor'
    //   this.modal_callback(this, 'getEditor', this.editorType)
    //   this.modal_visiable = true
    // },
    // openDatasource: function () {
    //   // 打开数据源选择器
    //   this.list_columns = [
    //     {
    //       type: 'index',
    //       width: 60,
    //       align: 'center'
    //     },
    //     {
    //       title: 'Id',
    //       key: 'id'
    //     },
    //     {
    //       title: '名称',
    //       key: 'caption'
    //     },
    //     {
    //       title: '说明',
    //       key: 'remark'
    //     }
    //   ]
    //   this.modal_work = 'selDataSource'
    //   this.modal_callback(this, 'getDataSource')
    //   this.modal_visiable = true
    //   // this.cfgEditor = {}
    // },
    // getData: function () {
    //   return this.cfgEditor
    // },
    // empty: function () {

    // },
    // modal_ok: function () {
    //   if (this.modal_work == 'selEditor') {
    //     this.cfgEditor = this.$util.clone(this.modal_selected_data)
    //     this.refreshEditor()
    //     this.currentdata.type = this.cfgEditor.eletype
    //     if (this.isnew) {
    //       for (let i in this.sysfields) {
    //         let code = this.sysfields[i].code
    //         if (this.sysfields[i].default == '[AUTO]') {
    //           this.currentdata[code] = this.$prj.newId(this.editorType)
    //         } else {
    //           this.currentdata[code] = this.sysfields[i].default
    //         }
    //       }
    //     }
    //     this.currentdata.config = {}
    //     for (let i in this.customfields) {
    //       let code = this.customfields[i].code
    //       this.currentdata.config[code] = this.customfields[i].default
    //     }
    //   } else if (this.modal_work == 'selDataSource') {
    //     this.currentdata['datasource'] = this.modal_selected_data.id
    //   }
    // },
    // modal_cancel: function () {},
    // openEditor: function (param, scripttype) {
    //   console.log(scripttype)
    //   this.currentParam = param
    //   let self = this
    //   this.modal_editor_visiable = true
    //   let lang = 'sql'
    //   if (scripttype == 'sql')lang = 'sql'
    //   else if (scripttype == 'scriptjava')lang = 'java'
    //   else if (scripttype == 'scriptcsharp')lang = 'csharp'
    //   else if (scripttype == 'scriptpython')lang = 'python'
    //   else if (scripttype == 'scriptc')lang = 'c'
    //   else if (scripttype == 'json')lang = 'json'

    //   setTimeout(function () {
    //     let text = ''
    //     let fe = self.getFieldEditor(self.currentParam)
    //     if (fe.datatype == 'jsonobject') {
    //       text = JSON.stringify(self.currentdata.config[self.currentParam])
    //     } else {
    //       text = self.currentdata.config[self.currentParam]
    //     }

    //     // self.modal_editor = monaco.editor.create(document.getElementById('text_editor'),
    //     //   {
    //     //     value: text,
    //     //     language: lang
    //     //   })
    //   }, 500)
    // },
    // modal_editor_ok: function () {
    //   let fe = this.getFieldEditor(this.currentParam)
    //   let rtv = this.modal_editor.getValue()
    //   console.log(rtv)
    //   if (fe.datatype == 'jsonobject') {
    //     try {
    //       this.currentdata.config[this.currentParam] = JSON.parse(rtv)
    //     } catch (e) {
    //       this.$Message.error('JSON字符串解析失败')
    //     }
    //   } else {
    //     this.currentdata.config[this.currentParam] = rtv
    //   }
    //   this.modal_editor.dispose()
    // },
    // getFieldEditor: function (field) {
    //   for (let i = 0; i < this.cfgEditor.editors.length; i++) {
    //     if (this.cfgEditor.editors[i].code == field) { return this.cfgEditor.editors[i] }
    //   }
    //   return null
    // },
    // modal_editor_cancel: function () {
    //   this.modal_editor.dispose()
    // },
    // modal_selected: function (a, b) {
    //   this.modal_selected_data = a
    // },
    // filter: function (fieldtype) {
    //   if (this.cfgEditor == null || this.cfgEditor.editors == null) return []
    //   let srclist = this.cfgEditor.editors
    //   let list = []
    //   for (let i in srclist) {
    //     if (srclist[i].fieldtype == fieldtype) { list.push(srclist[i]) }
    //     // list.push(this.cfgEditor.editors[i])
    //   }

    //   return list
    // },
    // getdata: function () {
    //   return this.currentdata
    // },
    // getolddata: function () {
    //   return this.olddata
    // },
    // refreshEditor (val) {
    //   // 刷新编辑器
    //   this.customfields = this.filter('custom')
    //   this.sysfields = this.filter('system')
    // }
  },
  watch: {

    // editorType (val) {
    //   if (val == 'job' || val == 'in' || val == 'process' || val == 'out') { this.enableTypeSelect = false } else { this.enableTypeSelect = true }
    // }
  }

}
</script>

<style>
   
</style>
