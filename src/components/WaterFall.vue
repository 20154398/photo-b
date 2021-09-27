<template>
    <div ref="container" style="width: 100%;display: flex;flex-wrap: wrap">
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
                const Data = JSON.parse(JSON.stringify(data)).map((item, idx) => {
                    return Object.assign(item, {
                        index: idx,
                        vWidth: WaterfallHeight * item.width / item.height
                    })
                });
                Data.sort((a, b) => {
                    return b.vWidth - a.vWidth;
                });

                const LeastRow = Math.floor(width / WaterfallWidth);
                let sum = Data.reduce((prev, cur) => prev + cur.vWidth, 0);
                let group = Math.round(sum / (width - LeastRow * gap));

                let temp = new Array(group);
                let cntTemp = new Array(group);
                for (let i = 0; i < group; ++i) {
                    temp[i] = [];
                    cntTemp[i] = 0;
                }

                function getMinGroupIdx(arr) {
                    let res = arr.reduce((a, b, idx) => {
                        if (a.v > b) {
                            a.v = b;
                            a.idx = idx;
                        }
                        return a;
                    }, {idx: 0, v: Number.MAX_SAFE_INTEGER});
                    return res.idx;
                }

                Data.forEach((item) => {
                    let groupIndex = getMinGroupIdx(cntTemp);
                    temp[groupIndex].push(item);
                    cntTemp[groupIndex] += item.vWidth;
                });

                return temp.reduce((res, arr, idx) => {
                    let ratio = cntTemp[idx] / (width - gap * (arr.length - 1));
                    arr.forEach(it => {
                        it.ratio = ratio
                    });
                    arr.sort((a,b)=>a.index - b.index);
                    arr[arr.length - 1].isLast = true;
                    res.push(...arr);
                    return res;
                }, []);
            }
        },
    }
</script>

<style scoped>

</style>
