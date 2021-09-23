<template>
    <div>
        <!-- 表格区 -->
        <el-table ref="customizedTable" v-loading="loading" :data="Data" stripe style="width: 100%"
                  :show-summary="showSummary"
                  :summary-method="summaryMethod"
                  @sort-change="((sortMessage)=>{$emit('sort-change',sortMessage)})"
                  @cell-click="(row,column,cell,event)=>{$emit('cell-click',{row,column,cell,event})}"
                  :cell-class-name="cellClassName"
        >
            <el-table-column v-if="Index" type="index" :index="IndexContent.method" :label="IndexContent.label"
                             :width="IndexContent.width">
            </el-table-column>
            <template v-for="(it,idx) in Header">
                <el-table-column v-if="it.children" :key="idx" :label="it.label">
                    <el-table-column v-for="(it1,idx1) in it.children" :key="idx1" :align="it1.align||'left'" :prop="it1.prop" :width="it1.width||'auto'"
                                     :label="it1.label" :sortable="it1.sortable||false"
                                     :fixed="it1.fixed||false" :formatter="it1.formatter||null" :class-name="it1.className">
                        <template v-if="it1.showSlot" v-slot:default="{row}" >
                            <slot :name="it1.slotName" :row="row" :idx="idx">
                                <div v-if="it1.childSlots&&it1.childSlots.length>0">
                            <span class="usable" v-for="(item,index) in it1.childSlots" :key="index">
                                <slot :name="item.slotName" :row="row" :idx="idx">
                                    <el-button v-if="(!item.disappear)||(item.disappear&&!item.disappear(row,item))" :type="item.type||'text'"
                                               :disabled="item.disabled&&item.disabled(row,item)"
                                               :size="item.size||'mini'"  @click="$emit(item.slotName,row)">{{item.buttonName}}
                                    </el-button>
                                </slot>
                            </span>
                                </div>
                                <el-button v-else-if="(!it1.disappear)||(it1.disappear&&it1.disappear(row,it))" :type="it1.type||'text'"
                                           :disabled="it.disabled&&it.disabled(row,it1)"
                                           :size="it.size||'mini'"  @click="$emit(it1.slotName,row)">{{it1.buttonName}}
                                </el-button>
                            </slot>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column v-else :key="idx" :align="it.align||'left'" :prop="it.prop" :width="it.width||'auto'"
                                 :label="it.label" :sortable="it.sortable||false"
                                 :fixed="it.fixed||false" :formatter="it.formatter||null" :class-name="it.className">
                    <template v-if="it.showSlot" v-slot:default="{row}" >
                        <slot :name="it.slotName" :row="row" :idx="idx">
                            <div v-if="it.childSlots&&it.childSlots.length>0">
                                <span class="usable" v-for="(item,index) in it.childSlots" :key="index">
                                    <slot :name="item.slotName" :row="row" :idx="idx">
                                        <el-button v-if="(!item.disappear)||(item.disappear&&!item.disappear(row,item))" :type="item.type||'text'"
                                                   :disabled="item.disabled&&item.disabled(row,item)"
                                                   :size="item.size||'mini'"  @click="$emit(item.slotName,row)">{{item.buttonName}}
                                        </el-button>
                                    </slot>
                                </span>
                            </div>
                            <el-button v-else-if="(!it.disappear)||(it.disappear&&it.disappear(row,it))" :type="it.type||'text'"
                                       :disabled="it.disabled&&it.disabled(row,it)"
                                       :size="it.size||'mini'"  @click="$emit(it.slotName,row)">{{it.buttonName}}
                            </el-button>
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <!-- /表格区 -->
        <!-- 分页 -->
        <el-pagination
                background
                :layout="paginationLayout"
                @size-change="val=>{$emit('size-change',val)}"
                @current-change="val=>{$emit('current-change',val)}"
                :page-size="pageSize"
                :current-page="currentPage"
                :total="total" class="m-t-30 text-center">
        </el-pagination>
        <!-- /分页 -->
    </div>
</template>

<script>
    export default {
        name: "CustomizedTable",
        props: {
            Index: {
                type: Boolean,
                default: false
            },
            IndexContent: {
                type: Object,
                default: function () {
                    return {
                        method: null,
                        label: '序号',
                        width: 'auto'
                    }
                }
            },
            Header: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            Data: {
                type: Array,
                default: null
            },
            cellClassName: {
                type: [String,Function],
                default: ""
            },
            loading: {
                type: Boolean,
                default: false
            },
            paginationLayout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            },
            showSummary: Boolean,
            summaryMethod: Function,
            pageSize: Number,
            currentPage: Number,
            total: Number
        },
        methods: {
            clearSort(){
                this.$refs['customizedTable'].clearSort();
            }
        }
    }
</script>

<style scoped lang="scss">

    //.is-plain {
    //    margin: 0 10px 0 0;
    //}

    .el-button {
        margin: 0 10px 0 0;
    }
    .usable .el-button{
        &:hover{
            text-decoration: underline;
        }
    }




</style>
