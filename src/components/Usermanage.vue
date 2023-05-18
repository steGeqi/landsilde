<template>
  <div class="manage">
    <div style="
                position: relative;
                width: 95%;
                height: 90%;
                left: 3%;
                top: 2rem;
            ">
      <el-card
        :bordered="false"
        style="height: 100%"
      >
        <template
          #header
          style="height: 2.083333rem; line-height: 2.083333rem"
        >
          <div>
            <span style="font-size: 1.302083rem;
            margin-left: .520833rem;
            font-weight: 900;
            ">用户管理</span>
            <span style="position:absolute;
            right:3rem;
            font-size: 1.302083rem;margin-right: .520833rem;
font-weight: 900">
              <el-button type="success" size="large" @click="add_user=true" :disabled="this.now_user_type === '21232f297a57a5a743894a0e4a801fc3' ? false:true">新增用户</el-button>
            </span>
          </div>

        </template>
        <el-table
          :data="showPushData"
          border
          :header-cell-style="headClass"
          :cell-style="rowClass"
        >
          <el-table-column
            label="ID"
            prop="id"
            width="130"
          />
          <el-table-column
            label="用户名"
            prop="username"
            width="160"
          />
          <el-table-column
            label="真实姓名"
            prop="name"
            width="180"
          />
          <el-table-column
            label="密码"
            prop="password"
            width="150"
          />
          <el-table-column
            label="电话号码"
            prop="number"
          />
          <el-table-column
            label="备注"
            prop="tip"
          />
          <el-table-column
            label="用户类型"
            width="180"
          >
            <template #default="scope">
              <el-popover>
                <template #reference>
                  <div class="name-wrapper">
                    <el-tag size="large">{{
                                            scope.row.type
                                        }}</el-tag>
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <!--              <el-button size="mini" @click="handelEdit(scope.$index, scope.row)"-->
              <!--              >编辑</el-button-->
              <!--              >-->
              <el-button
                class="userbtn"
                :disabled="this.now_user_type === '21232f297a57a5a743894a0e4a801fc3' ? false:(scope.row.id != this.now_user_id ?true:false)"
                size="mini"
                @click="Editpassword(scope.$index, scope.row)"
              >修改密码</el-button>
              <el-button
                class="userbtn"
                size="mini"
                type="danger"
                :disabled="this.now_user_type === '21232f297a57a5a743894a0e4a801fc3' ? false:(scope.row.id != this.now_user_id ?true:false)"
                @click="handeDelete_before(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div
          class="page"
          style="position: absolute; left: 50%; bottom: 5%"
        >
          <nav style="position: relative; right: 50%">
            <el-pagination
              :page-size="page_size"
              :pager-count="11"
              layout="prev, pager, next,total"
              :total="this.num_data"
              @current-change="changePage"
            >
            </el-pagination>
          </nav>
        </div>
      </el-card>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
      :before-close="handleClose"
    >
      <span>确认删除此条信息吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleDelete"
          >确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible_edit"
      title="编辑用户信息"
      width="30%"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="6.25rem"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="name"
        >
          <el-input v-model="Editform.name"></el-input>
        </el-form-item>
        <el-form-item
          label="真实姓名"
          prop="name"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="电话号码"
          prop="name"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="name"
        >
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="用户类型"
          prop="region"
        >
          <el-select
            v-model="ruleForm.region"
            placeholder="Activity zone"
          >
            <el-option
              label="管理员"
              value="shanghai"
            ></el-option>
            <el-option
              label="普通用户"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >Create</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible_edit = false">取消</el-button>
          <el-button
            type="primary"
            @click="Editpassword_check"
          >确定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      v-model="editpwd_dialog"
      title="修改密码"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-width="6.25rem">
        <el-form-item label="新密码">
          <el-input
            v-model="editpwd.first"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="editpwd.second"
            placeholder="请输入确认密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editpwd_dialog = false">取消</el-button>
          <el-button
            type="primary"
            @click="Editpassword_check()"
          >提交</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="add_user"  title="新增用户" width="40%" center>
      <el-form ref="formRef"  :rules="add_rules" :model="form" label-width="6.3rem" size="large">
        <el-form-item prop="username" label="用户名" >
          <el-input v-model="form.username"
                    placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item prop="factname" label="真实姓名" >
          <el-input v-model="form.factname"
                    placeholder="请输入真实姓名"/>
        </el-form-item>
        <el-form-item prop="phone_number" label="电话号码" >
          <el-input v-model="form.phone_number"
                    placeholder="请输入电话号码"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
          />
        </el-form-item>
        <el-form-item prop="check_pwd" label="确认密码">
          <el-input
            v-model="form.check_pwd"
            type="password"
            placeholder="请再次输入密码"
            show-password
        />
        </el-form-item>
        <el-form-item prop="user_type"  label="用户类型">
          <el-select v-model="form.user_type" placeholder="选择用户类型">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="descripe" label="备注">
          <el-input type="textarea" v-model="form.descripe" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="add_user = false">取消</el-button>
        <el-button type="primary" @click="user_submit"
        >提交</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import md5 from "js-md5";
import { Users } from "../api/login";
import { deleteUser } from "../api/user";
import { editPwd } from "../api/user";
import { addUser} from "../api/user";
import { ElMessage } from 'element-plus'

