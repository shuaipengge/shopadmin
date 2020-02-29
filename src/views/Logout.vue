<template>
  <div>
    <button @click="logout">注销</button>
  </div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped></style>
