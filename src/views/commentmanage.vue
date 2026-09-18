<template>
    <div style="padding:10px">
        <h1 style="text-align:center;">评论信息管理</h1>
        <div class="myfun">
          <input type="text" class="mystusearch" placeholder="搜索.." v-model="replysearch">
          <button class="searchbut" v-on:click="mysearchreply">搜索</button>
          <button class="searchbut" v-on:click="freshreply">重置</button>
        </div>
        <el-table 
        :data="treereplys"
        border height="550" style="width: 100%;">
            <el-table-column prop="replyno" label="编号" width="100">
            </el-table-column>
            <el-table-column prop="trno" label="原帖编号" width="100">
            </el-table-column>
            <el-table-column  prop="uid" label="学号" width="120">
            </el-table-column>
            <el-table-column  prop="reptime" label="回复时间" width="160">
            </el-table-column>
            <el-table-column  prop="repcontent" label="回复内容" width="490">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="120"
            style="color:#87CEEB;">
            <template slot-scope="scope">
                <el-button style="background-color:#87CEEB;color:#ffffff;">修改</el-button>
                <el-button @click="delreply(scope.row.replyno)" style="background-color:red;color:#ffffff;">删除</el-button>
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
        treereplys: [],
        replysearch:"",
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      mysearchreply(){
        axios.get("http://localhost:8088/getreplybyvag?str="+this.replysearch).then((response)=>{
          this.treereplys = response.data;
        });
      },
      freshreply(){
        axios.get("http://localhost:8088/getAllreply").then((response)=>{
          this.treereplys = response.data;
          this.replysearch = "";
        })
      },
      delreply(replyno){
        this.$confirm('此操作将永久删除该条帖子信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get("http://localhost:8088/delreply?replyno="+replyno).then((response)=>{
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
      axios.get("http://localhost:8088/getAllreply").then((response)=>{
          this.treereplys = response.data;
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