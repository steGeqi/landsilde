<template>
    <div class="FlexCard" :style="style">
        <div class="tool">
            <el-button-group :size="buttonSize">
                <el-button @click="switchCard">
                    <el-icon style="vertical-align: middle">
                        <!-- <component :is="open ? Minus : Plus"></component> -->
                        <Minus v-if="open" />
                        <Plus v-else />
                    </el-icon>
                </el-button>
                <!-- <Button icon="ios-arrow-forward" @click="switchCard(true)"></Button> -->
            </el-button-group>
        </div>
        <div class="content" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { Minus, Plus } from '@element-plus/icons-vue'
export default {
    data() {
        return {
            buttonSize: 'small',
            open: true,
            style: {
                width: this.width,
            },
        }
    },
    methods: {
        switchCard() {
            this.open = !this.open
            if (this.open) {
                this.style.width = this.width
            } else {
                this.style.width = '80px'
            }
        },
    },
    props: {
        width: String,
    },
    components: {
        Minus,
        Plus,
    },
}
</script>

<style>
.FlexCard {
    position: relative;
}
.FlexCard .tool {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999;
}
.FlexCard .tool::after {
    display: block;
    content: '';
    clear: both;
}
.FlexCard .tool .ivu-btn-group {
    float: right;
}
.FlexCard .tool .el-button {
    background: transparent;
    padding: 2px;
}
</style>
