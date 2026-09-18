<template>
    <div style="padding:10px">
        <h1 style="text-align:center;">测评结果管理</h1>
        <div class="myfun">
          <input type="text" class="mystusearch" placeholder="搜索.." v-model="resultsearch">
          <button class="searchbut" v-on:click="mysearchresult">搜索</button>
          <button class="searchbut" v-on:click="freshresult">重置</button>
        </div>
        <el-table 
        :data="testResults"
        border style="width: 100%;">
            <el-table-column prop="uid" label="学号" width="120">
            </el-table-column>
            <el-table-column prop="tfid" label="量表编号" width="100">
            </el-table-column>
            <el-table-column  prop="genIndex" label="总症状指数" width="100">
            </el-table-column>
            <el-table-column  prop="positivenum" label="阳性症状数" width="100">
            </el-table-column>
            <el-table-column  prop="positivelevel" label="阳性症状痛苦水平" width="100">
            </el-table-column>
            <el-table-column  prop="somavg" label="躯体化指数" width="100">
            </el-table-column>
            <el-table-column  prop="obseavg" label="强迫症状指数" width="100">
            </el-table-column>
            <el-table-column  prop="interavg" label="人际关系敏感指数" width="100">
            </el-table-column>
            <el-table-column  prop="depressavg" label="抑郁指数" width="100">
            </el-table-column>
            <el-table-column  prop="anxietyavg" label="焦虑指数" width="100">
            </el-table-column>
            <el-table-column  prop="hostavg" label="敌对指数" width="100">
            </el-table-column>
            <el-table-column  prop="photicavg" label="恐怖指数" width="100">
            </el-table-column>
            <el-table-column  prop="paravg" label="偏执指数" width="100">
            </el-table-column>
            <el-table-column  prop="psychoavg" label="精神病性指数" width="100">
            </el-table-column>
            <el-table-column  prop="otheravg" label="其他指数" width="100">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120"
            style="color:#87CEEB;">
            <template slot-scope="scope">
                <el-button style="background-color:#87CEEB;color:#ffffff;">修改</el-button>
                <el-button @click="delresult(scope.row.uid,scope.row.tfid)"  style="background-color:red;color:#ffffff;">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
 export default {
    data() {
      return {
        testResults: [],
        resultsearch:"",
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      mysearchresult(){
        axios.get("http://localhost:8088/getresultbyvag?str="+this.resultsearch).then((response)=>{
          this.testResults = response.data;
        });
      },
      freshresult(){
        axios.get("http://localhost:8088/getalltresult").then((response)=>{
          this.testResults = response.data;
          this.resultsearch = "";
      })
      },
      delresult(uid,tfid){
        this.$confirm('此操作将永久删除该条帖子信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("http://localhost:8088/delresult?uid="+uid+"&tfid="+tfid).then((response)=>{
            if(response.data = "删除成功！"){
              window.location.reload();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              alert("删除失败")
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },

    created:function(){
      axios.get("http://localhost:8088/getalltresult").then((response)=>{
          this.testResults = response.data;
      })
    },
  }
</script>

<style scoped>
.myfun{
  margin-bottom: 10px;
}
.mystusearch{
  margin-left: 420px;
}
</style>