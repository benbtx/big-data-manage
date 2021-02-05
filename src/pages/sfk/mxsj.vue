<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
          <el-col  :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="el-input" style=" float: right;line-height: 40px;">
              名称：{{form.name||'无'}}
            
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="el-input" style=" float: right;line-height: 40px;">
              状态：{{workFlowStatus||'无'}}  <i v-if='isRun' style='font-size:40px' class="el-icon-loading"></i>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <el-button type="primary" :disabled='isRun' icon="plus" @click="btnSave">保存</el-button>

            <el-button type="primary" v-if="modelStatus==0||modelStatus==1||modelStatus==2||modelStatus==3" :disabled='isRun' icon="plus" @click="btnRun(0)">训练</el-button>
            <!-- <el-button type="primary" :disabled='isRun' icon="plus" @click="btnRun(1)">测试</el-button> -->
            <el-button type="primary" v-if="modelStatus==1||modelStatus==3" :disabled='isRun' icon="plus" @click="btnRunResult()">训练结果</el-button>
            <el-button type="primary" v-if="modelStatus==1"  :disabled='isRun' icon="plus" @click="btnPublish">发布</el-button>

            <!-- <el-button type="primary" v-if="modelStatus==3" :disabled='isRun' icon="plus" @click="btnYY">应用</el-button> -->

            <!-- <el-button type="primary" icon="plus" @click="btnClose">关闭</el-button> -->
          
           
          </el-col>
      </el-row>


    </h3>
    
    <div slot="body" :gutter="24" style="margin-bottom: 20px;display:flex">
      <!-- <el-col :span="6" :xs="24" :sm="24" :md="6" :lg="6" style="margin-bottom: 20px;"> -->
        <el-card  style='flex-basis:300px' class="box-card sjyleft">
            <!-- show-checkbox -->

            <div>
              <!-- <div style="float:right;">
              <i class='el-icon-folder-add' style="font-size: 20px;margin-right:5px;cursor: pointer;" @click='addsjylx'></i>   
               <i class='el-icon-edit' style="font-size: 20px;margin-right:5px;cursor: pointer;" @click='updatesjylx'></i>  
               <i class='el-icon-delete' style="font-size: 20px;margin-right:5px;cursor: pointer;" @click='deletesjylx'></i> 
               </div> -->
            </div>


            <el-tree id='sjylxtree' class='sjytree' v-if="menuTree"
                    ref="menuTree"
                    :data="menuTree"
                  
                    highlight-current
                    :expand-on-click-node="false"
                    :default-expand-all='true'
                    :render-content="renderContent"
                    clearable node-key="id" :props="defaultProps">
                    
                    

                    
                    </el-tree>
        </el-card>

        <el-card style='flex:1;over-flow:auto' class="box-card sjyright" >
            <svg id='' width="100%" height="600px">
              <defs>
                <marker id="arrowhead" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" stroke-width="0" stroke="#333"></path>
                </marker>
                <filter id="gaussian" x="0" y="0">
                  <!-- <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"></feGaussianBlur>
                  <feOffset in="blur" dx="6" dy="6" result="offsetBlur"></feOffset>
                  <feColorMatrix result = "matrixOut" in = "offOut" type = "matrix" values = "0.9 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"/>
                  <feMerge>
                    <feMergeNode in="offsetBlur" />
                    <feMergeNode in="SourceGraphic" /> 
                  </feMerge> -->
                  <!-- <feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur> -->
                  <feOffset result="offOut" in="SourceGraphic" dx="5" dy="5" />
                  <feColorMatrix result = "matrixOut" in = "offOut" type = "matrix" values = "0.3 0 0 0 0 0 0.4 0 0 0 0 0 0.8 0 0 0 0 0 1 0"/>
                  <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
                  <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                  
                </filter>
              </defs>
            
            </svg>
            <div  class='coordinate'>
              <div> {{this.x}},{{this.y}}</div>
              <br>  
            </div>
            <!-- <div style="height:150px;overflow:auto"  v-html ="runResult">
                
            </div> -->

            <div v-show='isrunResult' style="position:absolute;bottom:60px;margin:20px;height:200px;overflow:auto;width: calc(100% - 400px);"  v-html ="runResult">
                
            </div>




         

              <el-dialog
                title="预览" width="60%"
                :visible.sync="dialogVisible_yl"
              >
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column  v-for="item in tableTitle" :key="item.value"
                    :prop=item
                    :label=item
                  >
                  </el-table-column>
                 
                </el-table>
                

               

                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_yl = false">取 消</el-button>
                
                  <el-button type="primary" @click="dialogVisible_yl = false">确 认</el-button>
                </span>
              </el-dialog>

              <el-dialog
                :title="curoperatorName"
                :visible.sync="dialogVisible"
              >
               
                

                <EleSetting ref="eleSetting" :id='SelectedNodeId' :operatorDoc='curoperatorDoc'></EleSetting>

                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                
                  <el-button type="primary" @click="dialogVisible = false">确 认</el-button>
                </span>
              </el-dialog>



              <div v-show='isShowMenu' class='menu'>
                  <div  v-for="item in menu" :key="item.value" @click="menuClick(item)">
                    {{item.name}}
                  </div>
              </div>


              


              <el-dialog
                title="保存"
                :visible.sync="dialogVisible_bc"
              >
                
                <el-form ref="form" :model="form" label-width="120px">
                   
                    <el-form-item  label="名称">
                      <el-input  v-model="form.name"></el-input>
 
                      
                    </el-form-item>

                    <el-form-item  label="备注">
                      <el-input   v-model="form.remark"></el-input>
                      
                    </el-form-item>


                </el-form>


                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_bc = false">取 消</el-button>
                  <el-button type="primary" @click="saveWorkFlow">确 认</el-button>
                  <!-- <el-button type="primary" @click="saveWorkFlow">确 认</el-button> -->
                </span>
              </el-dialog>

              <el-dialog
                title="发布"
                :visible.sync="dialogVisible_fb"
              >
                
                <el-form ref="form" :model="form" label-width="120px">
                   
                    <el-form-item  label="输入参数">
                      <el-input   type="textarea"  :rows="6"  :placeholder="form.reqtip" v-model="form.req"></el-input>
 
                      
                    </el-form-item>

                    <el-form-item  label="输出参数">
                      <el-input    type="textarea"  :rows="6"  :placeholder="form.restip"  v-model="form.res"></el-input>
                      
                    </el-form-item>


                </el-form>


                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_fb = false">取 消</el-button>
                  <el-button type="primary" @click="publishProject">确 认</el-button>
                  <!-- <el-button type="primary" @click="saveWorkFlow">确 认</el-button> -->
                </span>
              </el-dialog>


              <el-dialog
                title="应用"
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






           

        
        </el-card>
   
    </div>
  </imp-panel>

