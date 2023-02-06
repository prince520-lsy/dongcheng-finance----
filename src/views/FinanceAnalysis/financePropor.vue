<template>
  <a-row>
    <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }" class="span">col</a-col>
    <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">col</a-col>
    <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">col</a-col>
  </a-row>
</template>
<style lang="less" scoped>
.span {
  background-color: blue;
}
</style>