export default {
  data() {
    var usertype = sessionStorage.getItem('user_type')
    const validateUsername=(rule,value,callback) =>{
      if(!value){
        callback(new  Error('请输入用户名'))
      }
    }
    const validateFactname = (rule,value,callback) =>{
      if(!value){
        callback(new Error('请输入真实姓名'))
      }
    }
    const validatePassword = (rule,value,callback) =>{
      if(!value){
        callback(new Error('请输入密码'))
      }
    }
    const validateCheck_pwd = (rule, value, callback) => {
      if (value != this.form.password) {
        callback(new Error('确认密码和密码不一致'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule,value,callback) =>{
      if(value.length < 11){
        callback(new Error('请输入正确格式的电话号码'))
      }else{
        callback()
      }
    }
    return {
      add_rules: {
        username:[{required:true,validator:validateUsername}],
        factname:[{required:true,validator:validateFactname}],
        password:[{required:true,validator:validatePassword}],
        phone_number:[{required:true,validator:validatePhone}],
        user_type:[{required:true}],
        check_pwd: [{ required: true, validator: validateCheck_pwd }]
      },
      form:{
        username:'',
        factname:'',
        password:'',
        check_pwd:'',
        phone_number:'',
        descripe:'',
        user_type:'',
      },
      add_user:false,
      now_user_id: "",
      now_user_type:'',
      num_data: 0,
      totalPushData: [],
      showPushData: [],
      page_size: 15,
      dialogVisible: false,
      dialogVisible_edit: false,
      editpwd_dialog: false,
      editpwd: {
        first: ref(""),
        second: ref(""),
        id: 0,
      },
    };
  },
  mounted() {
    this.getPushData();
  },
  methods: {
    user_submit(){
      addUser(this.form).then((res)=>{
        if(res.code === 200){
          ElMessage({
            message: res.msg,
            type: 'success',
          })
        }else {
          ElMessage({
            message:res.msg,
            type:'error'
          })
        }
      })
      this.getPushData()
      this.add_user = false
    },
    headClass() {
      return "text-align:center";
    },
    rowClass() {
      return "text-align:center";
    },
    //获取用户数据
    getPushData() {
      this.now_user_id = localStorage.getItem("userid");
      this.now_user_type = sessionStorage.getItem("user_type");
      Users()
        .then((res) => {
          var obj = res.data;
          var values = [];
          for (var key in obj) {
            values.push(obj[key]);
          }
          this.num_data = values.length;
          this.totalPushData = values;
          let indexPushData = [];
          this.totalPushData.slice(0, this.page_size).map((data, index) => {
            indexPushData.push(data);
          });
          this.showPushData = indexPushData;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //分页
    changePage(index) {
      let start_index = (index - 1) * this.page_size;
      let end_index = index * this.page_size;
      let indexPushData = [];
      this.totalPushData.slice(start_index, end_index).map((data, index) => {
        indexPushData.push(data);
      });
      this.showPushData = indexPushData;
    },
    //修改密码
    Editpassword(index, row) {
      this.editpwd_dialog = true;
      this.editpwd.id = row.id;
    },
    Editpassword_check() {
      this.editpwd_dialog = false;
      if (this.editpwd.first != this.editpwd.second) {
        ElMessage({
          message:"两次输入的密码不一致",
          type:'error'
        })
        this.editpwd.first = ref("");
        this.editpwd.second = ref("");
      } else {
        editPwd(this.editpwd.id, this.editpwd.first).then((res) => {
          if (res.code == 200) {
            ElMessage({
              message:res.msg,
              type:'success'
            })
            this.editpwd.first = ref("");
            this.editpwd.second = ref("");
          } else {
            ElMessage({
              message:res.msg,
              type:'error'
            })
            this.editpwd.first = ref("");
            this.editpwd.second = ref("");
          }
        });
      }
    },
    //删除
    handeDelete_before(index, row) {
      this.dialogVisible = true;
      this.del_id = row.id;
    },
    handleDelete() {
      deleteUser(this.del_id).then((res) => {
        ElMessage({
          message:res.msg,
          type:'error'
        })
        this.getPushData();
        this.dialogVisible = false;
      });
    },
  },
};
</script>

<style>
/* @media screen and (max-width: 1500px) {
  .body {
    zoom: 85%;
  }
} */
html {
  overflow: hidden;
  font-size: 1vw;
}

.manage {
  background: #fcfbfd;
}
.userbtn {
  width: 4rem;
}
.manage .mainAll /deep/ * {
  font-size: 1.125rem !important;
  font-weight: 500;
}
.ivu-table td,
.ivu-table th {
  font-size: 1.25rem;
  height: 3.875rem;
}
.el-table .cell {
  padding: -0.052083rem !important;
}
.el-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 1.6667rem;
  white-space: nowrap;
  cursor: pointer;
  background-color: var(--el-button-bg-color, var(--el-color-white));
  border: var(--el-border-base);
  border-color: var(--el-button-border-color, var(--el-border-color-base));
  color: var(--el-button-text-color, var(--el-text-color-regular));
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: var(--el-button-font-weight);
  -webkit-user-select: none;
  user-select: none;
  padding: .5208rem .7813rem;
  font-size: var(--el-font-size-base, 14px);
  border-radius: var(--el-border-radius-base);
}
.el-button+.el-button {
    margin-left: .625rem;
}
.el-table {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: -moz-fit-content;
    height: fit-content;
    width: 100%;
    max-width: 100%;
    background-color: var(--el-table-bg-color);
    font-size: .7292rem;
    color: var(--el-table-text-color);
}
.el-dialog {
  background-color: #ffffff;
}
.el-dialog__title {
  color: #000000;
  font-size: 25px;
}
</style>
