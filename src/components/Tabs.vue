<template>
  <div>
    <el-tabs
        v-model="editableTabsValue"
        type="card"
        closable
        @tab-remove="removeTab"
        @tab-click="showCurrentTab"
    >
      <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editableTabsValue: '2',
      editableTabs: [],
      tabIndex: 2
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>