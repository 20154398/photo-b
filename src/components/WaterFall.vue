<template>
    <div ref="container" class="waterfall-container">
        <ul v-for="(it,id) in renderedData" :key="id" class="waterfall-sub-group">
            <waterfall-item v-for="(item,idx) in it.data" :key="idx" :width="item.width" :height="item.height"
                            :ratio="item.ratio" :isLast="item.isLast">
            </waterfall-item>
        </ul>

    </div>
</template>

<script>
    import {WaterfallHeight, WaterfallPageSize} from "../settings/Waterfall";

    export default {
        name: "WaterFall",
        data() {
            return {
                width: 1888,
                scrollTimer: null,
                resizeTimer: null,
                renderedData: [],
                renderedCnt: 0,
            }
        },
        props: {
            gap: {
                type: Number,
                default: 10
            },
            data: {
                type: Array
            }
        },
        watch: {
            data: function () {
                this.reLayout();
            },
            width: function () {
                this.reLayout();
            }
        },
        mounted() {
            this.getWidth();
            this.renderItems(this.renderedCnt);
            this.addEventListener();
        },
        destroyed() {
            this.clearTimer('resize');
            this.clearTimer('scroll');
            this.clearEventListener();
        },
        methods: {
            renderItems(start) {
                let isRemain = this.renderedData.length && !this.renderedData[this.renderedData.length - 1].isFinish;
                /**
                 * 浅拷贝
                 */
                const row = isRemain ? this.renderedData[this.renderedData.length - 1] : {
                    isFinish: false,
                    sum: 0,
                    lastCnt: 0,
                    data: []
                };
                /**
                 * 删除最后一行没有成行的
                 */
                if (isRemain) {
                    row.data.splice(row.data.length - row.lastCnt);
                }
                let width = this.width;
                let gap = this.gap;
                /**
                 * 初始值从row中获取，一起处理isFinish = false
                 */
                let cnt = row.lastCnt, widthSum = row.sum;

                while (start < this.data.length) {


                    widthSum += WaterfallHeight / this.data[start].height * this.data[start].width;

                    if (widthSum > width - cnt * gap || start === this.data.length - 1) {
                        const arr = JSON.parse(JSON.stringify(this.data.slice(start - cnt, start + 1)));
                        let ratio = widthSum / (width - gap * cnt);
                        arr.forEach(it => {
                            it.ratio = ratio;
                            it.isLast = false;
                        });
                        arr[arr.length - 1].isLast = true;
                        row.data.push(...arr);
                        /**
                         * 强制分页
                         */
                        if (cnt > WaterfallPageSize) {
                            row.isFinish = true;
                            start++;
                            break;
                        }
                        /**
                         * 最后一行
                         */
                        if (start === this.data.length - 1) {
                            row.sum = widthSum;
                            row.lastCnt = cnt + 1;
                            if (widthSum <= width - cnt * gap) {
                                arr.forEach(it => {
                                    it.ratio = 1
                                });
                            }
                        }
                        widthSum = 0;
                        cnt = -1;
                    }
                    ++cnt;
                    ++start;
                }

                if (!isRemain) {
                    this.renderedData.push(row);
                }
                this.renderedCnt = start;
            },
            getWidth() {
                this.width = this.$el.clientWidth;
            },
            reLayout(){
                this.renderedData = [];
                this.renderedCnt = 0;
                this.renderItems(this.renderedCnt);
            },
            throttle(method, prefix, t = 200 , ...args) {
                clearTimeout(this[prefix + 'Timer']);
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
                    if (this.data.length - this.renderedCnt < WaterfallPageSize) {
                        this.$emit('update');
                    } else {
                        this.renderItems(this.renderedCnt);
                    }
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
        },
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

    .waterfall-sub-group {
        width: 100%;
        display: block;
        flex-wrap: wrap;
    }
</style>
