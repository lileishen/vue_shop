<template>
  <el-container class='home-container'>
    <el-header>
      <div>
        <img src='../assets/logo.png' alt=''>
        <span>电商后台管理系统</span>
      </div>
      <el-button type='info' @click='logout'>退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class='toggle-button' @click='toggleCollapse'>
          |||
        </div>
        <el-menu
          class='el-menu-vertical-demo'
          background-color='#313743'
          text-color='#fff'
          :unique-opened='true'
          :collapse='isCollapse'
          :collapse-transition='false'
          :router='true'
          :default-active='activePath'
          active-text-color='#359BFF'>
          <el-submenu :index="item.id +''" v-for='item in menus' :key='item.id'>
            <template slot='title'>
              <i class='el-icon-location'></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item :index="'/'+subItem.path" v-for='subItem in item.children' :key='subItem.id'
                          @click='saveNavState(subItem.path)'>
              <template slot='title'>
                <i class='el-icon-menu'></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      menus: [],
      isCollapse: false,
      activePath: '' // 激活地址
    }
  },
  // 初始化
  created () {
    this.getMenus();
    this.activePath = '/' + window.sessionStorage.getItem('activePath');
  },
  methods: {
    // 退出系统
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单
    async getMenus () {
      const { data: res } = await this.$http.get('/menus')
      // console.log(res);
      if (res.meta.status !== 200) return this.$message.error('获取菜单有误')
      this.menus = res.data
    },
    //  菜单折叠展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    //  保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath);
    }
  }
}

</script>
<style scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-header > div > img {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}

.el-header > div {
  color: #ffffff;
  font-size: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.el-aside {
  background-color: #313743;
}

.el-main {
  background-color: #E9EDF0;
}

.el-menu {
  border-right: none;
}

.toggle-button {
  color: #ffffff;
  font-size: 14px;
  letter-spacing: 5px;
  text-align: center;
  line-height: 40px;
  background-color: #475163;
}

</style>
