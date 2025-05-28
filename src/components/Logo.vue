<template>
    <div class="logo">
        <img src="../assets/buslogo.png" alt="Logo" class="logo-icon" />
        <h3>公交管理系统</h3>
    </div>
</template>

<script>
    export default {
        name: 'Logo',
        methods:{
            
        }
    }
</script>
    
<style scoped>

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5%;
    min-width: 800px;
    min-height: 25px;
    background-color: rgb(228, 243, 255);
}

h3 {
    color: rgb(95, 91, 91);
    font-size: 20px;
    letter-spacing: 30px;
    margin-left: 10px; /* 图标和文字之间的间距 */
}

.logo-icon {
    width: 30px; /* 图标的宽度 */
    height: auto; /* 图标的高度，保持比例 */
}
</style>