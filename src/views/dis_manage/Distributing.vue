<template>
  <div class="container">
    <div class="left">
      <div class="div_img">
        <img src="../../assets/path.png" alt="">
      </div>

    </div>
    <div class="right">
      <div style="width: 453px; margin-top: 2px">
        <p>各路成本</p>

        <el-table
            ref="multipleTable"
            :data="tableData1"
            tooltip-effect="dark"
            style="width: 100%"
            border stripe
            :header-cell-class-name="headerStyle"
        >

          <el-table-column
              prop="way"
              label="路线"
              width="180">
          </el-table-column>

          <el-table-column
              prop="drivingcost"
              label="行驶成本(元)"
              width="91">
          </el-table-column>

          <el-table-column
              prop="timecost"
              label="时间成本(元)"
              width="91">
          </el-table-column>

          <el-table-column
              prop="fixedcost"
              label="固定成本(元)"
              width="91">
          </el-table-column>

          <el-table-column
              prop="cost"
              label="总成本(元)"
              width="91">
          </el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 10px; width: 453px; border-top: 1px dashed black">
        <p>总成本</p>

        <el-table
            ref="multipleTable"
            :data="tableData2"
            tooltip-effect="dark"
            style="width: 100%"
            border stripe
            :header-cell-class-name="headerStyle"
        >

          <el-table-column
              prop="drivingcost"
              label="行驶成本(元)"
              width="112">
          </el-table-column>

          <el-table-column
              prop="timecost"
              label="时间成本(元)"
              width="112">
          </el-table-column>

          <el-table-column
              prop="fixedcost"
              label="固定成本(元)"
              width="112">
          </el-table-column>

          <el-table-column
              prop="cost"
              label="总成本(元)"
              width="116">
          </el-table-column>
        </el-table>
      </div>

      <div style="margin-top: 20px; border-top: 1px dashed black">
        <p style="margin-bottom: 10px">操作</p>
        <el-button type="primary" round @click="showTable">
          <i class="el-icon-circle-plus-outline"></i>添加实时顾客
        </el-button>

        <el-drawer
            title="添加新的顾客"
            :visible.sync="table"
            direction="rtl"
            size="80%">

          <div style="margin: 0 0 10px 5px;">
            <el-input class="mr-5" style="width: 200px" placeholder="请输入配送点" suffix-icon="el-icon-position" v-model="location"></el-input>
            <el-input class="mr-5" style="width: 200px" placeholder="请输入配送点经度" suffix-icon="el-icon-map-location" v-model="x坐标"></el-input>
            <el-input style="width: 200px" placeholder="请输入配送点纬度" suffix-icon="el-icon-map-location" v-model="y坐标"></el-input>
            <el-button class="ml-5" type="primary" @click="loadData">搜索</el-button>
            <el-button type="warning" @click="reset">重置</el-button>

            <div style="margin-top: 10px">
              <el-button type="warning" plain @click="toggleSelection()">
                <i class="el-icon-close"></i> 取消选择
              </el-button>
              <el-button type="primary" @click="handleAdd">
                <i class="el-icon-circle-plus-outline"></i> 新增
              </el-button>
              <el-popconfirm
                  class="ml-5"
                  confirm-button-text='确定'
                  cancel-button-text='取消'
                  icon="el-icon-info"
                  icon-color="red"
                  title="您确定批量删除这些数据吗？"
                  @confirm="delBatch"
              >
                <el-button type="danger" slot="reference">
                  <i class="el-icon-remove-outline"></i> 批量删除
                </el-button>
              </el-popconfirm>
              <el-button style="margin-left: 10px" type="primary">
                <i class="el-icon-upload2"></i> 导入
              </el-button>
              <el-button type="primary">
                <i class="el-icon-download"></i> 导出
              </el-button>
            </div>

          </div>

          <el-table
              ref="multipleTable"
              :data="gridData"
              tooltip-effect="dark"
              style="width: 100%; margin-left: 5px"
              @selection-change="handleSelectionChange"
              border stripe
              :header-cell-class-name="headerStyle"
          >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>

            <el-table-column
                prop="id"
                label="编号"
                width="60">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>

            <el-table-column
                prop="location"
                label="地点"
                width="170">
            </el-table-column>

            <el-table-column
                prop="x坐标"
                label="经度"
                width="80">
            </el-table-column>

            <el-table-column
                prop="y坐标"
                label="纬度"
                width="80">
            </el-table-column>

            <el-table-column
                prop="demand"
                label="需求(kg)"
                width="80">
            </el-table-column>

            <el-table-column
                prop="earliest"
                label="最早到达时间"
                width="100">
            </el-table-column>

            <el-table-column
                prop="latest"
                label="最晚到达时间"
                width="100">
            </el-table-column>

            <el-table-column
                prop="sever"
                label="服务时间(min)"
                width="110"
            >
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="handleEdit(scope.row)">
                  <i class="el-icon-edit"></i> 编辑</el-button>
                <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确定'
                    cancel-button-text='取消'
                    icon="el-icon-info"
                    icon-color="red"
                    title="您确定删除吗？"
                    @confirm="del(scope.row.id)"
                >
                  <el-button size="mini" type="danger" slot="reference">
                    <i class="el-icon-remove-outline"></i> 删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <div style="padding: 10px 0 10px 5px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
          </div>

          <div style="margin-top: 5px; margin-left: 5px">
            <el-button type="success" plain @click="updatePath">
              <i class="el-icon-check"></i> 确定添加
            </el-button>
            <el-button type="info" plain @click="table = false">
              <i class="el-icon-close"></i> 取消
            </el-button>


          </div>

          <el-dialog title="配送点信息" :visible.sync="dialogFormVisible">
            <el-form label-width="110px">
              <el-form-item label="编号">
                <el-input v-model="form.id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="配送地点">
                <el-input v-model="form.location" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="经度">
                <el-input v-model="form.x坐标" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="纬度">
                <el-input v-model="form.y坐标" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="需求(kg)">
                <el-input v-model="form.demand" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="预计时间">
                <el-time-select
                    placeholder="最早到达时间"
                    v-model="form.earliest"
                    value-format="HH:mm:ss"
                    format="HH:mm:ss"
                    :picker-options="{
                  start: '08:10',
                  step: '00:15',
                  end: '18:00'
                }">
                </el-time-select>
                <el-time-select
                    style="margin-left: 5px"
                    placeholder="最晚到达时间"
                    v-model="form.latest"
                    value-format="HH:mm:ss"
                    format="HH:mm:ss"
                    :picker-options="{
                  start: '08:10',
                  step: '00:15',
                  end: '18:00',
                  minTime: form.earliest
                }">
                </el-time-select>
              </el-form-item>
              <el-form-item label="服务时间(min)">
                <el-input v-model="form.sever" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="出现时间">
                <el-time-select
                    placeholder="出现时间"
                    v-model="form.cometime"
                    value-format="HH:mm:ss"
                    format="HH:mm:ss"
                    :picker-options="{
                  start: '08:10',
                  step: '00:15',
                  end: '18:00'
                }">
                </el-time-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>
          </el-dialog>

        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import {Loading} from "element-ui";

