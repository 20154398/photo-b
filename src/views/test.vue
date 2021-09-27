<template>
    <water-fall :gap="10" :data="images" @update="httpGetData"></water-fall>
</template>

<script>

    import WaterFall from "../components/WaterFall";

    const testData = [
        {width: 750, height: 568},
        {width: 280, height: 420},
        {width: 1920, height: 994},
        {width: 850, height: 917},
        {width: 480, height: 350},
        {width: 1600, height: 7659},
        {width: 750, height: 568},
        {width: 1123, height: 1742},
        {width: 552, height: 365},
        {width: 500, height: 186},
        {width: 600, height: 500},
        {width: 480, height: 350},
        {width: 1600, height: 7659},
        {width: 750, height: 568},
        {width: 1123, height: 1742},
        {width: 552, height: 365},
        {width: 500, height: 186},
        {width: 600, height: 500},
        {width: 480, height: 350},
        {width: 1600, height: 7659},
        {width: 750, height: 568},
        {width: 1123, height: 1742},
        {width: 552, height: 365},
        {width: 500, height: 186},
        {width: 600, height: 500},
        {width: 640, height: 328},
        {width: 2048, height: 1366},
        {width: 600, height: 500},
        {width: 300, height: 500},
    ];

    export default {
        name: "test",
        components: {WaterFall},
        data() {
            return {
                images: []
            }
        },
        mounted() {
            this.httpGetData();
        },
        methods: {
            httpGetData() {
                new Promise(function (resolve) {
                    function randArr(arr) {
                        for (var i = 0; i < arr.length; i++) {
                            var iRand = parseInt(arr.length * Math.random());
                            var temp = arr[i];
                            arr[i] = arr[iRand];
                            arr[iRand] = temp;
                        }
                        return arr;
                    }

                    // 随机打乱
                    resolve(randArr(testData));
                }).then(res => {
                    this.images.push(...res);
                })
            },
        }
    }
</script>

<style scoped>
</style>
