<template>
    <div>
        <firstbar></firstbar>
        <navbar></navbar>
        <onlinechat></onlinechat>
    </div>
      </template>
      <script>
      import navbar from '../components/navbar.vue'
      import firstbar from '../components/firstbar.vue'
      import onlinechat from '../components/onlinechat.vue'

      export default {
        components: {
          navbar,
          firstbar,
          onlinechat,
        },
      }
      </script>
      
      <style scope>
      
      </style>
      