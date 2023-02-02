<template>
  <div>
    <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 50 }" :scroll="{ y: 240 }" />

    <!-- stackedEcherts -->
    <div class="stackedEcherts">
      <StackedEchart />
    </div>

  </div>
</template>
<script>

import StackedEchart from './components/StackedEchart.vue';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default {
  components: { StackedEchart },
  data() {
    return {
      data,
      columns,
    };
  },
};

</script>
<style lang="less" scoped>
.stackedEcherts {
  width: 1240px;
  height: 340px;
  // background-color: red;
}
</style>