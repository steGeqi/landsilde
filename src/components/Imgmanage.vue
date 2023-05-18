<template>
    <div class="imgManage">
        <div v-if="change === 0">
            <div class="head">图片管理</div>
            <div class="content">
                <div
                    class="center box"
                    v-for="(name, index) in areaName"
                    :key="index"
                    @click="chooseFile(index)"
                >
                    <img :src="imgface[index]" alt="" style="width: 11.458333rem" />
                    <p class="demonstration">{{ name }}</p>
                </div>
            </div>
        </div>
        <div v-else-if="change === 1">
            <div class="head">
                <el-button size="large" @click="backFirst">返回</el-button>
            </div>
            <div class="content">
                <div class="center box" @click="chooseIsPhoto(0)">
                    <img
                        src="@/assets/fileIcon/hasPhoto.png"
                        alt=""
                        style="width: 11.458333rem"
                    />
                    <p class="demonstration">
                        拥有图片的滑坡数{{ hasPhoto.length }}
                    </p>
                </div>
                <div class="center box" @click="chooseIsPhoto(1)">
                    <img
                        src="@/assets/fileIcon/noPhoto.png"
                        alt=""
                        style="width: 11.458333rem"
                    />
                    <p class="demonstration">
                        没有图片的滑坡数{{ noPhoto.length }}
                    </p>
                </div>
            </div>
        </div>
        <div v-else-if="change === 2">
            <div class="head">
                <el-button size="large" @click="backFirst">返回</el-button>
            </div>
            <div class="content">
                <div
                    class="center box"
                    v-for="(file, index) in files"
                    :key="index"
                    @click="chooseImg(file[0])"
                >
                    <img
                        :src="
                            isPhoto
                                ? '@/assets/imgicon/file2.png'
                                : imgface[index % 6]
                        "
                        alt=""
                        style="width: 11.458333rem"
                    />
                    <p class="demonstration">{{ file[2] }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="head">
                <el-button size="large" @click="backFirst">返回</el-button>
            </div>
            <div class="contentImg">
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-remove="handleRemove"
                    :before-upload="handleChange"
                >
                    <el-icon><plus /></el-icon>
                </el-upload>
                <div
                    class="center img"
                    v-for="(imgs, index) in imgs"
                    :key="index"
                >
                    <img
                        :src="
                            'https://huapo.oss-cn-beijing.aliyuncs.com/Photo/' +
                            imgs.img 
                        "
                        alt=""
                        style="width: 11.458333rem; height: 7.552083rem"
                    />
                    <p>{{ imgs.name }}</p>
                    <span class="item-actions">
                        <!-- <span class="item-edit" @click="editImg(imgs.img)"
              ><el-icon :size="50"><edit /></el-icon
            ></span> -->
                        <span class="item-delete" @click="deleteImg(imgs.img)">
                            <!-- <el-icon :size="100"><delete-filled /></el-icon> -->
                            <el-icon><delete-filled /></el-icon>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'
import { onMounted, ref } from 'vue'
import { getImgFile, getImages, upImage, deleteImage } from '@/api/image.js'
import { getHuapoMarker } from '@/api/huapo.js'
import { Plus, Edit, DeleteFilled } from '@element-plus/icons-vue'
//  此处换阿里云路径之后可删除
import GLimg from "@/assets/huapoImg/GL1.png";
import TSimg from "@/assets/huapoImg/TS1.png";
import TWimg from "@/assets/huapoImg/TW1.png";
import LFimg from "@/assets/huapoImg/LF1.png";
import HTimg from "@/assets/huapoImg/HT1.png";
import HXimg from "@/assets/huapoImg/HX1.png";
import HYimg from "@/assets/huapoImg/HY1.png";
export default {
    components: {
        Plus,
        Edit,
        DeleteFilled,
    },
    setup() {
        const reload = inject('reload') //注入刷新事件,这里括号中的参数要对应上前面provide中的第一个参数
        function refRoad() {
            reload()
        }
        const areaName = ref([
            '洪洞地震(1303)',
            '华县地震(1556)',
            '天水南地震(1654)',
            '临汾地震(1695)',
            '通渭地震(1718)',
            '海原地震(1920)',
            '古浪地震(1927)',
        ])
        const imgface = ref(
           [GLimg,TSimg,TWimg,LFimg,HTimg,HXimg,HYimg]
        )
        let canshu = ref('')
        let dialogVisible = ref(false)
        let change = ref(0)
        let files = ref([])
        let mainNum = ref(0)
        let hasPhoto = ref([])
        let noPhoto = ref([])
        let isPhoto = ref(0)
        let codeNum = ''
        const imgs = ref([])

        //根据地区显示文件夹
        function chooseFile(index) {
            mainNum.value = index
            change.value += 1
            hasPhoto.value = []
            noPhoto.value = []
            // getImgFile(index).then((res) => {
            //   console.log(res);
            //   files.value = res.files;
            // });
            getHuapoMarker(index).then((res) => {
                console.log(res)
                res.marker.forEach((e) => {
                    if (e[19] != '0') {
                        hasPhoto.value.push(e)
                    } else {
                        noPhoto.value.push(e)
                    }
                })
            })
        }

        function chooseIsPhoto(n) {
            change.value += 1
            files.value = []
            isPhoto.value = n
            if (!n) {
                // getImgFile(mainNum.value).then((res) => {
                //   console.log(res);
                //   files.value = res.files;
                // });
                // console.log(hasPhoto.value);
                files.value = hasPhoto.value
            } else {
                console.log(noPhoto.value)
                files.value = noPhoto.value
            }
            console.log(files.value)
        }

        //这个没啥用
        function handleRemove(file, fileList) {
            console.log(file, fileList)
        }

        //上传图片
        function handleChange(fileInfo) {
            // console.log(file);
            let data = new FormData()
            //   let fileInfo = file.raw;
            data.append('file', fileInfo, fileInfo.name)
            console.log(fileInfo)
            if (
                fileInfo.type == 'image/jpeg' ||
                fileInfo.type === 'image/png'
            ) {
                upImage(canshu.value, data, isPhoto.value).then((res) => {
                    console.log(res)

                    //   chooseFile(mainNum.value);
                    // chooseIsPhoto(isPhoto.value);
                    // imgs.value = [];
                    // getImages(canshu.value).then((res) => {
                    //   console.log(res);
                    //   res.paths.forEach((e) => {
                    //     let obj = {
                    //       img: e,
                    //       name: e.substr(e.indexOf("/") + 1),
                    //     };
                    //     imgs.value.push(obj);
                    //   });
                    // });
                    //   proxy.$refs.upload.submit();
                    ElMessage({
                        message: '上传成功',
                        type: 'success',
                    })
                    refRoad()
                })
            } else {
                ElMessage({
                    message: '请按照步骤上传指定文件',
                    type: 'warning',
                })
            }
        }

        //根据点击的文件夹显示图片
        function chooseImg(file) {
            let regions = ["Hongtong","Huaxian","Tianshui","Linfen","Tongwei","Haiyuan","Gulang"]
            imgs.value = []
            change.value += 1
            codeNum = file
            canshu.value = mainNum.value + '_' + file
            console.log(canshu.value)
            getImages(canshu.value)
                .then((res) => {
                    console.log(res.paths[0][0])
                    res.paths[0][0].split('_').forEach((e)=>{
                        console.log(e);
                        let obj = {
                            img: regions[mainNum.value] +'/' + file + '/' + e,
                            name: e,
                        }
                        imgs.value.push(obj)
                    })
                    // res.paths.forEach((e) => {
                    //     // imgs.value.push('http://localhost:8848/get_image_file/'+e);
                    //     // console.log(e.substr(e.indexOf('/')+1));
                    //     // let obj = {
                    //     //     img: e,
                    //     //     name: e.substr(e.indexOf('/') + 1),
                    //     // }
                    //     // imgs.value.push(obj)
                    //     console.log(e[0]);
                    //     let obj = {
                    //         img: e,
                    //         name: e[0].split('_'),
                    //     }
                    //     imgs.value.push(obj)
                    // })
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        //删除图片
        function deleteImg(path) {
            console.log('delete')
            console.log(path)
            deleteImage(path, codeNum).then((res) => {
                // imgs.value = [];
                ElMessage({
                    message: '删除成功',
                    type: 'success',
                })
                refRoad()
                // chooseFile(mainNum.value);
                // chooseIsPhoto(isPhoto.value);
                // getImages(canshu.value).then((res) => {
                //   console.log(res);
                //   res.paths.forEach((e) => {
                //     let obj = {
                //       img: e,
                //       name: e.substr(e.indexOf("/") + 1),
                //     };
                //     imgs.value.push(obj);
                //   });
                // });
            })
        }
        //修改图片
        function editImg() {
            console.log('edit')
        }
        //返回按钮
        function backFirst() {
            change.value -= 1
        }
        onMounted(() => {})
        return {
            areaName,
            change,
            chooseFile,
            backFirst,
            files,
            imgs,
            chooseImg,
            handleRemove,
            handleChange,
            dialogVisible,
            deleteImg,
            editImg,
            hasPhoto,
            noPhoto,
            chooseIsPhoto,
            isPhoto,
            imgface,
        }
    },
}
</script>

<style>
html{
    font-size: 1vw;
}
.imgManage {
    padding: 1.041667rem;
    box-sizing: border-box;
}
.imgManage .el-button {
    font-size: 1.041667rem;
    font-weight: bold;
}
.imgManage .head {
    font-size: 1.302083rem;
    font-weight: bold;
    color: #606266;
}
.imgManage .center {
    text-align: center;
}
.imgManage .box {
    display: inline-block;
    width: 15.625rem;
    font-size: .9375rem;
    margin: 0 2.083333rem;
}
.imgManage .box:hover {
    border: .052083rem solid gray;
    cursor: pointer;
}
.imgManage .content {
    /* display: flex;
    margin-top: 3.125rem;
    justify-content: space-around; */
    margin-top: 3.125rem;
}
.item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 1.041667rem;
    background-color: #00000080;
    transition: opacity var(--el-transition-duration);
    line-height: 10.416667rem;
}
.item-actions:hover {
    opacity: 1;
}
.imgManage .img {
    overflow: hidden;
    background-color: #fff;
    border: .052083rem solid #c0ccda;
    border-radius: .3125rem;
    box-sizing: border-box;
    width: 15.625rem;
    height: 10.416667rem;
    margin: 0 .416667rem .416667rem 0;
    display: inline-block;
    position: relative;
    margin: 0rem 2.604167rem 2.864583rem 0rem;
}
.contentImg {
    margin-top: 3.125rem;
    display: flex;
    flex-wrap: wrap;
}
.contentImg > div {
    margin-right: 2.604167rem;
}
</style>
