<template>
  <el-menu :default-openeds="['1', '3']" style="height: 100%; overflow-x: hidden"
           background-color="rgb(48,65,86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
           @select="handleSelect"
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; margin-right: 5px">
      <b style="color: white" v-show="logoTextShow">物流配送系统</b>
    </div>
    <el-menu-item index="/">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>
    <el-submenu>
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">配送管理</span>
      </template>
      <el-menu-item index="/disManage/distributionSites">
        <i class="el-icon-s-custom"></i>
        <span slot="title">初始配送点管理</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  },
  methods: {
    handleSelect(index) {
      this.$route
    }
  }
}
</script>

<style scoped>

</style>