<template>
  <el-container style="min-height: 100vh">

    <!--      左侧菜单栏-->
    <el-aside :width="sideWidth+'px'" style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(0 21 41 / 35%)" >
      <Aside :isCollapse="isCollapse" :logoTextShow="logoTextShow" />
    </el-aside>

    <!--      右侧头部与主体-->
    <el-container>

      <el-header style="border-bottom: 1px solid #cccccc">
        <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse" />
      </el-header>

      <el-main>
<!--        表示当前页面的子路由会在 <router-view /> 里展示-->
        <router-view />
      </el-main>

    </el-container>
  </el-container>
</template>

<script>

import Aside from "@/components/Aside";
import Header from "@/components/Header";
import Tabs from "@/components/Tabs";

export default {
  name: 'HomeView',
  components: {
    Aside,
    Header,
    Tabs
  },
  data() {
    return {
      collapseBtnClass: "el-icon-s-fold",
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
    }
  },
  methods: {
    collapse() { //点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else { //展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    }
  }
}
</script>

