<template>
    <div class="waterfall-container">
        <water-fall v-for="(item, idx) in images" :key="idx" :gap="10" :data="item" :width="width">
        </water-fall>
    </div>
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
                images: [],
                width: 1888,
                scrollTimer: null,
                resizeTimer: null,
            }
        },
        mounted() {
            this.httpGetData();
            this.getWidth();
            this.addEventListener();
        },
        destroyed() {
            this.clearTimer('resize');
            this.clearTimer('scroll');
            this.clearEventListener();
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
                    this.images.push(res);
                })
            },
            getWidth() {
                this.width = this.$el.clientWidth;
            },
            throttle(method, prefix, t, ...args) {
                clearTimeout(this[prefix + 'Timer']);
                t = t || 2000;
                this[prefix + 'Timer'] = setTimeout(() => {
                    method.apply(this, args);
                }, t);
            },
            throttleHandler(method, prefix) {
                return this.throttle.bind(this, method, prefix, 200);
            },
            clearTimer(prefix) {
                if (this[prefix + 'Timer']) {
                    clearTimeout(this[prefix + 'Timer']);
                }
                this[prefix + 'Timer'] = null;
            },
            scrollHandler() {
                const CONDITION = this.$el.scrollHeight - this.$el.scrollTop <= this.$el.clientHeight;
                if (CONDITION) {
                    this.httpGetData();
                }
            },
            addEventListener() {
                window.addEventListener('resize', this.throttleHandler(this.getWidth, 'resize'));
                this.$el.addEventListener('scroll', this.throttleHandler(this.scrollHandler, 'scroll'));
            },
            clearEventListener() {
                window.removeEventListener('resize', this.throttleHandler(this.getWidth, 'resize'));
                this.$el.removeEventListener('scroll', this.throttleHandler(this.scrollHandler, 'scroll'));
            }
        }
    }
</script>

<style scoped>
    .waterfall-container::-webkit-scrollbar {
        display: none;
    }

    .waterfall-container {
        width: calc(100% - 32px);
        height: 100%;
        overflow: hidden scroll;
        background-color: #eeeeee;
        margin: 0 16px;
    }
</style>
