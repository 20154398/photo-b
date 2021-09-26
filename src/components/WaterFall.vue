<template>
    <div ref="container" style="width: 100%;">
        <waterfall-item v-for="(item,idx) in items" :key="idx" :width="item.width" :height="item.height"
                        :ratio="item.ratio"
                        :isLast="item.isLast?item.isLast:false"></waterfall-item>
    </div>
</template>

<script>
    import {WaterfallHeight, WaterfallWidth} from "../settings/Waterfall";

    export default {
        name: "WaterFall",
        props: {
            gap: {
                type: Number,
                default: 10
            },
            data: {
                type: Array
            },
            width: {
                type: Number
            }
        },
        computed: {
            items: function () {
                return this.renderItems(this.data, this.width, this.gap);
            }
        },
        methods: {
            renderItems(data, width, gap) {
                const Data = JSON.parse(JSON.stringify(data));
                const LeastRow = Math.floor(width / WaterfallWidth);

                let i = 0, widthSum = 0, cnt = 0;
                while (i < Data.length) {
                    let prev = widthSum;
                    widthSum += WaterfallHeight / Data[i].height * Data[i].width;
                    if ((cnt >= LeastRow && widthSum > width - cnt * gap) || i === Data.length - 1 || i === Data.length - LeastRow) {
                        let oldRatio = prev / (width - gap * (cnt - 1));
                        let ratio = widthSum / (width - gap * cnt);
                        if ((1 - oldRatio) < (ratio - 1)) {
                            for (; cnt > 0; --cnt) {
                                Data[i - cnt].ratio = oldRatio;
                            }
                            Data[i - 1].isLast = true;
                            widthSum -= prev;
                            cnt = 0;
                        } else {
                            for (; cnt >= 0; --cnt) {
                                Data[i - cnt].ratio = ratio;
                            }
                            Data[i].isLast = true;
                            widthSum = 0;
                            cnt = -1;
                        }
                    }
                    ++cnt;
                    ++i;
                }
                return Data;
            }
        },
    }
</script>

<style scoped>

</style>
