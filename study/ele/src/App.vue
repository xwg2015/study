<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
        <span class="item">
            <router-link to="/goods">商品</router-link>
        </span>
        <span class="item">
            <router-link to="/ratings">评论</router-link>
        </span>
        <span class="item">
            <router-link to="/seller">商家</router-link>
        </span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    import header from './components/header/header.vue';

    const ERR_OK = 0;

    export default {
        data() {
            return {
                seller: {}
            };
        },

        created() {
            this.$http.get('/api/seller').then((response) => {
                response = response.body;

                if (response.errnum === ERR_OK) {
                    this.seller = response.data;
                    console.log(this.seller);
                }
            });
        },

        components: {
            'v-header': header
        }
    };
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
.tab {
    display: flex;
}
.tab .item  {
    display: inline-block;
    flex: 1;
    text-align: center;
    background-color: #e1e1e1;
}

a {
    display: block;
    line-height: 32px;
    color: #000;
    text-decoration: none;
}

a.router-link-active {
  color: #f66;
}
</style>
