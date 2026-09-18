<template>
    <div>
        <h1 style="text-align:center">SCL-90测评结果</h1>
        <button class="myresultdel" v-if="iftest" @click="resultdel(testResult.uid,testResult.tfid)">删除</button>
        <el-collapse @change="handleChange" class="myall" v-if="iftest">
            <el-collapse-item title="总症状指数（General Symptomatic Index）" name="1" class="myel">
              <div class="mydiv1">
                您的得分为：{{testResult.genIndex}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                症状程度：{{mygenIndex}}
            </div>
              <div class="mydiv2">是指总的来看，被试的自我症状评价介于“正常”到“严重”的哪一个水平。</div>
            </el-collapse-item>
            <el-collapse-item title="阳性项目数（Positive symptom）" name="2" class="myel">
              <div class="mydiv1">
                您的得分为：{{testResult.positivenum}}
            </div>
              <div class="mydiv2">
                是指被评为1-4分的项目数分别是多少，它表示被试在多少项目中感到“有症状”。
              </div>
            </el-collapse-item>
            <el-collapse-item title="阳性症状痛苦水平（Positive symptom distress level）" name="3" class="myel">
                <div class="mydiv1">
                    您的得分为：{{testResult.positivelevel}}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    症状程度：{{mypositivelevel}}
                </div>
                <div class="mydiv2">是指个体自我感觉不佳的项目的程度究竟处于哪个水平。</div>
              </el-collapse-item>
            <el-collapse-item title="躯体化（Somatization）" name="4" class="myel">
              <div class="mydiv1">
                您的得分为：{{testResult.somavg}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                症状程度：{{mysomavg}}
            </div>
              <div class="mydiv2">主要反映身体不适感，包括心血管、胃肠道、呼吸和其他系统的不适，和头痛、背痛、肌肉酸痛，以及焦虑等躯体不适表现。</div>
            </el-collapse-item>
            <el-collapse-item title="强迫症状（Obsessive-Compulsive）" name="5" class="myel">
              <div class="mydiv1">
                您的得分为：{{testResult.obseavg}}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                症状程度：{{myobseavg}}
            </div>
              <div class="mydiv2">主要指那些明知没有必要，但又无法摆脱的无意义的思想、冲动和行为，还有一些比较一般的认知障碍的行为征象也在这一因子中反映。</div>
            </el-collapse-item>
            <el-collapse-item title="人际关系敏感（Interpersonal sensitivity）" name="6" class="myel">
                <div class="mydiv1">
                    您的得分为：{{testResult.interavg}}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    症状程度：{{myinteravg}}
                </div>
                <div class="mydiv2">主要是指某些人际的不自在与自卑感，特别是与其他人相比较时更加突出。在人际交往中的自卑感，心神不安，明显的不自在，以及人际交流中的不良自我暗示，消极的期待等是这方面症状的典型原因。</div>
              </el-collapse-item>
              <el-collapse-item title="抑郁（Depression）" name="7" class="myel">
                <div class="mydiv1">
                    您的得分为：{{testResult.depressavg}}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    症状程度：{{mydepressavg}}
                </div>
                <div class="mydiv2">苦闷的情感与心境为代表性症状，还以生活兴趣的减退，动力缺乏，活力丧失等为特征。还表现出失望、悲观以及与抑郁相联系的认知和躯体方面的感受，另外，还包括有关死亡的思想和自杀观念。</div>
              </el-collapse-item>
              <el-collapse-item title="焦虑（Anxiety）" name="8" class="myel">
                <div class="mydiv1">
                    您的得分为：{{testResult.anxietyavg}}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    症状程度：{{myanxietyavg}}
                </div>
                <div class="mydiv2">一般指那些烦躁，坐立不安，神经过敏，紧张以及由此产生的躯体征象，如震颤等。</div>
              </el-collapse-item>
              <el-collapse-item title="敌对（Hostility）" name="9" class="myel">
                <div class="mydiv1">
                    您的得分为：{{testResult.hostavg}}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    症状程度：{{myhostavg}}
                </div>
                <div class="mydiv2">主要从三方面来反映敌对的表现：思想、感情及行为。其项目包括厌烦的感觉，摔物，争论直到不可控制的脾气暴发等各方面。</div>
              </el-collapse-item>
              <el-collapse-item title="恐怖（Photic anxiety）" name="10" class="myel">
                <div class="mydiv1">
                    您的得分为：{{testResult.photicavg}}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    症状程度：{{myphoticavg}}
                </div>
                <div class="mydiv2">恐惧的对象包括出门旅行，空旷场地，人群或公共场所和交通工具。此外，还有社交恐怖。</div>
              </el-collapse-item>
              <el-collapse-item title="偏执（Paranoid ideation）" name="11" class="myel">
                <div class="mydiv1">
                    您的得分为：{{testResult.paravg}}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    症状程度：{{myparavg}}
                </div>
                <div class="mydiv2">主要指投射性思维，敌对，猜疑，妄想，被动体验和夸大等。</div>
              </el-collapse-item>
              <el-collapse-item title="精神病程度（Psychoticism）" name="12" class="myel">
                <div class="mydiv1">
                    您的得分为：{{testResult.psychoavg}}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    症状程度：{{mypsychoavg}}
                </div>
                <div class="mydiv2">反映各式各样的急性症状和行为，即限定不严的精神病性过程的症状表现。</div>
              </el-collapse-item>
          </el-collapse>
          <h2 style="text-align:center" v-if="nulltest">暂无</h2>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        testResult:{},
        uid:"",
        mygenIndex:"",
        mypositivenum:"",
        mypositivelevel:"",
        mysomavg:"",
        myobseavg:"",
        myinteravg:"",
        mydepressavg:"",
        myanxietyavg:"",
        myhostavg:"",
        myphoticavg:"",
        myparavg:"",
        mypsychoavg:"",
        iftest:false,
        nulltest:true,
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      resultdel(uid,tfid){
        axios.get("http://localhost:8088/delresult?uid="+uid+"&tfid="+tfid).then((response)=>{
                alert(response.data);
                window.location.reload();
        })
      }
    },
    created:function() {
        this.uid = window.localStorage.getItem("uid");
        axios.get("http://localhost:8088/gettresultbyuid?uid="+this.uid).then((response)=>{
          if(response.data != []){
            this.iftest = true;
            this.nulltest = false;
            this.testResult = response.data;
            if(this.testResult.genIndex < 1.00){
            this.mygenIndex="正常"
            }else if(this.testResult.genIndex >= 1.00 && this.testResult.genIndex <= 2.00){
              this.mygenIndex="轻度"
            }else if(this.testResult.genIndex > 2.00 && this.testResult.genIndex <= 3.00){
              this.mygenIndex="中度"
            }else if(this.testResult.genIndex > 3.00 && this.testResult.genIndex <= 4.00){
              this.mygenIndex="重度"
            }
            if(this.testResult.positivelevel < 1.00){
              this.mypositivelevel="正常"
            }else if(this.testResult.positivelevel >= 1.00 && this.testResult.positivelevel <= 2.00){
              this.mypositivelevel="轻度"
            }else if(this.testResult.positivelevel > 2.00 && this.testResult.positivelevel <= 3.00){
              this.mypositivelevel="中度"
            }else if(this.testResult.positivelevel > 3.00 && this.testResult.positivelevel <= 4.00){
              this.mypositivelevel="重度"
            }
            if(this.testResult.somavg < 1.00){
              this.mysomavg="正常"
            }else if(this.testResult.somavg >= 1.00 && this.testResult.somavg <= 2.00){
              this.mysomavg="轻度"
            }else if(this.testResult.somavg > 2.00 && this.testResult.somavg <= 3.00){
              this.mysomavg="中度"
            }else if(this.testResult.somavg > 3.00 && this.testResult.somavg <= 4.00){
              this.mysomavg="重度"
            }
            if(this.testResult.obseavg < 1.00){
              this.myobseavg="正常"
            }else if(this.testResult.obseavg >= 1.00 && this.testResult.obseavg <= 2.00){
              this.myobseavg="轻度"
            }else if(this.testResult.obseavg > 2.00 && this.testResult.obseavg <= 3.00){
              this.myobseavg="中度"
            }else if(this.testResult.obseavg > 3.00 && this.testResult.obseavg <= 4.00){
              this.myobseavg="重度"
            }
            if(this.testResult.interavg < 1.00){
              this.myinteravg="正常"
            }else if(this.testResult.interavg >= 1.00 && this.testResult.interavg <= 2.00){
              this.myinteravg="轻度"
            }else if(this.testResult.interavg > 2.00 && this.testResult.interavg <= 3.00){
              this.myinteravg="中度"
            }else if(this.testResult.interavg > 3.00 && this.testResult.interavg <= 4.00){
              this.mygenIndex="重度"
            }
            if(this.testResult.depressavg < 1.00){
              this.mydepressavg="正常"
            }else if(this.testResult.depressavg >= 1.00 && this.testResult.depressavg <= 2.00){
              this.mydepressavg="轻度"
            }else if(this.testResult.depressavg > 2.00 && this.testResult.depressavg <= 3.00){
              this.mydepressavg="中度"
            }else if(this.testResult.depressavg > 3.00 && this.testResult.depressavg <= 4.00){
              this.mydepressavg="重度"
            }
            if(this.testResult.anxietyavg < 1.00){
              this.myanxietyavg="正常"
            }else if(this.testResult.anxietyavg >= 1.00 && this.testResult.anxietyavg <= 2.00){
              this.myanxietyavg="轻度"
            }else if(this.testResult.anxietyavg > 2.00 && this.testResult.anxietyavg <= 3.00){
              this.myanxietyavg="中度"
            }else if(this.testResult.anxietyavg > 3.00 && this.testResult.anxietyavg <= 4.00){
              this.myanxietyavg="重度"
            }
            if(this.testResult.hostavg < 1.00){
              this.myhostavg="正常"
            }else if(this.testResult.hostavg >= 1.00 && this.testResult.hostavg <= 2.00){
              this.myhostavg="轻度"
            }else if(this.testResult.hostavg > 2.00 && this.testResult.hostavg <= 3.00){
              this.myhostavg="中度"
            }else if(this.testResult.hostavg > 3.00 && this.testResult.hostavg <= 4.00){
              this.myhostavg="重度"
            }
            if(this.testResult.photicavg < 1.00){
              this.myphoticavg="正常"
            }else if(this.testResult.photicavg >= 1.00 && this.testResult.photicavg <= 2.00){
              this.myphoticavg="轻度"
            }else if(this.testResult.photicavg > 2.00 && this.testResult.photicavg <= 3.00){
              this.myphoticavg="中度"
            }else if(this.testResult.photicavg > 3.00 && this.testResult.photicavg <= 4.00){
              this.myphoticavg="重度"
            }
            if(this.testResult.paravg < 1.00){
              this.myparavg="正常"
            }else if(this.testResult.paravg >= 1.00 && this.testResult.paravg <= 2.00){
              this.myparavg="轻度"
            }else if(this.testResult.paravg > 2.00 && this.testResult.paravg <= 3.00){
              this.myparavg="中度"
            }else if(this.testResult.paravg > 3.00 && this.testResult.paravg <= 4.00){
              this.myparavg="重度"
            }
            if(this.testResult.psychoavg < 1.00){
              this.mypsychoavg="正常"
            }else if(this.testResult.psychoavg >= 1.00 && this.testResult.psychoavg <= 2.00){
              this.mypsychoavg="轻度"
            }else if(this.testResult.psychoavg > 2.00 && this.testResult.psychoavg <= 3.00){
              this.mypsychoavg="中度"
            }else if(this.testResult.psychoavg > 3.00 && this.testResult.psychoavg <= 4.00){
              this.mypsychoavg="重度"
            }
          }
          
        })
    }
}
</script>

<style scoped>
.myall{
    width: 800px;
    margin-left: 310px;
    background-color: #ffffff;
}
.myel >>> .el-collapse-item__header {
    font-size: 16px;
    padding-left: 20px;
    font-weight: bold;
}
.mydiv1{
    font-size: 16px;
    padding-left: 20px;
    font-weight: bold;
}
.mydiv2{
    font-size: 14px;
    padding-left: 20px;
}
.myresultdel{
  font-size: 16px;
  margin-left:1050px; 
  margin-bottom: 10px;
}
</style>