<template>
    <div class="waterfall-item" :style="styles"></div>
</template>

<script>
    import {WaterfallHeight} from "@/settings/Waterfall.js"

    export default {
        name: "WaterFallItem",
        props:{
            width:{
                type: Number
            },
            height:{
                type: Number
            },
            ratio:{
                type: Number
            },
            isLast:{
                type:Boolean
            }
        },
        computed: {
            styles:function () {
                const height = WaterfallHeight / this.ratio;
                return {
                    backgroundColor: '#' + (this.width / this.height * 100000000).toString(16).substr(0,6),
                    width: Math.floor(this.width * height / this.height) + 'px',
                    height: height + 'px',
                    marginBottom: this.$parent.gap+'px',
                    marginRight: this.isLast?'0px':this.$parent.gap+'px'
                };
            }
        }
    }
</script>

<style scoped>
    .waterfall-item {
        position: relative;
        float: left;
        display: list-item;
        width: 200px;
        height: 100px;
        list-style-type: none;
    }
</style>
