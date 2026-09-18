<template>
    <div class="question">
      <h2>{{ question.text }}</h2>
      <!-- 显示选项 -->
      <div v-for="(option, index) in options" :key="index">
        <label>
          <input type="radio" name="answer" :value="option" v-model="answered">
          {{ option.optioncon}}
        </label>
      </div>
      <!-- 显示下一题按钮 -->
      <button @click="nextQuestion">下一题</button>
    </div>
  </template>
   
  <script>
  export default {
    props: ['question', 'questions', 'currentIndex'],
    data() {
      return {
        answered: '',
        options:[
            {index:'A',optioncon:'没有'},
            {index:'B',optioncon:'轻度'},
            {index:'C',optioncon:'中度'},
            {index:'D',optioncon:'偏重'},
            {index:'E',optioncon:'严重'},
        ],
      };
    },
    methods: {
      nextQuestion() {
        if (this.answered !== '') {
          // 处理答题逻辑，例如记录答案
          // ...
   
          // 显示下一题
          this.$emit('next');
        }
      }
    }
  };
  </script>