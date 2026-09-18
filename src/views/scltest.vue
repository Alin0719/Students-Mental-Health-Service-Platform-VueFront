<template>
  <div>
    <firstbar></firstbar>
    <navbar></navbar>
    <div class="myscltestbar">
      <div class="myscltest">
        <h1 style="text-align:center">在线SCL-90心理测试</h1>
        <div id="scltest" class="scltest">
          <div v-for="(item, index) in question" :key="index" v-show="index == idx" class="question">
            <div class="title">
              <span v-if="item.ismultiple" class="select">多选</span>
              <span v-else class="select">单选</span>
              题目：{{ item.qname }}
              <br>
              <span style="float: right;">{{ idx + 1 }}/{{ question.length }}</span>
            </div>
            <br>
            <div>
              <div :class="val.checked ? 'bgc' : ''" v-for="val in item.qoption" :key="val.id" class="list"
                @click="handleCilck(val)">{{ val.letter }}.
                {{ val.oname }}</div>
            </div>
            <div style="margin-left:110px;margin-top:20px">
              <button @click="back()" :style="idx == 0 ? 'background-color:#ccc;' : ''"
                :disabled="idx == 0 ? true : false" class="mybut">上一题</button>
              <button @click="next()" :style="idx == question.length - 1 ? 'background-color:#ccc;' : ''"
                :disabled="idx == question.length - 1 ? true : false" class="mybut">下一题</button>
              <button @click="sumbit" style="background-color: rgb(250, 142, 0);color: aliceblue;width:50px;height:30px">提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

import axios from 'axios'
import navbar from '../components/navbar.vue'
import firstbar from '../components/firstbar.vue'