</template>
<script type="text/babel">

  import panel from "../../components/panel.vue"
  // import selectTree from "../../components/selectTree.vue"
  import treeter from "../../components/treeter"
  // import merge from 'element-ui/src/utils/merge';
  import EleSetting from './ele-setting';
  import project from './project.js'
  import http_sfk from "../../common/http_sfk";
  import d3 from "d3/d3.min.js";
  // import drag from "d3-drag/dist/d3-drag.min.js";
  export default {
    mixins: [ treeter ],
    components: {
      'imp-panel': panel,
      // 'el-select-tree': selectTree,
         EleSetting,
    },
    data(){
      return {
       
        //用于存储到数据库和从数据库解析流程
        // workFlowData:null,
        workFlowData:{
          nodes: [{
            id:"",
            transform:"translate(113, 66)",
            name:"算法1",
            'data-id':"3",
            configurationData:{},//算法配置属性
          }],
          links: [{
            id:"",
            from:"",
            to:"",
            d:""
          }]
        },
        //每一个工程拖拽形成的node 和link 会保存到这里，点击保存会放到 node_default link_default中
         workFlow: {
            // nodes: {},
            //  links: {}
              nodes: {},
             links: {}
        },
        //默认属性 恢复的工程 数据会在这里 ，但手动 拖放的node link 不在这 
        node_default:[{
            // id:"1597991898404",
            // transform:"translate(113, 66)",
            // name:"算法1",
            // 'data-id':"3",
            // class:"node"
               id: "1597991898404",
                dataId: "3",
                // x:113,
                // y:66,
                transform:"translate(113, 66)",
                text: "算法1",
                mIcon:"",
                mDoc:"",
        },{
            // id:"1597991900563",
            // transform:"translate(113, 66)",
            // name:"算法1",
            // 'data-id':"3",
            // class:"node"
                id: "1597991900563",
                dataId: "3",
                // x:360,
                // y:160,
                transform:"translate(360, 160)",
                text: "算法1",
        }],
        link_default:[{
          id:"1597991909948",
          from:"1597991898404",
          to:"1597991900563",
          d:"M163,84 L360,178",
          // stroke:"#333",
          // 'stroke-width':"2px",
          // class:"cable",
          // start:"90, 23",
          // output:"1",
          // 'marker-end':"url(#arrowhead)",
          // input:"1",
          // end:"90, 23",
       
        }],
        //默认属性
        workFlowId:'',
        workLineName:'',
        // workLineName:'',
        svg:null,
        dragData:null,
        curoperatorDoc:'',

        dx :0,
        dy: 0,
        dragElem:null,
        // isStartLine:false,
        drawLine : false,
        isShowMenu:false,
        menu:[{
          name:"删除",value:'01'
        },{
          name:"添加连线",value:'02'
        },{
          name:"设置",value:'04'
        }],

        x:'0',
        y:'0',

        curTranslate:[],
        //算法参数 dialog
        params:[],
        // sfform:{
        //   filePath:"",
        //   fileType:"",
        //   fileTypeOpts:[],
        // },

        //算法参数

        // project:null,

        //  SelectedNode:null,
        SelectedNodeId:'',
        dialogVisible: false,
        curoperatorName:"设置",
        dialogVisible_bc: false,
        dialogVisible_fb: false,
        dialogVisible_yl: false,
        dialogVisible_yy: false,//应用按钮

     
        // maxId: 7000000,
        menuTree: [],
        form: {
          id: null,
          name: '',
          sort: 0,
          icon: '',
          href: '',
          isShow: '',
          delivery: false,
          parentId: null,
          desc: '',
          remark:'',
          json:'',
          jsonresult:'',
          req:'',
          res:'',
          reqtip:"格式："+JSON.stringify([{"paramName":"name","paramType":"字符串","paramRemark":"分组字段"},
              {"paramName":"count","paramType":"数字型","paramRemark":"求和字段"}
              ]),
          restip:"格式："+JSON.stringify([{"paramName":"name","paramType":"字符串","paramRemark":"分组字段"},
              {"paramName":"sum(count)","paramType":"数字型","paramRemark":"求和结果字段"}
              ])
        },
        // currentRow: {},
        // dialogLoading: false,
        defaultProps: {
          // children: 'children',
          // label: 'value',
          // id: "id",
          children: 'childRenList',
          label: 'name',
          id: "id",
        },
        workFlowStatus:'草稿',
        runResult:'',//</br> 最后状态:</br>最后状态:
        interval:0,
        isRun:false,
        tableData:[],
        tableTitle:[],
        modelStatus:0,
        isrunResult:false,
        yy:false,

      }
    },
    methods: {
   
      setSvgEvent(){
        var _this=this;
        // this.svg = d3.select("svg");
        d3.select("svg").on("dragover", () => {
                    d3.event.preventDefault();
                })
                .on("drop", () => {
                    // let p = this.getMovePath();
                    // this.addData(p[0], p[1]);
                    // this.createNodeAndLine();
                    this.drop();
                })
                .on("contextmenu", function(data, index) {
                  //handle right click
                  // alert(1)
                  console.log(data,index,this)

                  //stop showing browser menu
                  d3.event.preventDefault()
                  
                })
                .on("click", function() {
                    _this.isShowMenu=false;
                    // alert('点击了空白')
                    // //右键连线 右键添加连线时鼠标移动更新结束坐标
                    // console.log('右键连线结束');
                    // if(_this.activeLine!=null&&_this.drawLine){
                    //   //获取当前选中节点
                    //   //  _this.activeLine = null;
                      
                    //   _this.drawLine=false;
                      
                    // }

                    //获取当前坐标，查找所有矩形，如果坐标在矩形内，则结束画线，否则画线未成功，关闭画线状态
                    //  d3.selectAll('g.node')
                    var count=0;
                    if(_this.activeLine!=null&&_this.drawLine){
                        d3.selectAll('g.node').each(function(){
                          d3.select(this)
                          var transform =  d3.select(this).attr("transform");
                          var translate = _this.getTranslate(transform);
                          //点落点矩形中 count 替代break
                          if(count<=1&&translate[0]<=_this.x&&translate[1]<=_this.y&&(translate[0]+180)>=_this.x&&(translate[1]+36)>=_this.y){
                            
                      
                                //  alert('删除新建')
                                //删除那个默认的path，重新insert path;
                                _this.activeLine;
                                _this.curTranslate;
                                _this.currentNode;
                                  var lsnode=  _this.activeLine;
                                lsnode.attr("from");
                                // this; element
                                
                                var id=new Date().getTime();
                                var newpath= d3.select("svg")
                                  .insert("path","g")
                                  .attr("id", id)
                                  // .append("path")
                                  .attr("stroke", "#333")
                                  .attr("stroke-width", "2px")
                                  .attr("class", "cable")
                                  .attr("from",lsnode.attr("from"))
                                  .attr("start", 90 + ", " + 23)
                                  .attr("output",1)
                                  .attr("marker-end", "url(#arrowhead)")
                                  .attr("to",this.id)
                                  .attr("input",1)
                                  .attr("end", 90 + ", " + 23);

                                  d3.selectAll('path[id="' +  lsnode.attr("id")+ '"]').remove();
                                  //  d3.selectAll('g[id="' +  this. SelectedNode.id + '"]').remove();
                                  
                                  var endnode=d3.selectAll('g[id="' +  this.id + '"]');
                                  
                                  var transform = endnode.attr("transform");
                                  var endTranslate = _this.getTranslate(transform);
                                  //默认连接结束点的右侧
                                  newpath.attr("d", function() {
                                      return "M" +(_this.curTranslate[0]+90) + "," + (_this.curTranslate[1]+18)
                                      + " L" +(endTranslate[0]) + "," + (endTranslate[1]+18);
                                  });


                                  newpath.on("contextmenu", function(data, index) {
                                    //handle right click
                                    // alert(1)
                                    console.log(data,index,this)
                                    //显示弹出框，选中删除
                                    _this.isShowMenu=true;
                                    _this.menu=[{
                                      name:"删除",value:'03'
                                    }]
                                  
                                    // document.querySelector('.menu').style.left=  d3.event.layerX+380+'px';
                                    // document.querySelector('.menu').style.top=  d3.event.layerY+'px';

                                    document.querySelector('.menu').style.left=  _this.x+310+'px';
                                    document.querySelector('.menu').style.top= _this.y+120+'px';
                                  
                                    _this.SelectedNode=this;
                                    //stop showing browser menu
                                    // d3.event.preventDefault()
                                  
                                  })

                                  _this.workFlow.links[id]=newpath;




                                  _this.activeLine=null;
                                  _this.drawLine=false;
                                
                            
                            
                                  count+=1;
                          
                          }
                    });

                 
                    if(count==0){
                      //没找到落到空白处 删除当临时画线 
                      var lsnode=  _this.activeLine;
                      d3.selectAll('path[id="' +  lsnode.attr("id")+ '"]').remove();
                      _this.activeLine = null;
                      _this.drawLine=false;
                    }
                 }
                 


                  
                })
                .on("mousemove", () => {
                  // if(_this.isStartLine){
                  //     console.log('连线移动');
                  // }
                  this.x=d3.event.layerX-20;
                  this.y=d3.event.layerY-20;

                  //右键连线 右键添加连线时鼠标移动更新结束坐标
                  // console.log('右键连线移动');
                  if(_this.activeLine!=null&&_this.drawLine){
                      _this.activeLine.attr("d", function() {
                          return "M" +(_this.curTranslate[0]+90) + "," + (_this.curTranslate[1]+18)
                          + " L" + _this.x + "," + _this.y;
                      });
                  }

                  // //右键连线 点击空白结束
                  // if(_this.activeLine!=null&&_this.drawLine==false){
                    
                  //     // alert('删除');
                  //        var lsnode=  _this.activeLine;
                  //       d3.selectAll('path[id="' +  lsnode.attr("id")+ '"]').remove();
                  //         _this.activeLine=null;
                  // }
                

                 
                   
                });



      },
      dragStart(node){
         console.log('拖动node',node);
         this.dragData = node;

      },

      drop(){
        var _this=this;
         //节点拖拽相关变量
        var dragelem=null;


        //连线拖拽相关变量
        var activeLine = null;
        var points = [];
        var translate = null;
        // var drawLine = false;
         var node = {
                id: new Date().getTime(),
                dataId: this.dragData.data.id|| this.dragData.id,
                x:d3.event.layerX-30|| 250,
                y:d3.event.layerY-30|| 40,
                text: this.dragData.data.value||this.dragData.data.name,
                mIcon: this.dragData.data.mIcon,
                className: this.dragData.data.className,
                opMl: this.dragData.data.opMl,
                code: this.dragData.data.code,
                estimator: this.dragData.data.estimator,
                mDoc: this.dragData.data.mDoc,
                // paramType: this.dragData.data.paramType,
                // inputs: 1,
                // outputs: 2
            };
            this.curoperatorDoc=this.dragData.data.mDoc;

            // if(node.dataId == 101) {
            //     node.inputs = 0;
            //     node.outputs = 1;
            // } else if(node.dataId == 102) {
            //     node.inputs = 1;
            //     node.outputs = 0;
            // } else {
            //     node.inputs = 1;
            //     node.outputs = 1;
            // }
            // 计算节点编号
            // if(this.workFlow.nodes[node.dataId]) {
            //     this.workFlow.nodes[node.dataId] += 1;
            // } else {
            //     this.workFlow.nodes[node.dataId] = 1;
            // }
            var g = this.addNode(node);
            //获取类，生成算子设置的数据
            this.getSetting(node)
        

              
      
            this.workFlow.nodes[node.id]=g;
            g.on("contextmenu", function(data, index) {
                  //handle right click
                  // alert(1)
                  console.log(data,index,this)
                  //显示弹出框，选中删除
                  _this.isShowMenu=true;
                  _this._operatorCode =node.id||node.data.code;
                  _this.curoperatorDoc=node.mDoc;
                  _this.menu=node.estimator?[{
                    name:"删除",value:'01'
                  },{
                    name:"添加连线",value:'02'
                  },{
                    name:"设置",value:'04'
                  }]:[{
                    name:"删除",value:'01'
                  },{
                    name:"添加连线",value:'02'
                  },{
                    name:"设置",value:'04'
                  },{
                    name:"预览",value:'05'
                  }]
                  // document.querySelector('.menu').style.left=  d3.event.layerX+450+'px';
                  // document.querySelector('.menu').style.top=  d3.event.layerY+'px';

                  document.querySelector('.menu').style.left=  _this.x+310+'px';
                  document.querySelector('.menu').style.top= _this.y+120+'px';
                
                  _this.SelectedNode=this;
                  _this.SelectedNodeId=this.id;
                  //stop showing browser menu
                  d3.event.preventDefault()
                
            });
            // g.on("dblclick", function() {
            //   _this.dialogVisible=true;
            // });

            // g.on("click", function() {
            //     // _this.drawLine=false;
            //     //   _this.activeLine=null;

            //     // alert('点击了矩形')
            //     //右键连线 点击了相当于结束 然后在范围内
            //       // alert(_this.drawLine)
            //     if(_this.activeLine!=null&&_this.drawLine){
                    
            //         //  alert('删除新建')
            //         //删除那个默认的path，重新insert path;
            //         _this.activeLine;
            //         _this.curTranslate;
            //         _this.currentNode;
            //           var lsnode=  _this.activeLine;
            //         lsnode.attr("from");
            //         this;
                    
            //         var id=new Date().getTime();
            //         var newpath= d3.select("svg")
            //           .insert("path","g")
            //           .attr("id", id)
            //           // .append("path")
            //           .attr("stroke", "#333")
            //           .attr("stroke-width", "2px")
            //           .attr("class", "cable")
            //           .attr("from",lsnode.attr("from"))
            //           .attr("start", 90 + ", " + 23)
            //           .attr("output",1)
            //           .attr("marker-end", "url(#arrowhead)")
            //           .attr("to",this.id)
            //           .attr("input",1)
            //           .attr("end", 90 + ", " + 23);

            //           d3.selectAll('path[id="' +  lsnode.attr("id")+ '"]').remove();
            //           //  d3.selectAll('g[id="' +  this. SelectedNode.id + '"]').remove();
                      
            //           var endnode=d3.selectAll('g[id="' +  this.id + '"]');
                      
            //           var transform = endnode.attr("transform");
            //           var endTranslate = _this.getTranslate(transform);
            //           //默认连接结束点的右侧
            //           newpath.attr("d", function() {
            //               return "M" +(_this.curTranslate[0]+90) + "," + (_this.curTranslate[1]+18)
            //               + " L" +(endTranslate[0]) + "," + (endTranslate[1]+18);
            //           });


            //           newpath.on("contextmenu", function(data, index) {
            //             //handle right click
            //             // alert(1)
            //             console.log(data,index,this)
            //             //显示弹出框，选中删除
            //             _this.isShowMenu=true;
            //             _this.menu=[{
            //               name:"删除",value:'03'
            //             }]
                      
            //             document.querySelector('.menu').style.left=  d3.event.layerX+580+'px';
            //             document.querySelector('.menu').style.top=  d3.event.layerY+'px';
                      
            //             _this.SelectedNode=this;
            //             //stop showing browser menu
            //             // d3.event.preventDefault()
                      
            //           })

            //           _this.workFlow.links[id]=newpath;




            //           _this.activeLine=null;
            //               _this.drawLine=false;
                    
            //     }
            //         //  d3.event.sourceEvent.stopPropagation();
              

            //           d3.event.stopPropagation();
                    
            
                
                
            // });


            g.call(
                d3.behavior.drag()
                  // .on("dragstart", this.dragstarted)
                  // .on("drag", this.dragged)
                  // .on("dragend", this.dragended)
                  .on("dragstart",function(d,i){
                    _this.isShowMenu=false;
                    console.log("节点拖拽状态：开始",d,i);
                    console.log(this);
                    var transform = d3.select(this).attr("transform");
                    var translate = _this.getTranslate(transform);
                    _this.dx = d3.event.sourceEvent.layerX - translate[0];
                    _this.dy = d3.event.sourceEvent.layerY - translate[1];
                    dragelem = d3.select(this);
                  })
                  .on("dragend",function(d,i){
                    console.log("节点拖拽状态：结束",d,i);
                      _this.dx = _this.dy = 0;
                      dragelem = null;
                  })
                  .on("drag",function(d,i){
                    console.log("节点拖拽状态：进行中",this);
                    dragelem.attr("transform", "translate(" + ( d3.event.sourceEvent.layerX - _this.dx) + ", " + ( d3.event.sourceEvent.layerY - _this.dy) + ")");
                    _this.updateCable(dragelem);

                  })
                 
                 
            );

  
          
            // g.selectAll("circle.output").call(
            //     d3.behavior.drag()
            //       .on("dragstart", function(d,i){
            //         console.log("连线拖拽状态：开始",d,i);
            //         console.log(this);
            //          d3.event.sourceEvent.stopPropagation();


            //         _this.drawLine = false;
            //         // 当前选中的circle
            //         var anchor = d3.select(this);
            //         // 当前选中的节点
            //         var node = d3.select(this.parentNode);
            //         var rect = node.node().getBoundingClientRect();
            //         var dx = rect.width / (+anchor.attr("output") + 1);
            //         var dy = rect.height/2;
            //         var transform = node.attr("transform");
            //         translate = _this.getTranslate(transform);
            //         points.push([dx + translate[0], dy + translate[1]]);
            //         // activeLine = d3.select("svg")
            //         //   .append("path")
            //         //     .attr("stroke", "#333")
            //         //     .attr("stroke-width", "2px")
            //         //   .attr("class", "cable")
            //         //   .attr("from", node.attr("id"))
            //         //   .attr("start", dx + ", " + dy)
            //         //   .attr("output", d3.select(this).attr("output"))
            //         //   .attr("marker-end", "url(#arrowhead)");

            //           //用insert 添加到当前开始节点的前面

            //            activeLine = d3.select("svg")
            //            .insert("path","g")
            //               .attr("id", new Date().getTime())
            //           // .append("path")
            //             .attr("stroke", "#333")
            //             .attr("stroke-width", "2px")
            //           .attr("class", "cable")
            //           .attr("from", node.attr("id"))
            //           .attr("start", dx + ", " + dy)
            //           .attr("output", d3.select(this).attr("output"))
            //           .attr("marker-end", "url(#arrowhead)");


            //           activeLine.on("contextmenu", function(data, index) {
            //             //handle right click
            //             // alert(1)
            //             console.log(data,index,this)
            //             //显示弹出框，选中删除
            //             _this.isShowMenu=true;
            //             _this.menu=[{
            //               name:"删除",value:'03'
            //             }]
                      
            //             document.querySelector('.menu').style.left=  d3.event.layerX+380+'px';
            //             document.querySelector('.menu').style.top=  d3.event.layerY+'px';
                      
            //             _this.SelectedNode=this;
            //             //stop showing browser menu
            //             d3.event.preventDefault()
                      
            //           })



            //       })
            //       .on("drag", function(d,i){
            //         console.log("连线拖拽状态：进行中",d,i);
                   
            //         console.log(this);
            //           _this.drawLine = true;
            //           console.log('是否正在画线',_this.drawLine);
            //           points[1] = [d3.event.x + translate[0], d3.event.y + translate[1]];
                    
            //           activeLine.attr("d", function() {
                          

            //               console.log(2, points[1][0]);
            //               return "M" + points[0][0] + "," + points[0][1]
            //               + " L" +  points[1][0] + "," + points[1][1];
            //           });


            //       })
            //       .on("dragend", function(d,i){
            //         console.log("连线拖拽状态：结束",d,i);
            //         console.log(this);
            //           d3.event.sourceEvent.stopPropagation();

            //         _this.drawLine = false;
            //         var anchor = d3.selectAll("circle.end");
            //         if(anchor.empty()) {
            //             activeLine.remove();
            //         } else {
            //             var pNode = d3.select(anchor.node().parentNode);
            //             var input = pNode.node().getBoundingClientRect().width / (+anchor.attr("input") + 1);
            //             anchor.classed("end", false);
            //             activeLine.attr("to", pNode.attr("id"));
            //             activeLine.attr("input", anchor.attr("input"));
            //             activeLine.attr("end", input + ", 0");

            //               // //连线成功之后把from 节点放到path节点后，解决svg 中后生成的线会压盖先生成的节点
            //               // //还要重新赋值事件
            //               // //  var starnode= d3.selectAll('g[id="' + activeLine.attr("from") + '"]');
            //               // var starnode=  document.querySelector('g[id="' + activeLine.attr("from") + '"]');
            //               // var copy=starnode.cloneNode(true);
            //               // //  starnode=null;
            //               //   document.querySelector('svg').removeChild(starnode);
            //               //   document.querySelector('svg').appendChild(copy);
            //         }
            //         activeLine = null;
            //         points.length = 0;
            //         translate = null;


                  






            //       })
            // );

            // g.selectAll("circle.input")
            //  .on("mouseover", function() {
            //     console.log('进入范围',_this.drawLine);
            //     if(_this.drawLine) {
            //         d3.selectAll("circle.end").classed("end", false);
            //         d3.select(this).classed("end", true);
            //     }
            // });

         

      },

  
      addNode(node) {
          var g = d3.select("svg").append("g")
                    .attr("class", "node")
                    .attr("data-id", node.dataId)
                    .attr("id", node.id)
                    .attr("transform", 'translate(' + node.x + ', ' + node.y + ')');

          var rect = g.append("rect")
          .attr("width", 180)
          .attr("height", 36)
          .attr("rx", 5)
          .attr("ry", 5)
          .attr("stroke-width", 2.2)
          .attr("stroke", "#333")
          // .attr("stroke", "#7ec2ff")
          .attr("filter", "url(#gaussian)")
          .attr("fill", "#fff");

          var bound = rect.node().getBoundingClientRect();
          var width = bound.width;
          var height = bound.height;

          // text
          g.append("text")
          .text(node.text)
          .attr("doc",node.mDoc)
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("dominant-baseline", "central") 
          .attr("text-anchor", "middle");

          // left icon
          g.append('image')
          .attr("x", 18)
          .attr("y", height / 4)
          .attr("width", 18)
          .attr("height", 18)
          .attr("xlink:href", node.mIcon);


          // // left icon
          // g.append('text')
          // .attr("x", 18)
          // .attr("y", height / 2)
          // .attr("dominant-baseline", "central") 
          // .attr("text-anchor", "middle")
          // .attr('font-family', 'FontAwesome')
          //     .text('\uf1c0');

          // // right icon
          // g.append('text')
          // .attr("x", width - 18)
          // .attr("y", height / 2)
          // .attr("dominant-baseline", "central") 
          // .attr("text-anchor", "middle")
          // .attr('font-family', 'FontAwesome')
          //     .text('\uf00c');

          // // input circle
          // var inputs = node.inputs || 0;
          // g.attr("inputs", inputs);
          // for(var i = 0; i < inputs; i++) {
          //     g.append("circle")
          //     .attr("class", "input")
          //     .attr("input", (i + 1))
          //     .attr("cx", width * (i + 1) / (inputs + 1))
          //     .attr("cy", 0)
          //     .attr("r", 5);
          // }

          // // output circle
          // var outputs = node.outputs || 0;
          // g.attr("outputs", outputs);
          // for(i = 0; i < outputs; i++) {
          //     g.append("circle")
          //     .attr("output", (i + 1))
          //     .attr("class", "output")
          //     .attr("cx", width * (i + 1) / (outputs + 1))
          //     .attr("cy", height)
          //     .attr("r", 5);
          // }

          return g;
      },

    

      getTranslate(transform) {
          var arr = transform.substring(transform.indexOf("(")+1, transform.indexOf(")")).split(",");
          return [+arr[0], +arr[1]];
      },

      // dragstarted() {
      //     console.log(this);
      //     var transform = d3.select(this).attr("transform");
      //     var translate = getTranslate(transform);
      //     this.dx = d3.event.x - translate[0];
      //     this.dy = d3.event.y - translate[1];
      //     this.dragElem = d3.select(this);
      // },

      // dragged() {
      //   this.dragElem.attr("transform", "translate(" + (d3.event.x - this.dx) + ", " + (d3.event.y - this.dy) + ")");
      //   this.updateCable(this.dragElem);
      // },

      updateCable(elem) {
          var bound = elem.node().getBoundingClientRect();
          var width = bound.width;
          var height = bound.height;
          var id = elem.attr("id");
          var transform = elem.attr("transform");
          var t1 = this.getTranslate(transform);

          var _this=this;
          // 更新输出线的位置
          d3.selectAll('path[from="' + id + '"]')
            .each(function() {
              var start = d3.select(this).attr("start").split(",");
              start[0] = +start[0] + t1[0];
              start[1] = +start[1] + t1[1];

              var path = d3.select(this).attr("d");
              // var end = path.substring(path.lastIndexOf(" ") + 1).split(",");
              var end = path.substring(path.lastIndexOf(" ") + 2).split(",");
              end[0] = +end[0];
              end[1] = +end[1];

              // d3.select(this).attr("d", function() {
              //     return "M" + start[0] + "," + start[1]
              //     + " C" + start[0] + "," + (start[1] + end[1]) / 2
              //     + " " + end[0] + "," +  (start[1] + end[1]) / 2
              //     + " " + end[0] + "," + end[1];
              // });
              console.log(3,path),
              console.log(3,end[0]),
              d3.select(this).attr("d", function() {
                  return "M" + start[0] + "," + start[1]
                  + " L" +  end[0] + "," + end[1];
              });

              //输出那个节点在输入节点的方位不同时，连接输入节点的四个不同方向（或者连接输入节点外框边缘）
              //矩形 180 36+10       (x,y)  中心点  输入点(start[0],start[1])     左下角坐标 (start[0]-90,start[1]-18)  
              //矩形 180 36+10      左上角坐标 a(endnode_t1[0],endnode_t1[1])    右下角坐标b(end[0]+180,end[1]+36) 
              //井字形
              //点到矩形的最近的点
              //正上
              //输出点不动 start 值固定 求end的值
             
              var endnodeid=d3.select(this).attr('to');
                 var endnode=    d3.selectAll('g[id="' + endnodeid + '"]');
                  var endnode_tansform = endnode.attr("transform");
               var endnode_t1 = _this.getTranslate(endnode_tansform);//左上角坐标

         
              //正上
              if(start[1]<endnode_t1[1]){
                  d3.select(this).attr("d", function() {
                    return "M" + start[0] + "," + start[1]
                    + " L" + (endnode_t1[0]+90)  + "," + (endnode_t1[1]);
                  });
              }
               //左
              if(start[0]<=endnode_t1[0]&&endnode_t1[1]<=start[1]&&start[1]<=endnode_t1[1]+36){
                  d3.select(this).attr("d", function() {
                      return "M" + start[0] + "," + start[1]
                      + " L" +  (endnode_t1[0]) + "," +(endnode_t1[1]+18) ;
                  });
              }
              //正下
              if(start[1]>endnode_t1[1]+36){
                  d3.select(this).attr("d", function() {
                      return "M" + start[0] + "," + start[1]
                      + " L" + (endnode_t1[0]+90)  + "," + (endnode_t1[1]+36);
                  });
              }
             
              //右
               if(start[0]>=endnode_t1[0]+90&&endnode_t1[1]<=start[1]&&start[1]<=endnode_t1[1]+36){
                  d3.select(this).attr("d", function() {
                      return "M" + start[0] + "," + start[1]
                      + " L" +  (endnode_t1[0]+180)+ "," +( endnode_t1[1]+18);
                  });
              }

            });

          // 更新输入线的位置
          d3.selectAll('path[to="' + id + '"]')
            .each(function() {
              var path = d3.select(this).attr("d");
              // var start = path.substring(1, path.indexOf("C")).split(",");
              var start = path.substring(1, path.indexOf("L")).split(",");
              start[0] = +start[0];
              start[1] = +start[1];

              var end = d3.select(this).attr("end").split(",");
              end[0] = +end[0] + t1[0];
              end[1] = +end[1] + t1[1];

              // d3.select(this).attr("d", function() {
              //     return "M" + start[0] + "," + start[1]
              //     + " C" + start[0] + "," + (start[1] + end[1]) / 2
              //     + " " + end[0] + "," +  (start[1] + end[1]) / 2
              //     + " " + end[0] + "," + end[1];
              // });
              console.log(4,end[0]),
              d3.select(this).attr("d", function() {
                  return "M" + start[0] + "," + start[1]
                  + " L" +  end[0] + "," + end[1];
              });

              //输出那个节点在输入节点的方位不同时，连接输入节点的四个不同方向（或者连接输入节点外框边缘）
              //矩形 180 36+10       (x,y)  中心点  输入点(startnode_t1[0]+90,startnode_t1[1]+18)    
              //矩形 180 36+10      左上角坐标 a(endnode_t1[0],endnode_t1[1])    右下角坐标b(endnode_t1[0]+180,endnode_t1[1]+36)  
              //井字形
              //点到矩形的最近的点
              //正上
              //输入点不动 end 值固定 求start的值
             
              var startnodeid=d3.select(this).attr('from');
                 var startnode=    d3.selectAll('g[id="' + startnodeid + '"]');
                  var startnode_tansform = startnode.attr("transform");
               var startnode_t1 = _this.getTranslate(startnode_tansform);//左上角坐标

                var endnodeid=d3.select(this).attr('to');
                 var endnode=    d3.selectAll('g[id="' + endnodeid + '"]');
                  var endnode_tansform = endnode.attr("transform");
               var endnode_t1 = _this.getTranslate(endnode_tansform);//左上角坐标

         
              //正上
              if(startnode_t1[1]+18<endnode_t1[1]){
                  d3.select(this).attr("d", function() {
                    return "M" + (startnode_t1[0]+90) + "," + (startnode_t1[1]+18)
                    + " L" + (endnode_t1[0]+90)  + "," + (endnode_t1[1]);
                  });
              }
               //左
              if(startnode_t1[0]+90<=endnode_t1[0]&&endnode_t1[1]<=startnode_t1[1]+18&&startnode_t1[1]+18<=endnode_t1[1]+36){
                  d3.select(this).attr("d", function() {
                      return "M" +  (startnode_t1[0]+90) + "," + (startnode_t1[1]+18)
                      + " L" +  (endnode_t1[0]) + "," +(endnode_t1[1]+18) ;
                  });
              }
              //正下
              if(startnode_t1[1]+18>endnode_t1[1]+36){
                  d3.select(this).attr("d", function() {
                      return "M" +  (startnode_t1[0]+90) + "," + (startnode_t1[1]+18)
                       + " L" + (endnode_t1[0]+90)  + "," + (endnode_t1[1]+36);
                  });
              }
             
              //右
               if(startnode_t1[0]+90>=end[0]+90&&endnode_t1[1]<=startnode_t1[1]+18&&startnode_t1[1]+18<=endnode_t1[1]+36){
                  d3.select(this).attr("d", function() {
                      return "M" + (startnode_t1[0]+90) + "," +(startnode_t1[1]+18)
                        + " L" +  (endnode_t1[0]+180)+ "," +( endnode_t1[1]+18);
                  });
              }




          });




      },

      // dragended() {
      //     this.dx = this.dy = 0;
      //     this.dragElem = null;
      // },


      menuClick(item){
        this.isShowMenu=false;
         switch (item.value) {
                case "01":
                    //节点删除
                    //删除节点要删除关联的连线
                    this.$confirm('将删除该数据, 是否确定?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                       
                       this.deleteNodes();

                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });
                    });




                    break;
                case "02":
                    //节点添加连线
                    // this.addLink_Manual(item);
                    this.addLink_Manual();
                    // console.log(1);
                    break;
                case "03":
                    //连线删除
                    this.deleteLink();
                    break;
                case "04":
                    //节点设置
                    this.setNode();
                    break;
                case "05":
                    //节点预览
                    this.previewNode();
                    break;
            }  
      },
      setNode(){
        //设置弹框
        // this.getSetting(this.SelectedNode.dataset.id);
        this.dialogVisible=true;
        this.curoperatorName=this.SelectedNode.textContent;
        var data=project.getComponent(this.SelectedNode.id);
        this.$nextTick(function(){
           this.$refs.eleSetting.setEditor( this.params[this.SelectedNode.id], data);

        });
      
      },
      //训练成功，有一些算子右键可预览结果
      previewNode(){
        var _this=this;
        //设置弹框
        // this.getSetting(this.SelectedNode.dataset.id);
        this.tableData=[];
        this.tableTitle=[];
        this.dialogVisible_yl=true;
          var query={
              operatorCode :this._operatorCode,
              workLineName :this.workLineName
            };       
            return http_sfk
              .getOperatorPreviewData(query)
              .then(res => res)
              .then(data => {
                  if(data.data.code==200)
                  {
                    // _this.$message(data.data.msg); 
                   
                    _this.tableData= JSON.parse(data.data.data.dataResult);
                    _this.tableData.forEach(element => {
                     
                      // for (let  elem of Object.values(element)) {
                      //   // elem=elem.toString();
                      //   elem=JSON.stringify(elem);
                      // }
                      for (let  key of Object.keys(element)) {
                        // elem=elem.toString();
                        element[key]=JSON.stringify(element[key]);
                      }
                      console.log(element)
                    });
                    _this.tableTitle=data.data.data.tableTitle;

                  
                  
                    
                  }else{
                    _this.$message(data.data.msg);
                   
                    
                  }
              }).catch(e => { 
                  _this.$message('接口操作失败');
                
            
            })

      
      },
      deleteNodes(){
        //当前项目有两类数据 工程本身的（ this.node_default，this.link_default）和现场修改拖到的数据  this.workFlow
        var id=this.SelectedNode.id;
        project.delComponent(this.SelectedNode.id);
         // //删除
        //删除拖放时的数据
        delete this.workFlow.nodes[this.SelectedNode.id];
        delete this.workFlow.links[this.SelectedNode.id];
        // this.node_default;
        // this.link_default;
        //删除工程本身的数据
        var lsnode=[];
        var lslink=[];
        this.node_default.forEach(element => {
           if(element.id!=id){
             lsnode.push(element);
           }
        });
        this.link_default.forEach(element => {
           if(element.from!=id&&element.to!=id){
             lslink.push(element);
           }
        });
        this.node_default=lsnode;
        this.link_default=lslink;

        // this.node_default.splice(  this.node_default.findIndex(item => item.id === id), 1);
        // this.link_default.splice( this.link_default.findIndex(item => item.from === id), 1);
        // this.link_default.splice( this.link_default.findIndex(item => item.to === id), 1);
       
        this.SelectedNode;
        this. SelectedNode.id;
        d3.selectAll('path[from="' +  this.SelectedNode.id + '"]').remove();
        d3.selectAll('path[to="' +  this.SelectedNode.id + '"]').remove();
        d3.selectAll('g[id="' +  this.SelectedNode.id + '"]').remove();

       


         
      },
      deleteLink(){
        var _this=this;
        this.SelectedNode;
        this. SelectedNode.id;
        d3.selectAll('path[id="' +  this.SelectedNode.id + '"]').remove();
        //删除对象里的线 this。link_de   this.workFlow.links
      
        var links=[];
        Object.keys(this.workFlow.links).forEach(element => {
           
            if(_this.workFlow.links[element].attr('id')!=_this.SelectedNode.id){
              // links.push(_this.workFlow.links[element])
              links[_this.workFlow.links[element].attr('id')]=_this.workFlow.links[element];
            }
           
            


        
        });
        this.workFlow.links=links;

        var links2=[]
        this.link_default.forEach(element => {
            if(this. SelectedNode.id!=element.id){
               links2.push(element);
            }
        });
        this.link_default=links2;
        
      },
      addLink_Manual(){
        var _this=this;
        //当前节点的中心点为起点, 画布onmousemove  事件 移动 添加结束点  画布拖拽结束事件 清空 线 
        this.SelectedNode;
        this. SelectedNode.id;
        var node=d3.selectAll('g[id="' +  this. SelectedNode.id + '"]')


        console.log("右键连线拖拽状态：开始",node,this);
        this.x;

        this.drawLine = true;




        // // 当前选中的circle
        // var anchor = d3.select(this);
        // // 当前选中的节点
        // var node = d3.select(this.parentNode);
        // var rect = node.node().getBoundingClientRect();
        // var dx = rect.width / (+anchor.attr("output") + 1);
        // var dy = rect.height/2;
        var transform = node.attr("transform");
        this.curTranslate = this.getTranslate(transform);
        var points=[];
        points.push([ this.curTranslate[0],this.curTranslate[1]]);
        points.push([  this.x, this.y]);
      

        // this.activeLine  vue 组件data追加的数据 不具备响应式功能
          //用insert 添加到当前开始节点的前面
        this.activeLine = d3.select("svg")
          // .insert("path","g")
          .append("path")
          .attr("id", new Date().getTime())
          .attr("stroke", "#333")
          // .attr("stroke", "red")
          .attr("stroke-width", "2px")
          .attr("class", "cable")
          .attr("from", node.attr("id"))
          // .attr("start", dx + ", " + dy)
          // .attr("output", d3.select(this).attr("output"))
          .attr("marker-end", "url(#arrowhead)");

        this.activeLine.attr("d", function() {
            console.log(2, points[1][0]);
            return "M" +(_this.curTranslate[0]+90) + "," + (_this.curTranslate[1]+18)
            + " L" + _this.x + "," + _this.y;
        });

        // this.activeLine=null;
        //  this.drawLine = false;



      






      },

      //恢复界面和算子数据
      setProject(){
        var _this=this;   
        this.$route.query.id;
        this.node_default=[];
        this.link_default=[];


             
          return http_sfk
            .getWorkLineInfoById({id:this.$route.query.id})
            .then(res => res)
            .then(data => {
                if(data.data.code==200)
                {
                  if(!_this.yy){
                    _this.form.name=data.data.data.worklineFriendlyName;
                    _this.form.remark=data.data.data.remark;
                    _this.workLineName=data.data.data.workLineName;
                    _this.modelStatus=data.data.data.modelStatus;
                    
                    _this.workFlowStatus =(data.data.data.modelStatus=== 0 ? '新建及更新' : data.data.data.modelStatus===1 ?'训练成功':data.data.data.modelStatus===2 ?'训练失败':data.data.data.modelStatus===3 ?'发布工作流':'训练中')

                  }
                  var sz=data.data.data.operators;
                  //恢复界面
                  var pageInfo=JSON.parse(data.data.data.modelPageInfo);
                  //恢复界面数据

              
                  
                  


                  // JSON.parse()
                  //node 赋值和加事件
                  JSON.parse(pageInfo.node_default).forEach((element,i) => {
                    sz.forEach(item => {
                      if(element.id==item.preNode){
                        element.data=item;
                      }
                    });
                    _this.addNode_fromProject(element);
                    _this.node_default.push(element);
                     //恢复算子数据
                    _this.getSetting2({dataId:element.dataId,id:element.id,sz:sz})
                 
                  });
                  //link 赋值和加事件
                  JSON.parse(pageInfo.link_default).forEach(element => {
                    _this.addLink_fromProject(element);
                    _this.link_default.push(element);
                  });


                  


                  
                  // data.data.data.operators.forEach(element => {
                     
                  // });

                     //恢复算子数据
                  // var zjdata=project.newComponent( {id:element.id,dataId:element.dataId,fields:data.data.data});

                  

                 

                
                  
                }else{
                  this.$message(data.data.msg);
                 
                }
            }).catch(e => { 
                this.$message('接口操作失败');
                 //node 赋值和加事件
                this.node_default.forEach(element => {
                      this.addNode_fromProject(element);
                });
                //link 赋值和加事件
                this.link_default.forEach(element => {
                    this.addLink_fromProject(element);
                });
         
          })





      
      



      },

      //恢复节点信息
      addNode_fromProject(node) {
        var _this=this;
        var dragelem;
        //  d3.select("svg").call(d3.behavior.zoom().scaleExtent([0.5, 8]).on("zoomend", function(d,i){
        //                 d3.select("svg").attr("transform",    //此处的container是之前svg下 append(‘g‘)后返回的对象
        //                  "translate(" +d3.event.target.translate() + ")scale(" + d3.event.target.scale() + ")");  
        // }));
         
          var g = d3.select("svg").append("g")
                    .attr("class", "node")
                    .attr("data-id", node.dataId)
                    .attr("id", node.id)
                    // .attr("transform", 'translate(' + node.x + ', ' + node.y + ')');
                      .attr("transform", node.transform);

          var rect = g.append("rect")
            // .attr("width", 120)
            .attr("width", 180)
            .attr("height", 36)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("stroke-width", 2.2)
            .attr("stroke", "#333")
            // .attr("stroke", "#7ec2ff")
            .attr("filter", "url(#gaussian)")
            .attr("fill", "#fff");

          var bound = rect.node().getBoundingClientRect();
          var width = bound.width;
          var height = bound.height;

          // text
          g.append("text")
          .text(node.text)
          .attr("doc",node.mDoc)
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("dominant-baseline", "central") 
          .attr("text-anchor", "middle");

           // left icon
          g.append('image')
          .attr("x", 18)
          .attr("y", height / 4)
          .attr("width", 18)
          .attr("height", 18)
          .attr("xlink:href", node.mIcon);

          // // left icon
          // g.append('text')
          // .attr("x", 18)
          // .attr("y", height / 2)
          // .attr("dominant-baseline", "central") 
          // .attr("text-anchor", "middle")
          // .attr('font-family', 'FontAwesome')
          //     .text('\uf1c0');

          // // right icon
          // g.append('text')
          // .attr("x", width - 18)
          // .attr("y", height / 2)
          // .attr("dominant-baseline", "central") 
          // .attr("text-anchor", "middle")
          // .attr('font-family', 'FontAwesome')
          //     .text('\uf00c');

          g.on("contextmenu", function(data, index) {
                  //handle right click
                  // alert(1)
                  console.log(data,index,this)
                  //显示弹出框，选中删除
                  _this.isShowMenu=true;
                  _this._operatorCode =node.id||node.data.code;
                    _this.curoperatorDoc=node.mDoc;
                  _this.menu=node.data.estimator?[{
                    name:"删除",value:'01'
                  },{
                    name:"添加连线",value:'02'
                  },{
                    name:"设置",value:'04'
                  }]:[{
                    name:"删除",value:'01'
                  },{
                    name:"添加连线",value:'02'
                  },{
                    name:"设置",value:'04'
                  },{
                    name:"预览",value:'05'
                  }]
                  // document.querySelector('.menu').style.left=  d3.event.layerX+450+'px';
                  // document.querySelector('.menu').style.top=  d3.event.layerY+'px';

                  document.querySelector('.menu').style.left=  _this.x+310+'px';
                  document.querySelector('.menu').style.top= _this.y+120+'px';
                
                
                  _this.SelectedNode=this;
                  _this.SelectedNodeId=this.id;
                  //stop showing browser menu
                  d3.event.preventDefault()
                
          });
          // g.on("dblclick", function() {
          //     _this.dialogVisible=true;
          // });
         

          g.call(
                d3.behavior.drag()
                  // .on("dragstart", this.dragstarted)
                  // .on("drag", this.dragged)
                  // .on("dragend", this.dragended)
                  .on("dragstart",function(d,i){
                    _this.isShowMenu=false;
                    console.log("节点拖拽状态：开始",d,i);
                    console.log(this);
                    var transform = d3.select(this).attr("transform");
                    var translate = _this.getTranslate(transform);
                    _this.dx = d3.event.sourceEvent.layerX - translate[0];
                    _this.dy = d3.event.sourceEvent.layerY - translate[1];
                    dragelem = d3.select(this);
                  })
                  .on("dragend",function(d,i){
                    console.log("节点拖拽状态：结束",d,i);
                      _this.dx = _this.dy = 0;
                      dragelem = null;
                  })
                  .on("drag",function(d,i){
                    console.log("节点拖拽状态：进行中",this);
                    //限制拖拽范围在此设置
               

                    dragelem.attr("transform", "translate(" + ( d3.event.sourceEvent.layerX - _this.dx) + ", " + ( d3.event.sourceEvent.layerY - _this.dy) + ")");
                    // var x=d3.event.sourceEvent.layerX - _this.dx;
                    // var y= d3.event.sourceEvent.layerY - _this.dy;
                    //    dragelem.attr("transform", "translate(" + (x>0?x:0 ) + ", " + (y>0?y:0 ) + ")");
                    _this.updateCable(dragelem);

                  })
                 
                 
            );


         
      },
      //恢复连线信息
      addLink_fromProject(link){
          var _this=this;
          var path= d3.select("svg")
          .insert("path","g")
          .attr("id", link.id)
          // .append("path")
          .attr("stroke", "#333")
          .attr("stroke-width", "2px")
          .attr("class", "cable")
          .attr("from",link.from)
          .attr("start", 90 + ", " + 23)
          .attr("output",1)
          .attr("marker-end", "url(#arrowhead)")
          .attr("to",link.to)
          .attr("input",1)
          .attr("end", 90 + ", " + 23)
          .attr("d",link.d);



          path.on("contextmenu", function(data, index) {
            //handle right click
            // alert(1)
            console.log(data,index,this)
            //显示弹出框，选中删除
            _this.isShowMenu=true;
            _this.menu=[{
              name:"删除",value:'03'
            }]
          
            // document.querySelector('.menu').style.left=  d3.event.layerX+380+'px';
            // document.querySelector('.menu').style.top=  d3.event.layerY+'px';

                document.querySelector('.menu').style.left=  _this.x+310+'px';
                document.querySelector('.menu').style.top= _this.y+120+'px';
          
            _this.SelectedNode=this;
            //stop showing browser menu
            // d3.event.preventDefault()
          
          })

         
      },


      
      


      







      //保存
      btnSave(){
        var _this=this;
        console.log(this.workFlow);
        console.log(window.project.workingJob.components);
      
        this.workFlow;
       

        if( Object.keys(this.workFlow.nodes).length==0&&this.node_default.length==0){
           this.$message('没有可以保存的内容！');
           return;
        }
        this.dialogVisible_bc=true;
        

      },
      saveWorkFlow(){
         if(this.form.name==""){
            this.$message('请输入工作流名称');
            return;
         }
         if(this.form.remark==""){
            // this.$message('接口操作失败');
            // return;
         }
         this.dialogVisible_bc=false;
         this.updateProject();
      },
      updateProject(){
         var _this=this; 
          //workFlow 生成 存入数据库 的 workFlowData
        this.workFlow.nodes;
        this.workFlow.links;
        Object.keys(this.workFlow.nodes);
        Object.keys(this.workFlow.links);
        // this.node_default=[];
        // this.link_default=[];
        Object.keys(this.workFlow.nodes).forEach(element => {
          _this.workFlow.nodes[element]
          _this.workFlow.nodes[element].attr('id')
          _this.workFlow.nodes[element].attr('transform');
          _this.workFlow.nodes[element].attr('data-id');
          _this.workFlow.nodes[element].select('text').text();
          _this.node_default.push({
            
              id:  _this.workFlow.nodes[element].attr('id'),
              dataId:  _this.workFlow.nodes[element].attr('data-id'),
              // x:360,
              // y:160,
              transform: _this.workFlow.nodes[element].attr('transform'),
              text:  _this.workFlow.nodes[element].select('text').text(),
              mIcon:  _this.workFlow.nodes[element].select('image').attr("href"),
              mDoc:  _this.workFlow.nodes[element].select('text').attr("doc"),

           })
        });
        Object.keys(this.workFlow.links).forEach(element => {
            _this.workFlow.links[element];
            _this.workFlow.links[element].attr('id');
            _this.workFlow.links[element].attr('from');
            _this.workFlow.links[element].attr('to');
            _this.workFlow.links[element].attr('d');
            _this.link_default.push({
              id: _this.workFlow.links[element].attr('id'),
              from: _this.workFlow.links[element].attr('from'),
              to: _this.workFlow.links[element].attr('to'),
              d: _this.workFlow.links[element].attr('d'),
              
            });
            


        
        });
        //this.link_default,去重
        this.link_default.forEach(element => {
          
        });
        var links=[];
        var links2=[];
        for (let i = 0; i < this.link_default.length; i++) {
          if(links.toString().indexOf(this.link_default[i].from+","+this.link_default[i].to)<0){
            links.push(this.link_default[i].from+","+this.link_default[i].to);
            links2.push(this.link_default[i]);

          }
          
        }
        this.link_default=links2;
        console.log(links2)

        
        
        //  window.project.workingJob.components.dataId;
        //  window.project.workingJob.components.config;

        //  id: "1597991900563",
        //         dataId: "3",
        //         x:360,
        //         y:160,
        //         text: "算法1",

          // id:"1597991909948",
          // from:"1597991898404",
          // to:"1597991900563",
          // d:"M163,84 L360,178",
          



        var operator=[];
        var para=[];

        window.project.workingJob.components.forEach(element => {
          var _element=element;
          para=[];
          Object.keys(element.config) .forEach(item=> {
              para.push({
                        "doc": "string",
                        "editType": "string",
                        "except": 0,
                        "labelName": "string",
                        "option": 0,
                        "options": [
                          {
                            "label": "string",
                            "value": "string"
                          }
                        ],
                        "paramDefault": "string",
                        "paramName": item,
                        "paramType":_element.config[item].paramType|| "String",
                        "paramValue": _element.config[item].paramValue
                      });2
          }); 
        
          operator.push({
                "category": "string",
                "className": _element.className,
                "opMl": _element.opMl,
                // "code": "string",
                "code": _element.code,
                "describe": "string",
                // "estimator": true,
                  "estimator": _element.estimator,
                "estimatorModel": "string",
                "id": _element.dataId,
                "preNode": _element.id,
                "name": "string",
                "pageInfo": "string",
                "params": para
          });
          
        });

        //  var nodes=JSON.stringify(this.node_default);
        //  var links=JSON.stringify(this.link_default)
        //  //更新位置信息
        this.node_default.forEach(element => {
          element.transform=d3.selectAll('g[id="' +  element.id + '"]').attr('transform');
        });
        this.link_default.forEach(element => {
          element.d=d3.selectAll('path[id="' +  element.id + '"]').attr('d');
        });

        // var endnode=d3.selectAll('g[id="' +  this.id + '"]');
        // var transform = endnode.attr("transform");

         
         
        var data={
          node_default:JSON.stringify(this.node_default),
          link_default:JSON.stringify(this.link_default),

        }

        var query={
          
          // operators:window.project.workingJob.components,
          // // modelPageInfo:this.workFlow,
          // modelPageInfo:JSON.stringify(this.workFlow),
          // workLineName:this.form.name,
          // remark:this.form.remark,


          "createTime":this.getNowFormatDate(),
          "id": this.$route.query.id||this.workFlowId||-1,
          "modelPageInfo":  JSON.stringify(data),
          "modelPublishDate": "string",
          "modelSavePath": "string",
          "modelStatus": 0,
          "modelTrainStartTime": "string",
          "modelType": "string",
          "modelVersion": "string",
          // "operators": window.project.workingJob.components,
          "operators":operator ,
          "remark": this.form.remark,
          "saveModel": true,
          "viewDataSize": 0,
          "workLineName":this.form.name,
          "worklineFriendlyName": this.form.name
        };       
        return http_sfk
          .updateWorkLineInfo(query)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
                _this.$message(data.data.msg);
                // this.workFlowId=data.data.data;
                _this.workFlowId=data.data.data.id;
                _this.workLineName=data.data.data.workLineName;
                _this.modelStatus=data.data.data.modelStatus;
                _this.workFlowStatus ='未训练';
                _this.workFlow.links=[];
                _this.workFlow.nodes=[];
                
                
              }else{
                this.$message(data.data.msg);
                
              }
          }).catch(e => { 
              this.$message('接口操作失败');
        
        })


                 

      },

      //训练
      btnRun(type){
        //检测所有算子的参数 是否配置
        this.workFlow;
          var _this=this;  
        this.$confirm('当前工作流是否已保存, 请确定? (未保存，请先保存再训练)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            

            this.isRun=true;

      
        
            var query={
              id:this.workFlowId,
              trainOrTest:type
            };       
            return http_sfk
              .runWorkLine(query)
              .then(res => res)
              .then(data => {
                  if(data.data.code==200)
                  {
                    _this.$message(data.data.msg); 
                    _this.workFlowStatus ='运行中。。。'
                    //轮询开始。。。
                    _this.interval = setInterval(() => {
                    _this.getProjectStatus();
                    }, 2000);
                  
                  
                    
                  }else{
                    _this.$message(data.data.msg);
                    _this.isRun=false;
                    
                  }
              }).catch(e => { 
                  _this.$message('接口操作失败');
                  _this.isRun=false;
            
            })






        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消训练'
          });
        });




      


      },
      //训练结果
      btnRunResult(){
        if(this.workLineName==''||this.modelStatus!=1) return
        var _this=this;
        this.dialogVisible_yl=true; 
        var query={
              workLineName :this.workLineName ,
            };       
            return http_sfk
              .getTrainResult(query)
              .then(res => res)
              .then(data => {
                  if(data.data.code==200)
                  {
                    _this.tableData= JSON.parse(data.data.data.dataResult);
                    _this.tableData.forEach(element => {
                     
                      // for (let  elem of Object.values(element)) {
                      //   // elem=elem.toString();
                      //   elem=JSON.stringify(elem);
                      // }
                      for (let  key of Object.keys(element)) {
                        // elem=elem.toString();
                        element[key]=JSON.stringify(element[key]);
                      }
                      console.log(element)
                    });
                    _this.tableTitle=data.data.data.tableTitle;

                  
                  
                    
                  }else{
                    _this.$message(data.data.msg);
                    _this.dialogVisible_yl=false;
                    
                  }
              }).catch(e => { 
                  _this.$message('接口操作失败');
                  _this.dialogVisible_yl=false;

                  
            
            })




      


      },



      //发布
      btnPublish(){
        this.dialogVisible_fb=true;
        // this.setPublishi();
        // this.publishProject();

      },
      publishProject(){
        var _this=this;  
        if(this.form.req==""){
          this.$message('请填写输入参数');
          return;
        }
        if(this.form.res==""){
          this.$message('请填写输出参数');
          return;
        }
        try {
          JSON.parse(this.form.req)
        } catch (error) {
           _this.$message('输入参数格式错误');
           return;
        }
        try {
          JSON.parse(this.form.res)
        } catch (error) {
           _this.$message('输出参数格式错误');
           return;
        }

        var query={
          
          id: this.workFlowId||this.$route.query.id,
          publishParam:{
            reqParam:JSON.parse(this.form.req),
            resParam:JSON.parse(this.form.res),
          },
        
        };     
      
        
           
        return http_sfk
          .publishWorkLineById(query)
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
                
                // _this.workFlowStatus=data.data.data;
                _this.workFlowStatus ='已发布';
                _this.dialogVisible_fb=false;
                _this.modelStatus=3;
                
              }else{
                _this.$message(data.data.msg);
                
                
              }
          }).catch(e => { 
              _this.$message('接口操作失败');
            _this.dialogVisible_fb=false;
        
        })


                 

      },


      //应用
      btnYY(){
        this.dialogVisible_yy=true;
        
      },
      
      runYY(){
        var _this=this;  
        
        var query={
          id:this.workFlowId,
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
     
    

     

     
     


      // //
      // setWorkFlow(){
      //   this.workFlowData;
      // },


     

      //新增时生成算子设置的数据
      getSetting(node){
         var _this=this;         
          return http_sfk
            .getOperatorKRParamListById({operator_id:node.dataId||node.id})
            .then(res => res)
            .then(data => {
                if(data.data.code==200)
                {
                  _this.params[node.id]= data.data.data;
                  //option类赋值
                  _this.$refs.EleSetting;
                  var zjdata=project.newComponent( {id:node.id,dataId:node.dataId,className:node.className,code:node.code,estimator:node.estimator,opMl:node.opMl,fields:data.data.data});
                  // _this.$refs.eleSetting.setEditor( data.data.data, zjdata);
                  // _this.params.forEach(element => {
                  //    if(element.paramName=="fileType"){
                  //        _this.sfform.fileTypeOpts=[];
                  //       element.options.forEach((i,d) => {
                  //           _this.sfform.fileTypeOpts.push({
                  //               value: d,
                  //               label: i
                  //           });
                  //       });
                       
                  //    }
                  // });
               


                
                  
                }else{
                  this.$message(data.data.msg);
                  //  this.dialogVisible=false;
                }
            }).catch(e => { 
               this.$message('接口操作失败');
         
          })


                 

      },

      //根据工程恢复算子数据
      getSetting2(node){
         var _this=this;         
          return http_sfk
            .getOperatorKRParamListById({operator_id:node.dataId||node.id})
            .then(res => res)
            .then(data => {
                if(data.data.code==200)
                {
                   var operator_id=data.config.params.operator_id;
                  _this.params[node.id]= data.data.data;
                  //option类赋值
                  _this.$refs.EleSetting;
                  if(node.sz){
                      if(!_this.yy){
                        //true 时模型会带上数据，否则不带数据
                        for (let i in data.data.data) {
                          data.data.data[i].paramName
                          data.data.data[i].paramValue=null;
                          for (let j in node.sz) {
                            if(node.sz[j].preNode==node.id&&node.sz[j].id==operator_id){
                                for (let k in node.sz[j].params) {
                                  if( data.data.data[i].paramName==node.sz[j].params[k].paramName){
                                      data.data.data[i].paramValue=node.sz[j].params[k].paramValue;
                                  }
                                }

                                
                            }
                          }
                        }
                      }


                      for (let l in node.sz) {
                        //node.id=  preNode
                          if(node.sz[l].preNode==node.id&&node.sz[l].id==operator_id){
                              
                              var zjdata=project.newComponentandSetValue( {id:node.id,dataId:node.dataId,className:node.sz[l].className,code:node.sz[l].code,estimator:node.sz[l].estimator,opMl:node.sz[l].opMl,fields:data.data.data});
                              // var zjdata=project.newComponentandSetValue( {id:node.id,dataId:node.dataId,className:node.sz[l].className,code:node.sz[l].code,estimator:node.sz[l].estimator,opMl:node.sz[l].opMl,fields:[]});
                              
                          }
                      }
                  
                  }
                 

                  
                }else{
                  this.$message(data.data.msg);
                  //  this.dialogVisible=false;
                }
            }).catch(e => { 
               this.$message('接口操作失败');
         
          })


                 

      },


      
      //训练时获取流程的实时状态
      getProjectStatus(id){
         var _this=this;  
         var query={
            modelId:this.workFlowId
         };       
          return http_sfk
            .getTrainingModelStatusById(query)
            .then(res => res)
            .then(data => {
                if(data.data.code==200)
                {
                  var sj=data.data.data;
                  _this.isrunResult=true;
                  _this.runResult="开始时间:"+sj.startedTime+
                  "</br>当前状态:"+sj.appStatus+
                  "</br>最后状态:"+sj.finalStatus+
                  "</br>appName:"+sj.appName+
                  "</br>appId:"+sj.appId+
                  "</br>日志地址:"+"<a target='_blank' href='"+sj.logpth+"'>日志</a>"+
                  "</br>结束时间:"+sj.finishedTime;
                   
                  _this.workFlowStatus=data.data.data.appStatus;
                  _this.modelStatus=data.data.data.appStatus=='运行完成'?1:0;
                  if(sj.finishedTime!=""&&sj.finishedTime!=null){
                     _this.isRun=false;
                    clearInterval(_this.interval);
                    _this.getEvaluateResult();
                  }
                  
                }else{
                  _this.$message(data.data.msg);
                  _this.isRun=false;
                }
            }).catch(e => { 
               _this.$message('接口操作失败');
               _this.isRun=false;
         
          })


                 

      },




     
     
      //流程训练完成，如果流程中有评估器则获取评估结果
      getEvaluateResult(){
        var _this=this;  
         var query={
            workLineName:this.workLineName
         };       
          return http_sfk
            .getEvaluateResult(query)
            .then(res => res)
            .then(data => {
                if(data.data.code==200)
                {
                  var  pg=JSON.parse(data.data.data);
                  var strpg="";
                  pg.forEach(element => {
                     strpg+= "</br>评估器："+element.estimator+" ;";
                     strpg+= "准确率："+element.probability;
                  });
                  _this.runResult+=strpg;
                   
                  
                  
                }else{
                  _this.$message(data.data.msg);
                
                }
            }).catch(e => { 
               _this.$message('接口操作失败');
            
         
          })

      },
      


    

     
      
      //获取当前时间，格式YYYY-MM-DD
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
         if (month >= 1 && month <= 9) {
             month = "0" + month;
         }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
         }
        var currentdate = year + seperator1 + month + seperator1 + strDate+' '+date.toTimeString().split(' ')[0];
        return currentdate;
      },



      //加载算子树
      load(){
        // sysApi.menuList().then(res => {
        //   this.menuTree = res;
        // })

        return http_sfk
          .getCategoryOperator()
          .then(res => res)
          .then(data => {
              if(data.data.code==200)
              {
                  this.menuTree = data.data.data;
              }else{
                 this.$message(data.data.msg);
              }
          }).catch(e => { 
              this.$message('接口操作失败');
              this.menuTree = [
                              { id:'1',
                                name: '一级 1',
                                childRenList: [{
                                  id:'2',
                                  name: '二级 1-1',
                                  childRenList: [{
                                     id:'3',
                                    name: '算法1',
                                  },{
                                    id:'4',
                                    name: '算法3',
                                  },{
                                    id:'5',
                                    name: '算法3',
                                  }]
                                }]
                              
                              }];
            
              })

        




      },
      renderContent(h, { node, data, store }) {
        return (
          // <span>
          //   <span>
          //     <span><i class={data.icon}></i>&nbsp;{node.label}</span>
          //   </span>
          // </span>
          //  <i class='el-icon-menu'></i>  el-icon-folder  el-icon-tickets
          //  <i class={node.childNodes.length!=0?'el-icon-folder':''}></i>

          <span class="custom-tree-node">
           
            <i class={node.childNodes.length!=0?'el-icon-folder':''}></i>
            <img width={node.childNodes.length==0?'20px':''}  height={node.childNodes.length==0?'20px':''}  src={node.data.mIcon} />
            <span >
               <span draggable={node.childNodes.length!=0?'false':'true'}  on-dragstart={ () => this.dragStart(node) } > {node.label} </span>
                
            </span>



          </span>
        );
      },
     
    



     



    },
    created(){
      this.load();
      if(!this.yy){
        if(this.$route.query&&this.$route.query.id){
          this.workFlowId= this.$route.query.id;
          this.modelStatus=JSON.parse(this.$route.query.status);
        }
      }
      if(this.$route.query&&this.$route.query.yy){
           this.yy=JSON.parse(this.$route.query.yy);
        }
     
    },
    mounted() {
          
      this.setSvgEvent();
      //根据id查询 当前工作流 工程信息，初始化 this.$route.query.id;
      if( this.$route.query.id){ //查看或修改
        
          project.newProject();
          //恢复界面和算子数据
          this.setProject(); 
          if(this.$route.query.status==4){
            this.isRun=true;
             this.interval = setInterval(() => {
              this.getProjectStatus();
            }, 2000);
          }
      }else{//新增
         project.newProject();
         this.node_default=[];
         this.link_default=[];
      }
     
    
     
    },
    beforeDestroy(){
     
    },
    beforeRouteLeave (to, from, next) {
        // if(this.node_default.length>0|| Object.keys(this.workFlow.nodes).length>0){
        //    this.$confirm('当前工作流是否已保存, 请确定? ', '提示', {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //       next() 

        //   }).catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '已取消'
        //     });
        //   });
        // }else{
        //   next()
        // }

        next()
        
    },
    destroyed(){
      clearInterval(this.interval);
    }

  }
