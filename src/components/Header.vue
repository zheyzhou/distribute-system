<template>
  <div style="line-height: 60px; display: flex">
    <div style="flex: 1">
      <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span>

      <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item v-for="(item,index) in breadList"
                            :key="index" :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-dropdown style="width: 70px; cursor: pointer">
      <span>小周</span>
      <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>管理员信息</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: ''
  },
  data() {
    return {
      breadList: [], //路由集合
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  methods: {
    isHome(route) {
      return route.name === "系统"
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      console.log(matched)

      //如果不是首页
      if (!this.isHome(matched[0])) {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched)
      }
      this.breadList = matched
    },
  },
  created() {
    this.getBreadcrumb()
  }
}
</script>

<style scoped>

</style>