export default {
  components: {
      navbar,
      firstbar,
  },
  data() {
    return {
      uid:"",
      idx: 0,
      allSocre: 0,
      isshow: false,
      answerShow: false,
      ismultipleAnswer: [],
      question: [],
      genIndex:0,
      positivenum:0,
      positivelevel:0,
      som:0,
      somavg:0,
      somarr:[1,4,12,27,40,42,48,49,52,53,56,58],
      obse:0,
      obsearr:[3,9,10,28,38,45,46,51,55,65],
      obseavg:0,
      inter:0,
      interarr:[6,21,34,36,37,41,61,69,73],
      interavg:0,
      depree:0,
      depreearr:[5,14,15,20,22,26,29,30,31,32,54,71,79],
      depressavg:0,
      anxiety:0,
      anxietyarr:[2,7,23,33,39,57,72,78,80,86],
      anxietyavg:0,
      hosts:0,
      hostarr:[11,24,63,67,74,81],
      hostavg:0,
      photic:0,
      photicarr:[13,25,47,50,70,75,82],
      photicavg:0,
      para:0,
      pararr:[8,13,43,68,76,83],
      paravg:0,
      psycho:0,
      psychoarr:[7,16,35,62,77,84,85,87,88,90],
      psychoavg:0,
      otherdata:0,
      otherarr:[19,44,59,60,64,66,89],
      otheravg:0,
    }
  },
  created:function(){
      axios.get("http://localhost:8088/getallqueandopt").then((response)=>{
          this.question = response.data;
      })
  },
  methods: {
    next() {
      this.idx++
    },
    back() {
      this.idx--
    },
    handleCilck(info) {
      let question = this.question[this.idx]  //每题选项
      let qoption = this.question[this.idx].qoption //每一题题目的选项

      //选中添加样式
      qoption.forEach(item => {
        if (item.id == info.id) {  //如果选中的与数据里面的相等就改变他的样式
          item.checked = !item.checked  // 是否选中，取反 
          this.question[this.idx].score = info.sweight;
        } else if (!question.ismultiple) {  //如果不是多选 只能选中一个 其他的都为false
          item.checked = false;
          this.question[this.idx].score = info.sweight;
        }
      });
      
     

    },

    // 提交计算分数
    sumbit() {
      this.allSocre = 0  //每次计算总分先清0,，在计算
      let result = []  //定义选中的个数
      
      this.question.forEach(item => {
        //返回是否选中的数组
        let selsetArr = item.qoption.map(val => {
          if (val.checked) {
            return val.checked //map最终返回一个数组，返回 checked 的数组
          }
        })
        //这边是否包含true，包含 true 就push到result中
        const isTrue = selsetArr.includes(true)  //如果包含返回true,否则返回false
        //这里判断一下,如果 isTrue 是 true，说明包含true 就说明选了
        if (isTrue) {
          result.push(isTrue)  //如果选了，就push到 result 中
        }
        //阳性症状数
        if(item.score > 0){
          this.positivenum = this.positivenum + 1
        }
        //躯体化症状
        if(this.somarr.indexOf(item.id) !== -1){
          this.som += item.score
        }
        //强迫症状
        if(this.obsearr.indexOf(item.id) !== -1){
          this.obse += item.score
        }
        //人际关系敏感
        if(this.interarr.indexOf(item.id) !== -1){
          this.inter += item.score
        }
        //抑郁
        if(this.depreearr.indexOf(item.id) !== -1){
          this.depree += item.score
        }
        //焦虑
        if(this.anxietyarr.indexOf(item.id) !== -1){
          this.anxiety +=item.score
        }
        //敌对
        if(this.hostarr.indexOf(item.id) !== -1){
          this.hosts += item.score
        }
        //恐怖
        if(this.photicarr.indexOf(item.id) !== -1){
          this.photic += item.score
        }
        //偏执
        if(this.pararr.indexOf(item.id) !== -1){
          this.para += item.score
        }
        //精神病性
        if(this.psychoarr.indexOf(item.id) !== -1){
          this.psycho += item.score
        }
        if(this.otherarr.indexOf(item.id) !== -1){
          this.otherdata += item.score
        }
        this.allSocre += item.score

        //用选中 result 的长度  与 题目的长度比较 是否相当 不等就没选完
      })
      if (result.length < this.question.length) {
        alert('还有题目没做呢')
        this.positivenum = 0;
        this.som = 0;
        this.obse = 0;
        this.inter = 0;
        this.depree = 0;
        this.anxiety = 0;
        this.hosts = 0;
        this.photic = 0;
        this.para = 0;
        this.psycho = 0;
        this.otherdata = 0;
        this.allSocre = 0;
        return
      }else{
        this.uid = window.localStorage.getItem("uid")
        this.genIndex = this.allSocre/90
        //躯体化指数
        this.somavg = this.som/12
        //强迫症状指数
        this.obseavg = this.obse/10
        //人际关系敏感指数
        this.interavg = this.inter/9
        //抑郁指数
        this.depressavg = this.depree/13
        //焦虑指数
        this.anxietyavg = this.anxiety/10
        //敌对指数
        this.hostavg = this.hosts/6
        //恐怖指数
        this.photicavg = this.photic/7
        //偏执指数
        this.paravg = this.para/6
        //精神病性指数
        this.psychoavg = this.psycho/10
        //其他指数
        this.otheravg = this.otherdata/7
        //阳性症状痛苦水平
        if(this.positivenum != 0){
           this.positivelevel = this.allSocre/this.positivenum
          }
        axios.get("http://localhost:8088/addresult?uid="
        +this.uid+"&tfid=1&genIndex="+this.genIndex+"&positivenum="+this.positivenum
        +"&positivelevel="+this.positivelevel+"&somavg="+this.somavg+"&obseavg="+this.obseavg
        +"&interavg="+this.interavg+"&depressavg="+this.depressavg+"&anxietyavg="+this.anxietyavg
        +"&hostavg="+this.hostavg+"&photicavg="+this.photicavg+"&paravg="+this.paravg
        +"&psychoavg="+this.psychoavg+"&otheravg="+this.otheravg).then((response)=>{
          console.log(response.data);
        })
        alert("前往获得测评结果！")
           this.$router.push("/ownpage/ownresult")
        }
      console.log("最终阳性项目数："+this.positivenum)
      this.isshow = true

    }
  }

}
</script>

<style scoped>
.myscltestbar{
  position: relative;
}
.myscltest{
  position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    width: 1080px;
    height: 654px;
}
.scltest * {
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
}

.question {
  margin-top: 30px;
  width: 500px;
  height: 430px; 
  background-color: rgb(240, 240, 240);
  border-radius: 10px;
  padding: 20px;
  padding-top:30px;
  color: rgb(81, 81, 82);
  font-size: 16px;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, .2);
}

button {
  margin-top: 15px;
  margin-right: 10px;
  outline: none;
  background-color: rgb(255, 153, 98);
  border: 0;
  padding: 10px;
  color: rgb(61, 61, 61);
  border-radius: 5px;
}

button:active {
  background-color: rgba(248, 161, 121, 0.664);
}

#scltest {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.title {
  color: black;
  font-weight: 600;
  font-size: 18px;
  height: 30px;
  line-height: 30px;
}

.list {

  margin-top: 10px;
  padding: 10px 5px;
  font-size: 16px;
  border: 1px rgb(46, 46, 46) solid;
  border-radius: 10px;
}

.bgc {

  border: 1px rgb(250, 109, 0) solid;
  color: aliceblue;
  background-color: rgb(240, 125, 38);
}

.answer {
  color: brown;
  font-size: 16px;
  margin-left: 20px;
}

.select {
  font-size: 18px;
  color: rgb(243, 25, 25);
}

.mybut{
  width: 70px;
  height: 30px;

}

</style>
