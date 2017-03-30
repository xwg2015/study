<template>
    <div class="header">
        <ul>
           <li>商品图片：<img width="50" :src="seller.avatar" alt=""></li>
           <li>商品名字：{{seller.name}}</li>
           <li>商品信息：{{seller.description}}</li>
           <li>商品支持：{{seller.type}}</li>
       </ul>
    </div>
</template>

<script>
    export default {
        props: {
            seller: Object
        }
    };
</script>

<style>
</style>