export default {
  name: "Distributing",
  data() {
    return {
      tableData1: [],
      tableData2: [],
      table: false,
      dialog: false,
      loading: false,
      gridData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      location: "",
      x坐标: "",
      y坐标: "",
      dialogFormVisible: false,
      form: {},
      multipleSelection: [],
      tableStyle: 'tableStyle',
      timer: null
    };
  },
  created() {
    this.load()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    headerStyle({row, column, rowIndex, columnIndex}) {
      return 'tableStyle'
    },
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    load() {
      this.request.get("/eachpath/findAll").then(res => {
        console.log(res)

        this.tableData1 = res
      })

      this.request.get("/totalcost/findAll").then(res => {
        console.log(res)

        this.tableData2 = res
      })
    },
    showTable() {
      this.table = true
      this.loadData()
    },
    loadData() {
      // 请求分页查询数据
      this.request.get("/dynamiccustomer/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          location: this.location,
          x坐标: this.x坐标,
          y坐标: this.y坐标
        }
      }).then(res => {
        console.log(res)

        this.gridData = res.records
        this.total = res.total
      })
    },
    reset() {
      this.location = ""
      this.x坐标 = ""
      this.y坐标 = ""
      this.loadData()
    },
    handleSizeChange(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      this.loadData()
    },
    handleCurrentChange(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      this.loadData()
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    save() {
      this.request.post("/dynamiccustomer/savoured", this.form).then(res => {
        if (res) {
          this.$message.success("保存成功")
          this.dialogFormVisible = false
          this.loadData()
        } else {
          this.$message.error("保存失败")
        }
      })
    },
    del(id) {
      this.request.delete("/dynamiccustomer/delete/" + id).then(res => {
        if (res) {
          this.$message.success("删除成功")
          this.loadData()
        } else {
          this.$message.error("删除失败")
        }
      })
    },
    delBatch() {
      let ids = this.multipleSelection.map(v => v.id) // 把一个对象的数组变成id数组，[{},{},{}] => [1,2,3]
      this.request.post("/dynamiccustomer/deletebatch", ids).then(res => {
        if (res) {
          this.$message.success("批量删除成功")
          this.loadData()
        } else {
          this.$message.error("批量删除失败")
        }
      })
    },
    updatePath() {
      let loadingInstance = Loading.service({ fullscreen: true });

      this.request.post("/update/start").then(res => {
        if (res) {
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          this.load()
          this.table = false
        }
      })
    }
  }
}
</script>

<style scoped>
.container{
  background: white;
  /*text-align: center;*/
  float:left;
  width:100%;
  height: 100%;
}
.left{
  font-size: 16px;
  width:553px;
  position:absolute;
  display: flex;
  display: -webkit-flex;
  align-items:center;
  justify-content:center;
  color: #008cff;
  height: 100%;
}
.right{
  float: right;
  width: 453px;
  border-left:1px solid black;
  height: 100%;
}
p{
  font-family: "宋体";
  margin-top: 3px;
  margin-left: 3px;
  margin-bottom: 2px;
  font-weight: bold;
}
.div_img{
  width: 513px;
  height: 450px;
  position: absolute;
  left: 20px;
  top: 20px
}
img{
  width: 513px;
  height: 400px;
}
</style>