</script>

<style scoped>

.menu{
  position: absolute;
  left:20px;
  top:20px;
  background: #eee;
  padding: 10px;
  cursor: pointer;
}
.sjyright >>> .el-card__body{
 height: 100%;
}
.sjyright{
  height: 650px;
}
svg{
      border: 1px solid #eee;
}
g{
   fill: skyblue;
}

svg{
    height: inherit; /* 继承.box高度 */
    background: -webkit-linear-gradient(top, transparent 40px,#eee 5px),-webkit-linear-gradient(left, transparent 40px, #eee 5px);
    background-size: 41px 41px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
 
}
svg  >>> g.node:hover{
  cursor: pointer;
  /* fill: skyblue;
  stroke: black; */
}
svg  >>> rect:hover{
  fill: skyblue;
}
svg  >>> text:hover{
  fill: skyblue;
}
svg  >>> path:hover{
  stroke: skyblue;
  stroke-width:3px;
}
svg  >>> g.node{
   box-shadow: 10px 10px 5px #888888;
}



rect {
    /* width:180px; 
    height:36px;
    cursor: pointer;
    stroke: #333;
    stroke-width:2;
    fill: #fff; */
}


  .select-tree .icons-wrapper {
    display: block;
  }

  .select-tree .is-empty i {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
  }

  .select-tree .is-empty i:hover {
    background-color: #0d6aad;
    color: #ffffff;
  }
   .el-pagination {
    float: right;
    margin-top: 15px;
  }
  .sjyleft{
      height: 650px;
      overflow-y: auto;
  }
   .sjytree{
     margin-top: 30px;
     cursor: pointer;
  }
   #sjylxtree >>> .el-tree-node__content{
    margin-top: 5px;
    font-size: 16px;
  }

</style>
